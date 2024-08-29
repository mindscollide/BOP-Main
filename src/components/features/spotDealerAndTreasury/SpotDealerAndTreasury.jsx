import React from "react";
import { Col, Row } from "react-bootstrap";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import styles from "./spotDealerAndTreasury.module.css";

const SpotDealerAndTreasury = () => {
  const currencyData = [
    {
      code: "USD",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "EUR",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "GBP",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "JPY",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "CHF",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "CAD",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "CNY",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "CNH",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "AUD",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "SGD",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "DKK",
      sellRate: 289,
      buyRate: 288,
    },
    {
      code: "SAR",
      sellRate: 289,
      buyRate: 288,
    },
  ];

  return (
    <>
      <Row>
        {currencyData.map((spotCardsData, index) => {
          return (
            <Col sm={6} md={3} className='px-1' key={spotCardsData}>
              <div className={styles["SpotBoxCard"]}>
                <div>
                  {/*box header*/}
                  <div className='mb-3 '>
                    <span className={styles["SpotCurrentHeading"]}>
                      {spotCardsData.code}
                    </span>
                    <span className={styles["SpotCurrentValue"]}>{"PKR"}</span>
                  </div>
                  {/*box content*/}
                  <div className='d-flex gap-2 mt-2'>
                    <Col>
                      <BidAmountBox
                        spot={true}
                        BidBoxHeading={"I Sell"}
                        BidAmountValue={spotCardsData.sellRate}
                        applyClass={"SellCard"}
                      />
                    </Col>
                    <Col>
                      <BidAmountBox
                        spot={true}
                        BidBoxHeading={"I Buy"}
                        BidAmountValue={spotCardsData.buyRate}
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
