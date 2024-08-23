import React from "react";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import CustomButton from "../../common/globalButton/button";
import IconElement from "../../common/IconElement/IconElement";
const BranchForwardsTable = () => {
  const dataSource = [
    { key: "1", tenor: "O N" },
    { key: "2", tenor: "1 WEEK" },
    { key: "3", tenor: "2 WEEK" },
    { key: "4", tenor: "1 MONTH" },
    { key: "5", tenor: "2 MONTH" },
    { key: "6", tenor: "3 MONTH" },
    { key: "7", tenor: "4 MONTH" },
    { key: "8", tenor: "5 MONTH" },
    { key: "9", tenor: "6 MONTH" },
    { key: "10", tenor: "7 MONTH" },
    { key: "11", tenor: "8 MONTH" },
    { key: "12", tenor: "9 MONTH" },
    { key: "13", tenor: "10 MONTH" },
    { key: "14", tenor: "11 MONTH" },
    { key: "15", tenor: "1 YEAR" },
    { key: "16", tenor: "8 DAY" },
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
          title: "Bid",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
        },
        {
          title: "Ask",
          dataIndex: "currentAsk",
          key: "currentAsk",
          align: "center",

          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
        },
      ],
    },
    {
      title: "EUR",
      children: [
        {
          title: "Bid",
          dataIndex: "lastBid",
          key: "lastBid",
          align: "center",

          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
        },
        {
          title: "Ask",
          dataIndex: "lastAsk",
          key: "lastAsk",
          align: "center",

          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
        },
      ],
    },
    {
      title: "GBP",
      key: "",

      children: [
        {
          title: "Bid",
          dataIndex: "lastBid",
          key: "lastBid",
          align: "center",

          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
        },
        {
          title: "Ask",
          dataIndex: "lastAsk",
          key: "lastAsk",
          align: "center",

          render: () => (
            <InputFIeld type="number" applyClass={"DealerTableBitInput"} />
          ),
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

export default BranchForwardsTable;
