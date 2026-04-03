import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { useModal } from "./ModalContext";

const BankTableDataContext = createContext();

export const BankTableDataProvider = ({ children }) => {
  const { allForwardApplicableTenors, isMarketOn } = useModal();

  const isTableInitialized = useRef(false);

  const [bankForwardsSource, setBankForwardsSource] = useState([]);
  const [bankForwardsColumnsData, setBankForwardsColumnsData] = useState([]);

  const dataSourceRef = useRef([]);

  // 🔥 instrument + tenor lookup map
  const instrumentTenorMapRef = useRef({});

  // REDUX
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  const GetBankForwardForTreasury = useSelector(
    (state) => state.WatchListReducer.GetBankForwardForTreasury
  );

  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const TreasuryForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryForwardRates
  );

  // ---------------- INITIAL TABLE BUILD ----------------
  useEffect(() => {
    if (
      isTableInitialized.current ||
      !getAllTenorsRecords ||
      !GetAllInstrumentForTreasury
    )
      return;

    try {
      const { forwardRates = [] } = GetBankForwardForTreasury || {};
      const { forwardInstruments = [] } = GetAllInstrumentForTreasury;

      const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
      const getAllInstrument = { instruments: forwardInstruments };

      const { rowData, columnsData } = buildForwardsTable(
        3,
        forwardRates,
        getAllTenorsData,
        getAllInstrument,
        IndexCell
      );

      if (rowData?.length) {
        // build fast lookup map
        const map = {};

        rowData.forEach((row) => {
          Object.keys(row).forEach((key) => {
            if (key.startsWith("InstrumentID_")) {
              const instrumentID = row[key];
              const currency = key.split("_")[1];

              map[`${instrumentID}-${row.tenorID}`] = currency;
            }
          });
        });

        instrumentTenorMapRef.current = map;

        dataSourceRef.current = rowData;
        isTableInitialized.current = true;

        setBankForwardsSource(rowData);
        setBankForwardsColumnsData(columnsData);
      }
    } catch (error) {
      console.error("Error building forwards table:", error);
    }
  }, [
    GetBankForwardForTreasury,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);

  // ---------------- MQTT RATE UPDATE ----------------
  const updateForwardRatesRef = useRef(
    throttle((treasuryForwardRates) => {
      const { forwardRates = [] } = treasuryForwardRates;

      if (!forwardRates.length) return;

      const updated = [...dataSourceRef.current];

      forwardRates.forEach((rate) => {
        const currency =
          instrumentTenorMapRef.current[`${rate.instrumentID}-${rate.tenorID}`];

        if (!currency) return;

        const rowIndex = updated.findIndex((r) => r.tenorID === rate.tenorID);

        if (rowIndex === -1) return;

        updated[rowIndex] = {
          ...updated[rowIndex],
          [`bid_${currency}`]: rate.bidWithSpread,
          [`ask_${currency}`]: rate.askWithSpread,
        };
      });

      dataSourceRef.current = updated;
      setBankForwardsSource(updated);
    }, 20)
  );

  useEffect(() => {
    if (TreasuryForwardRates) {
      updateForwardRatesRef.current(TreasuryForwardRates);
    }
  }, [TreasuryForwardRates]);

  // ---------------- TENOR ADD / REMOVE ----------------
  useEffect(() => {
    if (
      !isTableInitialized.current ||
      !allForwardApplicableTenors ||
      !bankForwardsColumnsData.length
    )
      return;

    const activeTenors = allForwardApplicableTenors.tenors.filter(
      (t) => t.isForwardingApplicable
    );

    const activeIDs = new Set(activeTenors.map((t) => t.tenorID));

    let updatedRows = [...dataSourceRef.current];

    // remove disabled tenors
    updatedRows = updatedRows.filter((row) => activeIDs.has(row.tenorID));

    // add new tenors
    activeTenors.forEach((tenor) => {
      const exists = updatedRows.some((row) => row.tenorID === tenor.tenorID);

      if (!exists) {
        const newRow = {
          tenorID: tenor.tenorID,
          tenorName: tenor.tenorName,
          tenorDays: tenor.tenorDays,
        };

        bankForwardsColumnsData.forEach((group) => {
          group.children?.forEach((col) => {
            if (col.dataIndex?.startsWith("bid_")) newRow[col.dataIndex] = "-";

            if (col.dataIndex?.startsWith("ask_")) newRow[col.dataIndex] = "-";
          });
        });

        updatedRows.push(newRow);
      }
    });

    updatedRows.sort((a, b) => a.tenorDays - b.tenorDays);

    dataSourceRef.current = updatedRows;
    setBankForwardsSource(updatedRows);
  }, [allForwardApplicableTenors, bankForwardsColumnsData]);

  // ---------------- MARKET CLOSED ----------------
  useEffect(() => {
    if (isMarketOn === false && dataSourceRef.current.length) {
      const cleared = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        Object.keys(updatedRow).forEach((key) => {
          if (key.startsWith("bid_") || key.startsWith("ask_")) {
            updatedRow[key] = "0";
          }
        });

        return updatedRow;
      });

      dataSourceRef.current = cleared;
      setBankForwardsSource(cleared);
    }
  }, [isMarketOn]);

  return (
    <BankTableDataContext.Provider
      value={{
        bankForwardsSource,
        bankForwardsColumnsData,
      }}>
      {children}
    </BankTableDataContext.Provider>
  );
};

export const useBankFowardsTableData = () => useContext(BankTableDataContext);
