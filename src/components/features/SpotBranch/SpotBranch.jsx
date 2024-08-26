import React from "react";
import "./SpotBranch.css";
import { Col, Row } from "react-bootstrap";
import BitAmountBox from "../../common/bitAmountBox/bitAmountBox";
import GlobalTable from "../../common/table/GlobalTable";
import BranchRateCardsOfWatchList from "../../common/branchWatchlistDroppableCard/branchWatchlistCard";

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
    { key: "9", instrument: "GBPPKR", bid: "355.18", offer: "355.44" },
    { key: "10", instrument: "CNYPKR", bid: "40.76", offer: "40.80" },
    { key: "11", instrument: "JPYPKR", bid: "2.0727", offer: "2.0742" },
    { key: "12", instrument: "AUDPKR", bid: "188.45", offer: "188.60" },
    { key: "13", instrument: "CHFPKR", bid: "181.24", offer: "180.09" },
  ];

  const columns = [
    {
      title: "Instrument",
      dataIndex: "instrument",
      key: "instrument",
      width: "160px",
      align: "left",
      render: (text) => <span className="instrument-column">{text}</span>,
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      width: "120px",
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
      width: "120px",
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
    <section className="sectionsporBranch">
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
                <BranchRateCardsOfWatchList
                  currencyLabel="USD PKR"
                  buyHeading="I Buy"
                  sellHeading="I Sell"
                  buyValue="208.3"
                  sellValue="208.3"
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <BranchRateCardsOfWatchList
                  currencyLabel="EUR PKR"
                  buyHeading="I Buy"
                  sellHeading="I Buy"
                  buyValue="208.3"
                  sellValue="208.3"
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <BranchRateCardsOfWatchList
                  currencyLabel="Denar PKR"
                  buyHeading="I Buy"
                  sellHeading="I Buy"
                  buyValue="208.3"
                  sellValue="208.3"
                />
              </Col>
            </Row>
            <Row className="mt-2 mb-3">
              <Col lg={4} md={4} sm={12}>
                <BranchRateCardsOfWatchList
                  currencyLabel="Quwait Denaar PKR"
                  buyHeading="I Buy"
                  sellHeading="I Buy"
                  buyValue="208.3"
                  sellValue="208.3"
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <BranchRateCardsOfWatchList
                  currencyLabel="Riyaal PKR"
                  buyHeading="I Buy"
                  sellHeading="I Buy"
                  buyValue="208.3"
                  sellValue="208.3"
                />
              </Col>
              <Col lg={4} md={4} sm={12}>
                <BranchRateCardsOfWatchList
                  currencyLabel="GBP"
                  buyHeading="I Buy"
                  sellHeading="I Buy"
                  buyValue="299.3"
                  sellValue="208.3"
                />
              </Col>
            </Row>
          </span>
        </Col>
        <Col lg={3} md={3} sm={12} className="m-0 p-0">
          <span className="WatchListOuterBox">
            <Row>
              <Col lg={7} md={7} sm={12}>
                <span className="WatchlistLabel">Watchlist</span>
              </Col>
              <Col lg={5} md={5} sm={12}>
                <span>21-11-2022 9:18 PM</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <GlobalTable
                  columns={columns}
                  dataSource={dataSource}
                  scroll={{ y: 300, x: "auto" }}
                  prefixCls={"WatchList_table"}
                  pagination={false}
                  bordered={false}
                />
              </Col>
            </Row>
          </span>
        </Col>
      </Row>
    </section>
  );
};

export default SpotBranch;
