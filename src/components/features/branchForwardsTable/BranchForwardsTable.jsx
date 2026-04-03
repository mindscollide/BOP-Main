import React, { useEffect, useMemo, useRef, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector } from "react-redux";
import CustomButton from "@/components/common/globalButton/button";
import { Col, Row } from "react-bootstrap";
import CorporateBookaForwardModal from "./CorporateBookaForwardModal/CorporateBookaForwardModal";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { throttle } from "lodash";
import { useBidOffer } from "@/context/BidOfferContext";
import { useModal } from "@/context/ModalContext";

// ---------------- CONSTANTS ----------------
const FORWARDS_TABLE_TYPE = 3;
const EMPTY_RATE_VALUE = "-"; // single convention for "no rate"

const BranchForwardsTable = () => {
  const { bidOfferStatus } = useBidOffer();
  const { allForwardApplicableTenors, isMarketOn } = useModal();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const dataSourceRef = useRef([]);
  const instrumentListRef = useRef([]);

  console.log(instrumentListRef, "dataSource in branch forwards table");

  // columnsData never changes after init — use a ref to avoid re-triggering effects
  const columnsDataRef = useRef([]);
  const [columnsDataState, setColumnsDataState] = useState([]);

  const [rfqButtonState, setRfqButtonState] = useState(null);

  // ---------------- MODAL STATE ----------------
  const [bookaForwardModalCall, setBookaForwardModalCall] = useState(false);

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);

  // ---------------- REDUX SELECTORS ----------------
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );
  const CounterPartyForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartyForwardRates
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const GetForwardRatesForCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetForwardRatesForCounterParty
  );
  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );
  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.ClearRatesData
  );
  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated
  );

  // ---------------- RFQ BUTTON STATE ----------------
  useEffect(() => {
    if (isTradeRights !== null) setRfqButtonState(JSON.parse(isTradeRights));
  }, [isTradeRights]);

  // ---------------- INITIAL TABLE BUILD ----------------
  // Runs once when instruments + tenors are ready.
  // Does NOT include allForwardApplicableTenors — tenor sync is handled
  // by its own dedicated effect below.
  useEffect(() => {
    if (
      !isTableInitialized.current &&
      getAllInstrumentsForCounterPartiesData !== null &&
      getAllTenorsRecords !== null &&
      getAllInstrumentsForCounterPartiesData !== null
    )
      try {
        const { forwardApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;

        const { forwardRates = [] } = GetForwardRatesForCounterPartyData ?? {};
        const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        const getAllInstrument = { instruments: forwardApplicableInstruments };

        instrumentListRef.current = forwardApplicableInstruments;

        const { rowData, columnsData } = buildForwardsTable(
          FORWARDS_TABLE_TYPE,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell,
          null,
          bidOfferStatus
        );

        isTableInitialized.current = true;

        if (rowData.length) {
          dataSourceRef.current = rowData;
          columnsDataRef.current = columnsData;

          setDataSource(rowData);
          setColumnsDataState(columnsData);
        }
      } catch (error) {
        console.error("Error building forwards table:", error);
      }
  }, [
    getAllInstrumentsForCounterPartiesData,
    GetForwardRatesForCounterPartyData,
    getAllTenorsRecords,
    bidOfferStatus,
  ]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  const throttledForwardUpdate = useMemo(
    () =>
      throttle((forwardRatesUpdate) => {
        const { forwardsInstrumentData } = forwardRatesUpdate;

        const updated = dataSourceRef.current.map((row) => {
          const updatedRow = { ...row };

          forwardsInstrumentData.forEach((d) => {
            if (String(row.tenorID) !== String(d.tenorID)) return;

            // Find the matching InstrumentID_XXX key for this MQTT payload
            // e.g. InstrumentID_USD = 21, d.instrumentID = 21 → currency = "USD"
            const instrumentKey = Object.keys(row).find(
              (key) =>
                key.startsWith("InstrumentID_") &&
                String(row[key]) === String(d.instrumentID)
            );

            if (!instrumentKey) return;

            // "InstrumentID_USD" → "USD"
            // "InstrumentID_CNY" → "CNY"  ✅ works for all your currencies
            const currency = instrumentKey.replace("InstrumentID_", "");

            updatedRow[`bid_${currency}`] = d.bidWithSpread;
            updatedRow[`ask_${currency}`] = d.askWithSpread;
          });

          return updatedRow;
        });

        dataSourceRef.current = updated;
        setDataSource(updated);
      }, 100),
    []
  );
  // Fire throttled update on new rates
  useEffect(() => {
    if (CounterPartyForwardRates) {
      throttledForwardUpdate(CounterPartyForwardRates);
    }
  }, [CounterPartyForwardRates, throttledForwardUpdate]);

  // Cancel throttle only on unmount — NOT on every re-run
  useEffect(() => {
    return () => throttledForwardUpdate.cancel();
  }, [throttledForwardUpdate]);

  // ---------------- TENOR SYNC ----------------
  // Adds / removes rows whenever the set of active tenors changes.
  // Runs only after the table has been initialized.
  useEffect(() => {
    if (
      !isTableInitialized.current ||
      !allForwardApplicableTenors ||
      !columnsDataRef.current.length
    )
      return;
    try {
      const activeTenors = allForwardApplicableTenors.tenors.filter(
        (t) => t.isForwardingApplicable
      );

      const activeIDs = new Set(activeTenors.map((t) => t.tenorID));

      // ✅ filter first
      const updatedRows = dataSourceRef.current.filter((row) =>
        activeIDs.has(row.tenorID)
      );

      // ✅ build existingIDs from POST-filter rows, not pre-filter
      const existingIDs = new Set(updatedRows.map((r) => r.tenorID));

      const hasRemovals = dataSourceRef.current.length !== updatedRows.length;
      const hasAdditions = activeTenors.some(
        (t) => !existingIDs.has(t.tenorID)
      );

      if (!hasRemovals && !hasAdditions) return;

      activeTenors.forEach((tenor) => {
        if (existingIDs.has(tenor.tenorID)) return;

        const previousRow = dataSourceRef.current.find(
          (r) => r.tenorID === tenor.tenorID
        );

        const referenceRow = previousRow ?? dataSourceRef.current[0] ?? null;

        let instrumentMeta = {};

        // ✅ 1. Try from existing row
        if (referenceRow) {
          instrumentMeta = Object.fromEntries(
            Object.entries(referenceRow).filter(
              ([key]) =>
                key.startsWith("InstrumentID_") ||
                key.startsWith("InstrumentName_")
            )
          );
        }

        // ✅ 2. Fallback from master instruments
        // ✅ 2. Fallback from master instruments
        // ✅ 2. Fallback from master instruments
        if (
          !Object.keys(instrumentMeta).length &&
          instrumentListRef.current.length > 0
        ) {
          instrumentMeta = {};
          instrumentListRef.current.forEach((inst) => {
            const code = inst.instrumentName;
            instrumentMeta[`InstrumentID_${code}`] = inst.instrumentID;
            instrumentMeta[`InstrumentName_${code}`] = inst.instrumentName;
            instrumentMeta[`bid_${code}`] = EMPTY_RATE_VALUE;
            instrumentMeta[`ask_${code}`] = EMPTY_RATE_VALUE;
          });
        }
        console.log(instrumentMeta, referenceRow, "instrumentMeta for new row");

        const newRow = {
          tenorID: tenor.tenorID,
          tenorName: tenor.tenorName,
          tenorDays: tenor.tenorDays,
          ...instrumentMeta, // ✅ InstrumentID_USD: 21, InstrumentName_USD: "USD" ...

          // bid/ask: inherit if re-added, else empty
          ...Object.fromEntries(
            Object.entries(referenceRow ?? {})
              .filter(
                ([key]) => key.startsWith("bid_") || key.startsWith("ask_")
              )
              .map(([key]) => [
                key,
                previousRow?.[key] !== undefined &&
                previousRow?.[key] !== EMPTY_RATE_VALUE
                  ? previousRow[key]
                  : EMPTY_RATE_VALUE,
              ])
          ),
        };

        updatedRows.push(newRow);
      });

      updatedRows.sort((a, b) => a.tenorDays - b.tenorDays);

      dataSourceRef.current = updatedRows;
      setDataSource(updatedRows);
    } catch (error) {
      console.error("Error syncing tenors in forwards table:", error);
    }
  }, [allForwardApplicableTenors]);
  // NOTE: columnsDataRef.current is a ref — intentionally not in deps.
  // columnsDataState is only here to keep the rendered columns in sync;
  // the effect reads from the ref to avoid stale closure issues.

  // ---------------- MARKET CLOSED / CLEAR RATES ----------------
  const resetRates = () => {
    const cleared = dataSourceRef.current.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedRow).forEach((key) => {
        if (key.startsWith("bid_") || key.startsWith("ask_")) {
          updatedRow[key] = EMPTY_RATE_VALUE; // consistent with new-row convention
        }
      });
      return updatedRow;
    });
    dataSourceRef.current = cleared;
    setDataSource(cleared);
  };

  useEffect(() => {
    if (isMarketOn === false || ClearRatesData?.areRatesClear) resetRates();
  }, [isMarketOn, ClearRatesData]);

  // ---------------- OPEN BOOK FORWARD MODAL ----------------
  const handleBookaForwardCorporate = () => setBookaForwardModalCall(true);

  // ---------------- RENDER ----------------
  return (
    <>
      <Row>
        <Col lg={12}>
          <GlobalTable
            columns={columnsDataState}
            dataSource={dataSource}
            prefixCls='branch_forwardsTable'
            pagination={false}
            bordered
            rowKey='tenorID'
            scroll={{ x: "max-content" }}
            rowClassName={(_, index) =>
              index % 2 === 0
                ? "branch_forwardsTable-odd"
                : "branch_forwardsTable-even"
            }
          />
        </Col>
      </Row>
      {dataSource.length !== 0 && (
        <Row className='my-2'>
          <Col lg={12} className='d-flex justify-content-center'>
            <CustomButton
              value='Book a Forward'
              applyClass='FowwardBranchBookaForwardBtn'
              onClick={handleBookaForwardCorporate}
              disabled={marketStatus === false || !rfqButtonState}
            />
          </Col>
        </Row>
      )}

      {bookaForwardModalCall && (
        <CorporateBookaForwardModal
          bookaForwardModalCall={bookaForwardModalCall}
          setBookaForwardModalCall={setBookaForwardModalCall}
        />
      )}
    </>
  );
};

export default BranchForwardsTable;
