import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
import { useSelector } from "react-redux";

const CategoryDiscounting = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const getAllCounterPartyData = useSelector(
    (state) => state.WatchListReducer?.GetAllCounterPartyData
  );

  useEffect(() => {
    if (getAllCounterPartyData !== null) {
      // const {
      //   spreadedForwardRates,
      //   spreadedDiscountRates,
      //   instruments,
      //   tenors,
      // } = getAllCounterPartyData;
      // if (spreadedDiscountRates.length > 0) {
      //   const { discountRates } = generateData(
      //     1,
      //     tenors,
      //     instruments,
      //     spreadedForwardRates,
      //     spreadedDiscountRates
      //   );
      //   if (discountRates.length > 0) {
      //     setDataSource(discountRates);

      //     const forwardsColumns = createColumns(discountRates, 1);
      //     setColumnsData(forwardsColumns);
      //   }
      // }
    }
  }, [getAllCounterPartyData]);

  return (
    <GlobalTable
      columns={columnsData}
      dataSource={dataSource}
      prefixCls='Dealer_Discounting'
      pagination={false}
    />
  );
};

export default CategoryDiscounting;
