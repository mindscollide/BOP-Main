import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  startTransition,
  useLayoutEffect,
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

import { Popover } from "antd";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
  GetNOPDataAPI,
} from "../BlotterActions";
import { GetMisDataByRangeAPI } from "../../SpotBranch/WatchlistAction";
import { useBlotterTransaction } from "@/context/BlotterTransactionContext";

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
  const { treasuryOutStandingDeal } = useBlotterTransaction();

  const GetNOPData = useSelector((state) => state.BlotterSlicer.GetNOPData);
  const [openNopModal, setOpenNopModal] = useState(false);
  const [openExportDiv, setOpenExportDiv] = useState(false);
  const [openMailModal, setOpenMailModal] = useState(false);

  const [exportButton, setExportButton] = useState(false);

  const activeTransactionBlotterTab = useSelector(
    (state) => state.BlotterSlicer.activeTabBlotter
  );

  useEffect(() => {
    const savedTab =
      localStorage.getItem("activeTransactionTab") ||
      activeTransactionBlotterTab;

    dispatch(setActiveTreasuryTab(savedTab));
  }, [activeTransactionBlotterTab]);

  const tabsData = [
    {
      title: "TXN Summary",
      content: (
        <section className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTransactionBlotterTab === "TXN Summary" && (
              <TXNTreasurySummary />
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
            {activeTransactionBlotterTab === "Outstanding Deals" && (
              <OutstandingDeals />
            )}
          </Suspense>
        </section>
      ),
    },
  ];

  const handleTabChange = (tabTitle) => {
    startTransition(() => {
      localStorage.setItem("activeTransactionTab", tabTitle);

      dispatch(setActiveTreasuryTab(tabTitle)); // <-- important

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
              activeKey={activeTransactionBlotterTab}
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
                          <span className='color-green'>
                            {formatPkAmount(GetNOPData?.nop)}
                          </span>
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
                    {/* <CustomButton
                      applyClass={"Export-button"}
                      value='Export'
                      onClick={onClickOpenExport}
                    /> */}
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
                          {/* <CustomButton
                            icon={<img src={printImage} alt='PDF Icon' />}
                            className={"bg-none"}
                            onClick={() => setExportButton(false)}
                          /> */}
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
                  </>

                  {/* {openExportDiv && (
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
                  )} */}
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
