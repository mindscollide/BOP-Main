import React from "react";
import { Row, Col } from "react-bootstrap";
import CardImage from "./../../../assets/no-inst-icn.png";

const CardDragger = ({}) => {
  return (
    <>
      <div className="box-item mt-0 bg-Yorange-light2 no-inst-added droppable-inst">
        <div className="box-item-inner">
          <div className="box-header d-flex align-items-center">
            <div className="heading">
              <span className="fs-4 fw-bold ins-title"></span>
              <small className="fw-normal ins-subtitle"></small>
            </div>
          </div>
          <div className="box-content tab-content">
            <div className="inst-content">
              <Row className="d-flex align-items-center">
                <Col
                  className="px-1 py-2 col-rate-showcase input-col-forexdata"
                  data-target="#BuysMDForex"
                  deal-type="Deal"
                  col-type="Sell"
                >
                  <div
                    className="text-center rate-area showcase-sell p-2"
                    aria-hidden="true"
                  >
                    <div className="rate-heading fs-6">I Sell</div>
                    <div className="rate-showcase">
                      <span className="fs-6 rate"></span>
                      <span className="fs-5 fw-bold rate-decimal"></span>
                    </div>
                  </div>
                </Col>
                <Col
                  className="px-1 col-rate-showcase input-col-forexdata"
                  data-target="#BuysMDForex"
                  deal-type="Deal"
                  col-type="Buy"
                >
                  <div
                    className="text-center rate-area showcase-buy p-2"
                    aria-hidden="true"
                  >
                    <div className="rate-heading fs-6">I Buy</div>
                    <div className="rate-showcase">
                      <span className="fs-6 rate"></span>
                      <span className="fs-5 fw-bold rate-decimal"></span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="no-inst-content">
          <div className="no-inst-content-inner text-center">
            <div className="dragg-icn">
              <img src={CardImage} width={50} alt="No Instrument Icon" />
            </div>
            Drop Instrument
          </div>
        </div>
      </div>
    </>
  );
};
export default CardDragger;
