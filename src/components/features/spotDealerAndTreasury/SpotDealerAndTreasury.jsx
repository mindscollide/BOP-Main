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
      GetCategoryWiseSpotRatesDaata?.instruments?.length &&
      allInstrumentForTreasuryData
    ) {
      try {
        const { instruments } = GetCategoryWiseSpotRatesDaata;
        const {
          spotInstruments = [],
          crossInstruments = [],
        } = allInstrumentForTreasuryData;
  
        const combinedInstruments = [...spotInstruments, ...crossInstruments];
  
        const enrichedData = instruments
          .map((spotIns) => {
            const matchedInstrument = combinedInstruments.find(
              (insData) =>
                spotIns.instrumentID === insData.instrumentID &&
                spotIns.secondaryInstrumentID === insData.secondaryInstrumentID
            );
  
            return matchedInstrument
              ? {
                  ...spotIns,
                  offer: spotIns.offer,
                  bid: spotIns.bid,
                  instrumentName: matchedInstrument.instrumentName,
                  instrumentID: matchedInstrument.instrumentID,
                  secondaryInstrumentID: matchedInstrument.secondaryInstrumentID,
                  secondaryInstrumentName: matchedInstrument.secondaryInstrumentName,
                }
              : null;
          })
          .filter(Boolean);
  
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
