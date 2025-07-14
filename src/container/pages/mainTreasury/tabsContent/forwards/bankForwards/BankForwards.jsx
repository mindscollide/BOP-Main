import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
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
  useEffect(() => {
    if (
      GetBankForwardForTreasury !== null &&
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { forwardInstruments } = GetAllInstrumentForTreasury;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = { instruments: forwardInstruments };

        const { rowData, columnsData } = buildForwardsTable(
          3,
          GetBankForwardForTreasury.forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        // console.log(rowData, columnsData, "columnsDatacolumnsData");
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
        //********************************************** */
        // const { tenors, forwardRates, instruments } =
        //   GetAllFowardsAndDiscountsRatesAPIData;
        // let getAllTenorsData = { tenors };
        // let getAllInstrument = { instruments };
        // const { rowData, columnsData } = buildForwardsTable(
        //   2,
        //   forwardRates,
        //   getAllTenorsData,
        //   getAllInstrument,
        //   IndexCell
        // );
        // console.log(rowData, columnsData, "columnsDatacolumnsData");
        // if (rowData.length > 0) {
        //   setDataSource(rowData);
        //   setColumnsData(columnsData);
        // }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [
    GetBankForwardForTreasury,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);
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
