import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo
} from "react";
import { useSelector, shallowEqual } from "react-redux";
import { isEqual, throttle } from "lodash";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateUTCToGMT } from "../../../../../../components/utils/timeFunction";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";

// Memoized selectors outside component
const selectGetAllInstrumentForTreasury = state => 
  state.WatchListReducer.GetAllInstrumentForTreasury?.crossInstruments;
const selectTreasurySpotRatesFeed = state => 
  state.RealtimeActionsSlice.TreasurySpotRatesFeed;
const selectWorldCrosses = state => 
  state.WatchListReducer.GetBankSpotForTreasury?.worldCrosses || [];
const selectWorldCurrencies = state => 
  state.WatchListReducer.GetBankSpotForTreasury?.worldCurrencies || [];
const selectTreasuryBankSpotSpinner = state =>
  state.WatchListReducer.GetBankSpotForTreasurySpinner;

// Custom comparison for feed data
const isFeedDifferent = (prevFeed, newFeed) => {
  if (!prevFeed || !newFeed) return true;
  
  const prevCross = prevFeed.instrumentCrossRate;
  const newCross = newFeed.instrumentCrossRate;
  const prevSpot = prevFeed.instrumentParitySpot;
  const newSpot = newFeed.instrumentParitySpot;

  return (
    (prevCross?.bid !== newCross?.bid) ||
    (prevCross?.ask !== newCross?.ask) ||
    (prevCross?.updateDateTime !== newCross?.updateDateTime) ||
    (prevSpot?.bid !== newSpot?.bid) ||
    (prevSpot?.ask !== newSpot?.ask)
  );
};

const BankSpot = memo(() => {
  // Redux state with optimized selectors
  const crossInstruments = useSelector(selectGetAllInstrumentForTreasury, shallowEqual);
  const TreasurySpotRatesFeed = useSelector(
    selectTreasurySpotRatesFeed,
    (prev, next) => !isFeedDifferent(prev, next)
  );
  const worldCrosses = useSelector(selectWorldCrosses, shallowEqual);
  const worldCurrencies = useSelector(selectWorldCurrencies, shallowEqual);
  const isLoading = useSelector(selectTreasuryBankSpotSpinner);

  // Local state for processed data
  const [processedData, setProcessedData] = useState([]);
// Refs for throttled function and previous feed
const throttledUpdateRef = useRef();
const prevFeedRef = useRef();
  /**
   * Enriches instrument data with cross and currency rates
   * Memoized to prevent unnecessary recalculations
   */
  const enrichedData = useMemo(() => {
    if (!crossInstruments || !worldCrosses || !worldCurrencies) return [];

    return crossInstruments.map((instrument) => {
      const matchedCross = worldCrosses.find(
        wc => wc.instrumentID === instrument.instrumentID &&
              wc.secondaryInstrumentID === instrument.secondaryInstrumentID
      );

      const matchedCurrency = worldCurrencies.find(
        wc => wc.instrumentID === instrument.instrumentID
      );

      return {
        instrumentID: instrument.instrumentID,
        secondaryInstrumentID: instrument.secondaryInstrumentID,
        instrumentName: instrument.instrumentName,
        secondaryInstrumentName: instrument.secondaryInstrumentName,
        time: matchedCross?.time ?? "",

        // Bid/Offer from Cross (if available)
        worldCrossBid: matchedCross?.bid ?? 0,
        worldCrossOffer: matchedCross?.offer ?? 0,

        // Bid/Offer from Currency (if available)
        worldCurBid: matchedCurrency?.bid ?? 0,
        worldCurOffer: matchedCurrency?.offer ?? 0,
      };
    });
  }, [crossInstruments, worldCrosses, worldCurrencies]);

  // Initialize or update processed data when enriched data changes
  useEffect(() => {
    setProcessedData(enrichedData);
  }, [enrichedData]);

  /**
   * Updates bank spot data with new feed data in a throttled manner
   * Memoized to maintain reference stability
   */
  const updateData = useCallback((feed) => {
    setProcessedData(prevData => {
      let isUpdated = false;
      const { instrumentCrossRate, instrumentParitySpot } = feed;

      const updatedData = prevData.map(data => {
        const updated = { ...data };

        // Check and update instrumentCrossRate
        if (
          instrumentCrossRate &&
          data.instrumentID === instrumentCrossRate.instrumentID &&
          data.secondaryInstrumentID === instrumentCrossRate.secondaryInstrumentID
        ) {
          if (
            data.worldCrossBid !== instrumentCrossRate.bid ||
            data.worldCrossOffer !== instrumentCrossRate.ask
          ) {
            updated.worldCrossBid = instrumentCrossRate.bid;
            updated.worldCrossOffer = instrumentCrossRate.ask;
            updated.time = instrumentCrossRate.updateDateTime;
            isUpdated = true;
          }
        }

        // Check and update instrumentParitySpot
        if (
          instrumentParitySpot &&
          data.instrumentID === instrumentParitySpot.instrumentID &&
          data.secondaryInstrumentID === instrumentParitySpot.secondaryInstrumentID
        ) {
          if (
            data.worldCurBid !== instrumentParitySpot.bid ||
            data.worldCurOffer !== instrumentParitySpot.ask
          ) {
            updated.worldCurBid = instrumentParitySpot.bid;
            updated.worldCurOffer = instrumentParitySpot.ask;
            isUpdated = true;
          }
        }

        return updated;
      });

      return isUpdated ? updatedData : prevData;
    });
  }, []);

  // Initialize throttled function
  useEffect(() => {
    const throttledUpdate = throttle(updateData, 20);
    throttledUpdateRef.current = throttledUpdate;

    return () => {
      throttledUpdate.cancel();
    };
  }, [updateData]);

  // Handle real-time feed updates
  useEffect(() => {
    if (!TreasurySpotRatesFeed || !isFeedDifferent(prevFeedRef.current, TreasurySpotRatesFeed)) {
      return;
    }

    prevFeedRef.current = TreasurySpotRatesFeed;
    throttledUpdateRef.current?.(TreasurySpotRatesFeed);
  }, [TreasurySpotRatesFeed]);

  // Memoized table columns configuration
  const columns = useMemo(() => [
    {
      key: "instrument",
      title: "Instrument",
      dataIndex: "instrumentName",
      width: 80,
      className: "color-hd fw-bold title-col text-nowrap roboto-13",
      render: (text, record) => (
        <span>{`${record?.instrumentName}${record?.secondaryInstrumentName}`}</span>
      ),
    },
    {
      key: "crossBid",
      title: "Bid",
      dataIndex: "worldCrossBid",
      width: 80,
      align: "center",
      render: (text, record) => (
        <span className="d-flex justify-content-center">
          <BidAmountBox
            applyClass={"BidCardBox"}
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
        <span className="d-flex justify-content-center">
          <BidAmountBox
            applyClass={"OfferCardBox"}
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
      className: "roboto-13",
    },
    {
      key: "currencyBid",
      title: "Bid",
      dataIndex: "worldCurBid",
      width: 80,
      align: "center",
      render: (text, record) => (
        <span className="d-flex justify-content-center">
          <BidAmountBox
            applyClass={"BidCardBox"}
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
        <span className="d-flex justify-content-center">
          <BidAmountBox
            applyClass={"OfferCardBox"}
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
        formatDateUTCToGMT(text).toTimeString().substring(0, 8),
    },
  ], []);

  return (
    <div>
      {/* Header Section */}
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      {/* Table Section */}
      <div className="mb-2 h-100 position-relative">
        <GlobalTable
          columns={columns}
          dataSource={processedData}
          rowKey={(record) =>
            `${record.instrumentID}-${record.secondaryInstrumentID}`
          }
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "hidden", y: 300 }}
        />
        {/* {isLoading && <SectionLoader />} */}
      </div>
    </div>
  );
});

export default BankSpot;