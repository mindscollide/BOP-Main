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

// ── Selectors ─────────────────────────────────────────────────────────────────
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

// ── Stable columns (defined once, never re-created) ───────────────────────────
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

// ── Stable row key (no version — avoids DOM thrashing) ────────────────────────
const getRowKey = (record) =>
  `${record.instrumentID}-${record.secondaryInstrumentID}`;

// ── Component ─────────────────────────────────────────────────────────────────
const BankSpot = memo(() => {
  const crossInstruments = useSelector(selectCrossInstruments, shallowEqual);
  const fullFeed         = useSelector(selectTreasuryFeed);
  const worldCrosses     = useSelector(selectWorldCrosses, shallowEqual);
  const worldCurrencies  = useSelector(selectWorldCurrencies, shallowEqual);
  const isLoading        = useSelector(selectIsLoading);

  const [processedData, setProcessedData] = useState([]);

  const rafRef      = useRef(null);
  const pendingFeed = useRef(null);
  const lastFeedRef = useRef(null); // ✅ tracks last applied feed values for diffing

  // ── Build base rows from static Redux data ────────────────────────────────
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
      const isGold = instrument.instrumentID === 21;

      return {
        instrumentID:            instrument.instrumentID,
        secondaryInstrumentID:   instrument.secondaryInstrumentID,
        instrumentName:          instrument.instrumentName,
        secondaryInstrumentName: instrument.secondaryInstrumentName,
        time:            matchedCross?.time  ?? "",
        worldCrossBid:   matchedCross?.bid   ?? 0,
        worldCrossOffer: matchedCross?.offer ?? 0,
        worldCurBid:     isGold ? (matchedCross?.bid   ?? 0) : (matchedCurrency?.bid   ?? 0),
        worldCurOffer:   isGold ? (matchedCross?.offer ?? 0) : (matchedCurrency?.offer ?? 0),
      };
    });
  }, [crossInstruments, worldCrosses, worldCurrencies]);

  // Sync enriched base data → processedData (static data changes only)
  useEffect(() => {
    if (enrichedData.length > 0) {
      lastFeedRef.current = null; // ✅ reset feed diff tracker on base data change
      setProcessedData(enrichedData);
    }
  }, [enrichedData]);

  // ── Pure feed applier — returns prevData (same ref) if nothing changed ────
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
        // Gold: cross rate also drives worldCur fields
        if (item.instrumentID === 21) {
          updated = {
            ...updated,
            worldCurBid:   cross.bid,
            worldCurOffer: cross.ask,
          };
        }
        changed = true;
      }

      // Parity spot update (non-gold only)
      if (
        spot &&
        item.instrumentID === spot.instrumentID &&
        item.instrumentID !== 21 &&
        (Number(updated.worldCurBid)   !== Number(spot.bid) ||
         Number(updated.worldCurOffer) !== Number(spot.ask))
      ) {
        updated = {
          ...updated,
          worldCurBid:   spot.bid,
          worldCurOffer: spot.ask,
        };
        changed = true;
      }

      return updated;
    });

    // ✅ Same reference = React skips re-render entirely
    return changed ? next : prevData;
  }, []);

  // ── RAF-batched feed effect with value-level diffing ──────────────────────
  useEffect(() => {
    if (!fullFeed) return;

    const cross = fullFeed.instrumentCrossRate;
    const spot  = fullFeed.instrumentParitySpot;
    const last  = lastFeedRef.current;

    // ✅ Bail out if all tracked values are identical to last applied feed
    //    This is the primary guard against the "Maximum update depth exceeded" loop:
    //    Redux may emit a new fullFeed object reference even when values haven't
    //    changed, which would otherwise re-trigger this effect every render.
    if (
      last &&
      last.crossBid   === cross?.bid &&
      last.crossAsk   === cross?.ask &&
      last.crossID    === cross?.instrumentID &&
      last.crossSecID === cross?.secondaryInstrumentID &&
      last.crossTime  === cross?.updateDateTime &&
      last.spotBid    === spot?.bid &&
      last.spotAsk    === spot?.ask &&
      last.spotID     === spot?.instrumentID
    ) {
      return;
    }

    // ✅ Snapshot values for next render's diff
    lastFeedRef.current = {
      crossBid:   cross?.bid,
      crossAsk:   cross?.ask,
      crossID:    cross?.instrumentID,
      crossSecID: cross?.secondaryInstrumentID,
      crossTime:  cross?.updateDateTime,
      spotBid:    spot?.bid,
      spotAsk:    spot?.ask,
      spotID:     spot?.instrumentID,
    };

    // ✅ Always overwrite — only the latest feed snapshot matters
    pendingFeed.current = fullFeed;

    // ✅ Only schedule one RAF per frame
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const feed = pendingFeed.current;
      pendingFeed.current = null;
      if (!feed) return;

      setProcessedData((prev) => applyFeed(feed, prev));
    });
  }, [fullFeed, applyFeed]);

  // ── Cleanup RAF on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="bank-spot-container">
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      <div className="mb-2 h-100 position-relative">
        <GlobalTable
          columns={COLUMNS}
          dataSource={processedData}
          rowKey={getRowKey}
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