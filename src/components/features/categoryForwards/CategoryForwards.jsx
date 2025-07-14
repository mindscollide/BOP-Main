import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { Row, Col } from "antd";

const CategoryForwards = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const GetCategoryWiseForwardRatesData = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseForwardRates
  );

  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  console.log(
    {
      GetCategoryWiseForwardRates: GetCategoryWiseForwardRatesData,
      allInstrumentForTreasuryData: allInstrumentForTreasuryData,
      getAllTenorsRecords: getAllTenorsRecords,
    },
    "Data For Category Forwards"
  );

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table
  useEffect(() => {
    if (
      getAllTenorsRecords &&
      allInstrumentForTreasuryData !== null &&
      GetCategoryWiseForwardRatesData !== null
    ) {
      try {
        const { forwardRates } = GetCategoryWiseForwardRatesData;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.forwardInstruments,
        };
        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
    allInstrumentForTreasuryData,
  ]);
  return (
    <>
      {/* <Row>
        <Col lg={12} md={12} sm={12} className="heading mb-2"> */}
      <span className="heading mb-2"> Forward</span>
      {/* </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}> */}
      <GlobalTable
        columns={columnsData}
        prefixCls="Dealer_Forwards"
        dataSource={dataSource}
        pagination={false}
      />
      {/* </Col> */}
      {/* </Row> */}
    </>
  );
};

export default CategoryForwards;
