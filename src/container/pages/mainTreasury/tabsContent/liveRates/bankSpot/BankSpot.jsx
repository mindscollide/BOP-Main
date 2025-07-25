import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateUTCToGMT } from "../../../../../../components/utils/timeFunction";
import { useDispatch } from "react-redux";
import { isEqual, throttle } from "lodash";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";

const BankSpot = () => {
  const dispatch = useDispatch();
  // Option 1: Inline selectors
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const TreasurySpotRatesFeed = useSelector(
    (state) => state.RealtimeActionsSlice.TreasurySpotRatesFeed
  );
  const TresuaryBankSpotData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );
  const TreasuryBankSpotSpinner = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasurySpinner
  );

  // State for bank spot data
  const [bankSpotData, setBankSpotData] = useState([]);

  // Refs for previous feed and throttled function
  const prevFeedRef = useRef();
  const throttledUpdateRef = useRef();

  /**
   * Enriches instrument data with cross and currency rates
   * @param {Array} crossInstruments - List of instruments
   * @param {Object} bankSpotData - Contains worldCrosses and worldCurrencies
   * @returns {Array} Enriched data array
   */
  const enrichInstrumentData = useCallback((crossInstruments, bankSpotData) => {
    if (!crossInstruments || !bankSpotData) return [];

    const { worldCrosses = [], worldCurrencies = [] } = bankSpotData;

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

        // Bid/Offer from Cross (if available)
        worldCrossBid: matchedCross?.bid ?? 0,
        worldCrossOffer: matchedCross?.offer ?? 0,

        // Bid/Offer from Currency (if available)
        worldCurBid: matchedCurrency?.bid ?? 0,
        worldCurOffer: matchedCurrency?.offer ?? 0,
      };
    });
  }, []);

  // Effect to initialize data when TresuaryBankSpotData or instruments change
  useEffect(() => {
    if (GetAllInstrumentForTreasury && TresuaryBankSpotData) {
      const enrichedData = enrichInstrumentData(
        GetAllInstrumentForTreasury.crossInstruments,
        TresuaryBankSpotData
      );
      setBankSpotData(enrichedData);
    } else {
      setBankSpotData([]);
    }
  }, [TresuaryBankSpotData, GetAllInstrumentForTreasury, enrichInstrumentData]);

  // Effect to initialize the throttled update function
  useEffect(() => {
    /**
     * Updates bank spot data with new feed data in a throttled manner
     * @param {Object} feed - New feed data containing rates
     */
    const updateData = (feed) => {
      setBankSpotData((prevData) => {
        let isUpdated = false;
        const { instrumentCrossRate, instrumentParitySpot } = feed;

        const updatedData = prevData.map((data) => {
          const updated = { ...data };

          // Check and update instrumentCrossRate
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
            data.secondaryInstrumentID ===
              instrumentParitySpot.secondaryInstrumentID
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
    };

    // Create throttled version (5ms delay)
    throttledUpdateRef.current = throttle(updateData, 2);

    // Cleanup function to cancel any pending throttled calls
    return () => {
      if (throttledUpdateRef.current) {
        throttledUpdateRef.current.cancel();
      }
    };
  }, []);

  // Effect to handle real-time feed updates
  useEffect(() => {
    if (
      !TreasurySpotRatesFeed ||
      isEqual(prevFeedRef.current, TreasurySpotRatesFeed)
    ) {
      return;
    }

    prevFeedRef.current = TreasurySpotRatesFeed;
    throttledUpdateRef.current(TreasurySpotRatesFeed);
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
          formatDateUTCToGMT(text).toTimeString().substring(0, 8), // Format time to HH:MM:SS
      },
    ],
    []
  );

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
          dataSource={bankSpotData}
          rowKey={(record) =>
            `${record.instrumentID}-${record.secondaryInstrumentID}`
          }
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "hidden", y: 300 }}
        />
        {TreasuryBankSpotSpinner && <SectionLoader />}
      </div>
    </div>
  );
};

export default React.memo(BankSpot);
