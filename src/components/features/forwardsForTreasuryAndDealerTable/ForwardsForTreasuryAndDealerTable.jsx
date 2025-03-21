import { getTenorWiseForwardsAction } from "@/container/pages/mainDealer/dealerActions";
import { useDealerAndTreasury } from "@/context/DealerAndTreasuryContext";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const ForwardsForTreasuryAndBranchTable = ({
  newTenorRecord,
  setNewTenorRecord,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forwardsForTreasuryBranch, setForwardsForTreasuryBranch } =
    useDealerAndTreasury();

    console.log(forwardsForTreasuryBranch, "forwardsForTreasuryBranchforwardsForTreasuryBranch")
  const getTenorWiseForwardsRates = useSelector(
    (state) => state.uploadRatesSlicer.getTenorWiseForwardsRates
  );
  console.log(getTenorWiseForwardsRates, "forwardsForTreasuryBranchforwardsForTreasuryBranch")

  useEffect(() => {
    dispatch(getTenorWiseForwardsAction({ navigate }));
  }, []);

  useEffect(() => {
    if (newTenorRecord !== null) {
      setForwardsForTreasuryBranch([...forwardsForTreasuryBranch, newTenorRecord]);
      setNewTenorRecord(null);
    }
  }, [newTenorRecord]);

  useEffect(() => {
    if (getTenorWiseForwardsRates !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          getTenorWiseForwardsRates.responseResult;

          console.log(currentTenorWiseForwardRates, "currentTenorWiseForwardRatescurrentTenorWiseForwardRates")
        if (currentTenorWiseForwardRates.length > 0) {
          setForwardsForTreasuryBranch(currentTenorWiseForwardRates)

        }
        // if (lastTenorWiseForwardRates.length > 0) {
        //   setForwardsForTreasuryBranch(lastTenorWiseForwardRates)

        // }
      } catch (error) {}
    }
  }, [getTenorWiseForwardsRates]);

 
  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenorID",
          key: "tenorID",
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
              dataSource={forwardsForTreasuryBranch}
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
