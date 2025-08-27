import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  startTransition,
  memo,
} from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual } from "react-redux";
import { isEqual, throttle } from "lodash";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateUTCToGMT } from "../../../../../../components/utils/timeFunction";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";

// Memoized selectors outside component
const selectGetAllInstrumentForTreasury = (state) =>
  state.WatchListReducer.GetAllInstrumentForTreasury?.crossInstruments;
const selectedTreasurySpotRatesFeed = (state) =>
  state.RealtimeActionsSlice.TreasurySpotRatesFeed;
const selectWorldCrosses = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCrosses || [];
const selectWorldCurrencies = (state) =>
  state.WatchListReducer.GetBankSpotForTreasury?.worldCurrencies || [];
const selectTreasuryBankSpotSpinner = (state) =>
  state.WatchListReducer.GetBankSpotForTreasurySpinner;

// Custom comparison for feed data
const isFeedDifferent = (prevFeed, newFeed) => {
  if (!prevFeed || !newFeed) return true;
  if (prevFeed === newFeed) return false;

  const prevCross = prevFeed.instrumentCrossRate;
  const newCross = newFeed.instrumentCrossRate;
  const prevSpot = prevFeed.instrumentParitySpot;
  const newSpot = newFeed.instrumentParitySpot;

  return (
    prevCross?.bid !== newCross?.bid ||
    prevCross?.ask !== newCross?.ask ||
    prevCross?.updateDateTime !== newCross?.updateDateTime ||
    prevSpot?.bid !== newSpot?.bid ||
    prevSpot?.ask !== newSpot?.ask
  );
};

const BankSpot = memo(() => {
  // Redux state with optimized selectors
  const crossInstruments = useSelector(
    selectGetAllInstrumentForTreasury,
    shallowEqual
  );
  const TreasurySpotRatesFeed = useSelector(
    selectedTreasurySpotRatesFeed,
    (prev, next) => !isFeedDifferent(prev, next)
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );
  const worldCrosses = useSelector(selectWorldCrosses, shallowEqual);
  const worldCurrencies = useSelector(selectWorldCurrencies, shallowEqual);
  const isLoading = useSelector(selectTreasuryBankSpotSpinner);

  // Local state for processed data
  const [processedData, setProcessedData] = useState([]);
  // Refs for throttled function and previous feed
  const throttledUpdateRef = useRef();
  const prevFeedRef = useRef(TreasurySpotRatesFeed);

  /**
   * Safely enriches instrument data with cross and currency rates
   */
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
          worldCurBid: matchedCurrency?.bid ?? 0,
          worldCurOffer: matchedCurrency?.offer ?? 0,
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
      setProcessedData(enrichedData);
    }
  }, [enrichedData]);

  /**
   * Updates bank spot data with new feed data
   */
  const updateData = useCallback((feed) => {
    if (!feed) return;

    try {
      startTransition(() => {
        setProcessedData((prevData) => {
          const { instrumentCrossRate, instrumentParitySpot } = feed;
          let hasUpdates = false;

          const updatedData = prevData.map((data) => {
            const updatedItem = { ...data };

            // Update cross rates
            if (
              instrumentCrossRate &&
              data.instrumentID === instrumentCrossRate.instrumentID &&
              data.secondaryInstrumentID ===
                instrumentCrossRate.secondaryInstrumentID
            ) {
              if (
                data.worldCrossBid !== instrumentCrossRate.bid ||
                data.worldCrossOffer !== instrumentCrossRate.ask
              ) {
                updatedItem.worldCrossBid = instrumentCrossRate.bid;
                updatedItem.worldCrossOffer = instrumentCrossRate.ask;
                updatedItem.time = instrumentCrossRate.updateDateTime;
                hasUpdates = true;
              }
            }
            // Update spot rates
            if (
              instrumentParitySpot &&
              data.instrumentID === instrumentParitySpot.instrumentID
            ) {
              if (
                Number(data.worldCurBid) !== Number(instrumentParitySpot.bid) ||
                Number(data.worldCurOffer) !== Number(instrumentParitySpot.ask)
              ) {
                updatedItem.worldCurBid = instrumentParitySpot.bid;
                updatedItem.worldCurOffer = instrumentParitySpot.ask;
                hasUpdates = true;
              }
            }

            return updatedItem;
          });

          return hasUpdates ? updatedData : prevData;
        });
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }, []);

  // Initialize and cleanup throttled function
  useEffect(() => {
    const throttledUpdate = throttle(updateData, 40, {
      leading: true,
      trailing: true,
    });
    throttledUpdateRef.current = throttledUpdate;

    return () => {
      throttledUpdate.cancel();
      throttledUpdateRef.current = null;
    };
  }, [updateData]);

  // Handle real-time feed updates
  useEffect(() => {
    if (!isFeedDifferent(prevFeedRef.current, TreasurySpotRatesFeed)) {
      return;
    }

    prevFeedRef.current = TreasurySpotRatesFeed;

    startTransition(() => {
      throttledUpdateRef.current?.(TreasurySpotRatesFeed);
    });
  }, [TreasurySpotRatesFeed]);

  // Memoized table columns configuration
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
        className: "roboto-13",
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
            `${record.instrumentID}-${record.secondaryInstrumentID}`
          }
          prefixCls="BankSpot_Table"
          pagination={false}
          scroll={{ x: "hidden", y: 245 }}
          loading={isLoading}
        />
        {isLoading && <SectionLoader />}
      </div>
    </div>
  );
});

BankSpot.propTypes = {
  // Add prop types if this component receives any props
};

export default BankSpot;
