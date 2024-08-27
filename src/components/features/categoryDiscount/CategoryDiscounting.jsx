import React from "react";
import GlobalTable from "../../common/table/GlobalTable";

const CategoryDiscounting = () => {
  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          align: "center",
        },
      ],
    },
    {
      title: "USD",
      children: [
        {
          title: "Value",
          dataIndex: "usdValue",
          key: "usdValue",
          align: "center",
        },
      ],
    },
    {
      title: "EUR",
      children: [
        {
          title: "Value",
          dataIndex: "eurValue",
          key: "eurValue",
          align: "center",
        },
      ],
    },
    {
      title: "GBP",
      children: [
        {
          title: "Value",
          dataIndex: "gbpValue",
          key: "gbpValue",
          align: "center",
        },
      ],
    },
    {
      title: "JPY",
      children: [
        {
          title: "Value",
          dataIndex: "jpyValue",
          key: "jpyValue",
          align: "center",
        },
      ],
    },
    {
      title: "CNY",
      children: [
        {
          title: "Value",
          dataIndex: "cnyValue",
          key: "cnyValue",
          align: "center",
        },
      ],
    },
  ];

  const data = [
    {
      key: 1,
      tenor: "1 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
    {
      key: 2,
      tenor: "2 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
    {
      key: 3,
      tenor: "3 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
    {
      key: 4,
      tenor: "4 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
    {
      key: 5,
      tenor: "5 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
    {
      key: 6,
      tenor: "6 MONTH",
      usdValue: 287.12,
      eurValue: 313.73,
      gbpValue: 367.98,
      jpyValue: 2.0251,
      cnyValue: 40.2823,
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      dataSource={data}
      prefixCls='Dealer_Discounting'
      pagination={false}
    />
  );
};

export default CategoryDiscounting;
