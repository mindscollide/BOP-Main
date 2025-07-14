import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotDealerAndTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [spotsData, setSpotsData] = useState([]);
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const GetCategoryWiseSpotRatesDaata = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseSpotRates
  );

  useEffect(() => {
    if (
      GetCategoryWiseSpotRatesDaata !== null &&
      allInstrumentForTreasuryData !== null
    ) {
      try {
        const { instruments } = GetCategoryWiseSpotRatesDaata;
        const { spotInstruments } = allInstrumentForTreasuryData;

        console.log(
          {
            GetCategoryWiseSpotRatesDaata: instruments,
            allInstrumentForTreasuryData: spotInstruments,
          },
          "datadatatatata"
        );

        if (instruments.length > 0) {
          const spotData = instruments
            .map((spotIns) => {
              const matchedInstrument = spotInstruments.find(
                (insData) => spotIns.instrumentID === insData.instrumentID
              );

              console.log(
                { matchedInstrument, instruments, spotInstruments },
                "matchedInstrument"
              );

              if (matchedInstrument) {
                return {
                  ...spotIns,
                  offer: spotIns.offer, // as expected by UI
                  bid: spotIns.bid,
                  instrumentName: `${matchedInstrument.instrumentName}${matchedInstrument.secondaryInstrumentName}`, // e.g. EURUSD
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
  console.log(spotsData, "spotDataspotData");
  // useEffect(() => {
  //   if (
  //     GetCategoryWiseSpotRatesDaata !== null &&
  //     allInstrumentForTreasuryData !== null
  //   ) {
  //     try {
  //       const { instruments } = GetCategoryWiseSpotRatesDaata;
  //       const { spotInstruments } = allInstrumentForTreasuryData;

  //       console.log(
  //         {
  //           GetCategoryWiseSpotRatesDaata: instruments,
  //           allInstrumentForTreasuryData: spotInstruments,
  //         },
  //         "datadatatatata"
  //       );

  //       if (spotInstruments.length > 0) {
  //         const spotData = instruments
  //           .map((spotIns) => {
  //             const matchedInstrument = spotInstruments.find(
  //               (insData) =>
  //                 spotIns.instrumentID === insData.instrumentID &&
  //                 spotIns.secondaryInstrumentID ===
  //                   insData.secondaryInstrumentID
  //             );

  //             if (matchedInstrument) {
  //               return {
  //                 ...spotIns,
  //                 instrumentName: `${matchedInstrument.instrumentName}${matchedInstrument.secondaryInstrumentName}`, // "EURUSD"
  //                 offer: spotIns.offer,
  //                 bid: spotIns.bid,
  //               };
  //             }

  //             return null;
  //           })
  //           .filter(Boolean);

  //         setSpotsData(spotData);
  //       }
  //     } catch (error) {
  //       console.error("Error processing spot data:", error);
  //     }
  //   }
  // }, [GetCategoryWiseSpotRatesDaata, allInstrumentForTreasuryData]);

  return (
    <>
      <Row>
        {spotsData.length > 0 &&
          spotsData.map((spotCardsData, index) => {
            return (
              <Col sm={6} md={3} className="px-1" key={spotCardsData}>
                <div className={styles["SpotBoxCard"]}>
                  <div>
                    {/*box header*/}
                    <div className="mb-3 ">
                      <span className={styles["SpotCurrentHeading"]}>
                        {spotCardsData.instrumentName.split("/")[0]}
                      </span>
                      <span className={styles["SpotCurrentValue"]}>
                        {spotCardsData.instrumentName.split("/")[1]}
                      </span>
                    </div>
                    {/*box content*/}
                    <div className="d-flex gap-2 mt-2">
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
