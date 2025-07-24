import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
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
  const CategoryNonFeDiscouting = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryNonFeDiscouting
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  console.log("marketStatusmarketStatus2434: ", marketStatus);
  useEffect(() => {
    if (getAllTenorsRecords !== null && allInstrumentForTreasuryData) {
      try {
        const { nonFEDiscountingRates = [] } =
          GetCategoryWiseDiscountingRates !== null &&
          GetCategoryWiseDiscountingRates;
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
  }, [
    GetCategoryWiseDiscountingRates,
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
  ]);

  const throttledUpdate = useMemo(
    () =>
      throttle((discountingUpdate) => {
        const { instrumentNonFEDiscountingData } = discountingUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            instrumentNonFEDiscountingData.forEach((d) => {
              Object.keys(row).forEach((key) => {
                if (
                  key.startsWith("InstrumentID_") &&
                  row[key] === d.instrumentID &&
                  row.TenorID === d.tenorID
                ) {
                  const currency = key.split("_")[1];
                  updatedRow[`rate_${currency}`] = d.bidWithSpread;
                }
              });
            });

            return updatedRow;
          })
        );
      }, 20),
    []
  );

  useEffect(() => {
    if (CategoryNonFeDiscouting !== null) {
      throttledUpdate(CategoryNonFeDiscouting);
    }
  }, [CategoryNonFeDiscouting, throttledUpdate]);

  useEffect(() => {
    if (marketStatus !== null && marketStatus === false) {
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };
          Object.keys(updatedRow).forEach((key) => {
            if (key.startsWith("rate_")) {
              updatedRow[key] = 0;
            }
          });
          return updatedRow;
        })
      );
    }
  }, [marketStatus]);

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
