import {
  getTenorWiseForwardsAction,
  PublishTenorWiseForwardsAction,
} from "@/container/pages/mainDealer/dealerActions";
import { useDealerAndTreasury } from "@/context/DealerAndTreasuryContext";
import { formatCurrencyInput } from "@/utils/formatters";
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

  const getTenorWiseForwardsRates = useSelector(
    (state) => state.dealerReducer.getTenorWiseForwardsRates
  );

  const publishTenorwiseForwardRates = useSelector(
    (state) => state.dealerReducer.publishTenorwiseForwardRates
  );

  useEffect(() => {
    dispatch(getTenorWiseForwardsAction({ navigate }));
  }, []);

  useEffect(() => {
    if (newTenorRecord !== null) {
      setForwardsForTreasuryBranch([
        ...forwardsForTreasuryBranch,
        newTenorRecord,
      ]);
      setNewTenorRecord(null);
    }
  }, [newTenorRecord]);

  useEffect(() => {
    if (publishTenorwiseForwardRates !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          publishTenorwiseForwardRates;

        let newDataMap = currentTenorWiseForwardRates.map((item) => {
          let findData = lastTenorWiseForwardRates.find(
            (data) => data.tenorID === item.tenorID
          );
          if (findData !== undefined) {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: findData.bid,
              lastAsk: findData.ask,
              dateTime: item.dateTime,
            };
          } else {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: "",
              lastAsk: "",
              dateTime: item.dateTime,
            };
          }
        });
        setForwardsForTreasuryBranch(newDataMap);
      } catch (error) {
        console.log(error, "errorerrorerrorerror");
      }
    }
  }, [publishTenorwiseForwardRates]);

  useEffect(() => {
    if (getTenorWiseForwardsRates !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          getTenorWiseForwardsRates;

        let newDataMap = currentTenorWiseForwardRates.map((item) => {
          let findData = lastTenorWiseForwardRates.find(
            (data) => data.tenorID === item.tenorID
          );
          if (findData !== undefined) {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: findData.bid,
              lastAsk: findData.ask,
              dateTime: item.dateTime,
            };
          } else {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: "",
              lastAsk: "",
              dateTime: item.dateTime,
            };
          }
        });
        setForwardsForTreasuryBranch(newDataMap);
      } catch (error) {
        console.log(error, "errorerrorerrorerror");
      }
    }
  }, [getTenorWiseForwardsRates]);

  const handleDeleteTenorRecord = (record) => {
    const filteredRecords = forwardsForTreasuryBranch.filter(
      (item) => item.tenorID !== record.tenorID
    );

    setForwardsForTreasuryBranch(filteredRecords);
  };
  const handleChangeCurrentForwards = (record, view, event) => {
    const { value } = event.target;
    try {
      setForwardsForTreasuryBranch((prev) => {
        return prev.map((item) => {
          if (item.tenorID === record.tenorID) {
            return {
              ...item,
              currentBid:
                view === "bid" ? formatCurrencyInput(value) : item.currentBid,
              currentAsk:
                view === "ask" ? formatCurrencyInput(value) : item.currentAsk,
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.log(error);
    }


  };

  const handlePublishForwards = () => {
    let checkDoNotempty = forwardsForTreasuryBranch.every(
      (item) => item.currentAsk !== "" && item.currentBid !== ""
    );
    if (checkDoNotempty) {
      let Data = {
        CurrentTenorWiseForwardRates: forwardsForTreasuryBranch.map((item) => {
          return {
            TenorID: item.tenorID,
            Bid: Number(item.currentBid),
            Ask: Number(item.currentAsk),
            DateTime: item.dateTime,
          };
        }),
      };
      dispatch(PublishTenorWiseForwardsAction({ Data, navigate }));
    } else {
      alert("Please fill all the fields");
    }
  };

  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
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
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.currentBid}
                  onChange={(event) =>
                    handleChangeCurrentForwards(record, "bid", event)
                  }
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "currentAsk",
          key: "currentAsk",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.currentAsk}
                  onChange={(event) =>
                    handleChangeCurrentForwards(record, "ask", event)
                  }
                  applyClass={"DealerTableBitInput"}
                />
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
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.lastBid}
                  disabled={true}
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "lastAsk",
          key: "lastAsk",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.lastAsk}
                  disabled={true}
                  applyClass={"DealerTableBitInput"}
                />
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
          render: (record) => {
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
                          onClick={() => handleDeleteTenorRecord(record)}
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
                  onClick={handlePublishForwards}
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
