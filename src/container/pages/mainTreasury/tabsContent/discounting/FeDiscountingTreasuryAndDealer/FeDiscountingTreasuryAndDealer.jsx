import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FeDiscountingTreasuryAndDealer = () => {
  const [discountingData, setDiscountingData] = useState([]);
  const [discounttingColumns, setDiscounttingColumns] = useState([]);
  const GetAllFowardsAndDiscountsRatesData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  useEffect(() => {
    if (
      GetAllFowardsAndDiscountsRatesData &&
      GetAllFowardsAndDiscountsRatesData.discountRates?.length > 0 &&
      GetAllFowardsAndDiscountsRatesData.instruments?.length > 0 &&
      GetAllFowardsAndDiscountsRatesData.tenors?.length > 0
    ) {
      try {
        const { discountRates, tenors, instruments } =
          GetAllFowardsAndDiscountsRatesData;

        const getAllTenorsData = { tenors };
        const getAllInstrument = { instruments };

        const { rowData, columnsData } = buildDiscountingTable(
          3,
          discountRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData.length > 0) {
          setDiscountingData(rowData);
          setDiscounttingColumns(columnsData);
        }
      } catch (error) {
        console.error("Error processing discounting table data:", error);
      }
    }
  }, [GetAllFowardsAndDiscountsRatesData]);

  return (
    <>
      <span className="heading mb-2">FE Discounting</span>
      <GlobalTable
        columns={discounttingColumns}
        dataSource={discountingData}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default FeDiscountingTreasuryAndDealer;
