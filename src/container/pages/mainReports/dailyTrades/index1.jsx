import { IndexCell } from "@/components/common/inputField/IndexCell";
import InputFIeld from "@/components/common/inputField/InputField";
import {
  convertDateTimeIntoLocal,
  formatDateAndTimeFromString,
  formatDateToUTC,
} from "@/utils/formatters";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./DailyTrade.module.css";
import DatePicker from "react-multi-date-picker";
import { Popover } from "antd";
import excelImage from "@/assets/icons/excel.png";
import pdfImage from "@/assets/icons/pdf.png";

import GlobalTable from "@/components/common/table/GlobalTable";
import CustomButton from "@/components/common/globalButton/button";
import { GetAllNatureOfTransactionsApi } from "../../mainCorporate/rfqModal/RFQActions";
import { GetAllTradesAPI } from "./DailyTradeActions";
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import { setResetSearchConfirmationModal } from "@/store/modalSlice/modalSlicer";
import moment from "moment";
import {
  DownloadDailyTransactionsExcelReportAPI,
  DownloadDailyTransactionsPDFReportAPI,
} from "@/store/ReportSlicer/ReportActions";
import { NumericFormat } from "react-number-format";

const DailyTrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BlotterTransactionAccepted = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAccepted
  );

  const BlotterTransactionCancelled = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelled
  );

  // state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.modalReducer.resetSearchConfirmationModal
  );

  // console.log(showActivationModal, "showActivationModalshowActivationModal");

  const GetAllNatureOfTransactions = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  // console.log(GetAllNatureOfTransactions, "All Nature of trANSACTIONS");

  const GetAllTrades = useSelector(
    (state) => state.DailyTradeSlicer.GetAllTrades
  );

  // console.log(GetAllTrades, "testGetAllTradesGetAllTrades");

  const [selectPageSize, setSelectPageSize] = useState({
    value: 50,
    label: "50",
  });
  const tradeCountSchema = {
    TxnID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    clientName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    side: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    Amount: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    LC: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    AccountNumber: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    dateFrom: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    dateTo: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    natureOfClient: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  };
  //Trade Count States
  const [tradeCount, setTradeCount] = useState({
    TxnID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    clientName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    side: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    Amount: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    LC: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    AccountNumber: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    dateFrom: {
      value: new Date(),
      errorMessage: "",
      errorStatus: false,
    },
    dateTo: {
      value: new Date(),
      errorMessage: "",
      errorStatus: false,
    },
    natureOfClient: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState(0);
  //Sate For Side
  const [side, setSide] = useState({ value: 0, label: "" });
  const [natureOptions, setNatureOptions] = useState([]);
  const [natureID, setNatureID] = useState({
    value: 0,
    label: "",
  }); //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  // const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [dropdownvalue, setDropdownvalue] = useState(50);

  const transactionSide = [
    { value: 1, label: "Buy" },
    { value: 2, label: "Sell" },
  ];

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //UserDetails Corporate Use Modal Calling
  // const TradeCountCommentModalGobalState = useSelector(
  //   (state) => state.BOPSystemAdminModal.tradeCountCommentModal
  // );

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //Custome hook for Scrolling (1)
  // column for LoginHistory
  const tradeColumns = [
    {
      title: <label className="bottom-table-header">TXN ID</label>,
      dataIndex: "txnID",
      key: "txnID",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Branch Code</label>,
      dataIndex: "branchCode",
      key: "branchCode",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Client</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "200px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Side</label>,
      dataIndex: "side",
      key: "side",
      width: "50px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Nature</label>,
      dataIndex: "nature",
      key: "nature",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (val, record) => {
        return <IndexCell value={val} />;
      },
    },
    {
      title: <label className="bottom-table-header">CCY1</label>,
      dataIndex: "ccY1",
      key: "ccY1",
      width: "50px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">TXN Amount</label>,
      dataIndex: "quantity",
      key: "quantity",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Rate</label>,
      dataIndex: "rate",
      key: "rate",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">CCY2</label>,
      dataIndex: "ccY2",
      key: "ccY2",
      width: "50px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Total Amount</label>,
      dataIndex: "amount",
      key: "amount",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Date</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(convertDateTimeIntoLocal(transactionDateTime)).format(
              "DD-MM-YYYY"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">Time</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "75px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(convertDateTimeIntoLocal(transactionDateTime)).format(
              "h:mm a"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">LC #</label>,
      dataIndex: "lcNumber",
      key: "lcNumber",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Account #</label>,
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    // {
    //   title: <label className="bottom-table-header">Comment</label>,
    //   dataIndex: "comment",
    //   key: "comment",
    //   width: "100px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => {
    //     return (
    //       <>
    //         <Row>
    //           <Col
    //             lg={12}
    //             md={12}
    //             sm={12}
    //             className="d-flex gap-2 justify-content-center align-items-center"
    //           >
    //             <Button
    //               className={styles["comment-icon"]}
    //               icon={<i className="icon-view-comment color-blue"></i>}
    //               // onClick={handleEditBanker}
    //               // onClick={() => handleClickCommentModal(text)}
    //               onClick={() => handleClickCommentModal(text)}
    //             />
    //             {/* <span>{text}</span> */}
    //           </Col>
    //         </Row>
    //       </>
    //     );
    //   },
    // },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "statusID",
      key: "statusID",
      width: "100px",
      align: "center",
      className: "color-green",
      ellipsis: true,
      render: (statusID) => {
        return "Accepted";
      },
    },
    {
      title: <label className="bottom-table-header">Initiated By</label>,
      dataIndex: "initiatedBy",
      key: "initiatedBy",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Acccepted By</label>,
      dataIndex: "acceptedBy",
      key: "acceptedBy",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">TXN Accepted Time</label>,
      dataIndex: "txnAcceptedTime",
      key: "txnAcceptedTime",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (txnAcceptedTime) => {
        // Format the date and time
        return txnAcceptedTime !== "-"
          ? moment(convertDateTimeIntoLocal(txnAcceptedTime)).format("h:mm a")
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">Cancelled By</label>,
      // dataIndex: "statusID",
      // key: "statusID",
      width: "100px",
      align: "center",
      className: "color-green",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Cancelled Time</label>,
      // dataIndex: "statusID",
      // key: "statusID",
      width: "120px",
      align: "center",
      className: "color-green",
      ellipsis: true,
    },
  ];

  // Trade Count validate handler
  const tradeCountValidateHandler = (e) => {
    const { name, value } = e.target;

    const updateField = (fieldName, regex, value) => {
      let valueCheck = value.replace(regex, "");
      if (valueCheck !== "") {
        setTradeCount((prevTradeCount) => ({
          ...prevTradeCount,
          [fieldName]: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        }));
      } else {
        setTradeCount((prevTradeCount) => ({
          ...prevTradeCount,
          [fieldName]: {
            value: "",
            errorMessage: "",
            errorStatus: false,
          },
        }));
      }
    };
    //validation rules
    switch (name) {
      case "transactionID":
        updateField("TxnID", /[^a-zA-Z0-9/-]/g, value);
        break;
      case "ClientName":
        updateField("clientName", /[^a-zA-Z ]/g, value);
        break;
      case "Amount":
        updateField("Amount", /[^\d.]/g, value);
        break;
      case "AccountNumber":
        updateField("AccountNumber", /[^a-zA-Z0-9]/g, value);
        break;
      case "LC":
        updateField("LC", /[^a-zA-Z0-9]/g, value);
        break;
      default:
        break;
    }
  };

  //Handle Date Change method
  const handleDateChange = (fieldName, value) => {
    console.log({ fieldName: fieldName, value: Date(value) });
    setTradeCount((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));

    // Example validation: Start Date should be before End Date
    if (
      fieldName === "dateFrom" &&
      tradeCount.dateTo.value &&
      new Date(value) > new Date(tradeCount.dateTo.value)
    ) {
      setTradeCount((prev) => ({
        ...prev,
        dateFrom: {
          ...prev.dateFrom,
          errorMessage: "Start date cannot be after end date.",
          errorStatus: true,
        },
      }));
    }
  };

  // const handleClickCommentModal = (text) => {
  //   // dispatch(TradeCountCommentModalSystemAdmin(true));
  //   console.log("the comment is", text);
  // };

  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      // setHasReachedBottom(true);
      const FromDate = new Date(tradeCount.dateFrom.value);
      FromDate.setHours(0, 0, 0);
      const ToDate = new Date(tradeCount.dateTo.value);
      ToDate.setHours(23, 59, 59);
      let Data = {
        TxnID: tradeCount.TxnID.value,
        CorporateName: tradeCount.clientName.value,
        AccountNumber: tradeCount.AccountNumber.value,
        FromDate: formatDateToUTC(FromDate),
        ToDate: formatDateToUTC(ToDate),
        LCNumber: tradeCount.LC.value,
        Side: side.value,
        NatureOfTransactionID: tradeCount.natureOfClient.value,
        Amount: Number(tradeCount.Amount.value),
        sRow: sRow,
        Length: dropdownvalue,
      };
      // dispatch(GetAllTradesAPI(navigate, Data));
      dispatch(GetAllTradesAPI({ Data, navigate }));
    }
  });

  const handlePageSizeChange = (newSize) => {
    console.log(newSize, "newSizenewSize");
    setSelectPageSize(newSize);
    setDropdownvalue(newSize.value);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);
    try {
      const FromDate = new Date(tradeCount.dateFrom.value);
      FromDate.setHours(0, 0, 0);
      const ToDate = new Date(tradeCount.dateTo.value);
      ToDate.setHours(23, 59, 59);
      let Data = {
        TxnID: tradeCount.TxnID.value,
        CorporateName: tradeCount.clientName.value,
        AccountNumber: tradeCount.AccountNumber.value,
        FromDate: formatDateToUTC(FromDate),
        ToDate: formatDateToUTC(ToDate),
        LCNumber: tradeCount.LC.value,
        Side: side.value,
        NatureOfTransactionID: tradeCount.natureOfClient.value,
        Amount: Number(tradeCount.Amount.value),
        sRow: 0,
        Length: newSize.value,
      };
      dispatch(GetAllTradesAPI({ Data, navigate }));
    } catch (error) {
      console.log("Error:, ", error);
    }
  };

  const handleSearchEventButton = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
      sRow: 0,
      Length: dropdownvalue,
    };
    console.log("searchData is", Data);
    // dispatch(GetAllTradesAPI({ searchData, navigate }));
    dispatch(GetAllTradesAPI({ Data, navigate }));
  };

  //Table columns for customer List
  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      // dispatch(ConfirmationModalSystemAdmin(false));
      dispatch(setResetSearchConfirmationModal(false));

      setModalState(0);
    } else if (modalState === 2) {
      dispatch(setResetSearchConfirmationModal(false));

      // dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  // show error message When user hit activate btn
  const handleResetEventButton = () => {
    // dispatch(ResetConfirmationModal(true));

    // dispatch(setTreasuryPersonID(treasuryPersonID));
    dispatch(setResetSearchConfirmationModal(true));

    setModalState(2);
  };

  const handleResetYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    let FromDate = new Date();
    FromDate.setHours(0, 0, 0);
    let ToDate = new Date();
    ToDate.setHours(23, 59, 59);
    if (modalState === 2) {
      // dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);

      setTradeCount({
        ...tradeCountSchema,
        side: {
          value: 0,
        },
        Nature: {
          value: "",
        },
        dateFrom: {
          value: FromDate,
        },
        dateTo: {
          value: ToDate,
        },
      });
      setSide(0);
      setNatureID("");
    }
    let Data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: dropdownvalue,
    };

    dispatch(GetAllTradesAPI({ Data, navigate }));
    dispatch(setResetSearchConfirmationModal(false));
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleExport = (format) => {
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  };

  const exportToExcel = () => {
    console.log("Doc saved as Excel");
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
    };

    dispatch(DownloadDailyTransactionsExcelReportAPI({ navigate, Data }));
  };

  const exportToPDF = () => {
    console.log("doc saved as pdf");
    console.log("Doc saved as Excel");
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
    };

    dispatch(DownloadDailyTransactionsPDFReportAPI({ navigate, Data }));
  };

  //handle select categoryID
  const handleSelectNature = async (selectedNature) => {
    console.log(selectedNature.value, "selectedCategoryselectedCategory");
    setNatureID(selectedNature);

    setTradeCount((prevState) => ({
      ...prevState,
      natureOfClient: {
        ...prevState.natureOfClient,
        value: selectedNature.value,
      },
    }));
  };

  //handle select categoryID
  const handleSelectSide = async (selectedSide) => {
    console.log(selectedSide.value, "selectedCategoryselectedCategory");
    setSide(selectedSide);

    setTradeCount((prevState) => ({
      ...prevState,
      side: {
        ...prevState.side,
        value: selectedSide.value,
      },
    }));
  };

  const handleChangePageSize = (val) => {
    setSelectPageSize(val);
  };

  // // Fetch categories on component mount
  // useEffect(() => {
  //   // dispatch(GetAllNatureOfTransactionsAPI(navigate));
  //   const FromDate = new Date(tradeCount.dateFrom.value);
  //   FromDate.setHours(0, 0, 0);
  //   const ToDate = new Date(tradeCount.dateTo.value);
  //   ToDate.setHours(23, 59, 59);
  //   let data = {
  //     TxnID: "",
  //     CorporateName: "",
  //     AccountNumber: "",
  //     FromDate: formatDateToUTC(FromDate),
  //     ToDate: formatDateToUTC(ToDate),
  //     LCNumber: "",
  //     Side: 0,
  //     NatureOfTransactionID: 0,
  //     Amount: 0.0,
  //     sRow: 0,
  //     Length: dropdownvalue,
  //   };

  //   dispatch(GetAllTradesAPI({ navigate, data }));
  // }, []);

  // const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
  //   console.log("🚀 Table reached bottom");
  //   // Load more data here if needed
  //   if (recordsLength !== tableData.length) {
  //     // setHasReachedBottom(true);
  //     const FromDate = new Date(tradeCount.dateFrom.value);
  //     FromDate.setHours(0, 0, 0);
  //     const ToDate = new Date(tradeCount.dateTo.value);
  //     ToDate.setHours(23, 59, 59);
  //     let Data = {
  //       TxnID: tradeCount.TxnID.value,
  //       CorporateName: tradeCount.clientName.value,
  //       AccountNumber: tradeCount.AccountNumber.value,
  //       FromDate: formatDateToUTC(FromDate),
  //       ToDate: formatDateToUTC(ToDate),
  //       LCNumber: tradeCount.LC.value,
  //       Side: side.value,
  //       NatureOfTransactionID: tradeCount.natureOfClient.value,
  //       Amount: Number(tradeCount.Amount.value),
  //       sRow: sRow,
  //       Length: dropdownvalue,
  //     };
  //     dispatch(GetAllTradesAPI(navigate, Data));
  //   }
  // });

  // const handlePageSizeChange = (newSize) => {
  //   setDropdownvalue(newSize);
  //   setSRow(0);
  //   setHasReachedBottom(false);
  //   setTableData([]);
  //   setRecordLength(0);
  //   try {
  //     const FromDate = new Date(tradeCount.dateFrom.value);
  //     FromDate.setHours(0, 0, 0);
  //     const ToDate = new Date(tradeCount.dateTo.value);
  //     ToDate.setHours(23, 59, 59);
  //     let Data = {
  //       TxnID: tradeCount.TxnID.value,
  //       CorporateName: tradeCount.clientName.value,
  //       AccountNumber: tradeCount.AccountNumber.value,
  //       FromDate: formatDateToUTC(FromDate),
  //       ToDate: formatDateToUTC(ToDate),
  //       LCNumber: tradeCount.LC.value,
  //       Side: side.value,
  //       NatureOfTransactionID: tradeCount.natureOfClient.value,
  //       Amount: Number(tradeCount.Amount.value),
  //       sRow: 0,
  //       Length: newSize,
  //     };
  //     dispatch(GetAllTradesAPI(navigate, Data));
  //   } catch (error) {
  //     console.log("Error:, ", error);
  //   }
  // };

  useEffect(() => {
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    let Data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: dropdownvalue,
    };
    dispatch(GetAllNatureOfTransactionsApi({ navigate }));
    dispatch(GetAllTradesAPI({ Data, navigate }));
  }, []);

  useEffect(() => {
    if (GetAllNatureOfTransactions !== null) {
      try {
        let newNatureOfTransactions =
          GetAllNatureOfTransactions.natureOfTransactions.map(
            (natureOTransaction) => {
              return {
                ...natureOTransaction,
                value: natureOTransaction.id,
                label: natureOTransaction.name,
              };
            }
          );
        setNatureOptions(newNatureOfTransactions);
      } catch (error) {}
    }
  }, [GetAllNatureOfTransactions]);

  // handelled scrolling here (4)
  useEffect(() => {
    if (GetAllTrades !== null) {
      try {
        const { transactions, totalCount } = GetAllTrades;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalCount);
          setTableData([...tableData, ...transactions]);
          // setSRow(tableData.length + transactions.length);
          setSRow((prev) => prev + transactions.length);
        } else {
          setHasReachedBottom(false);
          setTableData(transactions);
          setRecordLength(totalCount);
          setSRow(transactions.length);
        }
      } catch (error) {}
    } else if (GetAllTrades === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetAllTrades]);

  useEffect(() => {
    if (BlotterTransactionAccepted !== null) {
      console.log("BlotterTransactionAccepted: ", {
        BlotterTransactionAccepted,
        tableData,
      });
      const { transaction } = BlotterTransactionAccepted;
      let matchedId = tableData.find(
        (record) => record.pK_TransactionID === transaction.pK_TransactionID
      );
      console.log(matchedId, "matchedIdmatchedId");

      if (matchedId === undefined) {
        let record = {
          ...transaction,
          txnID: transaction.txnid,
          transactionDateTime: transaction.settlementDateTime,
        };
        setTableData((prev) => [record, ...prev]);
      }
    }
  }, [BlotterTransactionAccepted]);

  // useEffect(() => {
  //   if (BlotterTransactionCancelled !== null) {
  //     try {
  //       const { transaction } = BlotterTransactionCancelled;
  //       let findRecord = tableData.find(
  //         (tableRow, index) => tableRow.txnID === transaction.txnID
  //       );
  //     } catch (error) {}
  //   }
  // }, [BlotterTransactionCancelled]);

  useEffect(() => {
    if (BlotterTransactionCancelled !== null) {
      try {
        const { transaction } = BlotterTransactionCancelled;

        setTableData((prev) =>
          prev.filter((row) => row.txnID !== transaction.txnid)
        );
      } catch (error) {
        console.error("Error while removing cancelled transaction:", error);
      }
    }
  }, [BlotterTransactionCancelled]);

  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-1">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["tradeCount-label"]}>Daily Trade</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          {/* <CustomPaper className={styles["customer-List-paper"]}> */}
          <Row className="mt-2 g-2">
            <Col lg={2} md={2} sm={12}>
              <InputFIeld
                placeholder="TXN ID"
                name="transactionID"
                labelClass="d-none"
                value={tradeCount.TxnID.value}
                onChange={tradeCountValidateHandler}
                className={"form-control reports-input-field"}
                maxLength={20}
              />
            </Col>
            <Col lg={2} md={2} sm={12}>
              <InputFIeld
                placeholder="Client Name"
                maxLength={20}
                name="ClientName"
                labelClass="d-none"
                value={tradeCount.clientName.value}
                onChange={tradeCountValidateHandler}
                className={"form-control reports-input-field"}
              />
            </Col>
            <Col lg={2} md={2} sm={12}>
              <SelectDropdown
                name="side"
                classNamePrefix="selectTransactionNatureList"
                placeholder="Select Side"
                options={transactionSide}
                value={side.value !== 0 ? side : null}
                isSearchable
                onChange={handleSelectSide}
              ></SelectDropdown>
            </Col>

            <Col lg={2} md={2} sm={12}>
              <SelectDropdown
                placeholder="Select Nature"
                // classNamePrefix={"TradeCountSelect"}
                classNamePrefix="selectTransactionNatureList"
                options={natureOptions}
                value={natureID.value !== 0 ? natureID : null}
                isSearchable
                onChange={handleSelectNature}
              />
            </Col>

            <Col lg={2} md={2} sm={12}>
              <NumericFormat
                placeholder="Total Amount"
                name="Amount"
                maxLength={20}
                onChange={tradeCountValidateHandler}
                value={
                  tradeCount.Amount.value === 0 ? "" : tradeCount.Amount.value
                }
                labelClass="d-none"
                className="form-control reports-input-field"
              />
            </Col>

            <Col lg={2} md={2} sm={12}>
              <InputFIeld
                placeholder="LC #"
                name="LC"
                maxLength={20}
                value={tradeCount.LC.value}
                onChange={tradeCountValidateHandler}
                labelClass="d-none"
                className="form-control reports-input-field"
              />
            </Col>
          </Row>

          <Row className="mt-3 g-2">
            <Col lg={2} md={2} sm={12}>
              <InputFIeld
                placeholder="Account Number"
                name="AccountNumber"
                maxLength={20}
                value={tradeCount.AccountNumber.value}
                onChange={tradeCountValidateHandler}
                labelClass="d-none"
                className="form-control reports-input-field"
              />
            </Col>
            <Col
              lg={4}
              md={4}
              sm={12}
              className="d-flex align-items-center pe-4"
            >
              <DatePicker
                name="dateFrom"
                value={tradeCount.dateFrom.value}
                placeholder="Start date"
                showOtherDays="true"
                inputClass={styles["Tradecount-Datepicker-left"]}
                onChange={(date) => handleDateChange("dateFrom", date)}
                maxDate={tradeCount.dateTo.value}
                minDate={null}
                editable={false}
              />
              <label className={styles["Tradecount-date-to"]}>to</label>

              <DatePicker
                name="dateTo"
                value={tradeCount.dateTo.value}
                placeholder="End Date"
                showOtherDays="true"
                inputClass={styles["Tradecount-Datepicker-right"]}
                onChange={(date) => handleDateChange("dateTo", date)}
                minDate={tradeCount.dateFrom.value}
                maxDate={null}
                editable={false}
              />
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="d-flex justify-content-center gap-1"
            >
              <CustomButton
                value="Search"
                icon={<i className="icon-search"></i>}
                className={styles["Search-tradeCount-btn"]}
                onClick={handleSearchEventButton}
              />
              {/* <Button
                    text="Export"
                    icon={<i className="icon-download-excel"></i>}
                    className={styles["tradeCount-Download-Excel-btn"]}
                  /> */}

              <CustomButton
                icon={<i className="icon-refresh icon-check-space"></i>}
                className={styles["Banklist-Reset-btn"]}
                value="Reset"
                onClick={handleResetEventButton}
              />
              <Popover
                content={
                  <div className={styles["export-options"]}>
                    <CustomButton
                      icon={<img src={excelImage} alt="Excel Icon" />}
                      onClick={() => handleExport("excel")}
                      className={styles["export-button"]}
                    />
                    <CustomButton
                      icon={<img src={pdfImage} alt="PDF Icon" />}
                      onClick={() => handleExport("pdf")}
                      className={styles["export-button"]}
                    />
                  </div>
                }
                // title="Title"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="bottomRight"
                arrow={false}
              >
                <CustomButton
                  icon={<i className="icon-download"></i>}
                  className={styles["Export_Button"]}
                  value="Export"
                  iconClass={styles["resetIconClass"]}
                  onClick={toggleExportOptions}
                />
              </Popover>
            </Col>
          </Row>

          {/* <Row className="mt-1">
            <Col lg={12} md={12} sm={12}>
              <ExportShowComponent
                value={dropdownvalue}
                onChange={handlePageSizeChange}
              />
            </Col>
          </Row> */}

          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex gap-2 align-items-center"
            >
              <span className={styles["spanshowClass"]}>Show</span>
              <SelectDropdown
                // placeholder=""
                value={selectPageSize}
                style={{ width: 70, margin: "0 10px" }}
                // onChange={(val) => setSelectPageSize(val)}
                // onChange={handleChangePageSize()}
                onChange={handlePageSizeChange}
                options={[
                  { label: "50", value: 50 },
                  { label: "100", value: 100 },
                ]}
                classNamePrefix={"selectTransactionNatureList"}
              >
                {/* <Option value={50}>50</Option>
            <Option value={100}>100</Option> */}
              </SelectDropdown>
              <span className={styles["spanshowClass"]}>entries</span>
            </Col>
          </Row>

          <Row className="mt-1">
            <Col lg={12} md={12} sm={12}>
              <GlobalTable
                columns={tradeColumns}
                pagination={false}
                // rows={tableData}
                dataSource={tableData}
                scroll={{ x: "max-content", y: "35vh" }}
                className={"DailyTrade-table"}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {showActivationModal && (
        <Modal
          // show={show}
          show={showActivationModal ? true : false}
          onHide={handleNoButton}
          size="md"
          centered
          className="UniversalBOPModalStyles"
        >
          {/* Hide Header (since you used d-none before) */}
          <Modal.Header className="d-none" />

          <Modal.Body>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={styles["AddBranchLabel"]}>Confirmation</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center align-items-center"
              >
                <span className={styles["labels-add-bank"]}>
                  Are you sure you want to do this action?
                </span>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="UniversalBOPModalStylesfooter">
            <Row className="mb-3 w-100">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <CustomButton
                  onClick={handleResetYes}
                  icon={<i className="icon-check"></i>}
                  value="Yes"
                  className={styles["AddBranchClass"]}
                  iconClass={styles["IconClass"]}
                />
                <CustomButton
                  icon={<i className="icon-close"></i>}
                  value="No"
                  className={styles["CancelButton"]}
                  iconClass={styles["IconClass"]}
                  onClick={handleNoButton}
                />
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default DailyTrade;
