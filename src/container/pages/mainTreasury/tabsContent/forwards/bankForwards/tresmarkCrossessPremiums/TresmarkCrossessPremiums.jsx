import GlobalTable from "@/components/common/table/GlobalTable";
import { createColumns, generateData } from "@/components/utils/generateData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const data = [
  {
    key: "1",
    tenor: "Bank Spot",
    days: "-",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.71",
    eurAsk: "313.98",
    gbpBid: "367.74",
    gbpAsk: "367.99",
    jpyBid: "2.0244",
    jpyAsk: "2.0257",
  },
  {
    key: "2",
    tenor: "1 WEEK",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "313.98",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "3",
    tenor: "1 WEEK (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "313.98",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "4",
    tenor: "1 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "5",
    tenor: "1 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "6",
    tenor: "2 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "7",
    tenor: "2 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "8",
    tenor: "3 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "9",
    tenor: "3 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "10",
    tenor: "4 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "11",
    tenor: "4 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "12",
    tenor: "5 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "13",
    tenor: "5 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "14",
    tenor: "6 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "15",
    tenor: "6 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "16",
    tenor: "9 MONTH",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "17",
    tenor: "9 MONTH (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "18",
    tenor: "1 YEAR",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
  {
    key: "19",
    tenor: "1 YEAR (P)",
    days: "7",
    usdBid: "287.12",
    usdAsk: "287.29",
    eurBid: "313.81",
    eurAsk: "314.09",
    gbpBid: "367.76",
    gbpAsk: "368.01",
    jpyBid: "2.0264",
    jpyAsk: "2.0278",
  },
];
const columns = [
  {
    title: "",
    dataIndex: "tenor",
    key: "tenor",
    align: "center",
    children: [
      {
        title: "Tenor",
        dataIndex: "tenor",
        key: "tenor",
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
        className: "bidClass",
      },
      {
        title: "Ask",
        dataIndex: "usdAsk",
        key: "usdAsk",
        className: "askClass",
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
        className: "bidClass",
      },
      {
        title: "Ask",
        dataIndex: "eurAsk",
        key: "eurAsk",
        className: "askClass",
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
        className: "bidClass",
      },
      {
        title: "Ask",
        dataIndex: "gbpAsk",
        key: "gbpAsk",
        className: "askClass",
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
        className: "bidClass",
      },
      {
        title: "Ask",
        dataIndex: "jpyAsk",
        key: "jpyAsk",
        className: "askClass",
      },
    ],
  },
];

const TresmarkCrossesPreimums = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const GetAllFowardsAndDiscountsRatesData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );
  useEffect(() => {
    // if (GetAllFowardsAndDiscountsRatesData !== null) {
    //   try {
    //     if (
    //       GetAllFowardsAndDiscountsRatesData.forwardRates.length > 0 &&
    //       GetAllFowardsAndDiscountsRatesData.instruments.length > 0 &&
    //       GetAllFowardsAndDiscountsRatesData.tenors.length > 0
    //     ) {
    //       const { forwardRates, tenors, instruments } =
    //         GetAllFowardsAndDiscountsRatesData;

    //       const { forwardsRates } = generateData(
    //         3,
    //         tenors,
    //         instruments,
    //         forwardRates
    //       );
    //       console.log(forwardsRates, "forwardsRates")
    //       if (forwardsRates.length > 0) {
    //         setDataSource(forwardsRates);
    //         const forwardsColumns = createColumns(forwardsRates, 3);
    //         setColumnsData(forwardsColumns);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const { forwardsRates } = generateData(3);
    console.log(forwardsRates, "forwardsRates");
    if (forwardsRates.length > 0) {
      setDataSource(forwardsRates);
      const forwardsColumns = createColumns(forwardsRates, 2);
      setColumnsData(forwardsColumns);
    }
  }, [GetAllFowardsAndDiscountsRatesData]);
  return (
    <>
      <div className='flex-fill mt-3 fs-4 fw-bold color-black mb-1 ff-roboto'>
        Tresmark Crosses Preimums
      </div>

      <GlobalTable
        columns={columnsData}
        dataSource={dataSource}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default TresmarkCrossesPreimums;
