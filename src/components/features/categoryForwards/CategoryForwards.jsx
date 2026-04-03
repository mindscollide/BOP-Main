import React, { useEffect, useRef, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector, useDispatch } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import {
  clearCategoryForwardClearRates,
  setCategoryFowardsTenorsChanges,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useModal } from "@/context/ModalContext";

// ---------------- CONSTANTS ----------------
const FORWARDS_TABLE_TYPE = 3;
const EMPTY_RATE_VALUE = null;

// ---------------- HELPERS ----------------

/**
 * Extracts InstrumentID_ and InstrumentName_ keys from a reference row.
 * These are identical across all tenor rows.
 */
const extractInstrumentMeta = (referenceRow) => {
  if (!referenceRow) return {};
  return Object.fromEntries(
    Object.entries(referenceRow).filter(
      ([key]) =>
        key.startsWith("InstrumentID_") || key.startsWith("InstrumentName_")
    )
  );
};

/**
 * Builds a new tenor row with:
 * - Fresh tenor identity fields
 * - InstrumentID_ / InstrumentName_ from any existing reference row
 * - bid/ask inherited from previousRow if it exists, else EMPTY_RATE_VALUE
 */
const buildNewTenorRow = (tenor, previousRow, referenceRow) => {
  const instrumentMeta = extractInstrumentMeta(referenceRow);

  const bidAskValues = Object.fromEntries(
    Object.entries(referenceRow ?? {})
      .filter(([key]) => key.startsWith("bid_") || key.startsWith("ask_"))
      .map(([key]) => [
        key,
        previousRow?.[key] !== undefined &&
        previousRow?.[key] !== EMPTY_RATE_VALUE
          ? previousRow[key]
          : EMPTY_RATE_VALUE,
      ])
  );

  return {
    tenorID: tenor.tenorID,
    tenorName: tenor.tenorName,
    tenorDays: tenor.tenorDays,
    ...instrumentMeta,
    ...bidAskValues,
  };
};

// -----------------------------------------------

const CategoryForwards = () => {
  const dispatch = useDispatch();
  const { isMarketOn } = useModal();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const dataSourceRef = useRef([]);

  // columnsData is stable after init — ref avoids re-triggering effects
  const columnsDataRef = useRef([]);
  const [columnsDataState, setColumnsDataState] = useState([]);

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);

  // ---------------- REDUX SELECTORS ----------------
  const GetCategoryWiseForwardRatesData = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseForwardRates
  );
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const CategoryForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryForwardRates
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryForwardClearRates
  );
  const categoryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.categoryFowardsTenorsChanges
  );

  // ---------------- INITIAL TABLE BUILD ----------------
  // Runs once when instruments + tenors are ready.
  // Does NOT include categoryFowardsTenorsChanges — tenor sync
  // is handled by its own dedicated effect below.
  useEffect(() => {
    if (
      isTableInitialized.current ||
      !getAllTenorsRecords ||
      !allInstrumentForTreasuryData
    )
      return;

    try {
      const { forwardRates = [] } = GetCategoryWiseForwardRatesData ?? {};
      const { forwardInstruments = [] } = allInstrumentForTreasuryData;

      const { rowData, columnsData } = buildForwardsTable(
        FORWARDS_TABLE_TYPE,
        forwardRates,
        { tenors: getAllTenorsRecords.tenors },
        { instruments: forwardInstruments },
        IndexCell
      );

      // Mark initialized regardless of rowData length so the
      // tenor-sync effect can manage rows independently from this point on.
      columnsDataRef.current = columnsData;
      setColumnsDataState(columnsData);
      isTableInitialized.current = true;

      if (rowData?.length) {
        dataSourceRef.current = rowData;
        setDataSource(rowData);
      }
    } catch (error) {
      console.error("Error building category forwards table:", error);
    }
  }, [
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
    GetCategoryWiseForwardRatesData,
  ]);

  // ---------------- TENOR SYNC (MQTT EVENT) ----------------
  // Incrementally adds / removes rows when tenor applicability changes.
  // Does NOT rebuild the entire table — preserves live MQTT rates.
  useEffect(() => {
    if (
      !isTableInitialized.current ||
      !categoryFowardsTenorsChanges ||
      !getAllTenorsRecords
    )
      return;

    try {
      const { newIsForwardtenorList = [], removedtenorList = [] } =
        categoryFowardsTenorsChanges;

      // Build lookup sets directly from MQTT payload
      const removedSet = new Set(removedtenorList.map((t) => t.tenorID));
      const addedSet = new Set(newIsForwardtenorList.map((t) => t.tenorID));

      // No actual changes — bail early
      if (!removedSet.size && !addedSet.size) {
        dispatch(setCategoryFowardsTenorsChanges(null));
        return;
      }

      // Reference row: any existing row for InstrumentID_ / InstrumentName_ meta
      const referenceRow = dataSourceRef.current[0] ?? null;

      // ── REMOVALS ─────────────────────────────────────────
      const updatedRows = dataSourceRef.current.filter(
        (row) => !removedSet.has(row.tenorID)
      );

      // existingIDs built from POST-filter rows
      const existingIDs = new Set(updatedRows.map((r) => r.tenorID));

      // ── ADDITIONS ────────────────────────────────────────
      // newIsForwardtenorList contains tenors now applicable.
      // Cross-reference allTenors for full metadata (tenorName, tenorDays).
      newIsForwardtenorList.forEach((addedTenor) => {
        if (existingIDs.has(addedTenor.tenorID)) return; // already present

        const fullTenor =
          getAllTenorsRecords.tenors.find(
            (t) => t.tenorID === addedTenor.tenorID
          ) ?? addedTenor; // fallback to payload if not in allTenors

        // Inherit rates if this tenor previously existed before removal
        const previousRow =
          dataSourceRef.current.find((r) => r.tenorID === addedTenor.tenorID) ??
          null;

        const newRow = buildNewTenorRow(fullTenor, previousRow, referenceRow);
        updatedRows.push(newRow);
      });

      updatedRows.sort((a, b) => a.tenorDays - b.tenorDays);

      dataSourceRef.current = updatedRows;
      setDataSource(updatedRows);

      dispatch(setCategoryFowardsTenorsChanges(null));
    } catch (error) {
      console.error("Tenor sync error:", error);
    }
  }, [categoryFowardsTenorsChanges, getAllTenorsRecords]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  // Stored in a ref so it's never recreated and always reads
  // the latest dataSourceRef.current snapshot.
  const updateCategoryRatesRef = useRef(
    throttle((forwardRatesUpdate) => {
      const { instrumentForwardsData } = forwardRatesUpdate;
      if (!instrumentForwardsData?.length) return;

      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        instrumentForwardsData.forEach((d) => {
          if (String(row.tenorID) !== String(d.tenorID)) return;

          const instrumentKey = Object.keys(row).find(
            (key) =>
              key.startsWith("InstrumentID_") &&
              String(row[key]) === String(d.instrumentID)
          );

          if (!instrumentKey) return;

          // "InstrumentID_USD" → "USD", "InstrumentID_CNY" → "CNY"
          const currency = instrumentKey.replace("InstrumentID_", "");

          updatedRow[`bid_${currency}`] = d.bidWithSpread;
          updatedRow[`ask_${currency}`] = d.askWithSpread;
        });

        return updatedRow;
      });

      dataSourceRef.current = updated;
      setDataSource(updated);
    }, 20) // 100ms — safe default for high-frequency MQTT feeds
  );

  // Fire throttled update on new rates
  useEffect(() => {
    if (CategoryForwardRates) {
      updateCategoryRatesRef.current(CategoryForwardRates);
    }
  }, [CategoryForwardRates]);

  // Cancel throttle on unmount only
  useEffect(() => {
    const throttledFn = updateCategoryRatesRef.current;
    return () => throttledFn.cancel();
  }, []);

  // ---------------- MARKET CLOSED ----------------
  // Strict === false guard prevents firing on undefined at initial render
  useEffect(() => {
    if (isMarketOn !== false) return;

    const cleared = dataSourceRef.current.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedRow).forEach((key) => {
        if (key.startsWith("bid_") || key.startsWith("ask_")) {
          updatedRow[key] = EMPTY_RATE_VALUE;
        }
      });
      return updatedRow;
    });

    dataSourceRef.current = cleared;
    setDataSource(cleared);
  }, [isMarketOn]);

  // ---------------- CLEAR RATES ----------------
  // Clears bid/ask directly from dataSourceRef — no Redux roundtrip needed.
  // The original pattern of dispatching UpdateGetCategoryWiseForwardRates
  // caused the initial build effect to re-run and wipe live MQTT rates.
  useEffect(() => {
    if (!ClearRatesData?.areRatesClear) return;

    const cleared = dataSourceRef.current.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedRow).forEach((key) => {
        if (key.startsWith("bid_") || key.startsWith("ask_")) {
          updatedRow[key] = EMPTY_RATE_VALUE;
        }
      });
      return updatedRow;
    });

    dataSourceRef.current = cleared;
    setDataSource(cleared);

    dispatch(clearCategoryForwardClearRates());
  }, [ClearRatesData]);

  // ---------------- RENDER ----------------
  return (
    <>
      <span className='heading mb-2'>Forward</span>
      <GlobalTable
        columns={columnsDataState}
        prefixCls='Dealer_Forwards'
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default CategoryForwards;
