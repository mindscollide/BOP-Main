import React, { useEffect, useRef, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector, useDispatch } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildTresmarkCrossPremiumTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import { setTreasuryFowardsTenorsChanges } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useLocation } from "react-router-dom";
import { GetTresmarkCrossesPremiumsAPI } from "./TresmarkCrossesActions";

const EMPTY_RATE_VALUE = null;

const TresmarkCrosses = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  // ✅ refs to avoid stale closures in throttle
  const dataSourceRef = useRef([]);
  const tresmarkRatesRef = useRef(null);

  const isTableInitialized = useRef(false);

  // ---------------- REDUX SELECTORS ----------------
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const tresmarkCrossPremiumRates = useSelector(
    (state) => state.RealtimeActionsSlice.tresmarkCrossPremiumRates
  );
  const GetTresmarkCrossesPremiums = useSelector(
    (state) => state.TresmarkCrossesSlicer.GetTresmarkCrossesPremiums
  );
  const treasuryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.treasuryFowardsTenorsChanges
  );

  // ---------------- FETCH ON MOUNT ----------------
  useEffect(() => {
    dispatch(GetTresmarkCrossesPremiumsAPI());
  }, []);

  // ---------------- INITIAL TABLE BUILD ----------------
  useEffect(() => {
    if (
      isTableInitialized.current ||
      !getAllTenorsRecords ||
      !allInstrumentForTreasuryData
    )
      return;

    try {
      const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
      const getAllInstrument = {
        instruments: allInstrumentForTreasuryData.forwardInstruments,
      };

      // ✅ clean null check
      const { crossesPremiumsRates = [] } = GetTresmarkCrossesPremiums ?? {};

      const { rowData, columnsData: cols } = buildTresmarkCrossPremiumTable(
        3,
        crossesPremiumsRates,
        getAllTenorsData,
        getAllInstrument,
        IndexCell
      );

      isTableInitialized.current = true;

      if (rowData?.length) {
        dataSourceRef.current = rowData;
        setDataSource(rowData);
        setColumnsData(cols);
      }
    } catch (error) {
      console.error("Error building Tresmark Crosses table:", error);
    }
  }, [
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
    GetTresmarkCrossesPremiums,
  ]);

 
  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  const throttledUpdateRef = useRef(
    throttle(() => {
      const pending = tresmarkRatesRef.current;
      if (!pending?.length) return;

      // ✅ flatten all accumulated payloads
      const allRates = pending.flatMap(
        (payload) => payload.crossesPremiumsRates ?? []
      );
      if (!allRates.length) return;

      // ✅ read from ref — no stale closure
      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        allRates.forEach((d) => {
          if (String(row.tenorID) !== String(d.tenorID)) return;

          const instrumentKey = Object.keys(row).find(
            (key) =>
              key.startsWith("InstrumentID_") &&
              String(row[key]) === String(d.instrumentID)
          );
          if (!instrumentKey) return;

          // ✅ replace instead of split — safe for all currency codes
          const currency = instrumentKey.replace("InstrumentID_", "");
          updatedRow[`bid_${currency}`] = d.bidPremium;
          updatedRow[`ask_${currency}`] = d.askPremium;
        });

        return updatedRow;
      });

      dataSourceRef.current = updated;
      setDataSource(updated);
    }, 100)
  );

  // ✅ keep ref in sync, trigger throttle
  useEffect(() => {
    if (tresmarkCrossPremiumRates) {
      tresmarkRatesRef.current = [
        ...(tresmarkRatesRef.current ?? []),
        tresmarkCrossPremiumRates,
      ];
      throttledUpdateRef.current();
    }
  }, [tresmarkCrossPremiumRates]);

  // Cancel throttle on unmount only
  useEffect(() => {
    const fn = throttledUpdateRef.current;
    return () => fn.cancel();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <>
      <h6
        className={
          location.pathname.toLowerCase().includes("treasury")
            ? "flex-fill fs-4 fw-bold color-black mb-1 ff-roboto"
            : "fs-4 fw-bold color-primary"
        }
      >
        Tresmark Crosses Premium
      </h6>

      <div className="mt-3">
        <GlobalTable
          columns={columnsData}
          prefixCls={"Treasury_Forwards"}
          dataSource={dataSource}
          pagination={false}
          rowClassName={"striped-design"}
          bordered
          rowHoverBg={"#000"}
        />
      </div>
    </>
  );
};

export default TresmarkCrosses;