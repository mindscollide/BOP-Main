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

  useEffect(() => {
    if (
      GetCategoryWiseSpotRatesDaata !== null &&
      allInstrumentForTreasuryData !== null
    ) {
      try {
        const { instruments } = GetCategoryWiseSpotRatesDaata;
        const { spotInstruments } = allInstrumentForTreasuryData;

        if (instruments.length > 0) {
          const spotData = instruments
            .map((spotIns) => {
              const matchedInstrument = spotInstruments.find(
                (insData) =>
                  spotIns.instrumentID === insData.instrumentID &&
                  spotIns.secondaryInstrumentID ===
                    insData.secondaryInstrumentID
              );

              if (matchedInstrument) {
                return {
                  ...spotIns,
                  offer: spotIns.offer, // as expected by UI
                  bid: spotIns.bid,
                  instrumentName: `${matchedInstrument.instrumentName}`, // e.g. EURUSD
                  instrumentID: matchedInstrument.instrumentID,
                  secondaryInstrumentID:
                    matchedInstrument.secondaryInstrumentID,
                  secondaryInstrumentName:
                    matchedInstrument.secondaryInstrumentName,
                };
              }

              return null; // return null if no match found
            })
            .filter(Boolean); // remove null entries

          setSpotsData(spotData); // Apply the data to state
        }
      } catch (error) {}
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
    }, 300); // Update max every 300ms

    throttledUpdate(categorySpotRates);

    return () => {
      throttledUpdate.cancel();
    };
  }, [categorySpotRates]);

  return (
    <>
      <Row>
        {spotsData.length > 0 &&
          spotsData.map((spotCardsData, index) => {
            return (
              <Col sm={6} md={3} className='px-1'>
                <div
                  className={styles["SpotBoxCard"]}
                  key={spotCardsData.instrumentID}>
                  <div>
                    {/*box header*/}
                    <div className='mb-3'>
                      <span className={styles["SpotCurrentHeading"]}>
                        {spotCardsData.instrumentName}
                      </span>
                      <span className={styles["SpotCurrentValue"]}>
                        {spotCardsData.secondaryInstrumentName}
                      </span>
                    </div>
                    {/*box content*/}
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
