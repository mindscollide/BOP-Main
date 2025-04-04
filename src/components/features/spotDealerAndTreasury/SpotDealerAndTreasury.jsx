import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";
import { useDispatch } from "react-redux";
import { getAllCategoriesAction } from "@/components/utils/globalApis";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotDealerAndTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetAllCounterPartyData
  );
  const [spotsData, setSpotsData] = useState([]);

  useEffect(() => {
    if (getAllCounterPartyData !== null) {
      try {
        const { spreadedFXSpots } = getAllCounterPartyData;
        if (spreadedFXSpots.length > 0) {
          setSpotsData(spreadedFXSpots);
        }
      } catch (error) {}
      console.log(
        getAllCounterPartyData,
        "getAllCounterPartyDatagetAllCounterPartyData"
      );
    }
  }, [getAllCounterPartyData]);

  return (
    <>
      <Row>
        {spotsData.length > 0 &&
          spotsData.map((spotCardsData, index) => {
            return (
              <Col sm={6} md={3} className='px-1' key={spotCardsData}>
                <div className={styles["SpotBoxCard"]}>
                  <div>
                    {/*box header*/}
                    <div className='mb-3 '>
                      <span className={styles["SpotCurrentHeading"]}>
                        {spotCardsData.instrumentName.split("/")[0]}
                      </span>
                      <span className={styles["SpotCurrentValue"]}>
                        {spotCardsData.instrumentName.split("/")[1]}
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
