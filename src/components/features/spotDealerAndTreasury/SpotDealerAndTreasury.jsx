import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";
import { clearCategorySpotClearRates } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { UpdatetCategoryWiseSpotRates } from "@/store/categoryReducer/categoryReducer";

const SpotDealerAndTreasury = () => {
  const dispatch = useDispatch();
  const [spotsData, setSpotsData] = useState([]);

  // Ref to keep latest data for throttled updates
  const spotsDataRef = useRef([]);

  // Redux selectors
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.CategorySpotClearRates
  );
  const GetCategoryWiseSpotRatesDaata = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseSpotRates
  );
  const categorySpotRates = useSelector(
    (state) => state.RealtimeActionsSlice.CategorySpotRates
  );
  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  // -------------------
  // Function to build spot data
  // -------------------
  const buildSpotData = (baseData, ratesData) => {
    // if (!baseData || !ratesData) return [];

    try {
      const instruments = ratesData?.instruments || [];
      const spotInstruments = baseData?.spotInstruments || [];
      const crossInstruments = baseData?.crossInstruments || [];

      const combinedInstruments = [...spotInstruments, ...crossInstruments];

      const enrichedData = combinedInstruments.map((spotIns) => {
        const matchedInstrument = instruments.find(
          (insData) =>
            spotIns.instrumentID === insData.instrumentID &&
            spotIns.secondaryInstrumentID === insData.secondaryInstrumentID
        );

        return {
          ...spotIns,
          bid: matchedInstrument?.bid || 0,
          offer: matchedInstrument?.offer || 0,
          instrumentName: spotIns.instrumentName,
          instrumentID: spotIns.instrumentID,
          secondaryInstrumentID: spotIns.secondaryInstrumentID,
          secondaryInstrumentName: spotIns.secondaryInstrumentName,
        };
      });

      return enrichedData;
    } catch (error) {
      console.log(error, "Error enriching spot data");
    }
  };

  // -------------------
  // INITIAL DATA POPULATION
  // -------------------
  useEffect(() => {
    if (!allInstrumentForTreasuryData || GetCategoryWiseSpotRatesDaata) return;

    const enrichedData = buildSpotData(
      allInstrumentForTreasuryData,
      GetCategoryWiseSpotRatesDaata
    );

    // Save to ref and state
    spotsDataRef.current = enrichedData;
    setSpotsData(enrichedData);
  }, [allInstrumentForTreasuryData, GetCategoryWiseSpotRatesDaata]);

  // -------------------
  // THROTTLED REAL-TIME UPDATE
  // -------------------
  const throttledUpdate = useRef(
    throttle((spotRates) => {
      const instrumentSpotData = spotRates?.instrumentSpotData || [];
      if (!instrumentSpotData.length) return;

      const updated = spotsDataRef.current.map((data) => {
        const matched = instrumentSpotData.find(
          (d) =>
            d.instrumentID === data.instrumentID &&
            d.secondaryInstrumentID === data.secondaryInstrumentID
        );
        return matched
          ? { ...data, bid: matched.bid, offer: matched.ask }
          : data;
      });

      spotsDataRef.current = updated;
      setSpotsData(updated);
    }, 50) // 50ms is smooth for UI
  ).current;

  useEffect(() => {
    if (categorySpotRates) {
      throttledUpdate(categorySpotRates);
    }
  }, [categorySpotRates, throttledUpdate]);

  // -------------------
  // MARKET OFF: Zero all bids/offers
  // -------------------
  useEffect(() => {
    if (marketStatus === false) {
      const updated = spotsDataRef.current.map((data) => ({
        ...data,
        bid: 0,
        offer: 0,
      }));
      spotsDataRef.current = updated;
      setSpotsData(updated);
    }
  }, [marketStatus]);

  // -------------------
  // CLEAR RATES: Zero out category rates
  // -------------------
  useEffect(() => {
    if (ClearRatesData?.areRatesClear && GetCategoryWiseSpotRatesDaata) {
      const rates = GetCategoryWiseSpotRatesDaata.instruments.map((item) =>
        item.secondaryInstrumentID === 0 ? { ...item, bid: 0, offer: 0 } : item
      );
      const newData = { ...GetCategoryWiseSpotRatesDaata, instruments: rates };
      dispatch(UpdatetCategoryWiseSpotRates(newData));
      dispatch(clearCategorySpotClearRates(null));
    }
  }, [ClearRatesData, GetCategoryWiseSpotRatesDaata]);

  return (
    <Row>
      {spotsData.length > 0 &&
        [...spotsData]
          .sort((a, b) => a.instrumentID - b.instrumentID)
          .map((spotCardsData, index) => (
            <Col sm={6} md={3} className='px-1' key={index}>
              <div className={styles["SpotBoxCard"]}>
                <div>
                  {/* Header */}
                  <div className='mb-3'>
                    <span className={styles["SpotCurrentHeading"]}>
                      {spotCardsData.instrumentName}
                    </span>
                    <span className={styles["SpotCurrentValue"]}>
                      {spotCardsData.secondaryInstrumentName}
                    </span>
                  </div>
                  {/* Bid/Offer Boxes */}
                  <div className='d-flex gap-2 mt-2'>
                    <Col>
                      <BidAmountBox
                        spot
                        BidBoxHeading='I Sell'
                        BidAmountValue={spotCardsData.bid}
                        applyClass={
                          marketStatus ? "SellCard" : "SellCard_MarketOff"
                        }
                      />
                    </Col>
                    <Col>
                      <BidAmountBox
                        spot
                        BidBoxHeading='I Buy'
                        BidAmountValue={spotCardsData.offer}
                        applyClass={
                          marketStatus ? "BuyCard" : "BuyCard_MarketOff"
                        }
                      />
                    </Col>
                  </div>
                </div>
              </div>
            </Col>
          ))}
    </Row>
  );
};

export default SpotDealerAndTreasury;
