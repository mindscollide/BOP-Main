import NotificationSnackBar from "@/components/common/NotificationSnackbar";
import {
  getTenorWiseForwardsAction,
  PublishTenorWiseForwardsAction,
} from "@/container/pages/mainDealer/dealerActions";
import {
  setForwardsForTreasuryBranch,
  updateForwardItem,
} from "@/store/dealerReducer/dealerSlicer";
import { tenorWiseFowardsRatesPublishedActions } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
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

/**
 * ForwardsForTreasuryAndBranchTable component is responsible for displaying and managing
 * the forwards for treasury and dealer branch data in a tabular format.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.newTenorRecord - The new tenor record to be added.
 * @param {Function} props.setNewTenorRecord - Function to set the new tenor record.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <ForwardsForTreasuryAndBranchTable
 *   newTenorRecord={newTenorRecord}
 *   setNewTenorRecord={setNewTenorRecord}
 * />
 */
const TenoreWiseCurrentAndLastRates = ({
  newTenorRecord,
  setNewTenorRecord,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const marketStatus = useSelector(
    (state) => state.RealtimeActionsSlice.marketStatus
  );

  const forwardsForTreasuryBranch = useSelector(
    (state) => state.dealerReducer.forwardsForTreasuryBranch
  );

  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getTenorWiseForwardsRates = useSelector(
    (state) => state.RealtimeActionsSlice.tenorWiseForwardsRates
  );

  // state for NotificationSnackbar
  const [snackbarData, setSnackbarData] = useState({
    message: "",
  });

  useEffect(() => {
    if (newTenorRecord !== null) {
      let newData = [...forwardsForTreasuryBranch, newTenorRecord];
      dispatch(setForwardsForTreasuryBranch(newData));

      setNewTenorRecord(null);
    }
  }, [newTenorRecord]);

  useEffect(() => {
    if (snackbarData.message !== "") {
      const timer = setTimeout(() => {
        setSnackbarData({ message: "" });
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [snackbarData.message]);

  useEffect(() => {
    if (getDashboardForwards !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          getDashboardForwards;

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
        dispatch(setForwardsForTreasuryBranch(newDataMap));
      } catch (error) {
        console.log(error, "errorerrorerrorerror");
      }
    }
  }, [getDashboardForwards]);

  useEffect(() => {
    if (getTenorWiseForwardsRates !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          getTenorWiseForwardsRates.tenorWiseForwardRates;
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
        dispatch(setForwardsForTreasuryBranch(newDataMap));

        dispatch(tenorWiseFowardsRatesPublishedActions(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [getTenorWiseForwardsRates]);

  const handleDeleteTenorRecord = (record) => {
    const filteredRecords = forwardsForTreasuryBranch.filter(
      (item) => item.tenorID !== record.tenorID
    );

    dispatch(setForwardsForTreasuryBranch(filteredRecords));
  };
  const handleChangeCurrentForwards = (record, view, event) => {
    const { value } = event.target;
    try {
      dispatch(
        updateForwardItem({
          tenorID: record.tenorID,
          view,
          value,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublishForwards = () => {
    let checkDoNotempty = forwardsForTreasuryBranch.every(
      (item) => item.currentAsk !== "" && item.currentBid !== ""
    );

    if (!checkDoNotempty) {
      setSnackbarData({
        message: "Please fill all required fields.",
      });
      return;
    }

    let checkAskValue = forwardsForTreasuryBranch.find(
      (item) => Number(item.currentAsk) <= Number(item.currentBid)
    );

    console.log(checkAskValue, "Checkerchecker");

    if (checkAskValue !== undefined) {
      setSnackbarData({
        message: "Ask value must be greater than Bid value.",
      });
      return;
    }

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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                    type="link"
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
              <span className="d-flex justify-content-center mt-4">
                <CustomButton
                  applyClass="publishForwardsBtn"
                  value={"Publish Forwards"}
                  onClick={handlePublishForwards}
                  disabled={marketStatus === false ? true : false}
                />
              </span>
            )}
          </Suspense>
        </>
      )}

      <NotificationSnackBar message={snackbarData.message} />
    </>
  );
};

export default TenoreWiseCurrentAndLastRates;
