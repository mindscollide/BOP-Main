import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import CardImage from "./../../../assets/no-inst-icn.png";

const CardDraggerValues = ({}) => {
  return (
    <>
      <div className="box-item bg-warning-light2 mt-0 droppable-inst ui-droppable">
        <div className="box-item-inner">
          {/* Box Header */}
          <div className="box-header d-flex align-items-center">
            <div className="heading">
              <span className="fs-4 fw-bold ins-title">USD</span>
              <small className="fw-normal ins-subtitle">PKR</small>
            </div>
          </div>
          {/* Box Content */}
          <div className="box-content tab-content">
            {/* USD spot item */}
            <div className="inst-content">
              <Row className="padding-x-10 align-items-center">
                <Col className="px-1 py-2 input-col-forexdata">
                  <div
                    className="text-center rate-area showcase-sell p-2"
                    aria-hidden="true"
                  >
                    <div className="rate-heading fs-6">I Sell</div>
                    <div className="rate-showcase">
                      <span className="fs-6 rate">289.</span>
                      <span className="fs-5 fw-bold rate-decimal">00</span>
                    </div>
                  </div>
                </Col>
                <Col
                  className="px-1 input-col-forexdata"
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
                      <span className="fs-6 rate">288.</span>
                      <span className="fs-5 fw-bold rate-decimal">00</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {/* No Instrument Content */}
        <div className="no-inst-content" style={{ display: "none" }}>
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
export default CardDraggerValues;
