import React from "react";
import GlobalTable from "../../common/table/GlobalTable";

const CategoryForwards = () => {
  // Define the data source for the Ant Design Table
  const dataSource = [
    {
      key: "1",
      tenor: "ON",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "2",
      tenor: "1 WEEK",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    // Add more rows as needed
    {
      key: "3",
      tenor: "3 WEEK",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "4",
      tenor: "1 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "5",
      tenor: "3 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "6",
      tenor: "6 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
  ];

  // Define the columns structure for the Ant Design Table
  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",

      children: [
        {
          title: "",
        },
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          fixed: "left", // Optional: to fix the column on the left
          width: 280,
        },
      ],
    },
    {
      title: "USD",
      children: [
        {
          title: "Bid",
          dataIndex: "usdBid",
          key: "usdBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "usdAsk",
          key: "usdAsk",
          width: 100,
        },
      ],
    },
    {
      title: "EUR",
      children: [
        {
          title: "Bid",
          dataIndex: "eurBid",
          key: "eurBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "eurAsk",
          key: "eurAsk",
          width: 100,
        },
      ],
    },
    {
      title: "GBP",
      children: [
        {
          title: "Bid",
          dataIndex: "gbpBid",
          key: "gbpBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "gbpAsk",
          key: "gbpAsk",
          width: 100,
        },
      ],
    },
    {
      title: "JPY",
      children: [
        {
          title: "Bid",
          dataIndex: "jpyBid",
          key: "jpyBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "jpyAsk",
          key: "jpyAsk",
          width: 100,
        },
      ],
    },
    {
      title: "CNY",
      children: [
        {
          title: "Bid",
          dataIndex: "cnyBid",
          key: "cnyBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "cnyAsk",
          key: "cnyAsk",
          width: 100,
        },
      ],
    },
    {
      title: "CHF",
      children: [
        {
          title: "Bid",
          dataIndex: "chfBid",
          key: "chfBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "chfAsk",
          key: "chfAsk",
          width: 100,
        },
      ],
    },
    {
      title: "CAD",
      children: [
        {
          title: "Bid",
          dataIndex: "cadBid",
          key: "cadBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "cadAsk",
          key: "cadAsk",
          width: 100,
        },
      ],
    },
    {
      title: "CNH",
      children: [
        {
          title: "Bid",
          dataIndex: "cnhBid",
          key: "cnhBid",
          width: 100,
        },
        {
          title: "Ask",
          dataIndex: "cnhAsk",
          key: "cnhAsk",
          width: 100,
        },
      ],
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      prefixCls='Dealer_Forwards'
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default CategoryForwards;
