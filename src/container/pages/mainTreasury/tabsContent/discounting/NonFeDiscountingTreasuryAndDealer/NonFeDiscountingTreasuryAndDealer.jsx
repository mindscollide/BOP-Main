import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NonFeDiscountingTreasuryAndDealer = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const GetDiscountingRatesForTreasury = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForTreasury
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  useEffect(() => {
    if (
      GetDiscountingRatesForTreasury !== null &&
      GetAllInstrumentForTreasury !== null &&
      getAllTenorsRecords !== null
    ) {
      try {
        const { nonFEDiscountingRates } = GetDiscountingRatesForTreasury;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: GetAllInstrumentForTreasury.discountingInstruments,
        };
        const { columnsData, rowData } = buildDiscountingTable(
          3,
          nonFEDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {}
    }
  }, [
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
    GetDiscountingRatesForTreasury,
  ]);
  return (
    <>
      <span className="heading mb-2">Non FE Discounting</span>

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

export default NonFeDiscountingTreasuryAndDealer;
