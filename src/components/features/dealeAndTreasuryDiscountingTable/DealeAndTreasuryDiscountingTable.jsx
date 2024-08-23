import React, { Suspense, lazy } from "react";

// Define condition to include components
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const GlobalTable = shouldIncludeComponents
  ? lazy(() => import("../../common/table/GlobalTable"))
  : null;

// Conditionally import components based on environment variables
const InputFIeld = shouldIncludeComponents
  ? lazy(() => import("../../common/inputField/InputField"))
  : null;

const CustomButton = shouldIncludeComponents
  ? lazy(() => import("../../common/globalButton/button"))
  : null;

const DealeAndTreasuryDiscountingTable = () => {
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
      render: (value) =>
        InputFIeld && (
          <InputFIeld
            type='number'
            applyClass='DealerTableBitInput'
            valu={value}
          />
        ),
    },
    {
      title: "Previous Rate %",
      dataIndex: "previousRate",
      key: "previousRate",
      align: "center",
      render: (value) =>
        InputFIeld && (
          <InputFIeld
            type='number'
            defaultValue={value}
            applyClass='DealerTableBitInput'
          />
        ),
    },
  ];
  return (
    <>
      {GlobalTable && (
        <Suspense fallback={<div>Loading button...</div>}>
          <GlobalTable
            prefixCls='DealerAndTreasuryDiscountTable'
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />{" "}
          {CustomButton && (
            <span className='d-flex justify-content-center mt-4'>
              <CustomButton
                applyClass='publishForwardsBtn'
                value={"Publish Discounting"}
              />
            </span>
          )}
        </Suspense>
      )}
    </>
  );
};

export default DealeAndTreasuryDiscountingTable;
