import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import {
  clearCategorySpotClearRates,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useDispatch } from "react-redux";
import { UpdatetCategoryWiseSpotRates } from "@/store/categoryReducer/categoryReducer";

const SpotDealerAndTreasury = () => {
  const dispatch = useDispatch();
  const [spotsData, setSpotsData] = useState([]);
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

  useEffect(() => {
    if (allInstrumentForTreasuryData) {
      try {
        const { instruments = [] } =
          GetCategoryWiseSpotRatesDaata !== null &&
          GetCategoryWiseSpotRatesDaata;
        const { spotInstruments = [], crossInstruments = [] } =
          allInstrumentForTreasuryData;

        const combinedInstruments = [...spotInstruments, ...crossInstruments];

        const enrichedData = combinedInstruments.map((spotIns) => {
          const matchedInstrument = instruments.find(
            (insData) =>
              spotIns.instrumentID === insData.instrumentID &&
              spotIns.secondaryInstrumentID === insData.secondaryInstrumentID
          );

          return {
            ...spotIns,
            offer: matchedInstrument ? matchedInstrument.offer : 0,
            bid: matchedInstrument ? matchedInstrument.bid : 0,
            instrumentName: spotIns.instrumentName,
            instrumentID: spotIns.instrumentID,
            secondaryInstrumentID: spotIns.secondaryInstrumentID,
            secondaryInstrumentName: spotIns.secondaryInstrumentName,
          };
        });
        setSpotsData(enrichedData);
      } catch (error) {
        console.error("Error while setting spot data:", error);
      }
    }
  }, [GetCategoryWiseSpotRatesDaata, allInstrumentForTreasuryData]);

  useEffect(() => {
    if (!categorySpotRates) return;

    const throttledUpdate = throttle((spotRates) => {
      const { instrumentSpotData } = spotRates;

      setSpotsData((prevData) =>
        prevData.map((data) => {
          const matched = instrumentSpotData.find(
            (d) =>
              d.instrumentID === data.instrumentID &&
              d.secondaryInstrumentID === data.secondaryInstrumentID
          );

          return matched
            ? { ...data, bid: matched.bid, offer: matched.ask }
            : data;
        })
      );
    }, 20); // Update max every 300ms

    throttledUpdate(categorySpotRates);

    return () => {
      throttledUpdate.cancel();
    };
  }, [categorySpotRates]);

  useEffect(() => {
    if (marketStatus === false) {
      setSpotsData((prevData) =>
        prevData.map((data) => ({
          ...data,
          bid: 0,
          offer: 0,
        }))
      );
    }
  }, [marketStatus]);
  // For clear Rates

  useEffect(() => {
    if (ClearRatesData && ClearRatesData?.areRatesClear) {
      let Rates = GetCategoryWiseSpotRatesDaata?.instruments.map((item) =>
        item.secondaryInstrumentID === 0 ? { ...item, bid: 0, offer: 0 } : item
      );
      let newData = { ...GetCategoryWiseSpotRatesDaata, instruments: Rates };
      dispatch(UpdatetCategoryWiseSpotRates(newData));
      dispatch(clearCategorySpotClearRates(null));
    }
  }, [ClearRatesData]);

  return (
    <>
      <Row>
        {spotsData.length > 0 &&
          [...spotsData] // create a shallow copy to avoid mutating original array
            .sort((a, b) => a.instrumentID - b.instrumentID)
            .map((spotCardsData, index) => {
              return (
                <Col sm={6} md={3} className="px-1" key={index}>
                  <div className={styles["SpotBoxCard"]}>
                    <div>
                      {/* box header */}
                      <div className="mb-3">
                        <span className={styles["SpotCurrentHeading"]}>
                          {spotCardsData.instrumentName}
                        </span>
                        <span className={styles["SpotCurrentValue"]}>
                          {spotCardsData.secondaryInstrumentName}
                        </span>
                      </div>
                      {/* box content */}
                      <div className="d-flex gap-2 mt-2">
                        <Col>
                          <BidAmountBox
                            spot={true}
                            BidBoxHeading={"I Sell"}
                            BidAmountValue={spotCardsData.bid}
                            applyClass={
                              marketStatus === true
                                ? "SellCard"
                                : "SellCard_MarketOff"
                            }
                          />
                        </Col>
                        <Col>
                          <BidAmountBox
                            spot={true}
                            BidBoxHeading={"I Buy"}
                            BidAmountValue={spotCardsData.offer}
                            applyClass={
                              marketStatus === true
                                ? "BuyCard"
                                : "BuyCard_MarketOff"
                            }
                          />
                        </Col>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
      </Row>
    </>
  );
};

export default SpotDealerAndTreasury;
