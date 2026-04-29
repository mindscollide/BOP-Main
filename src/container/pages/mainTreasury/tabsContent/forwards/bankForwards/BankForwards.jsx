import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";
import {
  clearTreasuryForwardRates,
  setTreasuryFowardsTenorsChanges,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { Col, Row } from "react-bootstrap";

// ---------------- CONSTANTS ----------------
const FORWARDS_TABLE_TYPE = 3;
const EMPTY_RATE_VALUE = null;

// ---------------- HELPERS ----------------

/**
 * Extracts all InstrumentID_ and InstrumentName_ keys from a reference row.
 * These are identical across all tenor rows — so any existing row can serve
 * as the source when building a brand-new tenor row.
 */
const extractInstrumentMeta = (referenceRow) => {
  if (!referenceRow) return {};
  return Object.fromEntries(
    Object.entries(referenceRow).filter(
      ([key]) =>
        key.startsWith("InstrumentID_") || key.startsWith("InstrumentName_"),
    ),
  );
};

/**
 * Builds empty bid/ask keys from a reference row.
 * Used when a brand-new tenor has no previous rate data.
 */
const buildEmptyRateColumns = (referenceRow) => {
  if (!referenceRow) return {};
  return Object.fromEntries(
    Object.entries(referenceRow)
      .filter(([key]) => key.startsWith("bid_") || key.startsWith("ask_"))
      .map(([key]) => [key, EMPTY_RATE_VALUE]),
  );
};

/**
 * Builds a new tenor row by:
 * 1. Using fresh tenor identity fields
 * 2. Copying InstrumentID_ / InstrumentName_ from any existing row
 * 3. Inheriting bid/ask from previousRow if it exists, else EMPTY_RATE_VALUE
 */
const buildNewTenorRow = (
  tenor,
  previousRow,
  referenceRow,
  instrumentList = [],
) => {
  const sourceRow = referenceRow ?? previousRow ?? null;

  const instrumentMeta = sourceRow
    ? extractInstrumentMeta(sourceRow)
    : (() => {
        // ✅ fallback: build instrumentMeta from master instrument list
        const meta = {};
        instrumentList.forEach((inst) => {
          const code = inst.instrumentName;
          meta[`InstrumentID_${code}`] = inst.instrumentID;
          meta[`InstrumentName_${code}`] = inst.instrumentName;
        });
        return meta;
      })();

  const bidAskValues = sourceRow
    ? Object.fromEntries(
        Object.entries(sourceRow)
          .filter(([key]) => key.startsWith("bid_") || key.startsWith("ask_"))
          .map(([key]) => [
            key,
            previousRow?.[key] !== undefined &&
            previousRow?.[key] !== EMPTY_RATE_VALUE
              ? previousRow[key]
              : EMPTY_RATE_VALUE,
          ]),
      )
    : (() => {
        // ✅ fallback: build empty bid/ask keys from master instrument list
        const bidAsk = {};
        instrumentList.forEach((inst) => {
          const code = inst.instrumentName;
          bidAsk[`bid_${code}`] = EMPTY_RATE_VALUE;
          bidAsk[`ask_${code}`] = EMPTY_RATE_VALUE;
        });
        return bidAsk;
      })();

  return {
    tenorID: tenor.tenorID,
    tenorName: tenor.tenorName,
    tenorDays: tenor.tenorDays,
    ...instrumentMeta,
    ...bidAskValues,
  };
};
// -----------------------------------------------

const BankForwards = () => {
  const dispatch = useDispatch();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);

  const dataSourceRef = useRef([]);

  // ✅ keep a ref in sync with Redux so the throttle always reads fresh data
  const treasuryForwardRatesRef = useRef(null);

  // columnsData is stable after init — ref avoids re-triggering effects
  const columnsDataRef = useRef([]);
  const [columnsDataState, setColumnsDataState] = useState([]);
  const instrumentListRef = useRef([]);

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);
  const [tableReady, setTableReady] = useState(false);

  // ---------------- REDUX SELECTORS ----------------
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors,
  );
  const GetBankForwardForTreasury = useSelector(
    (state) => state.WatchListReducer.GetBankForwardForTreasury,
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury,
  );
  const TreasuryForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryForwardRates,
  );

  const treasuryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.treasuryFowardsTenorsChanges,
  );

  // ---------------- INITIAL TABLE BUILD ----------------
  // Runs once when instruments + tenors are ready.
  // Sets isTableInitialized so the tenor-sync effect can take over.
  useEffect(() => {
    if (
      !isTableInitialized.current &&
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null &&
      GetBankForwardForTreasury !== null
    )
      try {
        const { forwardRates = [] } = GetBankForwardForTreasury ?? {};
        const { forwardInstruments = [] } = GetAllInstrumentForTreasury;
        instrumentListRef.current = forwardInstruments;

        const { rowData, columnsData } = buildForwardsTable(
          FORWARDS_TABLE_TYPE,
          forwardRates,
          { tenors: getAllTenorsRecords.tenors },
          { instruments: forwardInstruments },
          IndexCell,
        );

        // Mark initialized regardless of rowData length so tenor-sync
        // effect can manage rows independently from this point on.
        columnsDataRef.current = columnsData;
        setColumnsDataState(columnsData);
        isTableInitialized.current = true;
        setTableReady(true);

        if (rowData?.length) {
          dataSourceRef.current = rowData;
          setDataSource(rowData);
        }
      } catch (error) {
        console.error("Error building forwards table:", error);
      }
  }, [
    GetBankForwardForTreasury,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);
  // ---------------- TENOR SYNC (MQTT EVENT) ----------------
  // Incrementally adds / removes rows when tenor applicability changes.
  // Does NOT rebuild the entire table — preserves live MQTT rates.
  useEffect(() => {
    if (
      tableReady &&
      treasuryFowardsTenorsChanges !== null &&
      getAllTenorsRecords !== null
    ) {
      try {
        const { newIsForwardtenorList = [], removedtenorList = [] } =
          treasuryFowardsTenorsChanges;

        // Build lookup sets from the MQTT payload directly
        const removedSet = new Set(removedtenorList.map((t) => t.tenorID));
        const addedSet = new Set(newIsForwardtenorList.map((t) => t.tenorID));

        // No actual changes — bail early
        if (!removedSet.size && !addedSet.size) {
          dispatch(setTreasuryFowardsTenorsChanges(null));
          return;
        }

        const referenceRow = dataSourceRef.current[0] ?? null;

        // ── REMOVALS ──────────────────────────────────────────
        let updatedRows = dataSourceRef.current.filter(
          (row) => !removedSet.has(row.tenorID),
        );

        const existingIDs = new Set(updatedRows.map((r) => r.tenorID));

        // ── ADDITIONS ─────────────────────────────────────────
        // newIsForwardtenorList contains tenors now applicable
        // cross-reference against allTenors to get full tenor metadata
        newIsForwardtenorList.forEach((addedTenor) => {
          if (existingIDs.has(addedTenor.tenorID)) return; // already present

          // Get full tenor details (tenorName, tenorDays etc.) from allTenors
          const fullTenor =
            getAllTenorsRecords.tenors.find(
              (t) => t.tenorID === addedTenor.tenorID,
            ) ?? addedTenor; // fallback to payload if not found

          // Inherit rates if this tenor existed before removal
          const previousRow =
            dataSourceRef.current.find(
              (r) => r.tenorID === addedTenor.tenorID,
            ) ?? null;
          // In BranchForwardsTable tenor sync effect
          const newRow = buildNewTenorRow(
            fullTenor,
            previousRow,
            referenceRow,
            instrumentListRef.current, // ✅ pass master list as fallback
          );
          updatedRows.push(newRow);
        });

        updatedRows.sort((a, b) => a.tenorDays - b.tenorDays);

        dataSourceRef.current = updatedRows;
        setDataSource(updatedRows);

        dispatch(setTreasuryFowardsTenorsChanges(null));
      } catch (error) {
        console.error("Tenor sync error:", error);
      }
    }
  }, [treasuryFowardsTenorsChanges, getAllTenorsRecords, tableReady]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  // Uses a ref-stored throttle so it's never recreated and always
  // reads the latest dataSourceRef.current snapshot.
  // const updateForwardRatesRef = useRef(
  //   throttle((treasuryForwardRates) => {
  //     const { forwardRates = [] } = treasuryForwardRates;
  //     if (!forwardRates.length) return;

  //     const updated = dataSourceRef.current.map((row) => {
  //       const updatedRow = { ...row };

  //       forwardRates.forEach((d) => {
  //         if (String(row.tenorID) !== String(d.tenorID)) return;

  //         const instrumentKey = Object.keys(row).find(
  //           (key) =>
  //             key.startsWith("InstrumentID_") &&
  //             String(row[key]) === String(d.instrumentID)
  //         );

  //         if (!instrumentKey) return;

  //         // "InstrumentID_USD" → "USD", "InstrumentID_CNY" → "CNY"
  //         const currency = instrumentKey.replace("InstrumentID_", "");

  //         updatedRow[`bid_${currency}`] = d.bidWithSpread;
  //         updatedRow[`ask_${currency}`] = d.askWithSpread;
  //       });

  //       return updatedRow;
  //     });

  //     dataSourceRef.current = updated;
  //     setDataSource(updated);
  //   }, 100) // 100ms — safe default for high-frequency MQTT feeds
  // );
  const updateForwardRatesRef = useRef(
    throttle(() => {
      // ✅ read directly from ref — always latest snapshot
      const pendingBatch = treasuryForwardRatesRef.current;
      if (!pendingBatch?.length) return;

      // ✅ flatten all payloads into one forwardRates array
      const allForwardRates = pendingBatch.flatMap(
        (payload) => payload.forwardRates ?? [],
      );
      if (!allForwardRates.length) return;

      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        allForwardRates.forEach((d) => {
          if (String(row.tenorID) !== String(d.tenorID)) return;

          const instrumentKey = Object.keys(row).find(
            (key) =>
              key.startsWith("InstrumentID_") &&
              String(row[key]) === String(d.instrumentID),
          );
          if (!instrumentKey) return;

          const currency = instrumentKey.replace("InstrumentID_", "");
          updatedRow[`bid_${currency}`] = d.bidWithSpread;
          updatedRow[`ask_${currency}`] = d.askWithSpread;
        });

        return updatedRow;
      });

      dataSourceRef.current = updated;
      setDataSource(updated);

      // ✅ clear after processing
      dispatch(clearTreasuryForwardRates());
    }, 100),
  );

  // Fire throttled update on new rates
  useEffect(() => {
    treasuryForwardRatesRef.current = TreasuryForwardRates;
    if (TreasuryForwardRates?.length) {
      updateForwardRatesRef.current();
    }
  }, [TreasuryForwardRates]);

  // Cancel throttle on unmount only
  useEffect(() => {
    const throttledFn = updateForwardRatesRef.current;
    return () => throttledFn.cancel();
  }, []);

  // ---------------- RENDER ----------------
  return (
    <>
      <Row className='my-3'>
        <Col sm={12} md={12} lg={12}>
          <div className='flex-fill fs-4 fw-bold color-black mb-1 ff-roboto'>
            Bank Forwards
          </div>

          <GlobalTable
            columns={columnsDataState}
            dataSource={dataSource}
            prefixCls='Treasury_Forwards'
            bordered
            pagination={false}
            rowClassName='striped-design'
            rowHoverBg='#000'
          />
        </Col>
      </Row>
    </>
  );
};

export default BankForwards;
