import React, { Suspense, lazy, useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { formatPercentageInput } from "@/utils/formatters";
import { GetFEDiscountingTableApi } from "./FeDiscountTableAction";
import { createColumns, generateData } from "@/components/utils/generateData";

const FeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [columnsData, setColumnsData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const getAllInstrument = useSelector((state) => state)
  console.log(getAllInstrument, "getAllInstrumentgetAllInstrument")
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getFeDiscountingData = useSelector(
    (state) => state.dealerReducer.getFeDiscounting
  );
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  console.log(getAllTenorsData, "getAllTenorsDatagetAllTenorsData")

  useEffect(() => {
    if (getDashboardForwards !== null && getAllTenorsData !== null) {
      try {
        const { feDiscountingRates } = getDashboardForwards;
        const { tenors } = getAllTenorsData;
        const tenorMap = {};
        let discountRatesResult = []

        feDiscountingRates.forEach((discValue) => {
          console.log(discValue, "discValuediscValue");
          const tenor = tenors.find((t) => t.tenorID === discValue.tenorID);
  
          const tenorID = tenor ? tenor.tenorID : discValue.tenorID;
          const instrumentName =
            discValue?.instrumentName || discValue.instrumentName || "";
          const instrumentID = discValue?.instumentID;
  
          if (!tenorMap[tenorID]) {
            tenorMap[tenorID] = {
              TenorID: tenorID,
              tenorDays: tenor?.tenorDays || "",
              Tenor: tenor?.tenorName || "",
            };
          }
  
          tenorMap[tenorID][`instrumentTitle_${instrumentName}`] = instrumentName;
          tenorMap[tenorID][`instumentID_${instrumentName}`] = instrumentID;
          tenorMap[tenorID][`${instrumentName}_rate`] = discValue.rate;
        });
  
        discountRatesResult = Object.values(tenorMap);
        console.log(discountRatesResult, "discountRatesResultdiscountRatesResult")
        // const { discountRates } = generateData(
        //   5,
        //   tenors,
        //   null,
        //   null,
        //   feDiscountingRates
        // );

        if (discountRatesResult && discountRatesResult.length > 0) {
          setRowData(discountRatesResult);

          const ColumnData = createColumns(
            discountRatesResult,
            5,
            InputFIeld,
            onInputChange,
            "amountValue"
          );
          setColumnsData(ColumnData);
        }
      } catch (error) {
        console.log(error, "ratesrates");
      }
    }
  }, [getDashboardForwards, getAllTenorsData]);

  const onInputChange = (record, value) => {
    console.log({ record, value }, "onInputChangeonInputChange");
    setRowData((prevState) => {
      return prevState.map((stateData, index) => {
        if (
          stateData.InstrumentID === record.InstrumentID &&
          stateData.TenorID === record.TenorID
        ) {
          return {
            ...stateData,
            value: formatPercentageInput(value),
          };
        }
        return stateData;
      });
    });
  };

  const handlePublishDiscount = () => {};
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
