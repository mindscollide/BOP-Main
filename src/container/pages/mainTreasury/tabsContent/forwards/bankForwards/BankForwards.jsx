import GlobalTable from "@/components/common/table/GlobalTable";
import { createColumns, generateData } from "@/components/utils/generateData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BankForwards = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  const GetBankForwardForTreasury = useSelector(
    (state) => state.WatchListReducer.GetBankForwardForTreasury
  );

  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  console.log(
    {
      tenor: getAllTenorsRecords,
      Forward: GetBankForwardForTreasury,
      instrument: GetAllInstrumentForTreasury,
    },
    "Datadtatatataat"
  );

  console.log(GetBankForwardForTreasury, "GetBankForwardForTreasury");

  // useEffect(() => {
  //   if (GetAllFowardsAndDiscountsRatesData !== null) {
  //     try {
  //       if (
  //         GetAllFowardsAndDiscountsRatesData.forwardRates.length > 0 &&
  //         GetAllFowardsAndDiscountsRatesData.instruments.length > 0 &&
  //         GetAllFowardsAndDiscountsRatesData.tenors.length > 0
  //       ) {
  //         const { forwardRates, tenors, instruments } =
  //           GetAllFowardsAndDiscountsRatesData;

  //         const { forwardsRates } = generateData(
  //           4,
  //           tenors,
  //           instruments,
  //           forwardRates
  //         );
  //         if (forwardsRates.length > 0) {
  //           setDataSource(forwardsRates);
  //           const forwardsColumns = createColumns(forwardsRates, 3);
  //           setColumnsData(forwardsColumns);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [GetAllFowardsAndDiscountsRatesData]);

  return (
    <>
      <div className="flex-fill mt-3 fs-4 fw-bold color-black mb-1 ff-roboto">
        Bank Forwards
      </div>

      <GlobalTable
        columns={columnsData}
        dataSource={dataSource}
        prefixCls={"Treasury_Forwards"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default BankForwards;
