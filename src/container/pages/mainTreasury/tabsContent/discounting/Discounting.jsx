import React, { useEffect, useState } from "react";
import GlobalTable from "../../../../../components/common/table/GlobalTable";
import { useSelector } from "react-redux";
import { createColumns, generateData } from "@/components/utils/generateData";

const Discounting = () => {
  const [discountingData, setDiscountingData] = useState([]);
  const [discounttingColumns, setDiscounttingColumns] = useState([]);
  const GetAllFowardsAndDiscountsRatesData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  useEffect(() => {
    if (GetAllFowardsAndDiscountsRatesData !== null) {
      try {
        if (
          GetAllFowardsAndDiscountsRatesData.discountRates.length > 0 &&
          GetAllFowardsAndDiscountsRatesData.instruments.length > 0 &&
          GetAllFowardsAndDiscountsRatesData.tenors.length > 0
        ) {
          const {
            discountRates: disoucntData,
            tenors,
            instruments,
          } = GetAllFowardsAndDiscountsRatesData;

          const { discountRates } = generateData(
            1,
            tenors,
            instruments,
            [],
            disoucntData
          );
          console.log(discountRates, "discountsRates");
          if (discountRates.length > 0) {
            setDiscountingData(discountRates);
            const forwardsColumns = createColumns(discountRates, 1);
            setDiscounttingColumns(forwardsColumns);
          }
        }
      } catch (error) {
        console.log(error, "Error in Discounting component useEffect");
      }
    }
  }, [GetAllFowardsAndDiscountsRatesData]);

  return (
    <>
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

export default Discounting;
