import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomButton from "@/components/common/globalButton/button";
import CommentModal from "../commentModal/CommentModal";
import { getAllChatByTransactionId } from "@/components/features/chatBox/ChatActions";
import { useNavigate } from "react-router-dom";
import { formatDateTimeToUTCTime } from "@/components/utils/timeFunction";
import {
  BlotterDataAPI,
  AcceptRFQTransaction,
  RejectRFQTransaction,
  RequestCancellation,
  CancelPendingTransactionApi,
  ExpireRFQTransaction,
  GetSpotTransactionDetailsApi,
  GetForwardTransactionDetailsApi,
  GetFEDiscountingTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
} from "../BlotterActions";
import CancelReasonModal from "../cancelReasonModal/cancelReasonModal";
import {
  BlotterTransactionAccepted,
  BlotterTransactionAdded,
  BlotterTransactionCancellationRequest,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  TransactionAssignedByTreasury,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { RFQTImer } from "@/components/utils/Timer";
import { convertDateTimeIntoLocal, formatPkAmount } from "@/utils/formatters";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { useNotification } from "@/context/NotificationProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Empty } from "antd";

const TXNSummary = () => {
  // Hook initializations
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation hook
  const { showMessage } = useNotification(); // Notification context hook

  // Refs for Intersection Observer and table container
  const observer = useRef();
  const tableContainerRef = useRef();

  // Redux state selectors for real-time transaction updates
  const blotterTransactionRFQExpired = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQExpired
  );
  const blotterTransactionRFQQuoted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQQuoted
  );
  const blotterTransactionAccepted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAccepted
  );
  const blotterTransactionCancellationRequest = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionCancellationRequestData
  );
  const blotterTransactionAdded = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAdded
  );
  const blotterTranscationCancelled = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelled
  );
  const blotterTransactionRejected = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejected
  );
  const transactionAssignedByTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.TransactionAssignedByTreasury
  );

  const GetSpotTransactionDetailsApiLoading = useSelector(
    (state) => state.BlotterSlicer.GetSpotTransactionDetailsApiLoading
  );
  const GetForwardTransactionDetailsApiLoading = useSelector(
    (state) => state.BlotterSlicer.GetForwardTransactionDetailsApiLoading
  );
  const GetNonFEDiscountingTransactionDetailsApiLoading = useSelector(
    (state) =>
      state.BlotterSlicer.GetNonFEDiscountingTransactionDetailsApiLoading
  );
  const GetFEDiscountingTransactionDetailsApiLoading = useSelector(
    (state) => state.BlotterSlicer.GetFEDiscountingTransactionDetailsApiLoading
  );

  const getAllChatByTransactionIdLoading = useSelector(
    (state) => state.chatSlicer.getAllChatByTransactionIdLoading
  );

  // State for cancellation modal and related data
  const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [cancelReasonComment, setCancelReasonComment] = useState("");
  const [cancelType, setCancelType] = useState("");
  const [cancelTransactionID, setCancelTransactionID] = useState(0);

  // Hardcoded filter options (likely for dropdown filters)
  const TXN_ID_OPTIONS = [
    "09-09-2024/0568",
    "09-09-2024/4798",
    "09-09-2024/bd2e",
    "09-09-2024/d1f2",
  ];
  const CustomerName_OPTIONS = ["Gul Ahmed"];
  const TYPE_OPTIONS = ["Buy", "Sell"];
  const Nature_OPTIONS = ["1", "6"];
  const CCY1_OPTIONS = ["USD"];
  const Amount_OPTIONS = ["098,098", "234,234"];
  const Rate_OPTIONS = ["288.00", "289.00"];
  const CCY2_OPTIONS = ["PKR"];
  const Amount2_OPTIONS = ["NaN"];
  const Time_OPTIONS = ["16:33 pm", "16:47 pm", "16:48 pm", "16:50 pm"];
  const LCno_OPTIONS = ["098098", "234234"];
  const Accno_OPTIONS = ["234234234234234234234234"];
  const Status_OPTIONS = ["Pending"];

  const [statusOptions, setStatusOptions] = useState([]); // State for dynamic status options

  // Global state for blotter data from Redux store
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.BlotterSlicer.getBlotterApiData
  );

  // Local state management
  const [blotterdata, setBlotterdata] = useState([]); // Main data array for table
  const [totalRecord, setTotalRecords] = useState(0); // Total records count
  const [sRow, setRow] = useState(0); // Starting row for pagination
  const [hasReachedBottom, setHasReachedBottom] = useState(false); // Infinite scroll flag
  const [showCommentModal, setShowCommentModal] = useState(false); // Comment modal visibility
  const [comment, setComment] = useState(""); // Comment text
  const [openExportDiv, setOpenExportDiv] = useState(false); // Export options visibility

  // Load more data function for infinite scrolling
  const loadMore = useCallback(async () => {
    // Prevent loading if already at bottom or no more records
    if (hasReachedBottom || totalRecord <= blotterdata.length) return;

    setHasReachedBottom(true); // Set loading state

    // Prepare data for API call
    let Data = { sRow: sRow, Length: 10 };
    dispatch(BlotterDataAPI({ navigate, Data }));
  }, [hasReachedBottom, totalRecord, blotterdata.length, sRow]);

  // Intersection Observer callback for infinite scrolling
  const lastRowRef = useCallback(
    (node) => {
      if (hasReachedBottom || !tableContainerRef.current) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer to detect when last row is visible
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore(); // Load more data when last row is visible
          }
        },
        {
          root: tableContainerRef.current, // Use table container as root
          threshold: 1.0, // Fully visible threshold
        }
      );

      if (node) observer.current.observe(node); // Observe the last row
    },
    [hasReachedBottom, loadMore]
  );

  // Effect to handle initial data load and updates from API
  useEffect(() => {
    try {
      if (GlobalStateGetBlotterData !== null) {
        const { tnxSummary, totalCount } = GlobalStateGetBlotterData;

        if (hasReachedBottom) {
          // Append new data when scrolling
          setBlotterdata((prevData) => [...prevData, ...tnxSummary]);
          setTotalRecords(totalCount);
          setRow((prevRow) => prevRow + tnxSummary.length);
          setHasReachedBottom(false); // Reset loading state
        } else {
          // Initial data load
          setBlotterdata(tnxSummary);
          setTotalRecords(totalCount);
          setRow(tnxSummary.length);
        }
      } else if (GlobalStateGetBlotterData === null) {
        // Reset data if API returns null
        if (!hasReachedBottom) {
          setHasReachedBottom(false);
          setBlotterdata([]);
          setTotalRecords(0);
          setRow(0);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GlobalStateGetBlotterData]);

  // Effect to handle RFQ expired real-time updates
  useEffect(() => {
    if (blotterTransactionRFQExpired !== null) {
      try {
        const { transaction } = blotterTransactionRFQExpired;

        // Check if transaction already exists
        let isAlreadyExist = blotterdata.find(
          (data2, index) =>
            data2.pK_TransactionID === transaction.pK_TransactionID
        );

        if (isAlreadyExist !== undefined) {
          // Update existing transaction
          setBlotterdata((prevBlotterData) =>
            prevBlotterData.map((item) =>
              item.pK_TransactionID === transaction.pK_TransactionID
                ? transaction
                : item
            )
          );
        } else {
          // Add new transaction
          setTotalRecords((prevTotal) => prevTotal + 1);
          setRow((prevTotal) => prevTotal + 1);
          setBlotterdata([transaction, ...blotterdata]);
        }

        // Reset real-time action state
        dispatch(BlotterTransactionRFQExpired(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionRFQExpired]);

  // Similar effects for other real-time actions (accepted, quoted, cancellation, etc.)
  // Each follows the same pattern: check if exists → update or add → reset action state

  useEffect(() => {
    if (blotterTransactionAccepted !== null) {
      try {
        const { transaction } = blotterTransactionAccepted;
        let isAlreadyExist = blotterdata.find(
          (data2, index) =>
            data2.pK_TransactionID === transaction.pK_TransactionID
        );
        if (isAlreadyExist !== undefined) {
          setBlotterdata((prevBlotterData) =>
            prevBlotterData.map((item) =>
              item.pK_TransactionID === transaction.pK_TransactionID
                ? transaction
                : item
            )
          );
        } else {
          setTotalRecords((prevTotal) => prevTotal + 1);
          setRow((prevTotal) => prevTotal + 1);
          setBlotterdata([transaction, ...blotterdata]);
        }

        dispatch(BlotterTransactionAccepted(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionAccepted]);

  useEffect(() => {
    if (blotterTransactionRFQQuoted !== null) {
      try {
        const { transaction } = blotterTransactionRFQQuoted;
        // Update specific fields for quoted transactions
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.map((tblData, index) => {
            if (tblData.pK_TransactionID === transaction.pK_TransactionID) {
              return {
                ...tblData,
                bid: transaction.bid,
                offer: transaction.offer,
                statusID: transaction.statusID,
                rfqTimerDetails: transaction.rfqTimerDetails,
                amount: transaction.amount,
                rate: transaction.rate,
              };
            }
            return tblData;
          });
        });
        dispatch(BlotterTransactionRFQQuoted(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQQuoted");
      }
    }
  }, [blotterTransactionRFQQuoted]);
  useEffect(() => {
    if (blotterTransactionCancellationRequest !== null) {
      try {
        try {
          const { transaction } = blotterTransactionCancellationRequest;
          let isAlreadyExist = blotterdata.find(
            (data2, index) =>
              data2.pK_TransactionID === transaction.pK_TransactionID
          );
          if (isAlreadyExist !== undefined) {
            setBlotterdata((prevBlotterData) =>
              prevBlotterData.map((item) =>
                item.pK_TransactionID === transaction.pK_TransactionID
                  ? transaction
                  : item
              )
            );
          }
          dispatch(BlotterTransactionCancellationRequest(null));
        } catch (error) {
          console.log(error, "error in blotterTransactionRFQExpired");
        }
      } catch (error) {
        console.log(error, "error in blotterTransactionCancellationRequest");
      }
    }
  }, [blotterTransactionCancellationRequest]);

  useEffect(() => {
    if (blotterTranscationCancelled !== null) {
      const { transaction } = blotterTranscationCancelled;
      let isAlreadyExist = blotterdata.find(
        (data2, index) =>
          data2.pK_TransactionID === transaction.pK_TransactionID
      );
      if (isAlreadyExist !== undefined) {
        setBlotterdata((prevBlotterData) =>
          prevBlotterData.map((item) =>
            item.pK_TransactionID === transaction.pK_TransactionID
              ? transaction
              : item
          )
        );
      } else {
        setTotalRecords((prevTotal) => prevTotal + 1);
        setRow((prevTotal) => prevTotal + 1);

        setBlotterdata([transaction, ...blotterdata]);
      }
    }
  }, [blotterTranscationCancelled]);

  useEffect(() => {
    if (blotterTransactionRejected !== null) {
      const { transaction } = blotterTransactionRejected;
      let isAlreadyExist = blotterdata.find(
        (data2, index) =>
          data2.pK_TransactionID === transaction.pK_TransactionID
      );
      if (isAlreadyExist !== undefined) {
        setBlotterdata((prevBlotterData) =>
          prevBlotterData.map((item) =>
            item.pK_TransactionID === transaction.pK_TransactionID
              ? transaction
              : item
          )
        );
      } else {
        setTotalRecords((prevTotal) => prevTotal + 1);
        setRow((prevTotal) => prevTotal + 1);

        setBlotterdata([transaction, ...blotterdata]);
      }
    }
  }, [blotterTransactionRejected]);

  useEffect(() => {
    if (blotterTransactionAdded !== null) {
      try {
        const { transaction } = blotterTransactionAdded;
        let ishasAlready = blotterdata.find(
          (data, index) =>
            data.pK_TransactionID === transaction.pK_TransactionID
        );
        if (!ishasAlready) {
          setTotalRecords((prevTotal) => prevTotal + 1);
          setBlotterdata([transaction, ...blotterdata]);
          setRow((prevTotal) => prevTotal + 1);

          dispatch(BlotterTransactionAdded(null));
        }
      } catch (error) {
        console.log(error, "error in blotterTransactionAdded");
      }
    }
  }, [blotterTransactionAdded]);

  useEffect(() => {
    if (transactionAssignedByTreasury !== null) {
      try {
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.map((tblData) => {
            if (
              tblData.pK_TransactionID ===
              transactionAssignedByTreasury.transactionID
            ) {
              return {
                ...tblData,
                statusID: transactionAssignedByTreasury.statusID,
                treasuryPersonID:
                  transactionAssignedByTreasury.treasuryPersonID,
              };
            }
            return tblData; // ✅ return individual item, not whole array
          });
        });
        dispatch(TransactionAssignedByTreasury(null));
      } catch (error) {
        console.log(error, "error in TransactionAssignedByTreasury");
      }
    }
  }, [transactionAssignedByTreasury]);

  // Handler for showing comment modal
  const handleShowCommentModal = (text) => {
    setShowCommentModal(true);
    setComment(text);
  };

  // Handler for export options toggle
  const onClickOpenExport = () => {
    setOpenExportDiv(!openExportDiv);
  };

  const [chatUserId, setChatUserId] = useState(null);

  // Handler for opening chat modal
  const handleClickChat = (
    txnID,
    treasuryPersonID,
    natureType,
    natureTypeId,
    clientName
  ) => {
    let Data = {
      TranscationID: txnID,
    };
    setChatUserId(txnID);
    let ChatData = {
      natureType,
      natureTypeId,
      clientName,
    };
    dispatch(
      getAllChatByTransactionId({
        navigate,
        Data,
        treasuryPersonID,
        ChatData,
      })
    );
  };

  const [infoUserId, setInfoUserId] = useState(null);
  // Handler for viewing transaction details
  const handleClickInfo = (record) => {
    setInfoUserId(record.pK_TransactionID);
    let Data = {
      PK_TransactionID: record.pK_TransactionID,
    };

    // Dispatch appropriate API based on transaction nature type
    if (record.natureType === 1) {
      dispatch(GetSpotTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 2) {
      dispatch(GetForwardTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 3) {
      dispatch(GetFEDiscountingTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 4) {
      dispatch(GetNonFEDiscountingTransactionDetailsApi({ navigate, Data }));
    }
  };

  // Handler for various transaction actions (accept, reject, cancel)
  const handleCheckerAccept = (transactionID, type) => {
    if (type === "Accepted") {
      let Data = { PK_TransactionID: transactionID };
      dispatch(AcceptRFQTransaction({ Data, navigate }));
    } else if (type === "Rejected") {
      setCancelReasonModal(true);
      setCancelType(type);
      setCancelTransactionID(transactionID);
    } else if (type === "Cancelled") {
      setCancelReasonModal(true);
      setCancelType(type);
      setCancelTransactionID(transactionID);
    } else if (type === "CancelTransaction") {
      setCancelReasonModal(true);
      setCancelType(type);
      setCancelTransactionID(transactionID);
    }
  };
  // const [rejectTranId, setRejectTranId] = useState(null);
  // Handler for submitting cancellation reason
  const handleClickReasonSubmit = useCallback(() => {
    // setRejectTranId(cancelTransactionID);
    if (cancelReasonComment.trim() === "") {
      showMessage("Please enter a reason for cancellation");
      return;
    }

    // Dispatch appropriate action based on cancellation type
    if (cancelType === "Cancelled") {
      let Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };
      dispatch(RequestCancellation({ Data, navigate, setCancelReasonModal }));
    } else if (cancelType === "CancelTransaction") {
      let Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };
      dispatch(
        CancelPendingTransactionApi({ navigate, Data, setCancelReasonModal })
      );
    } else if (cancelType === "Rejected") {
      let Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };
      dispatch(RejectRFQTransaction({ Data, navigate, setCancelReasonModal }));
    }
  }, [
    cancelType,
    cancelTransactionID,
    cancelReasonModal,
    cancelReasonComment,
    setCancelReasonModal,
  ]);

  // Handler for closing reason modal
  const handleCloseReasonModal = useCallback(() => {
    setCancelReasonModal(false);
    setCancelType("");
    setCancelTransactionID(0);
    setCancelReasonComment("");
  }, [cancelType, cancelTransactionID, cancelReasonModal, cancelReasonComment]);

  // ActionButtons component for table actions column
  const ActionButtons = ({ record }) => {
    return (
      <Box display="flex" justifyContent="end" alignItems={"center"} gap={1}>
        {/* Conditional rendering based on transaction status */}
        {record.statusID === 5 || record.statusID === 4 ? (
          <CustomButton
            loading={
              record.pK_TransactionID === chatUserId &&
              getAllChatByTransactionIdLoading
            }
            icon={<i className="icon-chat2"></i>}
            size={"small"}
            className="btn btn-sm btn-danger chat-btn-trigge blotterCheckerButtonr d-flex justify-content-center align-items-center"
            onClick={() =>
              handleClickChat(
                record.pK_TransactionID,
                record.treasuryPersonID,
                record.natureType,
                record.natureTypeId,
                record.corporateName
              )
            }
          />
        ) : record.statusID === 3 || record.statusID === 7 ? (
          <CustomButton
            icon={<i className="icon-view-comment blotterTableIconSize " />}
            size={"small"}
            className="btn btn-sm btn-primary d-flex justify-content-center align-items-center"
            onClick={() => handleShowCommentModal(record.comment)}
          />
        ) : null}
        {/* Info button for transaction details */}
        <CustomButton
          loading={
            infoUserId === record.pK_TransactionID &&
            (GetSpotTransactionDetailsApiLoading ||
              GetForwardTransactionDetailsApiLoading ||
              GetNonFEDiscountingTransactionDetailsApiLoading ||
              GetFEDiscountingTransactionDetailsApiLoading)
          }
          onClick={() => handleClickInfo(record)}
          size={"small"}
          icon={
            <svg
              id="info_Layer_1"
              x="0px"
              y="0px"
              width="12px"
              height="12px"
              fill="#ffffff"
              viewBox="0 0 55 55"
            >
              <g>
                <path d="M41.407,45.858c0.067,0.838,0.156,1.672,0.183,2.508   c0.005,0.152-0.205,0.376-0.37,0.461c-1.347,0.687-2.679,1.416-4.069,2.005c-3.305,1.396-6.715,2.5-10.277,3.009   c-1.447,0.206-2.936,0.154-4.403,0.153c-0.477-0.001-0.968-0.178-1.424-0.345c-1.313-0.481-1.98-1.443-1.948-2.85   c0.015-0.583,0.103-1.179,0.253-1.744c1.863-7.013,3.752-14.02,5.61-21.037c0.199-0.751,0.327-1.543,0.341-2.318   c0.021-1.142-0.615-1.925-1.667-2.331c-1.605-0.618-3.258-0.468-4.89-0.161c-1.764,0.332-3.468,0.873-5.149,1.884   c-0.074-0.978-0.157-1.863-0.187-2.75c-0.005-0.127,0.234-0.307,0.396-0.388c1.334-0.67,2.648-1.389,4.021-1.968   c3.327-1.403,6.755-2.512,10.337-3.021c1.465-0.208,2.994-0.294,4.457-0.125c2.782,0.323,3.808,2.02,3.073,4.73   c-0.94,3.474-1.914,6.941-2.838,10.419c-1.049,3.953-2.087,7.912-3.077,11.879c-0.524,2.107,0.385,3.449,2.526,3.839   c2.048,0.376,4.038-0.017,5.981-0.634C39.313,46.75,40.296,46.295,41.407,45.858z"></path>
                <circle cx="27.5" cy="7.608" r="6.609"></circle>
              </g>
            </svg>
          }
          className="btn btn-sm btn-primary info-btn-trigger ms-1 d-flex justify-content-center align-items-center"
        />
      </Box>
    );
  };

  // Function to generate table columns configuration
  const getColumns = () => {
    const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
    const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

    // Common columns for all environments
    const commonColumns = [
      {
        id: "txnid",
        label: "TXN ID",
        align: "center",
        width: 120,
        render: (record) => record.txnid,
      },
      {
        id: "corporateName",
        label: "Customer Name",
        width: 150,
        render: (record) => record.corporateName,
      },
      {
        id: "side",
        label: "Type",
        width: 60,
        render: (record) => record.side,
      },
      {
        id: "nature",
        label: "Nature",
        width: 120,
        align: "center",
        render: (record) => record.nature,
      },
      {
        id: "ccY1",
        label: "CCY1",
        width: 60,
        render: (record) => record.ccY1,
      },
      {
        id: "quantity",
        label: "TXN Amount",
        align: "center",
        width: 120,
        render: (record) => formatPkAmount(record.quantity),
      },
      {
        id: "rate",
        label: "Rate",
        width: 80,
        align: "center",
        render: (record) => formatPkAmount(record.rate),
      },
      {
        id: "tenorDays",
        label: "Tenor Days",
        width: 120,
        align: "center",
        render: (record) => {
          if (
            record?.rfqDealDetails !== null &&
            record?.rfqDealDetails !== undefined
          ) {
            return record?.rfqDealDetails?.tenorDays;
          }
          return Number(record.tenorDays) !== 0 ? record.tenorDays : ""; // Placeholder for tenor days
        },
      },
      {
        id: "ccY2",
        label: "CCY2",
        width: 60,
        align: "center",
        render: (record) => record.ccY2,
      },
      {
        id: "amount",
        label: "Total Amount",
        width: 120,
        align: "center",
        render: (record) => formatPkAmount(record.amount),
      },
      {
        id: "tradeDateTime",
        label: "Time",
        width: 80,
        align: "center",
        render: (record) => {
          // RFQ timer logic for expiring transactions
          let Data = { PK_TransactionID: record.pK_TransactionID };
          let isRFQ = record.isRFQ
            ? record.statusID === 4 &&
              record.rfqTimerDetails !== null &&
              record.rfqTimerDetails?.isEnded === false
              ? true
              : false
            : false;
          let rfqTimer =
            isRFQ && record.rfqTimerDetails.endTime
              ? convertDateTimeIntoLocal(record.rfqTimerDetails.endTime)
              : null;
          const serverTime =
            isRFQ && record.rfqTimerDetails?.serverTime
              ? convertDateTimeIntoLocal(
                  record.rfqTimerDetails?.serverTime.replace(/[-:\s]/g, "")
                )
              : null;
          if (record.tradeDateTime) {
            return (
              <span>
                {formatDateTimeToUTCTime(record.tradeDateTime)}{" "}
                {isRFQ && (
                  <RFQTImer
                    severTime={serverTime}
                    endTime={rfqTimer}
                    dispatch={dispatch}
                    apiFunction={ExpireRFQTransaction}
                    navigate={navigate}
                    Data={Data}
                  />
                )}
              </span>
            );
          }
          return null;
        },
      },
      {
        id: "status",
        label: "Status",
        width: 80,
        align: "center",
        render: (record) => (
          <span
            className={
              record.status === "Accepted"
                ? "color-green"
                : record.status === "Cancelled"
                ? "statusCancelledVal"
                : "color-red"
            }
          >
            {record.status}
          </span>
        ),
      },
      {
        id: "checker",
        label: "",
        width: 80,
        render: (record) => (
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Conditional action buttons based on transaction status */}
            {record.statusID === 4 && record.isRFQ === true ? (
              <>
                <CustomButton
                  //  loading =  {rejectTranId === record.pK_TransactionID && }
                  icon={<i className="icon-check"></i>}
                  size={"small"}
                  className="btn btn-sm btn-success me-1 blotterCheckerButton d-flex justify-content-center align-items-center"
                  onClick={() =>
                    handleCheckerAccept(record.pK_TransactionID, "Accepted")
                  }
                />
                <CustomButton
                  icon={<i className="icon-close"></i>}
                  size={"small"}
                  className="btn btn-sm btn-danger me-1 blotterCheckerButton d-flex justify-content-center align-items-center "
                  onClick={() =>
                    handleCheckerAccept(record.pK_TransactionID, "Rejected")
                  }
                />
              </>
            ) : record.statusID === 1 ? (
              <CustomButton
                icon={<i className="icon-close"></i>}
                size={"small"}
                className="btn btn-sm btn-danger me-1 blotterCheckerButton d-flex justify-content-center align-items-center "
                onClick={() =>
                  handleCheckerAccept(record.pK_TransactionID, "Cancelled")
                }
              />
            ) : record.statusID === 2 || record.statusID === 5 ? (
              <CustomButton
                icon={<i className="icon-close"></i>}
                size={"small"}
                className="btn btn-sm btn-danger me-1 blotterCheckerButton d-flex justify-content-center align-items-center"
                onClick={() =>
                  handleCheckerAccept(
                    record.pK_TransactionID,
                    "CancelTransaction"
                  )
                }
              />
            ) : null}
          </Box>
        ),
      },
      {
        id: "actions",
        label: "",
        width: 120,
        render: (record) => <ActionButtons record={record} />,
      },
    ];

    return commonColumns;
  };

  const columns = getColumns();

  // Main component render
  return (
    <>
      {/* Table container with infinite scroll */}
      <TableContainer
        ref={tableContainerRef}
        sx={{ maxHeight: 400, overflow: "auto" }}
        id="TXNSummary_Table"
        style={{ width: "100%", fontSize: "14px" }}
      >
        <Table stickyHeader size="small">
          <TableHead className="TXNSummary_TableHead">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ width: column.width, whiteSpace: "nowrap" }}
                  align={column.align || "left"}
                  sx={{
                    width: column.width,
                    fontWeight: "bold",
                    backgroundColor: "var(--color-primary) !important",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {blotterdata.map((row, index) => {
              const isLast = index === blotterdata.length - 1;
              return (
                <TableRow
                  key={`${row.pK_TransactionID}-${index}`}
                  className={row.statusID === 7 ? "TransactionCancelled" : ""}
                  ref={isLast ? lastRowRef : null} // Attach ref to last row for infinite scroll
                >
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align || "left"}
                        sx={{
                          width: column.width,
                          whiteSpace: "nowrap",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {column.render ? column.render(row) : row[column.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Loading indicator for infinite scroll */}
        {hasReachedBottom && (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={24} />
          </Box>
        )}
        {Array.isArray(blotterdata) && blotterdata.length === 0 && (
          <>
            <Empty
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                maxWidth: "100%",
                textAlign: "center",
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            ></Empty>
          </>
        )}
      </TableContainer>

      {/* Comment Modal */}
      <CommentModal
        comment={comment}
        setShowCommentModal={setShowCommentModal}
        showCommentModal={showCommentModal}
      />

      {/* Cancellation Reason Modal */}
      {cancelReasonModal && (
        <CancelReasonModal
          cancelReasonModal={cancelReasonModal}
          setCancelReasonModal={setCancelReasonModal}
          cancelReasonComment={cancelReasonComment}
          setCancelReasonComment={setCancelReasonComment}
          handleClickReasonSubmit={handleClickReasonSubmit}
          handleCloseReasonModal={handleCloseReasonModal}
        />
      )}
    </>
  );
};

export default TXNSummary;
