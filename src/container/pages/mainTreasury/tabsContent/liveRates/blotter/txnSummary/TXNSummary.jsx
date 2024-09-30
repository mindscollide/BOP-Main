import React from "react";
import GlobalTable from "../../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../../components/common/IconElement/IconElement";

const TXNSummary = () => {
  const tableData = [
    {
      key: "1",
      txnID: "27-08-2024/a2fe",
      client: "Test",
      side: "Buy",
      nature: "6",
      ccy1: "USD",
      amount: "123",
      rate: "288.00",
      ccy2: "PKR",
      amount2: "",
      time: "12:20 pm",
      lcNo: "2131231",
      accountNo: "123123",
      comment: "",
      status: "Accepted",
      chat: 21,
    },
    {
      key: "2",
      txnID: "27-08-2024/a2fe",
      client: "Test",
      side: "Buy",
      nature: "6",
      ccy1: "USD",
      amount: "123",
      rate: "288.00",
      ccy2: "PKR",
      amount2: "",
      time: "12:20 pm",
      lcNo: "2131231",
      accountNo: "123123",
      comment: "Test Comment",
      status: "Rejected",
      chat: 21,
    },
    {
      key: "3",
      txnID: "27-08-2024/9836",
      client: "Syed Muhammad Aun Naqvi",
      side: "Sell",
      nature: "1",
      ccy1: "USD",
      amount: "999,999",
      rate: "289.00",
      ccy2: "PKR",
      amount2: "",
      time: "19:01 pm",
      lcNo: "3142fdasfasd34214312412341234123412341234",
      accountNo: "4124141241241241241241412412412412412",
      comment: "",
      status: "Accepted",
      chat: 0,
    },
  ];

  const columns = [
    {
      key: "1",
      title: "TXN ID",
      dataIndex: "txnID",
      className: "ff-poppins fw-bold",
    },
    {
      key: "2",
      title: "Client",
      dataIndex: "client",
      className: "ff-poppins fw-bold",
    },
    {
      key: "3",
      title: "Side",
      dataIndex: "side",
      className: "ff-poppins fw-bold",
    },
    {
      key: "4",
      title: "Nature",
      dataIndex: "nature",
      className: "ff-poppins fw-bold",
    },
    {
      key: "5",
      title: "CCY1",
      dataIndex: "ccy1",
      className: "ff-poppins fw-bold",
    },
    {
      key: "6",
      title: "Amount",
      dataIndex: "amount",
      className: "ff-poppins fw-bold",
    },
    {
      key: "7",
      title: "Rate",
      dataIndex: "rate",
      className: "ff-poppins fw-bold",
    },
    {
      key: "8",
      title: "CCY2",
      dataIndex: "ccy2",
      className: "ff-poppins fw-bold",
    },
    {
      key: "9",
      title: "Amount",
      dataIndex: "amount2",
      className: "ff-poppins fw-bold",
    },
    {
      key: "10",
      title: "Time",
      dataIndex: "time",
      className: "ff-poppins fw-bold",
    },
    {
      key: "11",
      title: "LC No.",
      dataIndex: "lcNo",
      className: "ff-poppins fw-bold",
    },
    {
      key: "12",
      title: "Account No.",
      dataIndex: "accountNo",
      className: "ff-poppins fw-bold",
    },
    {
      key: "13",
      title: "Comment",
      dataIndex: "comment",
      className: "comment-class ",
      render: (text, record) => (
        <>
          {text !== "" ? (
            <span className='d-inline-block cursor-pointer'>
              <IconElement iconClass='icon-view-comment fs-5 color-blue' />
            </span>
          ) : null}
        </>
      ),
    },
    {
      key: "14",
      title: "Status",
      dataIndex: "status",
      className: "ff-poppins fw-bold",
      render: (text, record) => (
        <>
          <span className={text === "Accepted" ? "color-green" : "color-red"}>
            {text}
          </span>
        </>
      ),
    },
    {
      key: "15",
      title: "Chat",
      dataIndex: "chat",
      className: "comment-class ",
    },
  ];

  return (
    <>
      <div className='box-content-wrapper'>
        <GlobalTable
          pagination={false}
          dataSource={tableData}
          bordered={false}
          prefixCls='TXNSummary_Table'
          columns={columns}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default TXNSummary;
