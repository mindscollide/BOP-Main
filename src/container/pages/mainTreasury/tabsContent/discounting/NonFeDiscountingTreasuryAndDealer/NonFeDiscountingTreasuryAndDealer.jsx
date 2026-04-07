import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState, useRef } from "react";
import { throttle } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { clearTreasuryNonFeDiscoutingRates } from "@/store/realtimeActionsSlicer/realtimeActionSlice";

const NonFeDiscountingTreasuryAndDealer = () => {
  const dispatch = useDispatch();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  // ✅ Always holds latest dataSource snapshot — safe inside throttle
  const dataSourceRef = useRef([]);

  // ✅ Mirrors the Redux accumulated array — no double-wrapping
  const treasuryNonFeDiscountingRef = useRef([]);

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
  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null &&
      !isTableInitialized.current &&
      GetDiscountingRatesForTreasury !== null
    )
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
        isTableInitialized.current = true;
        setColumnsData(cols);

        if (rowData?.length) {
          dataSourceRef.current = rowData;
          setDataSource(rowData);
        }
      } catch (error) {
        console.error("Error building NonFE discounting table:", error);
      }
  }, [
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
    GetDiscountingRatesForTreasury,
  ]);
  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  const throttledUpdateRef = useRef(
    throttle(() => {
      // ✅ Read directly from ref — always the latest Redux array snapshot
      const batch = treasuryNonFeDiscountingRef.current;
      if (!batch?.length) return;

      // ✅ batch is already [{message, nonFeDiscountingRates: [...]}, ...]
      //    just flatMap the inner rates arrays — no double-nesting
      const allRates = batch.flatMap(
        (payload) => payload.nonFeDiscountingRates ?? []
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
      setDataSource(updated);

      // ✅ Clear Redux array after processing
      dispatch(clearTreasuryNonFeDiscoutingRates());
    }, 10)
  );

  // ✅ Mirror Redux array into ref directly — no extra wrapping
  useEffect(() => {
    if (!TreasuryNonFeDiscounting?.length) return;

    treasuryNonFeDiscountingRef.current = TreasuryNonFeDiscounting;
    throttledUpdateRef.current();
  }, [TreasuryNonFeDiscounting]);

  // ✅ Cancel throttle on unmount only
  useEffect(() => {
    const throttledFn = throttledUpdateRef.current;
    return () => throttledFn.cancel();
  }, []);

  return (
    <>
      <span className='heading mb-2'>Non FE Discounting</span>

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
