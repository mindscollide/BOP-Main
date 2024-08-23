import React from "react";
import GlobalTable from "../../common/table/GlobalTable";

const BranchDiscountingTable = () => {
  const dataSource = [
    {
      key: "1",
      tenor: "1 WEEK",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "2",
      tenor: "1 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "3",
      tenor: "2 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "4",
      tenor: "3 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "5",
      tenor: "4 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "6",
      tenor: "5 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "7",
      tenor: "6 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "8",
      tenor: "9 MONTH",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
    {
      key: "9",
      tenor: "1 YEAR",
      currentBid: "287.12",
      currentAsk: "287.29",
      lastBid: "313.74",
      lastAsk: "313.93",
      lastBidGBP: "367.72",
      lastAskGBP: "367.95",
    },
  ];

  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          width: 250,
          align: "center",
          render: (text) => {
            return <span className="ms-3">{text}</span>;
          },
        },
      ],
    },
    {
      title: "USD",
      children: [
        {
          title: "Value",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: (text) => {
            return <span className="ms-3">{text}</span>;
          },
        },
      ],
    },
    {
      title: "EUR",
      children: [
        {
          title: "Value",
          dataIndex: "lastBid",
          key: "lastBid",
          align: "center",
          render: (text) => {
            return <span className="ms-3">{text}</span>;
          },
        },
      ],
    },
    {
      title: "GBP",
      children: [
        {
          title: "Value",
          dataIndex: "lastBidGBP",
          key: "lastBidGBP",
          align: "center",
          render: (text) => {
            return <span className="ms-3">{text}</span>;
          },
        },
      ],
    },
    {
      title: "CNY",
      children: [
        {
          title: "Value",
          dataIndex: "lastBidGBP",
          key: "lastBidGBP",
          align: "center",
          render: (text) => {
            return <span className="ms-3">{text}</span>;
          },
        },
      ],
    },
  ];
  return (
    <GlobalTable
      columns={columns}
      dataSource={dataSource}
      prefixCls={"branch_forwardsTable"}
      pagination={false}
      bordered
    />
  );
};

export default BranchDiscountingTable;
