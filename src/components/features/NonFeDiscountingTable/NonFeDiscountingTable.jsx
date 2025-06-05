import React, { Suspense, lazy, useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { formatPercentageInput } from "@/utils/formatters";
import { GetNonFEDiscountingTableApi } from "./NonFeDiscountingAction";
import { createColumns, generateData } from "@/components/utils/generateData";

const NonFeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getNonFeDiscountTableData = useSelector(
    (state) => state.dealerReducer.getNonFeDiscounting
  );
  // useEffect(() => {
  //   dispatch(GetNonFEDiscountingTableApi({ navigate }));
  // }, []);

  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  useEffect(() => {
    if (getDashboardForwards !== null && getAllTenorsData !== null) {
      const { nonFEDiscountingRates } = getDashboardForwards;
      const { tenors } = getAllTenorsData;
      const tenorMap = {};
      let discountRatesResult = [];

      nonFEDiscountingRates.forEach((discValue) => {
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
      if (discountRatesResult && discountRatesResult.length > 0) {
        setTableData(discountRatesResult);
        const ColumnData = createColumns(
          discountRatesResult,
          5,
          InputFIeld,
          onInputChange,
          "amountValue"
        );
        setColumnsData(ColumnData);
      }
    }
  }, [getDashboardForwards, getAllTenorsData]);

  const onInputChange = (key, record, value) => {
    console.log(key, record, value, "onInputChangeonInputChange");
  };

  // Data for the table
  const dataSource = [
    { key: "1", currency: "USD", currentRate: 0, previousRate: "" },
    { key: "2", currency: "EUR", currentRate: 0, previousRate: "" },
    { key: "3", currency: "GBP", currentRate: 0, previousRate: "" },
    { key: "4", currency: "JPY", currentRate: 0, previousRate: "" },
    { key: "5", currency: "CNY", currentRate: 0, previousRate: "" },
  ];

  const handleChangeCurrent = (event, record) => {
    const { value } = event.target;
    setTableData((prev) => {
      if (prev.length > 0) {
        let getRecords = prev.map((item) => {
          if (item.instrumentID === record.instrumentID) {
            return {
              ...item,
              currentRate: formatPercentageInput(value),
            };
          } else {
            return item;
          }
        });
        return getRecords;
      }
    });
  };

  // Columns for the table
  const columns = [
    {
      title: "Tenor",
      dataIndex: "instrumentName",
      key: "instrumentName",
      align: "left",
    },
    {
      title: "Current Rate %",
      dataIndex: "currentRate",
      key: "currentRate",
      align: "center",
      render: (value, record) => {
        return (
          <InputFIeld
            type='number'
            applyClass='DealerTableBitInput'
            value={value}
            onChange={(event) => handleChangeCurrent(event, record)}
          />
        );
      },
    },
    {
      title: "Previous Rate %",
      dataIndex: "previousRate",
      key: "previousRate",
      align: "center",
      render: (value) => (
        <InputFIeld
          type='number'
          disabled={true}
          defaultValue={value}
          applyClass='DealerTableBitInput'
        />
      ),
    },
  ];

  const handlePublishDiscount = () => {
    let newData = {
      CurrentRates: tableData.map((records, index) => {
        return {
          InstumentID: records.instrumentID,
          InstrumentName: records.instrumentName,
          Rate: records.currentRate,
        };
      }),
    };
    dispatch(publishDiscountingRatesAction({ navigate, Data: newData }));
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
        />
      </span>
    </>
  );
};

export default NonFeDiscountingTable;
