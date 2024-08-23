import React, { lazy, Suspense } from "react";
// import GlobalTable from "../../common/table/GlobalTable";

// Define condition to include components
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

// Conditionally import components based on environment variables
const InputFIeld = shouldIncludeComponents
  ? lazy(() => import("../../common/inputField/InputField"))
  : null;

const CustomButton = shouldIncludeComponents
  ? lazy(() => import("../../common/globalButton/button"))
  : null;

const IconElement = shouldIncludeComponents
  ? lazy(() => import("../../common/IconElement/IconElement"))
  : null;

const GlobalTable = shouldIncludeComponents
  ? lazy(() => import("../../common/table/GlobalTable"))
  : null;

const ForwardsForTreasuryAndBranchTable = () => {
  const dataSource = [
    { key: "1", tenor: "O N" },
    { key: "2", tenor: "1 WEEK" },
    { key: "3", tenor: "2 WEEK" },
    { key: "4", tenor: "1 MONTH" },
    { key: "5", tenor: "2 MONTH" },
    { key: "6", tenor: "3 MONTH" },
    { key: "7", tenor: "4 MONTH" },
    { key: "8", tenor: "5 MONTH" },
    { key: "9", tenor: "6 MONTH" },
    { key: "10", tenor: "7 MONTH" },
    { key: "11", tenor: "8 MONTH" },
    { key: "12", tenor: "9 MONTH" },
    { key: "13", tenor: "10 MONTH" },
    { key: "14", tenor: "11 MONTH" },
    { key: "15", tenor: "1 YEAR" },
    { key: "16", tenor: "8 DAY" },
  ];

  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          width: 250,
        },
      ],
    },
    {
      title: "Current",
      children: [
        {
          title: "Bid",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld type='number' applyClass={"DealerTableBitInput"} />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "currentAsk",
          key: "currentAsk",
          align: "center",
          render: () =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld type='number' applyClass={"DealerTableBitInput"} />
              </Suspense>
            ) : null,
        },
      ],
    },
    {
      title: "Last",
      children: [
        {
          title: "Bid",
          dataIndex: "lastBid",
          key: "lastBid",
          align: "center",
          render: () =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld type='number' applyClass={"DealerTableBitInput"} />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "lastAsk",
          key: "lastAsk",
          align: "center",
          render: () =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld type='number' applyClass={"DealerTableBitInput"} />
              </Suspense>
            ) : null,
        },
      ],
    },
    {
      title: "",
      key: "",
      children: [
        {
          title: "",
          dataIndex: "",
          key: "",
          width: 80,
          align: "center",
          render: () => {
            return (
              CustomButton &&
              IconElement && (
                <Suspense fallback={<div>Loading button...</div>}>
                  <CustomButton
                    type='link'
                    icon={
                      <Suspense fallback={<div>Loading icon...</div>}>
                        <IconElement
                          iconClass={"icon-trash color-red fs-6 cursor-pointer"}
                        />
                      </Suspense>
                    }
                  />
                </Suspense>
              )
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      {GlobalTable && (
        <>
          <Suspense fallback={<div>Loading Table...</div>}>
            <GlobalTable
              columns={columns}
              dataSource={dataSource}
              prefixCls={"ForwardsForTreasuryAndBranchTable"}
              pagination={false}
            />
            {CustomButton && (
              <span className='d-flex justify-content-center mt-4'>
                <CustomButton
                  applyClass='publishForwardsBtn'
                  value={"Publish Forwards"}
                />
              </span>
            )}
          </Suspense>
        </>
      )}
    </>
  );
};

export default ForwardsForTreasuryAndBranchTable;
