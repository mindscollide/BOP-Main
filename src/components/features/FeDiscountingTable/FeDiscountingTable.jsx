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
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getFeDiscountingData = useSelector(
    (state) => state.dealerReducer.getFeDiscounting
  );
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  // useEffect(() => {
  //   dispatch(GetFEDiscountingTableApi({ navigate }));
  // }, []);
  console.log({ getFeDiscountingData, getAllTenorsData }, "ratesrates");

  useEffect(() => {
    if (getDashboardForwards !== null && getAllTenorsData !== null) {
      try {
        const { feDiscountingRates } = getDashboardForwards;
        const { tenors } = getAllTenorsData;
        console.log(feDiscountingRates, "ratesrates");
        const { discountRates } = generateData(1, tenors, null, null, feDiscountingRates);
        if (discountRates && discountRates.length > 0) {
          setRowData(discountRates);

          const ColumnData = createColumns(
            discountRates,
            5,
            InputFIeld,
            onInputChange,
            "amountValue"
          );
          console.log(ColumnData, "ColumnDataColumnDataColumnData");
          setColumnsData(ColumnData);
        }
        // console.log()
        console.log(discountRates, "discountRatesResultdiscountRatesResult");
      } catch (error) {
        console.log(error, "ratesrates");
      }
    }
  }, [getDashboardForwards, getAllTenorsData]);

  const onInputChange = (key, record, value) => {
    console.log(key, record, value, "onInputChangeonInputChange");
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
