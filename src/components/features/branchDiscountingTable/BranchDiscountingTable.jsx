import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";

const BranchDiscountingTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([])
  

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
            return <span className='ms-3'>{text}</span>;
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
            return <span className='ms-3'>{text}</span>;
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
            return <span className='ms-3'>{text}</span>;
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
            return <span className='ms-3'>{text}</span>;
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
            return <span className='ms-3'>{text}</span>;
          },
        },
      ],
    },
  ];
  useEffect(() => {
    const { discountRates } = generateData(1);
  
      if (discountRates.length > 0) {
        setDataSource(discountRates)
        const forwardsColumns = createColumns(discountRates, 1);
        setColumnsData(forwardsColumns);
    
      
      }
    }, [])
  return (
    <GlobalTable
      columns={columnsData}
      dataSource={dataSource}
      prefixCls={"branch_forwardsTable"}
      pagination={false}
      bordered
      rowClassName={(record, index) =>
        index % 2 === 0
          ? "branch_forwardsTable-odd"
          : "branch_forwardsTable-even"
      }
    />
  );
};

export default BranchDiscountingTable;
