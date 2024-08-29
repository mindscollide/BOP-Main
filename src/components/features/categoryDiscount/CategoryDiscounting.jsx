import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";

const CategoryDiscounting = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  useEffect(() => {
    const { discountRates } = generateData(1);

    if (discountRates.length > 0) {
      setDataSource(discountRates);
      const forwardsColumns = createColumns(discountRates, 1);
      setColumnsData(forwardsColumns);
    }
  }, []);

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
