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

// ✅ Pure selectors (no object creation here)
const selectGetAllInstrumentForTreasury = (state) =>
  state.WatchListReducer.GetAllInstrumentForTreasury?.crossInstruments;
const selectTreasurySpotRatesFeed = (state) =>
  state.RealtimeActionsSlice.TreasurySpotRatesFeed;
const selectWorldCrosses = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCrosses || [];
const selectWorldCurrencies = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCurrencies || [];
const selectTreasuryBankSpotSpinner = (state) =>
  state.WatchListReducer.GetBankSpotForTreasurySpinner;
const selectMarketStatus = (state) =>
  state.WatchListReducer.getMarketStatus;

const BankSpot = memo(() => {
  // Redux state with optimized selectors
  const crossInstruments = useSelector(
    selectGetAllInstrumentForTreasury,
    shallowEqual
  );
  const fullFeed = useSelector(selectTreasurySpotRatesFeed);
  const marketStatus = useSelector(selectMarketStatus);
  const worldCrosses = useSelector(selectWorldCrosses, shallowEqual);
  const worldCurrencies = useSelector(selectWorldCurrencies, shallowEqual);
  const isLoading = useSelector(selectTreasuryBankSpotSpinner);

  // ✅ Memoized essential feed values
  const feedEssentials = useMemo(() => {
    if (!fullFeed) return null;

    return {
      crossBid: fullFeed.instrumentCrossRate?.bid,
      crossAsk: fullFeed.instrumentCrossRate?.ask,
      crossUpdateTime: fullFeed.instrumentCrossRate?.updateDateTime,
      crossInstrumentID: fullFeed.instrumentCrossRate?.instrumentID,
      crossSecondaryID: fullFeed.instrumentCrossRate?.secondaryInstrumentID,
      spotBid: fullFeed.instrumentParitySpot?.bid,
      spotAsk: fullFeed.instrumentParitySpot?.ask,
      spotInstrumentID: fullFeed.instrumentParitySpot?.instrumentID,
    };
  }, [
    fullFeed?.instrumentCrossRate?.bid,
    fullFeed?.instrumentCrossRate?.ask,
    fullFeed?.instrumentCrossRate?.updateDateTime,
    fullFeed?.instrumentCrossRate?.instrumentID,
    fullFeed?.instrumentCrossRate?.secondaryInstrumentID,
    fullFeed?.instrumentParitySpot?.bid,
    fullFeed?.instrumentParitySpot?.ask,
    fullFeed?.instrumentParitySpot?.instrumentID,
  ]);

  // Local state for processed data
  const [processedData, setProcessedData] = useState([]);

  // Refs for batching updates
  const dataRef = useRef([]);
  const lastUpdateRef = useRef(0);
  const updateQueueRef = useRef([]);
  const animationFrameRef = useRef(null);

  // ✅ Enriched base data
  const enrichedData = useMemo(() => {
    if (!crossInstruments || !worldCrosses || !worldCurrencies) return [];

    try {
      return crossInstruments.map((instrument) => {
        const matchedCross = worldCrosses.find(
          (wc) =>
            wc.instrumentID === instrument.instrumentID &&
            wc.secondaryInstrumentID === instrument.secondaryInstrumentID
        );

        const matchedCurrency = worldCurrencies.find(
          (wc) => wc.instrumentID === instrument.instrumentID
        );

        return {
          instrumentID: instrument.instrumentID,
          secondaryInstrumentID: instrument.secondaryInstrumentID,
          instrumentName: instrument.instrumentName,
          secondaryInstrumentName: instrument.secondaryInstrumentName,
          time: matchedCross?.time ?? "",

          worldCrossBid: matchedCross?.bid ?? 0,
          worldCrossOffer: matchedCross?.offer ?? 0,
          worldCurBid:
            instrument.instrumentID === 21
              ? matchedCross?.bid ?? 0
              : matchedCurrency?.bid ?? 0,
          worldCurOffer:
            instrument.instrumentID === 21
              ? matchedCross?.offer ?? 0
              : matchedCurrency?.offer ?? 0,

          version: 0,
        };
      });
    } catch (error) {
      console.error("Error enriching data:", error);
      return [];
    }
  }, [crossInstruments, worldCrosses, worldCurrencies]);

  // Initialize processed data when enriched data changes
  useEffect(() => {
    if (enrichedData.length > 0) {
      dataRef.current = enrichedData;
      setProcessedData(enrichedData);
    }
  }, [enrichedData]);

  // ✅ Batch update function
  const processUpdateQueue = useCallback(() => {
    if (updateQueueRef.current.length === 0) {
      animationFrameRef.current = null;
      return;
    }

    const updates = updateQueueRef.current;
    updateQueueRef.current = [];

    setProcessedData((prevData) => {
      let hasChanges = false;
      const updatedData = prevData.map((item) => {
        let updatedItem = { ...item };
        let changed = false;

        updates.forEach((update) => {
          const { instrumentCrossRate, instrumentParitySpot } = update;

          if (
            instrumentCrossRate &&
            item.instrumentID === instrumentCrossRate.instrumentID &&
            item.secondaryInstrumentID ===
              instrumentCrossRate.secondaryInstrumentID
          ) {
            if (item.worldCrossBid !== instrumentCrossRate.bid) {
              updatedItem = {
                ...updatedItem,
                worldCrossBid: instrumentCrossRate.bid,
                worldCrossOffer: instrumentCrossRate.ask,
                time: instrumentCrossRate.updateDateTime,
                version: updatedItem.version + 1,
              };
              changed = true;
            }

            if (item.instrumentID === 21) {
              updatedItem = {
                ...updatedItem,
                worldCurBid: instrumentCrossRate.bid,
                worldCurOffer: instrumentCrossRate.ask,
                version: updatedItem.version + 1,
              };
              changed = true;
            }
          }

          if (
            instrumentParitySpot &&
            item.instrumentID === instrumentParitySpot.instrumentID &&
            item.instrumentID !== 21
          ) {
            if (
              Number(updatedItem.worldCurBid) !==
                Number(instrumentParitySpot.bid) ||
              Number(updatedItem.worldCurOffer) !==
                Number(instrumentParitySpot.ask)
            ) {
              updatedItem = {
                ...updatedItem,
                worldCurBid: instrumentParitySpot.bid,
                worldCurOffer: instrumentParitySpot.ask,
                version: updatedItem.version + 1,
              };
              changed = true;
            }
          }
        });

        return changed ? updatedItem : item;
      });

      hasChanges = updatedData.some(
        (newItem, index) => newItem !== prevData[index]
      );

      return hasChanges ? updatedData : prevData;
    });

    animationFrameRef.current = requestAnimationFrame(processUpdateQueue);
  }, []);

  // ✅ Queue update
  const queueUpdate = useCallback(
    (feed) => {
      if (!feed) return;

      const now = Date.now();
      if (now - lastUpdateRef.current < 16) return; // ~60fps
      lastUpdateRef.current = now;

      updateQueueRef.current.push(feed);

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(processUpdateQueue);
      }
    },
    [processUpdateQueue]
  );

  // ✅ Feed update effect
  useEffect(() => {
    if (!feedEssentials || !fullFeed) return;
    queueUpdate(fullFeed);
  }, [feedEssentials, fullFeed, queueUpdate]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Columns
  const columns = useMemo(
    () => [
      {
        key: "instrument",
        title: "Instrument",
        dataIndex: "instrumentName",
        width: 80,
        className: "color-hd fw-bold title-col text-nowrap roboto-13",
        render: (text, record) => (
          <span>{`${record?.instrumentName}/${record?.secondaryInstrumentName}`}</span>
        ),
      },
      {
        key: "crossBid",
        title: "Bid",
        dataIndex: "worldCrossBid",
        width: 80,
        align: "center",
        render: (text, record) => (
          <span className="d-flex justify-content-center align-items-center">
            <BidAmountBox
              applyClass={
                marketStatus === true ? "BidCardBox" : "BidCardBox_Disable"
              }
              bankSpot={true}
              BidAmountValue={record?.worldCrossBid}
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
        render: (text, record) => (
          <span className="d-flex justify-content-center align-items-center">
            <BidAmountBox
              applyClass={
                marketStatus === true ? "OfferCardBox" : "OfferCardBox_Disable"
              }
              bankSpot={true}
              BidAmountValue={record?.worldCrossOffer}
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
        render: (text, record) => (
          <span className="d-flex justify-content-center align-items-center">
            <BidAmountBox
              applyClass={
                marketStatus === true ? "BidCardBox" : "BidCardBox_Disable"
              }
              bankSpot={true}
              BidAmountValue={record?.worldCurBid}
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
        render: (text, record) => (
          <span className="d-flex justify-content-center align-items-center">
            <BidAmountBox
              applyClass={
                marketStatus === true ? "OfferCardBox" : "OfferCardBox_Disable"
              }
              bankSpot={true}
              BidAmountValue={record?.worldCurOffer}
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
    ],
    [marketStatus]
  );

  return (
    <div className="bank-spot-container">
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      <div className="mb-2 h-100 position-relative">
        <GlobalTable
          columns={columns}
          dataSource={processedData}
          rowKey={(record) =>
            `${record.instrumentID}-${record.secondaryInstrumentID}-${record.version}`
          }
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
