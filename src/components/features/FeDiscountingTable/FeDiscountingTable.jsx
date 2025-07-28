import React, { Suspense, lazy, useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import {
  isValidMaxFourNumberAfterPoint,
  isValidNumberUnderMax,
} from "@/utils/formatters";
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

/**
 * FeDiscountingTable component renders a table for displaying and managing
 * discounting rates for financial instruments. It fetches data from the Redux
 * store and allows users to input and publish updated rates.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *   <FeDiscountingTable />
 * );
 */
const FeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const marketStatus = useSelector(
    (state) => state.RealtimeActionsSlice.marketStatus
  );

  const [columnsData, setColumnsData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const getAllInstrument = useSelector(
    (state) => state.authReducer.getAllInstruments
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getFeDiscountingData = useSelector(
    (state) => state.RealtimeActionsSlice.FeDiscountingPublished
  );

  console.log("getFeDiscountingDatagetFeDiscountingData");
  console.log(getFeDiscountingData, "getFeDiscountingDatagetFeDiscountingData");
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  console.log(
    getAllTenorsData,
    GetAllInstrumentForTreasury,
    "getAllTenorsDatagetAllTenorsData"
  );

  useEffect(() => {
    if (
      getDashboardForwards !== null &&
      getAllTenorsData !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { feDiscountingRates } = getDashboardForwards;
        const DiscountingInstruments =
          GetAllInstrumentForTreasury.discountingInstruments;
        const getAllInstrument = { instruments: DiscountingInstruments };
        const { rowData, columnsData } = buildDiscountingTable(
          5,
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
  }, [getDashboardForwards, getAllTenorsData, GetAllInstrumentForTreasury]);

  useEffect(() => {
    if (
      getFeDiscountingData !== null &&
      getAllTenorsData !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { rates } = getFeDiscountingData;
        const { rowData, columnsData } = buildDiscountingTable(
          5,
          rates,
          getAllTenorsData,
          GetAllInstrumentForTreasury,
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
  }, [getFeDiscountingData, getAllTenorsData, GetAllInstrumentForTreasury]);
  const onInputChange = (record, instrumentName, value) => {
    const previousValue = record[instrumentName]; // Get previous value from record
    const validated = isValidMaxFourNumberAfterPoint(value, previousValue, 100);

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
        prefixCls="DealerAndTreasuryDiscountTable"
        columns={columnsData}
        dataSource={rowData}
        pagination={false}
      />

      <span className="d-flex justify-content-center mt-4">
        <CustomButton
          applyClass="publishForwardsBtn"
          value={"Publish FE Discounting"}
          disabled={marketStatus === false ? true : false}
          onClick={handlePublishDiscount}
        />
      </span>
    </>
  );
};

export default FeDiscountingTable;
