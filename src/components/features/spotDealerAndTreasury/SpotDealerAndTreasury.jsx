import React from "react";
import { Col, Row } from "react-bootstrap";
import BitAmountBox from "../../common/bitAmountBox/bitAmountBox";

const SpotDealerAndTreasury = () => {
  return (
    <div className='col-md-3 col-sm-6 px-1'>
      <div className='box-item bg-white mt-0'>
        <div>
          {/*box header*/}
          <div className='box-header d-flex align-items-center'>
            <div className='heading'>
              <span className='fs-4 fw-bold ins-title'>USD</span>
              <small className='fw-normal ins-subtitle'>PKR</small>
            </div>
          </div>
          {/*box content*/}
          {/*USD spot item*/}
          <Row className="mt-2">
            <Col sm={6} md={6} lg={6}>
              <BitAmountBox
                spot={true}
                BitBoxHeading={"I Sell"}
                BitAmountValue={"289.00"}
                applyClass={"SellCard"}
              />
            </Col>
            <Col sm={6} md={6} lg={6} className="">
              <BitAmountBox
                spot={true}
                BitBoxHeading={"I Buy"}
                BitAmountValue={"289.00"}
                applyClass={"BuyCard"}
              />
            </Col>
          </Row>

          {/* <div
              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
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
                  <span className="fs-6 rate">289.</span>
                  <span className="fs-5 fw-bold rate-decimal">00</span>
                </div>
              </div> */}
          {/* </div> */}
          {/* <div
              className="col px-1 col-rate-showcase input-col-forexdata"
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
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default SpotDealerAndTreasury;
