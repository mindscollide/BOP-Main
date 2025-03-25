import React, { Suspense, lazy, useEffect } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";

const DealeAndTreasuryDiscountingTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getDiscountingRatesAction({navigate}))
  },[])
  // Data for the table
  const dataSource = [
    { key: "1", currency: "USD", currentRate: 0, previousRate: "" },
    { key: "2", currency: "EUR", currentRate: 0, previousRate: "" },
    { key: "3", currency: "GBP", currentRate: 0, previousRate: "" },
    { key: "4", currency: "JPY", currentRate: 0, previousRate: "" },
    { key: "5", currency: "CNY", currentRate: 0, previousRate: "" },
  ];

  // Columns for the table
  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      align: "left",
    },
    {
      title: "Current Rate %",
      dataIndex: "currentRate",
      key: "currentRate",
      align: "center",
      render: (value) => {
        console.log(value, "valuevaluevalue");
        return (
          <InputFIeld
            type='number'
            applyClass='DealerTableBitInput'
            value={value}
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
  return (
    <>
      <GlobalTable
        prefixCls='DealerAndTreasuryDiscountTable'
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />

      <span className='d-flex justify-content-center mt-4'>
        <CustomButton
          applyClass='publishForwardsBtn'
          value={"Publish Discounting"}
        />
      </span>
    </>
  );
};

export default DealeAndTreasuryDiscountingTable;
