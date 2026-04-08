import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { useModal } from "@/context/ModalContext";
import { UpdateGetCategoryWiseDiscountingRates } from "@/store/categoryReducer/categoryReducer";
import { clearCategoryDiscountingClearRates } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { throttle } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CategoryNonFeDiscountingTable = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const { isMarketOn } = useModal();

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);

  const GetCategoryWiseDiscountingRates = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseDiscountingRates
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryDiscountingClearRates
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

  useEffect(() => {
    if (
      !isTableInitialized.current &&
      getAllTenorsRecords !== null &&
      allInstrumentForTreasuryData !== null &&
      GetCategoryWiseDiscountingRates !== null
    ) {
      try {
        const { nonFEDiscountingRates = [] } =
          GetCategoryWiseDiscountingRates !== null &&
          GetCategoryWiseDiscountingRates;
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.nonFEDiscountingInstruments,
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
          isTableInitialized.current = true;
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
    if (isMarketOn !== null && isMarketOn === false) {
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
  }, [isMarketOn]);

  // ✅ For clear FE Discounting Rates
  useEffect(() => {
    if (!ClearRatesData?.areRatesClear) return;

    try {
      if (GetCategoryWiseDiscountingRates?.nonFEDiscountingRates?.length) {
        // 🔹 Reset Redux rates to "0"
        const clearedDiscountingRates =
          GetCategoryWiseDiscountingRates.nonFEDiscountingRates.map((item) => ({
            ...item,
            rate: "0",
          }));

        const updatedData = {
          ...GetCategoryWiseDiscountingRates,
          nonFEDiscountingRates: clearedDiscountingRates,
        };

        dispatch(UpdateGetCategoryWiseDiscountingRates(updatedData));
      } else {
        // 🔹 Fallback: Clear only local dataSource
        setDataSource((prevData) =>
          prevData.map((row) => {
            const updatedRow = { ...row };
            for (const key in updatedRow) {
              if (key.startsWith("rate_")) {
                updatedRow[key] = "0";
              }
            }
            return updatedRow;
          })
        );
        console.log("✅ Cleared FE Discounting Rates in local dataSource");
      }

      // 🔹 Always reset clear flag
      dispatch(clearCategoryDiscountingClearRates());
    } catch (error) {
      console.error("❌ Error while clearing FE Discounting Rates:", error);
    }
  }, [ClearRatesData, GetCategoryWiseDiscountingRates, dispatch]);

  return (
    <Row>
      <Col lg={12} md={12} sm={12} className='heading mb-2'>
        Non-FE Discounting
      </Col>
      <Col lg={12} md={12} sm={12}>
        <GlobalTable
          columns={columnsData}
          dataSource={dataSource}
          prefixCls='Dealer_Discounting'
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default CategoryNonFeDiscountingTable;
