import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useSelector, shallowEqual } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateUTCToGMT } from "../../../../../../components/utils/timeFunction";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";

// ── Selectors ────────────────────────────────────────────────────────────────
const selectCrossInstruments = (state) =>
  state.WatchListReducer.GetAllInstrumentForTreasury?.crossInstruments;
const selectTreasuryFeed = (state) =>
  state.RealtimeActionsSlice.TreasurySpotRatesFeed;
const selectWorldCrosses = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCrosses || [];
const selectWorldCurrencies = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCurrencies || [];
const selectIsLoading = (state) =>
  state.WatchListReducer.GetBankSpotForTreasurySpinner;

// ── Stable columns (no runtime deps) ─────────────────────────────────────────
const COLUMNS = [
  {
    key: "instrument",
    title: "Instrument",
    dataIndex: "instrumentName",
    width: 80,
    className: "color-hd fw-bold title-col text-nowrap roboto-13",
    render: (_, record) => (
      <span>{`${record.instrumentName}/${record.secondaryInstrumentName}`}</span>
    ),
  },
  {
    key: "crossBid",
    title: "Bid",
    dataIndex: "worldCrossBid",
    width: 80,
    align: "center",
    render: (_, record) => (
      <span className="d-flex justify-content-center align-items-center">
        <BidAmountBox
          applyClass="BidCardBox"
          bankSpot
          BidAmountValue={record.worldCrossBid}
        />
      </span>
    ),
  },
  {
    key: "crossOffer",
    title: "Offer",
    dataIndex: "worldCrossOffer",
    width: 80,
    align: "center",
    render: (_, record) => (
      <span className="d-flex justify-content-center align-items-center">
        <BidAmountBox
          applyClass="OfferCardBox"
          bankSpot
          BidAmountValue={record.worldCrossOffer}
        />
      </span>
    ),
  },
  {
    key: "currencyInstrument",
    title: "Instrument",
    dataIndex: "instrumentName",
    width: 80,
    className: "color-hd fw-bold title-col text-nowrap roboto-13",
  },
  {
    key: "currencyBid",
    title: "Bid",
    dataIndex: "worldCurBid",
    width: 80,
    align: "center",
    render: (_, record) => (
      <span className="d-flex justify-content-center align-items-center">
        <BidAmountBox
          applyClass="BidCardBox"
          bankSpot
          BidAmountValue={record.worldCurBid}
        />
      </span>
    ),
  },
  {
    key: "currencyOffer",
    title: "Offer",
    dataIndex: "worldCurOffer",
    width: 80,
    align: "center",
    render: (_, record) => (
      <span className="d-flex justify-content-center align-items-center">
        <BidAmountBox
          applyClass="OfferCardBox"
          bankSpot
          BidAmountValue={record.worldCurOffer}
        />
      </span>
    ),
  },
  {
    key: "time",
    title: "Time",
    dataIndex: "time",
    width: 80,
    className: "roboto-13",
    render: (text) =>
      text
        ? formatDateUTCToGMT(text).toTimeString().substring(0, 8)
        : "--:--:--",
  },
];

// ── Row key: stable, no version ───────────────────────────────────────────────
const getRowKey = (record) =>
  `${record.instrumentID}-${record.secondaryInstrumentID}`;

// ── Component ─────────────────────────────────────────────────────────────────
const BankSpot = memo(() => {
  const crossInstruments = useSelector(selectCrossInstruments, shallowEqual);
  const fullFeed        = useSelector(selectTreasuryFeed);          // raw feed
  const worldCrosses    = useSelector(selectWorldCrosses, shallowEqual);
  const worldCurrencies = useSelector(selectWorldCurrencies, shallowEqual);
  const isLoading       = useSelector(selectIsLoading);

  const [processedData, setProcessedData] = useState([]);

  const rafRef      = useRef(null);
  const pendingFeed = useRef(null); // only keep the LATEST feed snapshot

  // ── Build base rows from static data ─────────────────────────────────────
  const enrichedData = useMemo(() => {
    if (!crossInstruments?.length) return [];

    return crossInstruments.map((instrument) => {
      const matchedCross = worldCrosses.find(
        (wc) =>
          wc.instrumentID === instrument.instrumentID &&
          wc.secondaryInstrumentID === instrument.secondaryInstrumentID
      );
      const matchedCurrency = worldCurrencies.find(
        (wc) => wc.instrumentID === instrument.instrumentID
      );
      const isUSD = instrument.instrumentID === 21;

      return {
        instrumentID:            instrument.instrumentID,
        secondaryInstrumentID:   instrument.secondaryInstrumentID,
        instrumentName:          instrument.instrumentName,
        secondaryInstrumentName: instrument.secondaryInstrumentName,
        time:          matchedCross?.time ?? "",
        worldCrossBid: matchedCross?.bid  ?? 0,
        worldCrossOffer: matchedCross?.offer ?? 0,
        worldCurBid:   isUSD ? (matchedCross?.bid   ?? 0) : (matchedCurrency?.bid   ?? 0),
        worldCurOffer: isUSD ? (matchedCross?.offer ?? 0) : (matchedCurrency?.offer ?? 0),
      };
    });
  }, [crossInstruments, worldCrosses, worldCurrencies]);

  // Sync enriched → processedData whenever static data changes
  useEffect(() => {
    if (enrichedData.length > 0) setProcessedData(enrichedData);
  }, [enrichedData]);

  // ── Apply a single feed snapshot to current rows ──────────────────────────
  const applyFeed = useCallback((feed, prevData) => {
    const { instrumentCrossRate: cross, instrumentParitySpot: spot } = feed;

    let changed = false;

    const next = prevData.map((item) => {
      let updated = item;

      // Cross rate update
      if (
        cross &&
        item.instrumentID === cross.instrumentID &&
        item.secondaryInstrumentID === cross.secondaryInstrumentID &&
        item.worldCrossBid !== cross.bid
      ) {
        updated = {
          ...updated,
          worldCrossBid:   cross.bid,
          worldCrossOffer: cross.ask,
          time:            cross.updateDateTime,
        };
        // Gold: cross rate also drives worldCur
        if (item.instrumentID === 21) {
          updated = { ...updated, worldCurBid: cross.bid, worldCurOffer: cross.ask };
        }
        changed = true;
      }

      // Parity spot update (non-gold)
      if (
        spot &&
        item.instrumentID === spot.instrumentID &&
        item.instrumentID !== 21 &&
        (Number(updated.worldCurBid)   !== Number(spot.bid) ||
         Number(updated.worldCurOffer) !== Number(spot.ask))
      ) {
        updated = { ...updated, worldCurBid: spot.bid, worldCurOffer: spot.ask };
        changed = true;
      }

      return updated;
    });

    return changed ? next : prevData;
  }, []);

  // ── RAF-batched feed handler ──────────────────────────────────────────────
  useEffect(() => {
    if (!fullFeed) return;

    // Always overwrite — we only ever need the latest snapshot
    pendingFeed.current = fullFeed;

    if (rafRef.current) return; // RAF already scheduled

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const feed = pendingFeed.current;
      pendingFeed.current = null;
      if (!feed) return;

      setProcessedData((prev) => applyFeed(feed, prev));
    });
  }, [fullFeed, applyFeed]);

  // Cleanup RAF on unmount
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bank-spot-container">
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      <div className="mb-2 h-100 position-relative">
        <GlobalTable
          columns={COLUMNS}           // ✅ stable reference, never re-created
          dataSource={processedData}
          rowKey={getRowKey}          // ✅ stable identity, no version thrashing
          prefixCls="BankSpot_Table"
          pagination={false}
          scroll={{ x: "max-content", y: 245 }}
          loading={isLoading}
        />
        {isLoading && <SectionLoader />}
      </div>
    </div>
  );
});

export default BankSpot;