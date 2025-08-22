import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash/isEqual";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import CustomButton from "@/components/common/globalButton/button";
import { useNotification } from "@/context/NotificationProvider";
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import CommentModal from "../commentModal/CommentModal";
import CancelReasonModal from "../cancelReasonModal/cancelReasonModal";
import { formatDateTimeToUTCTime } from "@/components/utils/timeFunction";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { formatPkAmount } from "@/utils/formatters";
import {
  AcceptRFQTransaction,
  BlotterDataAPI,
  CancelPendingTransactionApi,
  CancelTransaction,
  GetBlotterOutstandingDealsDataAPI,
  GetFEDiscountingTransactionDetailsApi,
  GetForwardTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
  GetSpotTransactionDetailsApi,
  RejectRFQTransaction,
} from "../BlotterActions";

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 400,
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
  statusCancelled: {
    backgroundColor: "#ffeeec",
  },
  statusCancelledVal: {
    color: "#f26522", // corrected hex + wrapped in quotes
  },
  statusExpiredVal: {
    color: "#f21616",
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
  loadingRow: {
    textAlign: "center",
    padding: "10px",
  },
}));

const TXNTreasurySummary = React.memo(
  ({
    treasuryTXNSummary,
    treasuryTXNSummarysRow,
    treasuryTXNSummaryTotalRecords,
    setHasBottomReachedTreasuryTXN,
    hasBottomReachedTreasuryTXN,
  }) => {
    const classes = useStyles();
    const { showMessage } = useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const TxnTreasuryTableContainerRef = useRef();
    const observer = useRef();
    // Modal states
    const [isLoading, setLoading] = useState(false);
    const [cancelReasonModal, setCancelReasonModal] = useState(false);
    const [cancelReasonComment, setCancelReasonComment] = useState("");
    const [cancelType, setCancelType] = useState("");
    const [cancelTransactionID, setCancelTransactionID] = useState(0);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [comment, setComment] = useState("");

    // Memoize filter options to prevent recreation on every render
    const FILTER_OPTIONS = useMemo(
      () => ({
        TXN_ID: ["09-09-2024/0568", "09-09-2024/4798"],
        CUSTOMER_NAME: ["Gul Ahmed"],
        BRANC_CODE: ["1234", "5678"],
        TYPE: ["Buy", "Sell"],
        NATURE: ["1", "6"],
        CCY1: ["USD"],
        AMOUNT: ["098,098", "234,234"],
        RATE: ["288.00", "289.00"],
        CCY2: ["PKR"],
        AMOUNT2: ["NaN"],
        TIME: ["16:33 pm", "16:47 pm"],
        LC_NO: ["098098", "234234"],
        ACC_NO: ["234234234234234234234234"],
        STATUS: ["Pending"],
      }),
      []
    );

    const loadMore = useCallback(async () => {
      // Prevent loading if already loading, at bottom, or no more records
      if (
        hasBottomReachedTreasuryTXN ||
        treasuryTXNSummaryTotalRecords <= treasuryTXNSummary.length
      )
        return;

      setHasBottomReachedTreasuryTXN(true); // Set loading state

      // Prepare data for API call
      let Data = { sRow: treasuryTXNSummarysRow, Length: 10 };
      dispatch(BlotterDataAPI({ navigate, Data }));
    }, [
      hasBottomReachedTreasuryTXN,
      treasuryTXNSummaryTotalRecords,
      treasuryTXNSummary.length,
      treasuryTXNSummarysRow,
      setHasBottomReachedTreasuryTXN,
    ]);

    // Intersection Observer callback for infinite scrolling
    const lastRowRef = useCallback(
      (node) => {
        // Disconnect previous observer
        if (observer.current) observer.current.disconnect();

        // Create new observer to detect when last row is visible
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !hasBottomReachedTreasuryTXN) {
              loadMore(); // Load more data when last row is visible
            }
          },
          {
            root: TxnTreasuryTableContainerRef.current, // Use table container as root
            threshold: 0.5, // Reduced threshold for better detection
          }
        );

        if (node) observer.current.observe(node); // Observe the last row
      },
      [loadMore, hasBottomReachedTreasuryTXN]
    );

    // Cleanup observer on unmount
    useEffect(() => {
      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }, []);

    // Transaction action handlers
    const handleTransactionAction = useCallback((transactionID, type) => {
      if (type === "Accepted") {
        dispatch(
          AcceptRFQTransaction({ PK_TransactionID: transactionID }, navigate)
        );
      } else {
        setCancelReasonModal(true);
        setCancelType(type);
        setCancelTransactionID(transactionID);
      }
    }, []);

    const handleClickReasonSubmit = useCallback(() => {
      if (cancelReasonComment.trim() === "") {
        showMessage("Please enter a reason for cancellation");
        return;
      }

      const Data = {
        PK_TransactionID: cancelTransactionID,
        Comment: cancelReasonComment,
      };

      const actions = {
        Cancelled: CancelTransaction,
        CancelTransaction: CancelPendingTransactionApi,
        Rejected: RejectRFQTransaction,
      };

      if (actions[cancelType]) {
        dispatch(actions[cancelType]({ Data, navigate, setCancelReasonModal }));
      }
    }, [cancelType, cancelTransactionID, cancelReasonComment, showMessage]);

    const handleCloseReasonModal = useCallback(() => {
      setCancelReasonModal(false);
      setCancelType("");
      setCancelTransactionID(0);
      setCancelReasonComment("");
    }, []);

    const handleShowCommentModal = useCallback((text) => {
      setShowCommentModal(true);
      setComment(text);
    }, []);

    const handleClickInfo = useCallback((record) => {
      let Data = {
        PK_TransactionID: record.pK_TransactionID,
      };
      if (record.natureType === 1) {
        dispatch(GetSpotTransactionDetailsApi({ navigate, Data }));
      } else if (record.natureType === 2) {
        dispatch(GetForwardTransactionDetailsApi({ navigate, Data }));
      } else if (record.natureType === 3) {
        dispatch(GetFEDiscountingTransactionDetailsApi({ navigate, Data }));
      } else if (record.natureType === 4) {
        dispatch(GetNonFEDiscountingTransactionDetailsApi({ navigate, Data }));
      }
    }, []);

    // Memoized table columns
    const Treasurycolumns = useMemo(
      () => [
        {
          id: "txnid",
          label: "TXN ID",
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
          width: 70,
          align: "center",
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
          width: 80,
          align: "center",
          render: (record) => record.ccY1,
        },
        {
          id: "quantity",
          label: "TXN Amount",
          width: 130,
          align: "center",
          render: (record) => (
            <IndexCell value={formatPkAmount(record.quantity)} />
          ),
        },
        {
          id: "rate",
          label: "Rate",
          width: 120,
          align: "center",
          render: (record) => formatPkAmount(record.rate, { decimals: 5 }),
        },
        {
          id: "tenorDays",
          label: "Tenor Days",
          width: 120,
          render: () => "", // Placeholder for tenor days
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
          width: 140,
          align: "center",
          render: (record) => (
            <IndexCell value={formatPkAmount(record.amount)} />
          ),
        },
        {
          id: "tradeDateTime",
          label: "Time",
          width: 80,
          align: "center",
          render: (record) =>
            record.tradeDateTime !== ""
              ? formatDateTimeToUTCTime(record.tradeDateTime)
              : "",
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
                  ? classes.statusAccepted
                  : record.status === "Rejected"
                  ? classes.statusRejected
                  : record.status === "Cancelled"
                  ? classes.statusCancelledVal
                  : record.status === "Expired" || record.status === "Rejected"
                  ? classes.statusExpiredVal
                  : ""
              }>
              {record.status}
            </span>
          ),
        },
        {
          id: "action",
          label: "Action",
          width: 80,
          align: "center",
          render: (record) => (
            <div className={classes.actionButtons}>
              {record.statusID === 1 && (
                <CustomButton
                  icon={<i className='icon-close blotterTableIconSize' />}
                  size='small'
                  applyClass='ActionButton_danger'
                  onClick={() =>
                    handleTransactionAction(
                      record.pK_TransactionID,
                      "Cancelled"
                    )
                  }
                />
              )}
            </div>
          ),
        },
        {
          id: "actions",
          label: "",
          width: 80,
          align: "center",
          render: (record) => (
            <div className={classes.actionButtons}>
              {record.statusID === 3 && (
                <CustomButton
                  size='small'
                  icon={
                    <i className='icon-view-comment blotterTableIconSize' />
                  }
                  className='btn btn-primary d-flex justify-content-center align-items-center'
                  onClick={() => handleShowCommentModal(record.comment)}
                />
              )}
              <CustomButton
                size='small'
                onClick={() => handleClickInfo(record)}
                applyClass='d-flex justify-content-center align-items-center'
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
              />
            </div>
          ),
        },
      ],
      [
        classes,
        handleClickInfo,
        handleShowCommentModal,
        handleTransactionAction,
      ]
    );

    // Memoized modal components
    const memoizedCommentModal = useMemo(
      () => (
        <CommentModal
          comment={comment}
          setShowCommentModal={setShowCommentModal}
          showCommentModal={showCommentModal}
        />
      ),
      [comment, showCommentModal]
    );

    const memoizedCancelReasonModal = useMemo(
      () =>
        cancelReasonModal && (
          <CancelReasonModal
            cancelReasonModal={cancelReasonModal}
            setCancelReasonModal={setCancelReasonModal}
            cancelReasonComment={cancelReasonComment}
            setCancelReasonComment={setCancelReasonComment}
            handleClickReasonSubmit={handleClickReasonSubmit}
            handleCloseReasonModal={handleCloseReasonModal}
          />
        ),
      [
        cancelReasonModal,
        cancelReasonComment,
        handleClickReasonSubmit,
        handleCloseReasonModal,
      ]
    );

    return (
      <>
        <TableContainer
          ref={TxnTreasuryTableContainerRef}
          sx={{ maxHeight: 400, overflow: "auto" }}
          style={{ width: "100%", fontSize: "14px" }}
          className={classes.tableContainer}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                {Treasurycolumns.map((column) => (
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
              {treasuryTXNSummary.length > 0
                ? treasuryTXNSummary.map((row, index) => {
                    const isLast = index === treasuryTXNSummary.length - 1;
                    console.log(isLast, "isLastisLastisLast");
                    return (
                      <TableRow
                        key={`${row.pK_TransactionID}-${index}`}
                        ref={isLast ? lastRowRef : null}
                        className={
                          row.statusID === 7 ? classes.statusCancelled : ""
                        }>
                        {Treasurycolumns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align || "left"}
                            sx={{
                              width: column.width,
                              whiteSpace: "nowrap",
                              fontSize: "13px",
                              fontWeight: "500",
                            }}>
                            {column.render
                              ? column.render(row)
                              : row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                : ""}

              {hasBottomReachedTreasuryTXN && (
                <Box display='flex' justifyContent='center' p={2}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {memoizedCommentModal}
        {memoizedCancelReasonModal}
      </>
    );
  }
);

export default TXNTreasurySummary;
