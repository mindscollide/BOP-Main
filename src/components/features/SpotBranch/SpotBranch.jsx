import React from "react";
import "./SpotBranch.css";
import { Col, Row } from "react-bootstrap";
import BitAmountBox from "../../common/bitAmountBox/bitAmountBox";
import GlobalTable from "../../common/table/GlobalTable";

const SpotBranch = () => {
  const dataSource = [
    { key: "1", instrument: "USDPKR", bid: "288.00", offer: "289.00" },
    { key: "2", instrument: "EURPKR", bid: "308.60", offer: "308.85" },
    { key: "3", instrument: "EUR", bid: "308.60", offer: "308.85" },
    { key: "4", instrument: "GBPPKR", bid: "355.18", offer: "355.44" },
    { key: "5", instrument: "CNYPKR", bid: "40.76", offer: "40.80" },
    { key: "6", instrument: "JPYPKR", bid: "2.0727", offer: "2.0742" },
    { key: "7", instrument: "AUDPKR", bid: "188.45", offer: "188.60" },
    { key: "8", instrument: "CHFPKR", bid: "181.24", offer: "180.09" },
  ];

  const columns = [
    {
      title: "Instrument",
      dataIndex: "instrument",
      key: "instrument",
      align: "left",
      render: (text) => <span className="instrument-column">{text}</span>,
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      align: "center",
      render: (text) => (
        <>
          <div className="d-flex justify-content-center">
            <BitAmountBox
              spot={false}
              BitAmountValue={text}
              applyClass={"BitCardBox"}
            />
          </div>
        </>
      ),
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      align: "center",
      render: (text) => (
        <>
          <div className="d-flex justify-content-center">
            <BitAmountBox
              spot={false}
              BitAmountValue={text}
              applyClass={"OfferCardBox"}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="px-3">
      <Row>
        <Col lg={9} md={9} sm={12}>
          <span className="FxTradingOuterBox">
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <span className="FxTradingLabel">FX Trading</span>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">USD PKR</span>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Buy"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">USD PKR</span>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Buy"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Buy"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">EUR PKR</span>
                    </Col>
                  </Row>{" "}
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Buy"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Buy"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
            </Row>
            <Row className="mt-2 mb-3">
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">CHF PKR</span>
                    </Col>
                  </Row>{" "}
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">CNY PKR</span>
                    </Col>
                  </Row>{" "}
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <span className="DroppableBox">
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className="DroppableBoxCurrencyLabel">GBP PKR</span>
                    </Col>
                  </Row>{" "}
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <BitAmountBox
                        spot={true}
                        BitBoxHeading={"I Sell"}
                        BitAmountValue={"208.3"}
                        applyClass={"SellandBuyCardBracnh"}
                      />
                    </Col>
                  </Row>
                </span>
              </Col>
            </Row>
          </span>
        </Col>
        <Col lg={3} md={3} sm={12}>
          <span className="WatchListOuterBox">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className="WatchlistLabel">Watchlist</span>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <span>21-11-2022 9:18 PM</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <GlobalTable
                  columns={columns}
                  dataSource={dataSource}
                  prefixCls={"WatchList_table"}
                  pagination={false}
                  bordered={false}
                />
              </Col>
            </Row>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default SpotBranch;
