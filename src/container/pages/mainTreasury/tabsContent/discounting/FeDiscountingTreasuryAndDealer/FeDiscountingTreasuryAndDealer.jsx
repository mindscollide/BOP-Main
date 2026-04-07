import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState, useRef } from "react";
import { throttle } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { clearTreasuryFeDiscountingRates } from "@/store/realtimeActionsSlicer/realtimeActionSlice";

const FeDiscountingTreasuryAndDealer = () => {
  const dispatch = useDispatch();

  // ---------------- TABLE STATE ----------------
  const [feDiscountingData, setFeDiscountingData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  // ✅ Ref always holds the latest dataSource snapshot — safe inside throttle
  const dataSourceRef = useRef([]);

  // ✅ Accumulates incoming MQTT payloads between throttle flushes
  const treasuryFeDiscountingRef = useRef([]);

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
  const TreasuryFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryFeDiscounting
  );

  // ---------------- INITIAL TABLE BUILD ----------------
  // Runs once when instruments + tenors are ready.
  useEffect(() => {
    if (
      !isTableInitialized.current &&
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null &&
      GetDiscountingRatesForTreasury !== null
    )
      try {
        const { feDiscountingRates = [] } =
          GetDiscountingRatesForTreasury ?? {};

        const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        const getAllInstrument = {
          instruments: GetAllInstrumentForTreasury.discountingInstruments,
        };

        const { columnsData: cols, rowData } = buildDiscountingTable(
          3,
          feDiscountingRates,
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
          setFeDiscountingData(rowData);
        }
      } catch (error) {
        console.error("Error building FE discounting table:", error);
      }
  }, [
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
    GetDiscountingRatesForTreasury,
  ]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  // Reads from refs — never stale, never recreated.
  const throttledUpdateRef = useRef(
    throttle(() => {
      const batch = treasuryFeDiscountingRef.current;
      if (!batch?.length) return;

      // ✅ Flatten all accumulated payloads into one rates array
      const allRates = batch.flatMap(
        (payload) => payload.feDiscountingRates ?? []
      );
      if (!allRates.length) return;

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
      setFeDiscountingData(updated);

      dispatch(clearTreasuryFeDiscountingRates()); // ✅ resets Redux array to []
    }, 100)
  );

  // ✅ Accumulate each incoming MQTT payload, then fire throttle
  // ✅ Store the full accumulated array from Redux into the ref
  useEffect(() => {
    if (!TreasuryFeDiscounting?.length) return;

    treasuryFeDiscountingRef.current = TreasuryFeDiscounting; // ← ref holds the Redux array
    throttledUpdateRef.current();
  }, [TreasuryFeDiscounting]);

  // ✅ Cancel throttle on unmount only
  useEffect(() => {
    const throttledFn = throttledUpdateRef.current;
    return () => throttledFn.cancel();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <>
      <span className='heading mb-2'>FE Discounting</span>
      <GlobalTable
        columns={columnsData}
        dataSource={feDiscountingData}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default FeDiscountingTreasuryAndDealer;
