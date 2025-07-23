import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";
import { useSelector } from "react-redux";
import { throttle } from "lodash";

const SpotDealerAndTreasury = () => {
  const [spotsData, setSpotsData] = useState([]);
  console.log(spotsData, "spotsDataspotsData");
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const GetCategoryWiseSpotRatesDaata = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseSpotRates
  );

  const categorySpotRates = useSelector(
    (state) => state.RealtimeActionsSlice.CategorySpotRates
  );
  console.log(
    GetCategoryWiseSpotRatesDaata,
    "GetCategoryWiseSpotRatesDaataGetCategoryWiseSpotRatesDaata"
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
            offer: matchedInstrument ? spotIns.offer : 0,
            bid: matchedInstrument ? spotIns.bid : 0,
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
    }); // Update max every 300ms

    throttledUpdate(categorySpotRates);

    return () => {
      throttledUpdate.cancel();
    };
  }, [categorySpotRates]);

  return (
    <>
      <Row>
        {spotsData.length > 0 &&
          [...spotsData] // create a shallow copy to avoid mutating original array
            .sort((a, b) => a.instrumentID - b.instrumentID)
            .map((spotCardsData, index) => {
              return (
                <Col
                  sm={6}
                  md={3}
                  className='px-1'
                  key={spotCardsData.instrumentID}>
                  <div className={styles["SpotBoxCard"]}>
                    <div>
                      {/* box header */}
                      <div className='mb-3'>
                        <span className={styles["SpotCurrentHeading"]}>
                          {spotCardsData.instrumentName}
                        </span>
                        <span className={styles["SpotCurrentValue"]}>
                          {spotCardsData.secondaryInstrumentName}
                        </span>
                      </div>
                      {/* box content */}
                      <div className='d-flex gap-2 mt-2'>
                        <Col>
                          <BidAmountBox
                            spot={true}
                            BidBoxHeading={"I Sell"}
                            BidAmountValue={spotCardsData.offer}
                            applyClass={"SellCard"}
                          />
                        </Col>
                        <Col>
                          <BidAmountBox
                            spot={true}
                            BidBoxHeading={"I Buy"}
                            BidAmountValue={spotCardsData.bid}
                            applyClass={"BuyCard"}
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
