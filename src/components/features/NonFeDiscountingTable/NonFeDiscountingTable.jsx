import React, { Suspense, lazy, useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { formatPercentageInput } from "@/utils/formatters";
import {
  GetNonFEDiscountingTableApi,
  PublishNonFEDiscountingTableApi,
} from "./NonFeDiscountingAction";
import {
  buildCurrentRatesPayload,
  buildDiscountingTable,
} from "@/components/utils/generateColumnsData";
import { NonFeDiscountingPublishedAction } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { InputCell } from "@/components/common/inputField/InputCell";

/**
 * NonFeDiscountingTable component renders a table for displaying and managing
 * non-FE discounting rates. It fetches data from the Redux store and allows
 * users to publish updated rates.
 *
 * @component
 * @returns {JSX.Element} The rendered NonFeDiscountingTable component.
 *
 * @example
 * return (
 *   <NonFeDiscountingTable />
 * );
 */
const NonFeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const marketStatus = useSelector(
    (state) => state.RealtimeActionsSlice.marketStatus
  );

  const [tableData, setTableData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const NonFeDiscountingPublishedData = useSelector(
    (state) => state.RealtimeActionsSlice.NonFeDiscountingPublished
  );
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  useEffect(() => {
    if (
      getDashboardForwards !== null &&
      getAllTenorsData !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { nonFEDiscountingRates } = getDashboardForwards;
        const DiscountingInstruments =
          GetAllInstrumentForTreasury.discountingInstruments;
        const getAllInstrument = { instruments: DiscountingInstruments };
        const { rowData, columnsData } = buildDiscountingTable(
          5,
          nonFEDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          InputCell,
          onInputChange
        );
        console.log(
          { rowData, columnsData },
          " columnsDatacolumnsDatacolumnsData"
        );
        if (rowData.length > 0) {
          setTableData(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {}
    }
  }, [getDashboardForwards, getAllTenorsData, GetAllInstrumentForTreasury]);

  useEffect(() => {
    if (
      getDashboardForwards !== null &&
      getAllTenorsData !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { rates } = NonFeDiscountingPublishedData;
        const DiscountingInstruments =
          GetAllInstrumentForTreasury.discountingInstruments;
        const getAllInstrument = { instruments: DiscountingInstruments };
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
          setTableData(rowData);
          setColumnsData(columnsData);
          dispatch(NonFeDiscountingPublishedAction(null));
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
    return () => {
      dispatch(NonFeDiscountingPublishedAction(null));
    };
  }, [
    NonFeDiscountingPublishedData,
    getAllTenorsData,
    GetAllInstrumentForTreasury,
  ]);

  const onInputChange = (record, instrumentName, value) => {
    setTableData((prevState) =>
      prevState.map((stateData) => {
        // Match by TenorID only, since each row contains all instruments
        if (
          stateData.TenorID === record.TenorID &&
          stateData.instrumentName === record.instrumentName
        ) {
          return {
            ...stateData,
            [`${instrumentName}`]: formatPercentageInput(value),
          };
        }
        return stateData;
      })
    );
  };

  const handlePublishDiscount = () => {
    const payloadData = buildCurrentRatesPayload(tableData);
    let Data = { CurrentRates: payloadData };
    dispatch(PublishNonFEDiscountingTableApi({ navigate, Data }));
  };
  return (
    <>
      <GlobalTable
        prefixCls='DealerAndTreasuryDiscountTable'
        columns={columnsData}
        dataSource={tableData}
        pagination={false}
      />

      <span className='d-flex justify-content-center mt-4'>
        <CustomButton
          applyClass='publishForwardsBtn'
          value={"Publish Non FE Discounting"}
          onClick={handlePublishDiscount}
          disabled={marketStatus === false ? true : false}
        />
      </span>
    </>
  );
};

export default NonFeDiscountingTable;
