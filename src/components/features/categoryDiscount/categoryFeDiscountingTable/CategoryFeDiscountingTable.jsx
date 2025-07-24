import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { throttle } from "lodash";

const CategoryFeDiscountingTable = () => {
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

  const CategoryFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryFeDiscounting
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );
  console.log("dataSourcedataSource: ", dataSource);

  console.log("marketStatusmarketStatus2434: ", marketStatus);

  console.log("CategoryFeDiscounting: ", CategoryFeDiscounting);

  console.log(
    "GetCategoryWiseDiscountingRates: ",
    GetCategoryWiseDiscountingRates
  );

  useEffect(() => {
    if (getAllTenorsRecords !== null && allInstrumentForTreasuryData !== null) {
      try {
        const { feDiscountingRates = [] } =
          GetCategoryWiseDiscountingRates !== null &&
          GetCategoryWiseDiscountingRates;
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.discountingInstruments,
        };
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };

        const { columnsData, rowData } = buildDiscountingTable(
          3,
          feDiscountingRates,
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
    allInstrumentForTreasuryData,
    GetCategoryWiseDiscountingRates,
  ]);

  const throttledUpdate = useMemo(
    () =>
      throttle((discountingUpdate) => {
        const { instrumentFEDiscountingData } = discountingUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            instrumentFEDiscountingData.forEach((d) => {
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
    if (CategoryFeDiscounting) {
      throttledUpdate(CategoryFeDiscounting);
    }
  }, [CategoryFeDiscounting, throttledUpdate]);

  useEffect(() => {
    if (marketStatus !== null && marketStatus === false) {
      // Market closed: set all rates to 0
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
        FE Discounting
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

export default CategoryFeDiscountingTable;
