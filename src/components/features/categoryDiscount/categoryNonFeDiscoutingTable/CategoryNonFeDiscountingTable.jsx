import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryNonFeDiscountingTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const GetCategoryWiseDiscountingRates = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseDiscountingRates
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  console.log(
    "GetCategoryWiseDiscountingRates: ",
    GetCategoryWiseDiscountingRates
  );
  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      GetCategoryWiseDiscountingRates !== null &&
      allInstrumentForTreasuryData
    ) {
      try {
        const { nonFEDiscountingRates } = GetCategoryWiseDiscountingRates;
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.discountingInstruments,
        };
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };

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
  }, []);

  return (
    <Row>
      <Col lg={12} md={12} sm={12} className="heading mb-2">
        Non-FE Discounting
      </Col>
      <Col lg={12} md={12} sm={12}>
        <GlobalTable
          columns={columnsData}
          dataSource={dataSource}
          prefixCls="Dealer_Discounting"
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default CategoryNonFeDiscountingTable;
