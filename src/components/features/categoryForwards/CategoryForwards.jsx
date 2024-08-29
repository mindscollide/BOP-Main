import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";

const CategoryForwards = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table

  useEffect(() => {
    const { forwardsRates } = generateData(2);

    if (forwardsRates.length > 0) {
      setDataSource(forwardsRates);
      const forwardsColumns = createColumns(forwardsRates, 2);
      setColumnsData(forwardsColumns);
    }
  }, []);
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
