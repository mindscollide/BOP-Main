import React, { useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isValidMaxFourNumberAfterPoint } from "@/utils/formatters";
import { PublishNonFEDiscountingTableApi } from "./NonFeDiscountingAction";
import {
  buildCurrentRatesPayload,
  buildDiscountingTable,
} from "@/components/utils/generateColumnsData";
import { NonFeDiscountingPublishedAction } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { InputCell } from "@/components/common/inputField/InputCell";
import { useNotification } from "@/context/NotificationProvider";
import { formatDateUTCToGMT } from "@/components/utils/timeFunction";
import moment from "moment";

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
  const [date, setDate] = useState("");
  const { showMessage } = useNotification();

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
  const publishNonFeDiscountingLoading = useSelector(
    (state) => state.dealerReducer.publishNonFeDiscountingLoading
  );

  useEffect(() => {
    if (getAllTenorsData !== null && GetAllInstrumentForTreasury !== null) {
      try {
        const { nonFEDiscountingRates = [] } =
          getDashboardForwards !== null &&
          getDashboardForwards !== undefined &&
          getDashboardForwards;

        const DiscountingInstruments =
          GetAllInstrumentForTreasury?.nonFEDiscountingInstruments;
        const getAllInstrument = { instruments: DiscountingInstruments };
        const { rowData, columnsData } = buildDiscountingTable(
          5,
          nonFEDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          InputCell,
          onInputChange
        );

        if (rowData.length > 0) {
          setDate(nonFEDiscountingRates[0]?.dateTime);
          setTableData(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [getDashboardForwards, getAllTenorsData, GetAllInstrumentForTreasury]);

  useEffect(() => {
    if (getAllTenorsData !== null && GetAllInstrumentForTreasury !== null) {
      try {
        const { rates } = 
        NonFeDiscountingPublishedData !== null &&
        NonFeDiscountingPublishedData !== undefined &&
        NonFeDiscountingPublishedData; ;
        const DiscountingInstruments =
          GetAllInstrumentForTreasury.nonFEDiscountingInstruments;
        const getAllInstrument = { instruments: DiscountingInstruments };
        const { rowData, columnsData } = buildDiscountingTable(
          5,
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
          setDate(rates[0]?.dateTime);
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
    const previousValue = record[instrumentName]; // Get previous value from record
    const validated = isValidMaxFourNumberAfterPoint(value, previousValue, 100);

    // Only update if valid or corrected (not false)
    if (validated !== false) {
      const finalValue = typeof validated === "string" ? validated : value;

      setTableData((prevState) =>
        prevState.map((stateData) => {
          // Match by TenorID only, since each row contains all instruments
          if (
            stateData.TenorID === record.TenorID &&
            stateData.instrumentName === record.instrumentName
          ) {
            return {
              ...stateData,
              [`${instrumentName}`]: finalValue,
            };
          }
          return stateData;
        })
      );
    }
  };

  const handlePublishDiscount = () => {
    const payloadData = buildCurrentRatesPayload(tableData);

    console.log("payloadDatapayloadDatapayloadDataNonfe", payloadData);

    // const checkDoNotempty = payloadData.every(
    //   (item) => item.Rate !== "" && Number(item.Rate) !== 0
    // );

    // if (!checkDoNotempty) {
    //   showMessage("Rate fields cannot be 0 or empty for any currency");
    //   return;
    // }
    let Data = { CurrentRates: payloadData };

    dispatch(PublishNonFEDiscountingTableApi({ navigate, Data }));
  };
  return (
    <>
      <div className='datetime fw-bold text-end mb-2 ff-roboto'>
        {date
          ? moment(formatDateUTCToGMT(date)).format("DD MMM YYYY, hh:mm:ss")
          : ""}
      </div>
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
          loading={publishNonFeDiscountingLoading}
        />
      </span>
    </>
  );
};

export default NonFeDiscountingTable;
