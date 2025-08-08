import React, { useCallback, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox, Popover } from "antd";
import isEqual from "lodash/isEqual";
import CustomButton from "@/components/common/globalButton/button";
import { useNotification } from "@/context/NotificationProvider";
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import CommentModal from "../commentModal/CommentModal";
import CancelReasonModal from "../cancelReasonModal/cancelReasonModal";
import GlobalTable from "@/components/common/table/GlobalTable";
import { formatDateTimeToUTCTime } from "@/components/utils/timeFunction";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { formatPkAmount } from "@/utils/formatters";

// ... (other imports remain the same)

const TXNTreasurySummary = React.memo(
  ({
    treasuryTXNSummary,
    treasuryTXNSummarysRow,
    treasuryTXNSummaryTotalRecords,
  }) => {
    const { showMessage } = useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Modal states
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

    // Memoize initial filter states
    const initialFilterStates = useMemo(
      () =>
        Object.keys(FILTER_OPTIONS).reduce((acc, key) => {
          acc[key] = {
            open: false,
            selectedItems: [],
          };
          return acc;
        }, {}),
      [FILTER_OPTIONS]
    );

    const [filterStates, setFilterStates] = useState(initialFilterStates);

    // Handle infinite scroll
    useTableScrollBottom(
      () => {
        if (treasuryTXNSummaryTotalRecords !== treasuryTXNSummary.length) {
          let Data = { sRow: treasuryTXNSummarysRow, Length: 10 };
          dispatch(BlotterDataAPI({ navigate, Data }));
        }
      },
      0,
      "TXNSummary_Table"
    );

    // Memoized filter handlers
    const handleFilterOpenChange = useCallback((filterKey, newOpen) => {
      setFilterStates((prev) => ({
        ...prev,
        [filterKey]: { ...prev[filterKey], open: newOpen },
      }));
    }, []);

    const handleSelectAll = useCallback(
      (filterKey) => {
        setFilterStates((prev) => ({
          ...prev,
          [filterKey]: {
            ...prev[filterKey],
            selectedItems: FILTER_OPTIONS[filterKey],
          },
        }));
      },
      [FILTER_OPTIONS]
    );

    const handleDeselectAll = useCallback((filterKey) => {
      setFilterStates((prev) => ({
        ...prev,
        [filterKey]: { ...prev[filterKey], selectedItems: [] },
      }));
    }, []);

    const handleCheckboxChange = useCallback((filterKey, checkedValues) => {
      setFilterStates((prev) => ({
        ...prev,
        [filterKey]: { ...prev[filterKey], selectedItems: checkedValues },
      }));
    }, []);

    // Memoized popover content creator
    const createFilterPopoverContent = useCallback(
      (filterKey) => (
        <div style={{ width: 220 }}>
          <div className='d-flex justify-content-between mb-2'>
            <CustomButton
              applyClass='SelectAllButton'
              value='Select All'
              onClick={() => handleSelectAll(filterKey)}
            />
            <CustomButton
              applyClass='SelectAllButton'
              value='Deselect All'
              onClick={() => handleDeselectAll(filterKey)}
            />
          </div>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column" }}
            value={filterStates[filterKey].selectedItems}
            onChange={(checked) => handleCheckboxChange(filterKey, checked)}>
            {FILTER_OPTIONS[filterKey].map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      ),
      [
        FILTER_OPTIONS,
        filterStates,
        handleCheckboxChange,
        handleDeselectAll,
        handleSelectAll,
      ]
    );

    // Memoized column creator
    const createFilterColumn = useCallback(
      (title, filterKey, dataIndex, width, render) => ({
        title: (
          <div className='d-flex align-items-center justify-content-center gap-1'>
            <span className='ff-poppins fw-bold'>{title}</span>
            <Popover
              content={createFilterPopoverContent(filterKey)}
              trigger='click'
              arrow={false}
              placement='bottom'
              open={filterStates[filterKey].open}
              onOpenChange={(newOpen) =>
                handleFilterOpenChange(filterKey, newOpen)
              }>
              <span className='filter-dropdown-trigger'>▼</span>
            </Popover>
          </div>
        ),
        key: dataIndex,
        dataIndex,
        className: "ff-poppins fw-bold",
        width,
        render,
        ellipsis: true,
      }),
      [createFilterPopoverContent, filterStates, handleFilterOpenChange]
    );

    // Transaction action handlers
    const handleTransactionAction = useCallback(
      (transactionID, type) => {
        if (type === "Accepted") {
          dispatch(
            AcceptRFQTransaction({ PK_TransactionID: transactionID }, navigate)
          );
        } else {
          setCancelReasonModal(true);
          setCancelType(type);
          setCancelTransactionID(transactionID);
        }
      },
      [dispatch, navigate]
    );

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
    }, [
      cancelType,
      cancelTransactionID,
      cancelReasonComment,
      dispatch,
      navigate,
      showMessage,
    ]);

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
        createFilterColumn("TXN ID", "TXN_ID", "txnid", 120),
        createFilterColumn("Client", "CUSTOMER_NAME", "corporateName", 120),
        createFilterColumn(
          "Branch Code",
          "BRANC_CODE",
          "branchCode",
          120,
          (text) => text
        ),
        createFilterColumn("Type", "TYPE", "side", 70),
        createFilterColumn("Nature", "NATURE", "nature", 120),
        createFilterColumn("CCY1", "CCY1", "ccY1", 80),
        createFilterColumn("Amount", "AMOUNT", "quantity", 80, (text) => (
          <IndexCell value={formatPkAmount(text)} />
        )),
        createFilterColumn("Rate", "RATE", "rate", 120, (text) =>
          formatPkAmount(text)
        ),
        createFilterColumn("CCY2", "CCY2", "ccY2", 60),
        createFilterColumn("Amount", "AMOUNT2", "amount", 120, (text) => (
          <IndexCell value={formatPkAmount(text)} />
        )),
        createFilterColumn("Time", "TIME", "tradeDateTime", 80, (text) =>
          text !== "" ? formatDateTimeToUTCTime(text) : ""
        ),
        createFilterColumn("LC NO.", "LC_NO", "lcNuIndexCell mber", 120),
        createFilterColumn("Acc NO.", "ACC_NO", "accountNumber", 120),
        {
          ...createFilterColumn("Status", "STATUS", "status", 80),
          render: (text) => (
            <span className={text === "Accepted" ? "color-green" : "color-red"}>
              {text}
            </span>
          ),
        },
        {
          title: "Action",
          key: "action",
          width: 80,
          align: "center",
          render: (_, record) => (
            <div className='col-action text-nowrap text-center d-flex gap-1 justify-content-center'>
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
          key: "actions",
          title: "",
          width: 80,
          align: "center",
          render: (_, record) => (
            <div className='d-flex gap-1 justify-content-end'>
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
        createFilterColumn,
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
        <GlobalTable
          pagination={false}
          dataSource={treasuryTXNSummary}
          bordered={false}
          rowHoverBg={"none"}
          prefixCls='TXNSummary_Table'
          rowKey={(record) => record.pK_TransactionID}
          columns={Treasurycolumns}
          scroll={{ x: "max-content", y: 300 }}
          rowClassName={(record) =>
            record.statusID === 7 ? "Cancelled_Transaction" : ""
          }
        />

        {memoizedCommentModal}
        {memoizedCancelReasonModal}
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for props
    return (
      isEqual(prevProps.treasuryTXNSummary, nextProps.treasuryTXNSummary) &&
      prevProps.treasuryTXNSummarysRow === nextProps.treasuryTXNSummarysRow &&
      prevProps.treasuryTXNSummaryTotalRecords ===
        nextProps.treasuryTXNSummaryTotalRecords
    );
  }
);

export default TXNTreasurySummary;
