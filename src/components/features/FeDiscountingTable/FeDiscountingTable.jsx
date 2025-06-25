import React, { Suspense, lazy, useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { isValidNumberUnderMax } from "@/utils/formatters";
import {
  GetFEDiscountingTableApi,
  PublishFEDiscountingTableApi,
} from "./FeDiscountTableAction";
import { createColumns, generateData } from "@/components/utils/generateData";
import {
  buildCurrentRatesPayload,
  buildDiscountingTable,
} from "@/components/utils/generateColumnsData";
import { FeDiscountingPublishedAction } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { InputCell } from "@/components/common/inputField/InputCell";

const FeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [columnsData, setColumnsData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const getAllInstrument = useSelector(
    (state) => state.authReducer.getAllInstruments
  );
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getFeDiscountingData = useSelector(
    (state) => state.RealtimeActionsSlice.FeDiscountingPublished
  );

  console.log(getFeDiscountingData, "getFeDiscountingDatagetFeDiscountingData");
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  console.log(getAllTenorsData, "getAllTenorsDatagetAllTenorsData");

  useEffect(() => {
    if (getDashboardForwards !== null) {
      try {
        const { feDiscountingRates } = getDashboardForwards;
        const { rowData, columnsData } = buildDiscountingTable(
          1,
          feDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          InputCell,
          onInputChange
        );

        if (rowData.length > 0) {
          setRowData(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [getDashboardForwards, getAllTenorsData, getAllInstrument]);

  useEffect(() => {
    if (getFeDiscountingData !== null) {
      try {
        const { rates } = getFeDiscountingData;
        const { rowData, columnsData } = buildDiscountingTable(
          1,
          rates,
          getAllTenorsData,
          getAllInstrument,
          InputCell,
          onInputChange
        );
        console.log(
          rowData,
          columnsData,
          rates,
          "getFeDiscountingDatagetFeDiscountingData"
        );
        if (rowData.length > 0) {
          setRowData(rowData);
          setColumnsData(columnsData);
          dispatch(FeDiscountingPublishedAction(null));
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
    return () => {
      dispatch(FeDiscountingPublishedAction(null));
    };
  }, [getFeDiscountingData, getAllTenorsData, getAllInstrument]);
  const onInputChange = (record, instrumentName, value) => {
    const previousValue = record[instrumentName]; // Get previous value from record
    const validated = isValidNumberUnderMax(value, previousValue, 100);

    // Only update if valid or corrected (not false)
    if (validated !== false) {
      const finalValue = typeof validated === "string" ? validated : value;

      setRowData((prevState) =>
        prevState.map((stateData) => {
          if (
            stateData.TenorID === record.TenorID &&
            stateData.instrumentName === record.instrumentName
          ) {
            return {
              ...stateData,
              [instrumentName]: finalValue,
            };
          }
          return stateData;
        })
      );
    }
  };

  const handlePublishDiscount = () => {
    const payloadData = buildCurrentRatesPayload(rowData);
    let Data = { CurrentRates: payloadData };

    console.log(payloadData, "payloadDatapayloadDatapayloadData");
    dispatch(PublishFEDiscountingTableApi({ navigate, Data }));
  };
  return (
    <>
      <GlobalTable
        prefixCls='DealerAndTreasuryDiscountTable'
        columns={columnsData}
        dataSource={rowData}
        pagination={false}
      />

      <span className='d-flex justify-content-center mt-4'>
        <CustomButton
          applyClass='publishForwardsBtn'
          value={"Publish FE Discounting"}
          onClick={handlePublishDiscount}
        />
      </span>
    </>
  );
};

export default FeDiscountingTable;
