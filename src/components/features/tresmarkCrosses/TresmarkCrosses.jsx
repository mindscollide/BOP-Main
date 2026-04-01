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

  // ---------------- TENOR SYNC ----------------
  useEffect(() => {
    // ✅ guard: only run if there's actually a change payload
    if (!treasuryFowardsTenorsChanges || !isTableInitialized.current) return;

    // ✅ snapshot refs at effect start — prevents stale reads
    const currentTenors = getAllTenorsRecords?.tenors;
    const currentInstruments =
      allInstrumentForTreasuryData?.forwardInstruments;

    if (!currentTenors || !currentInstruments) {
      dispatch(setTreasuryFowardsTenorsChanges(null));
      return;
    }

    try {
      const { newIsForwardtenorList = [], removedtenorList = [] } =
        treasuryFowardsTenorsChanges;

      const removedSet = new Set(removedtenorList.map((t) => t.tenorID));

      // ✅ instead of rebuilding the whole table, add/remove rows from ref
      // REMOVALS
      let updatedRows = dataSourceRef.current.filter(
        (row) => !removedSet.has(row.tenorID)
      );

      // ✅ snapshot before filter for rate inheritance
      const snapshotRows = [...dataSourceRef.current];
      const referenceRow = updatedRows[0] ?? snapshotRows[0] ?? null;
      const existingIDs = new Set(updatedRows.map((r) => r.tenorID));

      // ADDITIONS
      newIsForwardtenorList.forEach((addedTenor) => {
        if (existingIDs.has(addedTenor.tenorID)) return;

        const fullTenor =
          currentTenors.find((t) => t.tenorID === addedTenor.tenorID) ??
          addedTenor;

        const previousRow =
          snapshotRows.find((r) => r.tenorID === addedTenor.tenorID) ?? null;

        // Build instrument meta from referenceRow
        const instrumentMeta = referenceRow
          ? Object.fromEntries(
              Object.entries(referenceRow).filter(
                ([key]) =>
                  key.startsWith("InstrumentID_") ||
                  key.startsWith("InstrumentName_")
              )
            )
          : {};

        // Build bid/ask values
        const bidAskValues = referenceRow
          ? Object.fromEntries(
              Object.entries(referenceRow)
                .filter(
                  ([key]) =>
                    key.startsWith("bid_") || key.startsWith("ask_")
                )
                .map(([key]) => [
                  key,
                  previousRow?.[key] !== undefined &&
                  previousRow?.[key] !== EMPTY_RATE_VALUE
                    ? previousRow[key]
                    : EMPTY_RATE_VALUE,
                ])
            )
          : {};

        updatedRows.push({
          tenorID: fullTenor.tenorID,
          tenorName: fullTenor.tenorName,
          tenorDays: fullTenor.tenorDays,
          ...instrumentMeta,
          ...bidAskValues,
        });
      });

      updatedRows.sort((a, b) => a.tenorDays - b.tenorDays);

      dataSourceRef.current = updatedRows;
      setDataSource(updatedRows);
    } catch (error) {
      console.error("Tenor sync error in TresmarkCrosses:", error);
    } finally {
      // ✅ always clear — even if an error occurs — to break the loop
      dispatch(setTreasuryFowardsTenorsChanges(null));
    }
  // ✅ only depend on the payload — NOT on getAllTenorsRecords or instruments
  // Those are read inside the effect via closure, avoiding re-trigger loop
  }, [treasuryFowardsTenorsChanges]);

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