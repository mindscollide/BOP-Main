import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState, useRef } from "react";
import { throttle } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { clearTreasuryFeDiscountingRates } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
// import { clearTreasuryNonFeDiscounting } from "@/store/slices/RealtimeActionsSlice"; // ← adjust import path

const NonFeDiscountingTreasuryAndDealer = () => {
  const dispatch = useDispatch();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  // ✅ Ref always holds the latest dataSource snapshot — safe inside throttle
  const dataSourceRef = useRef([]);

  // ✅ Accumulates incoming MQTT payloads between throttle flushes
  const pendingRatesRef = useRef([]);

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);

  // ---------------- REDUX SELECTORS ----------------
  const GetDiscountingRatesForTreasury = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForTreasury
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const TreasuryNonFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryNonFeDiscounting
  );

  // ---------------- INITIAL TABLE BUILD ----------------
  // Runs once when instruments + tenors are ready.
  useEffect(() => {
    if (
      isTableInitialized.current ||
      !getAllTenorsRecords ||
      !GetAllInstrumentForTreasury
    )
      return;

    try {
      const { nonFEDiscountingRates = [] } =
        GetDiscountingRatesForTreasury ?? {};

      const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
      const getAllInstrument = {
        instruments: GetAllInstrumentForTreasury.nonFEDiscountingInstruments,
      };

      const { columnsData: cols, rowData } = buildDiscountingTable(
        3,
        nonFEDiscountingRates,
        getAllTenorsData,
        getAllInstrument,
        IndexCell
      );

      // ✅ Mark initialized regardless of rowData length so MQTT
      //    effect can manage rows independently from this point on.
      isTableInitialized.current = true;
      setColumnsData(cols);

      if (rowData?.length) {
        dataSourceRef.current = rowData;
        setDataSource(rowData);
      }
    } catch (error) {
      console.error("Error building discounting table:", error);
    }
  }, [getAllTenorsRecords, GetAllInstrumentForTreasury, GetDiscountingRatesForTreasury]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  // Reads from refs — never stale, never recreated.
  const throttledUpdateRef = useRef(
    throttle(() => {
      // ✅ Drain the pending batch
      const batch = pendingRatesRef.current;
      if (!batch.length) return;

      // ✅ Flatten all payloads into one rates array
      const allRates = batch.flatMap(
        (payload) => payload.nonFeDiscountingRates ?? []
      );
      if (!allRates.length) return;

      // ✅ Apply all rates in a single pass over the current snapshot
      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        allRates.forEach((d) => {
          if (String(row.TenorID) !== String(d.tenorID)) return;

          const instrumentKey = Object.keys(row).find(
            (key) =>
              key.startsWith("InstrumentID_") &&
              String(row[key]) === String(d.instrumentID)
          );

          if (!instrumentKey) return;

          const currency = instrumentKey.replace("InstrumentID_", "");
          updatedRow[`rate_${currency}`] = d.bidWithSpread;
        });

        return updatedRow;
      });

      dataSourceRef.current = updated;
      setDataSource(updated);

      // ✅ Clear batch and Redux state after processing
      pendingRatesRef.current = [];
      dispatch(clearTreasuryFeDiscountingRates());
    }, 100) // 100ms — matches BankForwards convention
  );

  // ✅ Accumulate each incoming MQTT payload, then fire throttle
  useEffect(() => {
    if (!TreasuryNonFeDiscounting) return;

    pendingRatesRef.current = [...pendingRatesRef.current, TreasuryNonFeDiscounting];
    throttledUpdateRef.current();
  }, [TreasuryNonFeDiscounting]);

  // ✅ Cancel throttle on unmount only
  useEffect(() => {
    const throttledFn = throttledUpdateRef.current;
    return () => throttledFn.cancel();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <>
      <span className="heading mb-2">Non FE Discounting</span>

      <GlobalTable
        columns={columnsData}
        dataSource={dataSource}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default NonFeDiscountingTreasuryAndDealer;