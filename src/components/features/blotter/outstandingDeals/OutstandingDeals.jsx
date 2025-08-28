import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Checkbox,
  Popover,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import CustomButton from "@/components/common/globalButton/button";
import CommentModal from "../commentModal/CommentModal";
import {
  AcceptTransactionAPI,
  AcceptTransactionCancellationRequest,
  AssignTransactionAPI,
  ExpireRFQTransaction,
  GetBlotterOutstandingDealsDataAPI,
  GetFEDiscountingTransactionDetailsApi,
  GetForwardTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
  GetSpotTransactionDetailsApi,
  RejectTransactionAPI,
  RejectTransactionCancellationRequest,
} from "../BlotterActions";
import { formatDateTimeToUTCTime } from "@/components/utils/timeFunction";
import {
  setDiscountingQuoteModal,
  setForwardQuoteModal,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import { RFQTImer } from "@/components/utils/Timer";
import { convertDateTimeIntoLocal, formatPkAmount } from "@/utils/formatters";
import {
  BlotterTransactionAccepted,
  BlotterTransactionAdded,
  BlotterTransactionAssigned,
  BlotterTransactionCancellationRequest,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  BlotterTransactionRejected,
  BlotterTranscationCancelled,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { getAllChatByTransactionId } from "@/components/features/chatBox/ChatActions";
import CancelReasonModal from "../cancelReasonModal/cancelReasonModal";
import {
  setDiscountingQuoteModalData,
  setForwardQuoteModalData,
  setSpotQuoteModalData,
} from "@/store/BlotterSlicer/BlotterSlicer";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { useNotification } from "@/context/NotificationProvider";
import { Empty } from "antd";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    overflow: "auto",
    "& .MuiTableHead-root": {
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "var(--color-primary) !important",
    },
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      color: "white",
      backgroundColor: "var(--color-primary) !important",
    },
  },
  statusAccepted: {
    color: "green",
  },
  statusRejected: {
    color: "red",
  },
  statusInProgress: {
    color: "orange",
  },
  statusPending: {
    color: "#ffcc00",
  },
  filterButton: {
    cursor: "pointer",
    color: "white",
    background: "#f56600",
    borderRadius: "4px",
    padding: "2px 4px",
    marginLeft: "4px",
  },
  actionButtons: {
    display: "flex",
    gap: "4px",
    justifyContent: "center",
  },
}));

/**
 * OutstandingDeals component displays a list of outstanding deals in the blotter.
 * It manages the state of various filters and handles updates to the blotter data
 * based on real-time actions from the Redux store.
 *
 * @component
 * @returns {JSX.Element} The rendered OutstandingDeals component.
 */
const OutstandingDeals = ({
  treasuryOutStandingDealRecords,
  treasuryOutStandingDealsRow,
  setHasBottomReachedOutstanding,
  treasuryOutStandingDeal,
  hasBottomReachedOutstanding,
}) => {
  console.log(
    hasBottomReachedOutstanding,
    "hasBottomReachedOutstandinghasBottomReachedOutstanding"
  );
  const classes = useStyles();
  const { showMessage } = useNotification();
  const dispatch = useDispatch();
  const observer = useRef(null);
  const outstandingTableContainerRef = useRef(null);
  const navigate = useNavigate();

  // Hardcoded filter options
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

  // State for filters
  const [open, setOpen] = useState(false);
  const [selectedItemsTXNID, setSelectedItemsTXNID] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [openCustomername, setOpenCustomername] = useState(false);
  const [selectedItemsCustomerName, setSelectedItemsCustomerName] = useState(
    []
  );
  const [openType, setOpenType] = useState(false);
  const [selectedItemsType, setSelectedItemsType] = useState([]);
  const [openNature, setOpenNature] = useState(false);
  const [selectedItemsNature, setSelectedItemsNature] = useState([]);
  const [openCCY1, setOpenCCY1] = useState(false);
  const [selectedItemsCCY1, setSelectedItemsCCY1] = useState([]);
  const [openAmount1, setOpenAmount1] = useState(false);
  const [selectedItemsAmount1, setSelectedItemsAmount1] = useState([]);
  const [openRate, setOpenRate] = useState(false);
  const [selectedItemsRate, setSelectedItemsRate] = useState([]);
  const [openCCY2, setOpenCCY2] = useState(false);
  const [selectedItemsCCY2, setSelectedItemsCCY2] = useState([]);
  const [openAmount2, setOpenAmount2] = useState(false);
  const [selectedItemsAmount2, setSelectedItemsAmount2] = useState([]);
  const [openTime, setOpenTime] = useState(false);
  const [selectedItemsTime, setSelectedItemsTime] = useState([]);
  const [openLCno, setOpenLCno] = useState(false);
  const [selectedItemsLCno, setSelectedItemsLCno] = useState([]);
  const [openAccNO, setOpenAccNO] = useState(false);
  const [selectedItemsAccNO, setSelectedItemsAccNO] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedItemsStatus, setSelectedItemsStatus] = useState([]);

  const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [cancelReasonComment, setCancelReasonComment] = useState("");
  const [cancelType, setCancelType] = useState("");
  const [cancelTransactionID, setCancelTransactionID] = useState(0);

  // Filter handlers (similar to original, but simplified for brevity)
  const handleOpenChange = (newOpen) => setOpen(newOpen);
  const handleSelectAll = () => setSelectedItemsTXNID(TXN_ID_OPTIONS);
  const handleDeselectAll = () => setSelectedItemsTXNID([]);
  const handleCheckboxChange = (checkedValues) =>
    setSelectedItemsTXNID(checkedValues);

  // Load more data function for infinite scrolling
  const loadMore = useCallback(async () => {
    // Prevent loading if already at bottom or no more records
    if (
      hasBottomReachedOutstanding ||
      treasuryOutStandingDealRecords <= treasuryOutStandingDeal.length
    )
      return;

    setHasBottomReachedOutstanding(true); // Set loading state

    // Prepare data for API call
    let Data = { sRow: treasuryOutStandingDeal.length, Length: 10 };
    dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
  }, [
    hasBottomReachedOutstanding,
    setHasBottomReachedOutstanding,
    treasuryOutStandingDealRecords,
    treasuryOutStandingDeal.length,
  ]);

  // Intersection Observer callback for infinite scrolling
  const lastRowRef = useCallback(
    (node) => {
      if (!node) return;

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
          root: outstandingTableContainerRef.current, // Use table container as root
          threshold: 0.1, // Lower threshold to trigger earlier
          rootMargin: "20px",
        }
      );

      if (node) observer.current.observe(node); // Observe the last row
    },
    [loadMore]
  );

  const handleShowCommentModal = (text) => {
    setShowCommentModal(true);
    setComment(text);
  };

  const handleClickAssignTransaction = (record) => {
    let Data = { PK_TransactionID: Number(record.pK_TransactionID) };
    dispatch(AssignTransactionAPI({ navigate, Data }));
  };

  const openViewDeal = (record, natureTypeId) => {
    if (natureTypeId === 1) {
      dispatch(setViewDealModal(true));
      dispatch(setSpotQuoteModalData(record));
    } else if (natureTypeId === 2) {
      dispatch(setForwardQuoteModal(true));
      dispatch(setForwardQuoteModalData(record));
    } else if (natureTypeId === 3 || natureTypeId === 4) {
      dispatch(setDiscountingQuoteModal(true));
      dispatch(setDiscountingQuoteModalData(record));
    }
  };

  const acceptTransaction = (record) => {
    dispatch(
      AcceptTransactionAPI({
        navigate,
        Data: { PK_TransactionID: record.pK_TransactionID },
      })
    );
  };

  const rejectTransaction = (record) => {
    setCancelReasonModal(true);
    setCancelType("Rejected");
    setCancelTransactionID(record.pK_TransactionID);
  };

  const handleAcceptTransactionCancellation = (transactionID) => {
    let Data = { PK_TransactionID: transactionID };
    dispatch(AcceptTransactionCancellationRequest({ navigate, Data }));
  };

  const handleRejectTransactionCancellation = (transactionID) => {
    setCancelReasonModal(true);
    setCancelType("Cancellation");
    setCancelTransactionID(transactionID);
  };

  const handleClickChat = (
    txnID,
    treasuryPersonID,
    natureType,
    natureTypeId,
    clientName
  ) => {
    let Data = { TranscationID: txnID };
    let ChatData = {
      natureType,
      natureTypeId,
      clientName,
    };
    dispatch(
      getAllChatByTransactionId({ navigate, Data, treasuryPersonID, ChatData })
    );
  };

  const handleClickReasonSubmit = useCallback(() => {
    if (cancelReasonComment.trim() === "") {
      showMessage("Please enter a reason for cancellation");
      return;
    }
    if (cancelType === "Rejected") {
      let Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };
      dispatch(RejectTransactionAPI({ navigate, Data, setCancelReasonModal }));
    } else if (cancelType === "Cancellation") {
      let Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };
      dispatch(
        RejectTransactionCancellationRequest({
          navigate,
          Data,
          setCancelReasonModal,
        })
      );
    }
  }, [
    cancelType,
    cancelTransactionID,
    cancelReasonComment,
    setCancelReasonModal,
  ]);

  const handleCloseReasonModal = useCallback(() => {
    setCancelReasonModal(false);
    setCancelType("");
    setCancelTransactionID(0);
    setCancelReasonComment("");
  }, []);

  const handleClickInfo = (record) => {
    let Data = { PK_TransactionID: record.pK_TransactionID };
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

  // Table columns configuration
  const columns = [
    {
      id: "txnid",
      label: "TXN ID",
      align: "center",
      width: 120,
      render: (record) => record.txnid,
    },
    {
      id: "corporateName",
      label: "Client",
      width: 120,
      render: (record) => record.corporateName,
    },
    {
      id: "branchCode",
      label: "Branch Code",
      width: 120,
      align: "center",
      render: (record) => record.branchCode,
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
      id: "bid",
      label: "Bid",
      width: 60,
      align: "center",
      render: (record) => (
        <IndexCell value={formatPkAmount(record.bid, { decimals: 5 })} />
      ),
    },
    {
      id: "offer",
      label: "Offer",
      width: 60,
      align: "center",
      render: (record) => (
        <IndexCell value={formatPkAmount(record.offer, { decimals: 5 })} />
      ),
    },
    {
      id: "ccY1",
      label: "CCY1",
      width: 80,
      align: "center",
      render: (record) => record.ccY1,
    },
    {
      id: "quantity",
      label: "TXN Amount",
      width: 150,
      align: "center",
      render: (record) => <IndexCell value={formatPkAmount(record.quantity)} />,
    },
    {
      id: "ccY2",
      label: "CCY2",
      width: 80,
      align: "center",
      render: (record) => record.ccY2,
    },
    {
      id: "amount",
      label: "Total Amount",
      width: 150,
      align: "center",
      render: (record) => <IndexCell value={formatPkAmount(record.amount)} />,
    },
    {
      id: "tradeDateTime",
      label: "Time",
      width: 60,
      render: (record) => {
        let Data = { PK_TransactionID: record.pK_TransactionID };
        const isRFQ =
          record.isRFQ &&
          record.statusID === 2 &&
          record.rfqTimerDetails !== null &&
          record.rfqTimerDetails?.isEnded === false;
        const isAssignedUser =
          record.statusID === 5 &&
          Number(localStorage.getItem("userID")) ===
            Number(record.treasuryPersonID);
        const rfqTimer =
          (isRFQ || isAssignedUser) && record.rfqTimerDetails?.endTime
            ? convertDateTimeIntoLocal(record.rfqTimerDetails.endTime)
            : null;

        return (
          <span>
            {formatDateTimeToUTCTime(record.tradeDateTime)}{" "}
            {(isRFQ || isAssignedUser) && rfqTimer && (
              <RFQTImer
                endTime={rfqTimer}
                dispatch={dispatch}
                apiFunction={ExpireRFQTransaction}
                navigate={navigate}
                Data={Data}
              />
            )}
          </span>
        );
      },
    },
    {
      id: "status",
      label: "Status",
      width: 80,
      render: (record) => (
        <span
          className={
            record.status === "Accepted"
              ? classes.statusAccepted
              : record.statusID === 5
              ? classes.statusInProgress
              : record.statusID === 2
              ? classes.statusPending
              : classes.statusRejected
          }>
          {record.status}
        </span>
      ),
    },
    {
      id: "actions1",
      label: "Action",
      width: 120,
      render: (record) => (
        <div className={classes.actionButtons}>
          {record.statusID === 2 ? (
            <CustomButton
              icon={<i className='icon-user-check'></i>}
              size={"small"}
              className='btn btn-primary btn-sm d-flex justify-content-center align-items-center'
              onClick={() => handleClickAssignTransaction(record)}
            />
          ) : record.statusID === 6 ? (
            <>
              <CustomButton
                icon={<i className='icon-check'></i>}
                className='btn btn-sm btn-danger d-flex justify-content-center align-items-center'
                size={"small"}
                onClick={() =>
                  handleAcceptTransactionCancellation(record.pK_TransactionID)
                }
              />
              <CustomButton
                icon={<i className='icon-close'></i>}
                className='btn btn-sm btn-success d-flex justify-content-center align-items-center'
                size={"small"}
                onClick={() =>
                  handleRejectTransactionCancellation(record.pK_TransactionID)
                }
              />
            </>
          ) : Number(record?.treasuryPersonID) ===
            Number(localStorage.getItem("userID")) ? (
            record.statusID === 5 ? (
              <>
                {record.isRFQ === true ? (
                  <CustomButton
                    icon={<i className='icon-open'></i>}
                    size={"small"}
                    className='btn btn-sm btn-primary d-flex justify-content-center align-items-center'
                    onClick={() => openViewDeal(record, record.natureType)}
                  />
                ) : record.natureType === 2 ||
                  record.natureType === 3 ||
                  record.natureType === 4 ? (
                  <CustomButton
                    icon={<i className='icon-open'></i>}
                    size={"small"}
                    className='btn btn-sm btn-primary d-flex justify-content-center align-items-center'
                    onClick={() => openViewDeal(record, record.natureType)}
                  />
                ) : (
                  <>
                    <CustomButton
                      icon={<i className='icon-check'></i>}
                      size={"small"}
                      className='btn btn-sm btn-success blotterCheckerButton d-flex justify-content-center align-items-center'
                      onClick={() => acceptTransaction(record)}
                    />
                    <CustomButton
                      icon={<i className='icon-close'></i>}
                      size={"small"}
                      className='btn btn-sm btn-danger blotterCheckerButton d-flex justify-content-center align-items-center'
                      onClick={() => rejectTransaction(record)}
                    />
                  </>
                )}
              </>
            ) : record.statusID === 2 ? (
              <CustomButton
                size={"small"}
                icon={<i className='icon-user-check blotterCheckerButton'></i>}
                className='btn btn-primary d-flex justify-content-center align-items-center'
                onClick={() => handleClickAssignTransaction(record)}
              />
            ) : null
          ) : null}
        </div>
      ),
    },
    {
      id: "actions2",
      label: "",
      width: 120,
      render: (record) => (
        <div className='d-flex justify-content-center align-items-center'>
          {record.statusID === 6 && (
            <CustomButton
              icon={
                <i className='icon-view-comment d-flex justify-content-center align-items-center blotterTableIconSize'></i>
              }
              size={"small"}
              className='btn btn-primary'
              onClick={() => handleShowCommentModal(record.comment)}
            />
          )}
          {(record.statusID === 4 || record.statusID === 5) &&
            Number(record.treasuryPersonID) ===
              Number(localStorage.getItem("userID")) && (
              <CustomButton
                icon={<i className='icon-chat2'></i>}
                size={"small"}
                className='btn btn-danger chat-btn-trigger d-flex justify-content-center align-items-center'
                onClick={() =>
                  handleClickChat(
                    record.pK_TransactionID,
                    record.fK_UserID,
                    record.natureType,
                    record.natureTypeId,
                    record.corporateName
                  )
                }
              />
            )}
          <CustomButton
            onClick={() => handleClickInfo(record)}
            size={"small"}
            icon={
              <svg
                id='info_Layer_1'
                x='0px'
                y='0px'
                width='12px'
                height='12px'
                fill='#ffffff'
                viewBox='0 0 55 55'>
                <g>
                  <path d='M41.407,45.858c0.067,0.838,0.156,1.672,0.183,2.508   c0.005,0.152-0.205,0.376-0.37,0.461c-1.347,0.687-2.679,1.416-4.069,2.005c-3.305,1.396-6.715,2.5-10.277,3.009   c-1.447,0.206-2.936,0.154-4.403,0.153c-0.477-0.001-0.968-0.178-1.424-0.345c-1.313-0.481-1.98-1.443-1.948-2.85   c0.015-0.583,0.103-1.179,0.253-1.744c1.863-7.013,3.752-14.02,5.61-21.037c0.199-0.751,0.327-1.543,0.341-2.318   c0.021-1.142-0.615-1.925-1.667-2.331c-1.605-0.618-3.258-0.468-4.89-0.161c-1.764,0.332-3.468,0.873-5.149,1.884   c-0.074-0.978-0.157-1.863-0.187-2.75c-0.005-0.127,0.234-0.307,0.396-0.388c1.334-0.67,2.648-1.389,4.021-1.968   c3.327-1.403,6.755-2.512,10.337-3.021c1.465-0.208,2.994-0.294,4.457-0.125c2.782,0.323,3.808,2.02,3.073,4.73   c-0.94,3.474-1.914,6.941-2.838,10.419c-1.049,3.953-2.087,7.912-3.077,11.879c-0.524,2.107,0.385,3.449,2.526,3.839   c2.048,0.376,4.038-0.017,5.981-0.634C39.313,46.75,40.296,46.295,41.407,45.858z'></path>
                  <circle cx='27.5' cy='7.608' r='6.609'></circle>
                </g>
              </svg>
            }
            className='btn btn-sm btn-primary info-btn-trigger ms-1 d-flex justify-content-center align-items-center'
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <TableContainer
        ref={outstandingTableContainerRef}
        sx={{ maxHeight: 300, overflow: "auto" }}
        className={classes.tableContainer}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ width: column.width, whiteSpace: "nowrap" }}
                  align={column.align || "left"}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {treasuryOutStandingDeal.map((row, index) => {
              const isLast = index === treasuryOutStandingDeal.length - 1;

              return (
                <TableRow
                  key={`${row.pK_TransactionID}-${index}`}
                  ref={isLast ? lastRowRef : null}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{
                        width: column.width,
                        whiteSpace: "nowrap",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}>
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {Array.isArray(treasuryOutStandingDeal) &&
          treasuryOutStandingDeal.length === 0 && (
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
                image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
            </>
          )}
        {hasBottomReachedOutstanding && (
          <Box display='flex' justifyContent='center' p={2}>
            <CircularProgress size={24} />
          </Box>
        )}
      </TableContainer>

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

      <CommentModal
        comment={comment}
        setShowCommentModal={setShowCommentModal}
        showCommentModal={showCommentModal}
      />
    </>
  );
};

export default OutstandingDeals;
