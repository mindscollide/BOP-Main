import React, { useCallback, useEffect, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomButton from "@/components/common/globalButton/button";
import { Checkbox, Popover } from "antd";
import CommentModal from "../commentModal/CommentModal";
import { useNavigate } from "react-router-dom";
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
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import {
  setDiscountingQuoteModal,
  setForwardQuoteModal,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import { RFQTImer } from "@/components/utils/Timer";
import { convertDateTimeIntoLocal } from "@/utils/formatters";
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

/**
 * OutstandingDeals component displays a list of outstanding deals in the blotter.
 * It manages the state of various filters and handles updates to the blotter data
 * based on real-time actions from the Redux store.
 *
 * @component
 * @returns {JSX.Element} The rendered OutstandingDeals component.
 *
 * @example
 * // Usage
 * <OutstandingDeals />
 *
 * @reduxState
 * - BlotterTransactionRFQExpired: Data for expired RFQs.
 * - BlotterTransactionAssigned: Data for assigned transactions.
 * - BlotterTransactionAdded: Data for newly added transactions.
 * - BlotterTransactionRFQQuoted: Data for quoted RFQs.
 * - BlotterTransactionAccepted: Data for accepted transactions.
 * - BlotterTranscationCancelled: Data for cancelled transactions.
 * - BlotterTransactionCancellationRequestData: Data for cancellation requests.
 * - BlotterTransactionRejected: Data for rejected transactions.
 * - getBlotterOutstandingData: Data for outstanding deals.
 *
 * @localState
 * - blotterdata: Array of current blotter data.
 * - totalRecord: Total number of records in the blotter.
 * - sRow: Current row index for pagination.
 * - hasReachedBottom: Boolean indicating if the bottom of the table has been reached.
 * - open: Boolean for TXN ID filter visibility.
 * - selectedItemsTXNID: Array of selected TXN IDs.
 * - showCommentModal: Boolean for comment modal visibility.
 * - comment: Current comment text.
 * - openCustomername: Boolean for customer name filter visibility.
 * - selectedItemsCustomerName: Array of selected customer names.
 * - openType: Boolean for type filter visibility.
 * - selectedItemsType: Array of selected types.
 * - openNature: Boolean for nature filter visibility.
 * - selectedItemsNature: Array of selected natures.
 * - openCCY1: Boolean for CCY1 filter visibility.
 * - selectedItemsCCY1: Array of selected CCY1 values.
 * - openAmount1: Boolean for amount1 filter visibility.
 * - selectedItemsAmount1: Array of selected amount1 values.
 * - openRate: Boolean for rate filter visibility.
 * - selectedItemsRate: Array of selected rates.
 * - openCCY2: Boolean for CCY2 filter visibility.
 * - selectedItemsCCY2: Array of selected CCY2 values.
 * - openAmount2: Boolean for amount2 filter visibility.
 * - selectedItemsAmount2: Array of selected amount2 values.
 * - openTime: Boolean for time filter visibility.
 * - selectedItemsTime: Array of selected times.
 * - openLCno: Boolean for LC number filter visibility.
 * - selectedItemsLCno: Array of selected LC numbers.
 * - openAccNO: Boolean for account number filter visibility.
 * - selectedItemsAccNO: Array of selected account numbers.
 * - openStatus: Boolean for status filter visibility.
 * - selectedItemsStatus: Array of selected statuses.
 * - dealData: Data for the current deal.
 */
/**
 * OutstandingDeals component displays a list of outstanding deals in the blotter.
 * It manages the state of various filters and handles updates to the blotter data
 * based on real-time actions from the Redux store.
 *
 * @component
 * @returns {JSX.Element} The rendered OutstandingDeals component.
 *
 * @example
 * return (
 *   <OutstandingDeals />
 * );
 */
const OutstandingDeals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blotterTransactionRFQExpired = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQExpired
  );

  const blotterTransactionAssigned = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAssigned
  );
  const blotterTransactionAdded = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAdded
  );
  const blotterTransactionRFQQuoted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRFQQuoted
  );
  const blotterTransactionAccepted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAccepted
  );

  const blotterTranscationCancelled = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelled
  );

  const blotterTransactionCancellationRequest = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionCancellationRequestData
  );

  const blotterTransactionRejected = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejected
  );
  //HardCoded Filter Values start
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

  //HardCoded Filter Values Ended

  //Global State For Blotter Data
  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );

  //local states
  const [blotterdata, setBlotterdata] = useState([]);

  console.log(blotterdata, "blotterdatablotterdata");
  const [totalRecord, setTotalRecords] = useState(0);
  const [sRow, setRow] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  //TXNID Filter State
  const [open, setOpen] = useState(false);
  const [selectedItemsTXNID, setSelectedItemsTXNID] = useState([]);
  // Show and Hide Comment Modal and commentState
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  //Customer Name Filter State
  const [openCustomername, setOpenCustomername] = useState(false);
  const [selectedItemsCustomerName, setSelectedItemsCustomerName] = useState(
    []
  );
  //Type Filter State
  const [openType, setOpenType] = useState(false);
  const [selectedItemsType, setSelectedItemsType] = useState([]);
  //Nature Filter State
  const [openNature, setOpenNature] = useState(false);
  const [selectedItemsNature, setSelectedItemsNature] = useState([]);
  //CCY1 Filter State
  const [openCCY1, setOpenCCY1] = useState(false);
  const [selectedItemsCCY1, setSelectedItemsCCY1] = useState([]);
  //Amount1 Filter State
  const [openAmount1, setOpenAmount1] = useState(false);
  const [selectedItemsAmount1, setSelectedItemsAmount1] = useState([]);
  //Rate Filter State
  const [openRate, setOpenRate] = useState(false);
  const [selectedItemsRate, setSelectedItemsRate] = useState([]);
  //CCY2 Filter State
  const [openCCY2, setOpenCCY2] = useState(false);
  const [selectedItemsCCY2, setSelectedItemsCCY2] = useState([]);
  //Amount2 Filter State
  const [openAmount2, setOpenAmount2] = useState(false);
  const [selectedItemsAmount2, setSelectedItemsAmount2] = useState([]);
  //Time Filter State
  const [openTime, setOpenTime] = useState(false);
  const [selectedItemsTime, setSelectedItemsTime] = useState([]);
  //LCno Filter State
  const [openLCno, setOpenLCno] = useState(false);
  const [selectedItemsLCno, setSelectedItemsLCno] = useState([]);
  //AccNO Filter State
  const [openAccNO, setOpenAccNO] = useState(false);
  const [selectedItemsAccNO, setSelectedItemsAccNO] = useState([]);
  //Status Filter State
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedItemsStatus, setSelectedItemsStatus] = useState([]);

  const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [cancelReasonComment, setCancelReasonComment] = useState("");
  const [cancelType, setCancelType] = useState("");
  const [cancelTransactionID, setCancelTransactionID] = useState(0);

  useTableScrollBottom(
    () => {
      console.log(totalRecord, blotterdata.length, "totalRecord");
      if (totalRecord !== blotterdata.length) {
        setHasReachedBottom(true);
        let Data = { sRow: sRow, Length: 10 };
        dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
      }
    },
    0,
    "OutStanding_Table"
  );

  useEffect(() => {
    try {
      if (getBlotterOutstandingData && getBlotterOutstandingData !== null) {
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setBlotterdata((prevData) => [
            ...prevData,
            ...getBlotterOutstandingData.outstandingDeals,
          ]);
          setTotalRecords(getBlotterOutstandingData.totalCount);
          setRow(
            (prevRow) =>
              prevRow + getBlotterOutstandingData.outstandingDeals.length
          );
        } else {
          setHasReachedBottom(false);
          setBlotterdata(getBlotterOutstandingData.outstandingDeals);
          setTotalRecords(getBlotterOutstandingData.totalCount);
          setRow(getBlotterOutstandingData.outstandingDeals.length);
        }
      } else if (getBlotterOutstandingData === null) {
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
  }, [getBlotterOutstandingData]);

  useEffect(() => {
    if (blotterTransactionRFQExpired !== null) {
      try {
        const { transaction } = blotterTransactionRFQExpired;
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(BlotterTransactionRFQExpired(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionRFQExpired]);

  useEffect(() => {
    if (blotterTransactionAdded !== null) {
      try {
        const { transaction } = blotterTransactionAdded;
        let ishasAlready = blotterdata.find(
          (data, index) =>
            data.pK_TransactionID === transaction?.pK_TransactionID
        );
        if (ishasAlready === undefined) {
          setBlotterdata([transaction, ...blotterdata]);
        }
        dispatch(BlotterTransactionAdded(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionAdded");
      }
    }
  }, [blotterTransactionAdded]);

  useEffect(() => {
    if (blotterTransactionRFQQuoted !== null) {
      try {
        const { transaction } = blotterTransactionRFQQuoted;
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.map((tblData, index) => {
            if (tblData.pK_TransactionID === transaction?.pK_TransactionID) {
              return {
                ...tblData,
                bid: transaction.bid,
                offer: transaction.offer,
                statusID: transaction.statusID,
                rfqTimerDetails: transaction.rfqTimerDetails,
                amount: transaction.amount,
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
    if (blotterTransactionAccepted !== null) {
      try {
        const { transaction } = blotterTransactionAccepted;
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(BlotterTransactionAccepted(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionAccepted]);

  useEffect(() => {
    if (blotterTranscationCancelled !== null) {
      try {
        const { transaction } = blotterTranscationCancelled;
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(BlotterTranscationCancelled(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTranscationCancelled]);

  useEffect(() => {
    if (blotterTransactionRejected !== null) {
      try {
        const { transaction } = blotterTransactionRejected;
        setBlotterdata((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(BlotterTransactionRejected(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionRejected]);

  useEffect(() => {
    if (blotterTransactionAssigned !== null) {
      try {
        const {
          transactionID,
          treasuryPersonID,
          statusID,
          statusForAssignedUser,
          statusForOtherTreasury,
        } = blotterTransactionAssigned;

        setBlotterdata((prevBlotterData) =>
          prevBlotterData.map((tableData) => {
            if (tableData.pK_TransactionID === transactionID) {
              if (
                Number(localStorage.getItem("userID")) ===
                Number(treasuryPersonID)
              ) {
                return {
                  ...tableData,
                  status: statusForAssignedUser,
                  statusID: statusID,
                  treasuryPersonID: treasuryPersonID,
                };
              } else {
                return {
                  ...tableData,
                  status: statusForOtherTreasury,
                  statusID: statusID,
                  treasuryPersonID: treasuryPersonID,
                };
              }
            }

            // ⚠️ Add this to return unchanged rows
            return tableData;
          })
        );
        dispatch(BlotterTransactionAssigned(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionAssigned");
      }
    }
  }, [blotterTransactionAssigned]);

  useEffect(() => {
    if (blotterTransactionCancellationRequest !== null) {
      try {
        const { transaction } = blotterTransactionCancellationRequest;
        let ishasAlready = blotterdata.find(
          (data, index) =>
            data.pK_TransactionID === transaction?.pK_TransactionID
        );
        if (ishasAlready === undefined) {
          setBlotterdata([transaction, ...blotterdata]);
        }
        dispatch(BlotterTransactionCancellationRequest(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionCancellationRequest");
      }
    }
  }, [blotterTransactionCancellationRequest]);

  //TXN ID PopOver Functions Starts
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleSelectAll = () => {
    setSelectedItemsTXNID(TXN_ID_OPTIONS);
  };

  const handleDeselectAll = () => {
    setSelectedItemsTXNID([]);
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedItemsTXNID(checkedValues);
  };

  const popoverContentTXN = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAll}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAll}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsTXNID}
        onChange={handleCheckboxChange}
      >
        {TXN_ID_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //TXN ID PopOver Functions Ends

  //Customer Name PopOver Functions Starts
  const handleOpenChangeCustomerName = (newOpen) => {
    setOpenCustomername(newOpen);
  };

  const handleSelectAllCustomerName = () => {
    setSelectedItemsCustomerName(CustomerName_OPTIONS);
  };

  const handleDeselectAllCustomerName = () => {
    setSelectedItemsCustomerName([]);
  };

  const handleCheckboxChangeCustomerName = (checkedValues) => {
    setSelectedItemsCustomerName(checkedValues);
  };

  const popoverContentClientName = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCustomerName}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCustomerName}
        />
      </div>
    </div>
  );
  //Customer Name PopOver Functions Ends

  //Type PopOver Functions Starts
  const handleOpenChangeType = (newOpen) => {
    setOpenType(newOpen);
  };

  const handleSelectAllType = () => {
    setSelectedItemsType(TYPE_OPTIONS);
  };

  const handleDeselectAllType = () => {
    setSelectedItemsType([]);
  };

  const handleCheckboxChangeType = (checkedValues) => {
    setSelectedItemsType(checkedValues);
  };

  const popoverContentType = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllType}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllType}
        />
      </div>
      {/* <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsType}
        onChange={handleCheckboxChangeType}
      >
        {TYPE_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group> */}
    </div>
  );
  //Type PopOver Functions Ends

  //Nature PopOver Functions Starts
  const handleOpenChangeNature = (newOpen) => {
    setOpenNature(newOpen);
  };

  const handleSelectAllNature = () => {
    setSelectedItemsNature(Nature_OPTIONS);
  };

  const handleDeselectAllNature = () => {
    setSelectedItemsNature([]);
  };

  const handleCheckboxChangeNature = (checkedValues) => {
    setSelectedItemsNature(checkedValues);
  };

  const popoverContentNature = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllNature}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllNature}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsNature}
        onChange={handleCheckboxChangeNature}
      >
        {Nature_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Nature PopOver Functions Ends

  //CCY1 PopOver Functions Starts
  const handleOpenChangeCCY1 = (newOpen) => {
    setOpenCCY1(newOpen);
  };

  const handleSelectAllCCY1 = () => {
    setSelectedItemsCCY1(CCY1_OPTIONS);
  };

  const handleDeselectAllCCY1 = () => {
    setSelectedItemsCCY1([]);
  };

  const handleCheckboxChangeCCY1 = (checkedValues) => {
    setSelectedItemsCCY1(checkedValues);
  };

  const popoverContentCCY1 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCCY1}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCCY1}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsCCY1}
        onChange={handleCheckboxChangeCCY1}
      >
        {CCY1_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY1 PopOver Functions Ends

  //Amount1 PopOver Functions Starts
  const handleOpenChangeAmount1 = (newOpen) => {
    setOpenAmount1(newOpen);
  };

  const handleSelectAllAmount1 = () => {
    setSelectedItemsAmount1(Amount_OPTIONS);
  };

  const handleDeselectAllAmount1 = () => {
    setSelectedItemsAmount1([]);
  };

  const handleCheckboxChangeAmount1 = (checkedValues) => {
    setSelectedItemsAmount1(checkedValues);
  };

  const popoverContentAmount1 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAmount1}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAmount1}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAmount1}
        onChange={handleCheckboxChangeAmount1}
      >
        {Amount_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY1 PopOver Functions Ends

  //Rate PopOver Functions Starts
  const handleOpenChangeRate = (newOpen) => {
    setOpenRate(newOpen);
  };

  const handleSelectAllRate = () => {
    setSelectedItemsRate(Rate_OPTIONS);
  };

  const handleDeselectAllRate = () => {
    setSelectedItemsRate([]);
  };

  const handleCheckboxChangeRate = (checkedValues) => {
    setSelectedItemsRate(checkedValues);
  };

  const popoverContentRate = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllRate}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllRate}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsRate}
        onChange={handleCheckboxChangeRate}
      >
        {Rate_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Rate PopOver Functions Ends

  //CCY2 PopOver Functions Starts
  const handleOpenChangeCCY2 = (newOpen) => {
    setOpenCCY2(newOpen);
  };

  const handleSelectAllCCY2 = () => {
    setSelectedItemsCCY2(CCY2_OPTIONS);
  };

  const handleDeselectAllCCY2 = () => {
    setSelectedItemsCCY2([]);
  };

  const handleCheckboxChangeCCY2 = (checkedValues) => {
    setSelectedItemsCCY2(checkedValues);
  };

  const popoverContentCCY2 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCCY2}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCCY2}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsCCY2}
        onChange={handleCheckboxChangeCCY2}
      >
        {CCY2_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY2 PopOver Functions Ends

  //Amount2 PopOver Functions Starts
  const handleOpenChangeAmount2 = (newOpen) => {
    setOpenAmount2(newOpen);
  };

  const handleSelectAllAmount2 = () => {
    setSelectedItemsAmount2(Amount2_OPTIONS);
  };

  const handleDeselectAllAmount2 = () => {
    setSelectedItemsAmount2([]);
  };

  const handleCheckboxChangeAmount2 = (checkedValues) => {
    setSelectedItemsAmount2(checkedValues);
  };

  const popoverContentAmount2 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAmount2}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAmount2}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAmount2}
        onChange={handleCheckboxChangeAmount2}
      >
        {Amount2_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Amount2 PopOver Functions Ends

  //Time PopOver Functions Starts
  const handleOpenChangeTime = (newOpen) => {
    setOpenTime(newOpen);
  };

  const handleSelectAllTime = () => {
    setSelectedItemsTime(Time_OPTIONS);
  };

  const handleDeselectAllTime = () => {
    setSelectedItemsTime([]);
  };

  const handleCheckboxChangeTime = (checkedValues) => {
    setSelectedItemsTime(checkedValues);
  };

  const popoverContentTime = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllTime}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllTime}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsTime}
        onChange={handleCheckboxChangeTime}
      >
        {Time_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Time PopOver Functions Ends

  //LCno PopOver Functions Starts
  const handleOpenChangeLCno = (newOpen) => {
    setOpenLCno(newOpen);
  };

  const handleSelectAllLCno = () => {
    setSelectedItemsLCno(LCno_OPTIONS);
  };

  const handleDeselectAllLCno = () => {
    setSelectedItemsLCno([]);
  };

  const handleCheckboxChangeLCno = (checkedValues) => {
    setSelectedItemsLCno(checkedValues);
  };

  const popoverContentLCno = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllLCno}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllLCno}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsLCno}
        onChange={handleCheckboxChangeLCno}
      >
        {LCno_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //LCno PopOver Functions Ends

  //ACCno PopOver Functions Starts
  const handleOpenChangeAccNO = (newOpen) => {
    setOpenAccNO(newOpen);
  };

  const handleSelectAllAccNO = () => {
    setSelectedItemsAccNO(Accno_OPTIONS);
  };

  const handleDeselectAllAccNO = () => {
    setSelectedItemsAccNO([]);
  };

  const handleCheckboxChangeAccNO = (checkedValues) => {
    setSelectedItemsAccNO(checkedValues);
  };

  const popoverContentAccNO = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAccNO}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAccNO}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAccNO}
        onChange={handleCheckboxChangeAccNO}
      >
        {Accno_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //ACCno PopOver Functions Ends

  //status PopOver Functions Starts
  const handleOpenChangeStatus = (newOpen) => {
    setOpenStatus(newOpen);
  };

  const handleSelectAllStatus = () => {
    setSelectedItemsStatus(Status_OPTIONS);
  };

  const handleDeselectAllStatus = () => {
    setSelectedItemsStatus([]);
  };

  const handleCheckboxChangeStatus = (checkedValues) => {
    setSelectedItemsStatus(checkedValues);
  };

  const handleShowCommentModal = (text) => {
    setShowCommentModal(true);
    setComment(text);
  };

  const popoverContentStatus = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllStatus}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllStatus}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsStatus}
        onChange={handleCheckboxChangeStatus}
      >
        {Status_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //status PopOver Functions Ends

  const handleClickAssignTransaction = (record) => {
    let Data = { PK_TransactionID: Number(record.pK_TransactionID) };
    dispatch(AssignTransactionAPI({ navigate, Data }));
  };

  const openViewDeal = (record, natureTypeId) => {
    console.log(record, natureTypeId, "openViewDealopenViewDeal");
    if (natureTypeId === 1) {
      //  For Spot
      dispatch(setViewDealModal(true));
      dispatch(setSpotQuoteModalData(record));
    } else if (natureTypeId === 2) {
      // For Forwards
      dispatch(setForwardQuoteModal(true));
      dispatch(setForwardQuoteModalData(record));
    } else if (natureTypeId === 3 || natureTypeId === 4) {
      dispatch(setDiscountingQuoteModal(true));
      dispatch(setDiscountingQuoteModalData(record));
      // For Fe And Non Fe Discounting
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
    // dispatch(
    //   RejectTransactionAPI({
    //     navigate,
    //     Data: { PK_TransactionID: record.pK_TransactionID },
    //   })
    // );
  };

  const handleAcceptTransactionCancellation = (transactionID) => {
    let Data = { PK_TransactionID: transactionID };
    dispatch(AcceptTransactionCancellationRequest({ navigate, Data }));
  };
  const handleRejectTransactionCancellation = (transactionID) => {
    // let Data = { PK_TransactionID: transactionID };
    // dispatch(RejectTransactionCancellationRequest({ navigate, Data }));
    setCancelReasonModal(true);
    setCancelType("Cancellation");
    setCancelTransactionID(transactionID);
  };

  const handleClickChat = (txnID, treasuryPersonID) => {
    let Data = {
      TranscationID: txnID,
    };

    dispatch(
      getAllChatByTransactionId({
        navigate,
        Data,
        treasuryPersonID,
      })
    );
  };

  const handleClickReasonSubmit = useCallback(() => {
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
    cancelReasonModal,
    cancelReasonComment,
    setCancelReasonModal,
  ]);

  const handleCloseReasonModal = useCallback(() => {
    setCancelReasonModal(false);
    setCancelType("");
    setCancelTransactionID(0);
    setCancelReasonComment("");
  }, [cancelType, cancelTransactionID, cancelReasonModal, cancelReasonComment]);
  const handleClickInfo = (record) => {
    let Data = {
      PK_TransactionID: record.pK_TransactionID,
    };
    if (record.natureType === 1) {
      console.log("Spot");
      dispatch(GetSpotTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 2) {
      console.log("Forward");
      dispatch(GetForwardTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 3) {
      console.log("Fe Discouting");
      dispatch(GetFEDiscountingTransactionDetailsApi({ navigate, Data }));
    } else if (record.natureType === 4) {
      console.log("Non Fe Discouting");
      dispatch(GetNonFEDiscountingTransactionDetailsApi({ navigate, Data }));
    }
  };

  const columns = [
    // TXNID
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">TXN ID</span>
          <Popover
            content={popoverContentTXN}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "txnid",
      dataIndex: "txnid",
      align: "center",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Client Name
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Client</span>
          <Popover
            content={popoverContentClientName}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openCustomername}
            onOpenChange={handleOpenChangeCustomerName}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "counterPartyName",
      dataIndex: "corporateName",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Branch Code
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Branch Code</span>
          <Popover
            content={popoverContentType}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openType}
            onOpenChange={handleOpenChangeType}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "side",
      dataIndex: "branchCode",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Side
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Type</span>
          <Popover
            content={popoverContentType}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openType}
            onOpenChange={handleOpenChangeType}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "side",
      dataIndex: "side",
      className: "ff-poppins fw-bold",
      width: 60,
    },
    // Nature
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Nature</span>
          <Popover
            content={popoverContentNature}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openNature}
            onOpenChange={handleOpenChangeNature}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "nature",
      dataIndex: "nature",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Bid
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Bid</span>
        </div>
      ),
      key: "rate1",
      dataIndex: "bid",
      className: "ff-poppins fw-bold",
      width: 60,
      render: (text, reocrd) => {
        return text.toFixed(2);
      },
    },
    // Offer
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Offer</span>
        </div>
      ),
      key: "rate2",
      dataIndex: "offer",
      className: "ff-poppins fw-bold",
      width: 60,
      render: (text, reocrd) => {
        return text.toFixed(2);
      },
    },
    // CCY1
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">CCY1</span>
          <Popover
            content={popoverContentAmount1}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAmount1}
            onOpenChange={handleOpenChangeAmount1}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "ccY1",
      dataIndex: "ccY1",
      className: "ff-poppins fw-bold",
      width: 80,
    },
    // Amount
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Amount</span>
          <Popover
            content={popoverContentRate}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openRate}
            onOpenChange={handleOpenChangeRate}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "amount1",
      dataIndex: "quantity",
      className: "ff-poppins fw-bold",
      width: 80,
      render: (text, reocrd) => {
        return text.toFixed(2);
      },
    },
    // CCY2
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">CCY2</span>
          <Popover
            content={popoverContentCCY2}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openCCY2}
            onOpenChange={handleOpenChangeCCY2}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "ccY2",
      dataIndex: "ccY2",
      className: "ff-poppins fw-bold",
      width: 80,
    },
    // Amount
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Amount</span>
          <Popover
            content={popoverContentAmount2}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAmount2}
            onOpenChange={handleOpenChangeAmount2}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "amount2",
      dataIndex: "amount",
      className: "ff-poppins fw-bold",
      width: 80,
      render: (text, reocrd) => {
        return text.toFixed(2);
      },
    },
    // Time
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Time</span>
          <Popover
            content={popoverContentTime}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openTime}
            onOpenChange={handleOpenChangeTime}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "time",
      dataIndex: "tradeDateTime",
      className: "ff-poppins fw-bold",
      width: 60,
      render: (text, record) => {
        // if the isRFQ true and status is 2 or 5 and time is ended true
        let Data = { PK_TransactionID: record.pK_TransactionID };
        // ExpireRFQTransaction({navigate, Data})
        let isRFQ = record.isRFQ
          ? (record.statusID === 2 || record.statusID === 5) &&
            record.rfqTimerDetails !== null &&
            record.rfqTimerDetails?.isEnded === false
            ? true
            : false
          : false;
        let rfqTimer =
          isRFQ && record.rfqTimerDetails.endTime
            ? convertDateTimeIntoLocal(record.rfqTimerDetails.endTime)
            : null;
        console.log(rfqTimer, text, "rfqTimerrfqTimer");
        return (
          <span>
            {formatDateTimeToUTCTime(text)}{" "}
            {isRFQ && (
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
    // LC No.
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">LC NO.</span>
          <Popover
            content={popoverContentLCno}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openLCno}
            onOpenChange={handleOpenChangeLCno}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "lC_No",
      dataIndex: "lcNumber",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Account No
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Acc NO.</span>
          <Popover
            content={popoverContentAccNO}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAccNO}
            onOpenChange={handleOpenChangeAccNO}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "accountNumber",
      dataIndex: "accountNumber",
      className: "ff-poppins fw-bold",
      width: 120,
    },
    // Status
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Status</span>
          <Popover
            content={popoverContentStatus}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openStatus}
            onOpenChange={handleOpenChangeStatus}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "14",
      dataIndex: "status",
      className: "ff-poppins fw-bold",
      width: 80,
      render: (text, record) => (
        <>
          <span
            className={
              text === "Accepted"
                ? "color-green"
                : record.statusID === 5
                ? "InProgress_outstanding"
                : record.statusID === 2
                ? "pending_outstanding"
                : "color-red"
            }
          >
            {text}
          </span>
        </>
      ),
    },
    // Action
    {
      key: "15",
      title: "Action",
      dataIndex: "chat",
      className: "comment-class ",
      width: 120,
      render: (text, record) => {
        // 2 = Pending, 5 = In Progress, 6 = Accepted
        // 2 = Assigned
        // 5 = if isRfq to show deal icon and modal open of deal ||   Accepted or Rejected
        // 6 = Accepted Red and Rejected Rejec
        // const handleClickChat = (txnid) => {
        //   setSelectedTXNID(txnid);
        //   setShowChatModal(true);
        // };
        return (
          <div className="col-action text-nowrap text-center d-flex gap-1">
            {record.statusID === 2 ? (
              <>
                <CustomButton
                  icon={<i className="icon-user-check  "></i>}
                  size={"small"}
                  className="btn  btn-primary btn-sm"
                  onClick={() => handleClickAssignTransaction(record)}
                />
              </>
            ) : Number(record?.treasuryPersonID) ===
              Number(localStorage.getItem("userID")) ? (
              record.statusID === 6 ? (
                <>
                  <CustomButton
                    icon={<i className="icon-check "></i>}
                    className="btn btn-sm btn-danger"
                    applyClass={"ActionButton"}
                    size={"small"}
                    onClick={() =>
                      handleAcceptTransactionCancellation(
                        record.pK_TransactionID
                      )
                    }
                  />
                  <CustomButton
                    icon={<i className="icon-close "></i>}
                    className="btn btn-sm  "
                    size={"small"}
                    onClick={() =>
                      handleRejectTransactionCancellation(
                        record.pK_TransactionID
                      )
                    }
                  />
                </>
              ) : record.statusID === 5 ? (
                <>
                  {record.isRFQ === true ? (
                    <>
                      <CustomButton
                        icon={<i className="icon-open "></i>}
                        size={"small"}
                        className="btn btn-sm btn-primary"
                        onClick={() => openViewDeal(record)}
                      />
                    </>
                  ) : record.natureType === 2 ||
                    record.natureType === 3 ||
                    record.natureType === 4 ? (
                    <CustomButton
                      icon={<i className="icon-open "></i>}
                      size={"small"}
                      className="btn btn-sm btn-primary"
                      onClick={() => openViewDeal(record, record.natureType)}
                    />
                  ) : (
                    <>
                      <CustomButton
                        icon={<i className="icon-check"></i>}
                        size={"small"}
                        className="btn btn-sm btn-success blotterCheckerButton "
                        onClick={() => acceptTransaction(record)}
                      />
                      <CustomButton
                        icon={<i className="icon-close "></i>}
                        size={"small"}
                        className="btn btn-sm btn-danger blotterCheckerButton "
                        onClick={() => rejectTransaction(record)}
                      />
                    </>
                  )}
                </>
              ) : record.statusID === 4 ? null : record.statusID === 2 ? (
                <>
                  <CustomButton
                    size={"small"}
                    icon={
                      <i className="icon-user-check blotterCheckerButton "></i>
                    }
                    className="btn  btn-primary"
                    onClick={() => handleClickAssignTransaction(record)}
                  />
                </>
              ) : null
            ) : null}
            {/* 
            <CustomButton
              icon={<i className='icon-trash '></i>}
              className='btn btn-sm btn-danger  '
            />

            <CustomButton
              icon={<i className='icon-open '></i>}
              className='btn btn-sm btn-primary  '
            />
            <CustomButton
              icon={<i className='icon-view-comment'></i>}
              className='btn btn-sm btn-primary'
            /> */}
          </div>
        );
      },
    },
    // Action
    {
      key: "16",
      title: "",
      dataIndex: "chat",
      className: "comment-class ",
      width: 120,
      render: (text, record) => {
        return (
          <div className="d-flex gap-1 justify-content-start">
            {record.statusID === 6 ? (
              <CustomButton
                icon={
                  <i className="icon-view-comment blotterTableIconSize "></i>
                }
                className="btn  btn-primary"
                onClick={() => handleShowCommentModal(record.comment)}
              />
            ) : (
              <span className="w-30"></span>
            )}
            {(record.statusID === 4 || record.statusID === 5) &&
            Number(record.treasuryPersonID) ===
              Number(localStorage.getItem("userID")) ? (
              <CustomButton
                icon={<i className="icon-chat2 "></i>}
                className="btn btn-sm btn-danger chat-btn-trigger"
                onClick={() =>
                  handleClickChat(record.pK_TransactionID, record.fK_UserID)
                }
              />
            ) : (
              <span className="w-30"></span>
            )}

            <CustomButton
              onClick={() => handleClickInfo(record)}
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
              className="btn btn-sm btn-primary info-btn-trigger ms-1"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <GlobalTable
        pagination={false}
        dataSource={blotterdata}
        bordered={false}
        prefixCls="OutStanding_Table"
        columns={columns}
        scroll={{ x: "max-content", y: 500 }}
      />
      {/* <DealViewModal dealData={dealData} /> */}
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
