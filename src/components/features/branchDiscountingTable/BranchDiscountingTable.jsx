import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllFowardsAndDiscountsRatesAPI } from "../SpotBranch/WatchlistAction";
import { useSelector } from "react-redux";

const BranchDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //local states
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [instrumentForwards, setInstrumentForwards] = useState([]);
  const [tenorsData, setTenorsData] = useState([]);
  const [forwardRatesData, setForwardRatesData] = useState([]);
  const [discountRatesData, setDiscountRatesData] = useState([]);

  //Global State for Extracting Forward and discount rate data
  const GetAllFowardsAndDiscountsRatesAPIData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  //Extracting forward and Discounting Api Data
  useEffect(() => {
    try {
      if (
        GetAllFowardsAndDiscountsRatesAPIData &&
        GetAllFowardsAndDiscountsRatesAPIData !== null
      ) {
        setTenorsData(GetAllFowardsAndDiscountsRatesAPIData.tenors);
        setForwardRatesData(GetAllFowardsAndDiscountsRatesAPIData.forwardRates);
        setDiscountRatesData(
          GetAllFowardsAndDiscountsRatesAPIData.discountRates
        );
        setInstrumentForwards(
          GetAllFowardsAndDiscountsRatesAPIData.instruments
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GetAllFowardsAndDiscountsRatesAPIData]);

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

  useEffect(() => {
    if (
      tenorsData.length > 0 &&
      instrumentForwards.length > 0 &&
      forwardRatesData.length > 0 &&
      discountRatesData.length > 0
    ) {
      const { discountRates } = generateData(
        1,
        tenorsData,
        instrumentForwards,
        forwardRatesData,
        discountRatesData
      );

      if (discountRates.length > 0) {
        setDataSource(discountRates);
        const forwardsColumns = createColumns(discountRates, 1);
        setColumnsData(forwardsColumns);
      }
    }
  }, [tenorsData, instrumentForwards, forwardRatesData, discountRatesData]);
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
