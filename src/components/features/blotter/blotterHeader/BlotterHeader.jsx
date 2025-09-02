import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  startTransition,
  useLayoutEffect
} from "react";
import "./BlotterHeader.css";
import { Col, Row } from "react-bootstrap";
import GlobalTabs from "@/components/common/tabs/Tabs";
import CustomButton from "@/components/common/globalButton/button";
import pdfImage from "@/assets/icons/pdf.png";
import emailImage from "@/assets/icons/email.png";
import excelImage from "@/assets/icons/excel.png";
import printImage from "@/assets/icons/print.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTreasuryTab } from "@/store/BlotterSlicer/BlotterSlicer";
import {
  DownloadExcelReportBlotterTrasactionBranchAPI,
  DownloadExcelReportBlotterTrasactionCorporateAPI,
  DownloadExcelReportBlotterTrasactionTreasuryAPI,
  DownloadPDFReportBlotterTrasactionBranchAPI,
  DownloadPDFReportBlotterTrasactionCorporateAPI,
  DownloadPDFReportBlotterTrasactionTreasuryAPI,
} from "@/store/ReportSlicer/ReportActions";
import { formatDateToUTC, formatPkAmount } from "@/utils/formatters";
import SectionLoader from "@/components/common/loader/SectionLoader";
import {
  BlotterTransactionAccepted,
  BlotterTransactionAdded,
  BlotterTransactionAssigned,
  BlotterTransactionCancellationRequest,
  BlotterTransactionCancellationRequestForTreasury,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  BlotterTransactionRejected,
  BlotterTranscationCancelled,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { Popover } from "antd";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
  GetNOPDataAPI,
} from "../BlotterActions";
import { GetMisDataByRangeAPI } from "../../SpotBranch/WatchlistAction";

// Lazy load components
const TXNSummary = lazy(() => import("../txnSummary/TXNSummary"));
const OutstandingDeals = lazy(() =>
  import("../outstandingDeals/OutstandingDeals")
);
const TXNTreasurySummary = lazy(() =>
  import("../txnTreasurySummary/TxnTreasurySummary")
);
const NopModal = lazy(() => import("../nopModal/NopModal"));
const MailModal = lazy(() => import("../mailModal/MailModal"));
const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const BlotterHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GetNOPData = useSelector((state) => state.BlotterSlicer.GetNOPData);
  const [openNopModal, setOpenNopModal] = useState(false);
  const [openExportDiv, setOpenExportDiv] = useState(false);
  const [openMailModal, setOpenMailModal] = useState(false);
  const activeTab = useSelector(
    (state) => state.BlotterSlicer.activeTabBlotter
  );
  const [hasBottomReachedTreasuryTXN, setHasBottomReachedTreasuryTXN] =
    useState(false);
  const [treasuryTXNSummary, setTreasuryTXNSummary] = useState([]);
  const [treasuryTXNSummaryTotalRecords, setTreasuryTXNSummaryTotalRecords] =
    useState(0);

  const [treasuryTXNSummarysRow, setTreasuryTXNSummarysRow] = useState(0);
  const [hasBottomReachedOutstanding, setHasBottomReachedOutstanding] =
    useState(false);

  const [treasuryOutStandingDeal, setTreasuryOutStandingDeal] = useState([]);
  const [treasuryOutStandingDealRecords, setTreasuryOutStandingDealRecords] =
    useState(0);
  const [treasuryOutStandingDealsRow, setTreasuryOutStandingDealsRow] =
    useState(0);

  // This is Treasury Actions which is based on actions performed on Blotter Transaction
  const blotterTransactionRFQExpiredForTreasury = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionRFQExpiredForTreasury
  );
  const blotterTransactionAcceptedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAcceptedForTreasury
  );
  const blotterTransactionCancellationRequestDataForTreasury = useSelector(
    (state) =>
      state.RealtimeActionsSlice
        .BlotterTransactionCancellationRequestDataForTreasury
  );
  const blotterTranscationCancelledForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTranscationCancelledForTreasury
  );
  const blotterTransactionRejectedForTreasury = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionRejectedForTreasury
  );
  // Treasury and CounterParty Data
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.BlotterSlicer.getBlotterApiData
  );

  //Global State For Blotter OutStanding
  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );
  // This is mqtt states related to Treasury Outstanding Deals Tab

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
  const [exportButton, setExportButton] = useState(false);

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    try {
      if (GlobalStateGetBlotterData !== null) {
        const { tnxSummary, totalCount } = GlobalStateGetBlotterData;
        if (tnxSummary.length > 0) {
          if (isTreasury) {
            if (hasBottomReachedTreasuryTXN) {
              setTreasuryTXNSummary((prev) => [...prev, ...tnxSummary]);
              setTreasuryTXNSummaryTotalRecords(totalCount);
              setTreasuryTXNSummarysRow((prev) => prev + tnxSummary.length);
              setHasBottomReachedTreasuryTXN(false);
            } else {
              setTreasuryTXNSummary(tnxSummary);
              setTreasuryTXNSummaryTotalRecords(totalCount);
              setTreasuryTXNSummarysRow(tnxSummary.length);
              setHasBottomReachedTreasuryTXN(false);
            }
            return;
          }
        }
      } else if (GlobalStateGetBlotterData === null) {
        if (!hasBottomReachedTreasuryTXN) {
          setTreasuryTXNSummary([]);
          setTreasuryTXNSummaryTotalRecords(0);
          setTreasuryTXNSummarysRow(0);
          setHasBottomReachedTreasuryTXN(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [GlobalStateGetBlotterData]);

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    try {
      if (getBlotterOutstandingData !== null) {
        const { outstandingDeals, totalCount } = getBlotterOutstandingData;
        if (outstandingDeals.length > 0) {
          if (isTreasury) {
            if (hasBottomReachedOutstanding) {
              setHasBottomReachedOutstanding(false);
              setTreasuryOutStandingDeal((prev) => [
                ...prev,
                ...outstandingDeals,
              ]);
              setTreasuryOutStandingDealRecords(totalCount);
              setTreasuryOutStandingDealsRow(
                (prev) => prev + outstandingDeals.length
              );
              return;
            } else {
              setHasBottomReachedOutstanding(false);
              setTreasuryOutStandingDeal(outstandingDeals);
              setTreasuryOutStandingDealRecords(totalCount);
              setTreasuryOutStandingDealsRow(outstandingDeals.length);
              return;
            }
          }
        }
      } else if (getBlotterOutstandingData === null) {
        if (!hasBottomReachedOutstanding) {
          setHasBottomReachedOutstanding(false);
          setTreasuryOutStandingDeal([]);
          setTreasuryOutStandingDealRecords(0);
          setTreasuryOutStandingDealsRow(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [getBlotterOutstandingData]);

  // This useEffect is for Treasury TXN Summary
  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    const handleTransactionUpdate = (transaction) => {
      if (!transaction) return;

      setTreasuryTXNSummary((prevData) => {
        const updatedData = [...(prevData || [])];
        const existingIndex = updatedData.findIndex(
          (item) => item.pK_TransactionID === transaction.pK_TransactionID
        );

        if (existingIndex !== -1) {
          updatedData[existingIndex] = transaction;
        } else {
          updatedData.unshift(transaction);
          setTreasuryTXNSummarysRow((prev) => prev + 1);
          setTreasuryTXNSummaryTotalRecords((prev) => prev + 1);
        }

        return updatedData;
      });
    };

    // Handle RFQ Expired
    if (blotterTransactionRFQExpiredForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionRFQExpiredForTreasury.transaction
      );
    }

    // Handle Transaction Accepted
    if (blotterTransactionAcceptedForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionAcceptedForTreasury.transaction
      );
    }

    // Handle Transaction Cancelled
    if (blotterTranscationCancelledForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTranscationCancelledForTreasury.transaction
      );
    }

    // Handle Transaction Rejected
    if (blotterTransactionRejectedForTreasury?.transaction) {
      handleTransactionUpdate(
        blotterTransactionRejectedForTreasury.transaction
      );
    }

    // Handle Transaction Cancellation Request
    if (blotterTransactionCancellationRequestDataForTreasury?.transaction) {
      const { transaction } =
        blotterTransactionCancellationRequestDataForTreasury;

      setTreasuryTXNSummary((prevData) => {
        const updatedData = (prevData || []).filter(
          (item) => item.pK_TransactionID !== transaction.pK_TransactionID
        );
        setTreasuryTXNSummaryTotalRecords((prev) => prev - 1);
        setTreasuryTXNSummarysRow((prev) => prev - 1);

        return updatedData;
      });

      dispatch(BlotterTransactionCancellationRequestForTreasury(null));
    }
  }, [
    blotterTransactionRFQExpiredForTreasury,
    blotterTransactionAcceptedForTreasury,
    blotterTransactionCancellationRequestDataForTreasury,
    blotterTranscationCancelledForTreasury,
    blotterTransactionRejectedForTreasury,
  ]);

  // Fixed: Replaced useEffect with useLayoutEffect to prevent state updates during render
  useLayoutEffect(() => {
    const handleTransaction = (transaction, type) => {
      if (!transaction) return;

      setTreasuryOutStandingDeal((prevData) => {
        let updatedData = [...(prevData || [])];

        switch (type) {
          case "added": {
            const index = updatedData.findIndex(
              (item) => item.pK_TransactionID === transaction.pK_TransactionID
            );

            if (index !== -1) {
              updatedData[index] = transaction;
            } else {
              updatedData = [transaction, ...updatedData];
              setTreasuryOutStandingDealRecords((prev) => prev + 1);
              setTreasuryOutStandingDealsRow((prev) => prev + 1);
            }

            dispatch(BlotterTransactionAdded(null));
            return updatedData;
          }

          case "quoted": {
            updatedData = updatedData.map((item) =>
              item.pK_TransactionID === transaction.pK_TransactionID
                ? {
                    ...item,
                    bid: transaction.bid,
                    offer: transaction.offer,
                    amount: transaction.amount,
                    statusID: transaction.statusID,
                    rfqTimerDetails:
                      transaction.rfqTimerDetails ?? item.rfqTimerDetails,
                  }
                : item
            );

            dispatch(BlotterTransactionRFQQuoted(null));
            return updatedData;
          }

          case "expired":
          case "accepted":
          case "cancelled":
          case "rejected": {
            updatedData = updatedData.filter(
              (item) => item.pK_TransactionID !== transaction.pK_TransactionID
            );

            const dispatchMap = {
              expired: BlotterTransactionRFQExpired,
              accepted: BlotterTransactionAccepted,
              cancelled: BlotterTranscationCancelled,
              rejected: BlotterTransactionRejected,
            };
            setTreasuryOutStandingDealRecords((prev) => prev - 1);
            setTreasuryOutStandingDealsRow((prev) => prev - 1);

            dispatch(dispatchMap[type](null));
            return updatedData;
          }

          case "assigned": {
            updatedData = updatedData.map((item) =>
              item.pK_TransactionID === transaction.transactionID
                ? {
                    ...item,
                    status:
                      Number(localStorage.getItem("userID")) ===
                      Number(transaction.treasuryPersonID)
                        ? transaction.statusForAssignedUser
                        : transaction.statusForOtherTreasury,
                    statusID: transaction.statusID,
                    treasuryPersonID: transaction.treasuryPersonID,
                  }
                : item
            );
            dispatch(BlotterTransactionAssigned(null));
            return updatedData;
          }

          case "cancellationRequest": {
            const exists = updatedData.find(
              (item) => item.pK_TransactionID === transaction.pK_TransactionID
            );

            if (!exists) {
              updatedData = [transaction, ...updatedData];
              setTreasuryOutStandingDealRecords((prev) => prev + 1);
              setTreasuryOutStandingDealsRow((prev) => prev + 1);
            }

            dispatch(BlotterTransactionCancellationRequest(null));
            return updatedData;
          }

          default:
            return updatedData;
        }
      });
    };

    try {
      if (blotterTransactionAdded?.transaction) {
        handleTransaction(blotterTransactionAdded.transaction, "added");
      }

      if (blotterTransactionRFQQuoted?.transaction) {
        handleTransaction(blotterTransactionRFQQuoted.transaction, "quoted");
      }

      if (blotterTransactionRFQExpired?.transaction) {
        handleTransaction(blotterTransactionRFQExpired.transaction, "expired");
      }

      if (blotterTransactionAccepted?.transaction) {
        handleTransaction(blotterTransactionAccepted.transaction, "accepted");
      }

      if (blotterTranscationCancelled?.transaction) {
        handleTransaction(blotterTranscationCancelled.transaction, "cancelled");
      }

      if (blotterTransactionRejected?.transaction) {
        handleTransaction(blotterTransactionRejected.transaction, "rejected");
      }

      if (blotterTransactionAssigned) {
        handleTransaction(blotterTransactionAssigned, "assigned");
      }

      if (blotterTransactionCancellationRequest?.transaction) {
        handleTransaction(
          blotterTransactionCancellationRequest.transaction,
          "cancellationRequest"
        );
      }
    } catch (error) {
      console.error("Error in unified transaction handler:", error);
    }
  }, [
    blotterTransactionAdded,
    blotterTransactionRFQQuoted,
    blotterTransactionRFQExpired,
    blotterTransactionAccepted,
    blotterTranscationCancelled,
    blotterTransactionRejected,
    blotterTransactionAssigned,
    blotterTransactionCancellationRequest,
  ]);

  const tabsData = [
    {
      title: "TXN Summary",
      content: (
        <section className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "TXN Summary" && (
              <TXNTreasurySummary
                treasuryTXNSummaryTotalRecords={treasuryTXNSummaryTotalRecords}
                treasuryTXNSummary={treasuryTXNSummary}
                treasuryTXNSummarysRow={treasuryTXNSummarysRow}
                setHasBottomReachedTreasuryTXN={setHasBottomReachedTreasuryTXN}
                hasBottomReachedTreasuryTXN={hasBottomReachedTreasuryTXN}
              />
            )}{" "}
          </Suspense>
        </section>
      ),
    },
    {
      title: "Outstanding Deals",
      content: (
        <section className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Outstanding Deals" && (
              <OutstandingDeals
                treasuryOutStandingDeal={treasuryOutStandingDeal}
                treasuryOutStandingDealsRow={treasuryOutStandingDealsRow}
                treasuryOutStandingDealRecords={treasuryOutStandingDealRecords}
                hasBottomReachedOutstanding={hasBottomReachedOutstanding}
                setHasBottomReachedOutstanding={setHasBottomReachedOutstanding}
              />
            )}
          </Suspense>
        </section>
      ),
    },
  ];

  const handleTabChange = (tabTitle) => {
    startTransition(() => {
      dispatch(setActiveTreasuryTab(tabTitle));
      let Data3 = { sRow: 0, Length: 10 };
      if (tabTitle === "TXN Summary") {
        dispatch(BlotterDataAPI({ navigate, Data: Data3 }));
      } else {
        dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data: Data3 }));
      }

      dispatch(GetNOPDataAPI({ navigate }));
      const startDate = new Date();

      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();
      endDate.setHours(23, 58, 59, 99);

      const Data2 = {
        StartDate: formatDateToUTC(startDate, 1),
        EndDate: formatDateToUTC(endDate, 1),
      };

      dispatch(GetMisDataByRangeAPI({ navigate, Data: Data2 }));
    });
  };

  const HandlePDFDownloadFunc = () => {
    setExportButton(false);
    startTransition(() => {
      if (isTreasury) {
        dispatch(DownloadPDFReportBlotterTrasactionTreasuryAPI({ navigate }));
      } else if (isCorporate) {
        dispatch(DownloadPDFReportBlotterTrasactionCorporateAPI({ navigate }));
      } else if (isBranch) {
        dispatch(DownloadPDFReportBlotterTrasactionBranchAPI({ navigate }));
      }
    });
  };

  const HandleExcelDownloadFunc = () => {
    setExportButton(false);
    startTransition(() => {
      if (isTreasury) {
        dispatch(DownloadExcelReportBlotterTrasactionTreasuryAPI({ navigate }));
      } else if (isCorporate) {
        dispatch(
          DownloadExcelReportBlotterTrasactionCorporateAPI({ navigate })
        );
      } else if (isBranch) {
        dispatch(DownloadExcelReportBlotterTrasactionBranchAPI({ navigate }));
      }
    });
  };

  const onClickNopModal = () => {
    startTransition(() => {
      setOpenNopModal(true);
    });
  };

  const onClickOpenExport = () => {
    startTransition(() => {
      setOpenExportDiv(!openExportDiv);
    });
  };

  const handleTransactionModal = (e) => {
    e.preventDefault();
    setOpenMailModal(true);
    setExportButton(false);
  };
  
  return (
    <>
      <section className='position-relative'>
        {isTreasury ? (
          <>
            <GlobalTabs
              tabClass=' d-flex justify-content-start gap-2 mb-3 align-items-center position-relative'
              tabs={tabsData}
              onTabChange={handleTabChange}
              activeKey={activeTab}
              defaultActiveKey={"0"}
              outStandingCounter={treasuryOutStandingDeal.length}
            />
            <div className='moreOptionsNOPExport'>
              <div className='nop-hd-container'>
                <div className='d-flex align-items-center'>
                  <>
                    {" "}
                    <span className='hd-txt me-3'>NOP (US$)</span>
                    <span className='hd-cr me-2'>
                      {GetNOPData !== null &&
                        GetNOPData !== undefined &&
                        (GetNOPData?.nop === 0 ? (
                          <span className='color-black'>
                            {formatPkAmount(GetNOPData?.nop)}
                          </span>
                        ) : GetNOPData?.nop >= 0 ? (
                          <span>{formatPkAmount(GetNOPData?.nop)}</span>
                        ) : (
                          <span className='color-red'>{`(${formatPkAmount(
                            Math.abs(GetNOPData?.nop)
                          )})`}</span>
                        ))}
                    </span>
                    <CustomButton
                      applyClass={"NOP-button"}
                      value='+'
                      onClick={onClickNopModal}
                    />{" "}
                    <CustomButton
                      applyClass={"Export-button"}
                      value='Export'
                      onClick={onClickOpenExport}
                    />
                  </>

                  {openExportDiv && (
                    <div className='exportOptions'>
                      <div className='exportOptionsBox'>
                        <img
                          src={pdfImage}
                          width={30}
                          height={30}
                          className='cursor-pointer'
                          alt='pdf'
                          onClick={HandlePDFDownloadFunc}
                        />
                        <img
                          src={excelImage}
                          width={30}
                          height={30}
                          alt='excel'
                          className='cursor-pointer'
                          onClick={HandleExcelDownloadFunc}
                        />
                        <img
                          src={emailImage}
                          width={30}
                          height={30}
                          className='cursor-pointer'
                          onClick={handleTransactionModal}
                        />
                        <img
                          src={printImage}
                          width={30}
                          height={30}
                          className='cursor-pointer'
                          alt='print'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          (isBranch || isCorporate) && (
            <>
              <Row className='mb-3'>
                <Col
                  sm={6}
                  md={6}
                  lg={6}
                  className='d-flex justify-content-start align-items-center'>
                  <span className='fs-6 fw-bold color-hd data-summary-heading'>
                    TXN Summary
                  </span>
                </Col>

                <Col
                  sm={6}
                  md={6}
                  lg={6}
                  className='d-flex align-item-center justify-content-end  color-white fw-bold fs-6'>
                  <Popover
                    content={
                      <div className={"export-options"}>
                        <CustomButton
                          icon={<img src={pdfImage} alt='Excel Icon' />}
                          className={"bg-none"}
                          onClick={HandlePDFDownloadFunc}
                        />
                        <CustomButton
                          icon={<img src={excelImage} alt='PDF Icon' />}
                          className={"bg-none"}
                          onClick={HandleExcelDownloadFunc}
                        />
                        <CustomButton
                          icon={<img src={emailImage} alt='Excel Icon' />}
                          className={"bg-none"}
                          onClick={handleTransactionModal}
                        />
                        <CustomButton
                          icon={<img src={printImage} alt='PDF Icon' />}
                          className={"bg-none"}
                          onClick={() => setExportButton(false)}
                        />
                      </div>
                    }
                    trigger='click'
                    open={exportButton}
                    onOpenChange={() => setExportButton(!exportButton)}
                    placement='bottomRight'
                    arrow={false}>
                    <CustomButton
                      applyClass={"Export-button"}
                      value='Export'
                      onClick={onClickOpenExport}
                    />
                  </Popover>
                </Col>
              </Row>
              <Suspense fallback={<SectionLoader />}>
                <TXNSummary />
              </Suspense>
            </>
          )
        )}

        {openNopModal && (
          <Suspense fallback={"...Loading"}>
            <NopModal
              openNopModal={openNopModal}
              setOpenNopModal={setOpenNopModal}
            />
          </Suspense>
        )}
        {openMailModal && (
          <Suspense fallback={"..Loading"}>
            <MailModal
              openMailModal={openMailModal}
              setOpenMailModal={setOpenMailModal}
            />
          </Suspense>
        )}
      </section>
    </>
  );
};

export default BlotterHeader;