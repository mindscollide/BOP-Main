import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
import { useSelector } from "react-redux";

const CategoryForwards = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const getAllCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetAllCounterPartyData
  );

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table

  useEffect(() => {
    if (getAllCounterPartyData !== null) {
      const { spreadedForwardRates, instruments, tenors } =
        getAllCounterPartyData;
      if (spreadedForwardRates.length > 0) {
        const { forwardsRates } = generateData(
          4,
          tenors,
          instruments,
          spreadedForwardRates
        );
        if (forwardsRates.length > 0) {
          setDataSource(forwardsRates);
          const forwardsColumns = createColumns(forwardsRates, 2);
          setColumnsData(forwardsColumns);
        }
      }
    }
  }, [getAllCounterPartyData]);

  return (
    <GlobalTable
      columns={columnsData}
      prefixCls='Dealer_Forwards'
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default CategoryForwards;
