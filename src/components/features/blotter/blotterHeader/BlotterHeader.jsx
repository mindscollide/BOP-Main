import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  startTransition,
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
import { formatPkAmount } from "@/utils/formatters";
import SectionLoader from "@/components/common/loader/SectionLoader";

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

const BlotterHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GetNOPData = useSelector((state) => state.BlotterSlicer.GetNOPData);
  const [openNopModal, setOpenNopModal] = useState(false);
  const [openExportDiv, setOpenExportDiv] = useState(false);
  const [openMailModal, setOpenMailModal] = useState(false);

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const activeTab = useSelector(
    (state) => state.BlotterSlicer.activeTabBlotter
  );
  const [isTreasuryVal, setIsTreasuryVal] = useState(0);

  const tabsData = [
    {
      title: "TXN Summary",
      content: (
        <Suspense fallback={<SectionLoader />}>
          {activeTab === "TXN Summary" && (
            <TXNTreasurySummary isTreasuryVal={isTreasuryVal} />
          )}
        </Suspense>
      ),
    },
    {
      title: "Outstanding Deals",
      content: (
        <Suspense fallback={<SectionLoader />}>
          {activeTab === "Outstanding Deals" && <OutstandingDeals />}
        </Suspense>
      ),
    },
  ];

  const handleTabChange = (tabTitle) => {
    startTransition(() => {
      dispatch(setActiveTreasuryTab(tabTitle));
    });
  };

  const HandlePDFDownloadFunc = () => {
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

  return (
    <>
      <section className='position-relative'>
        {isTreasury ? (
          <>
            <GlobalTabs
              tabClass=' d-flex justify-content-start gap-2 mb-3 align-items-center'
              tabs={tabsData}
              onTabChange={handleTabChange}
              activeKey={activeTab}
              defaultActiveKey={"0"}
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
                        (GetNOPData?.nop >= 0
                          ? formatPkAmount(GetNOPData?.nop)
                          : `(${formatPkAmount(Math.abs(GetNOPData?.nop))})`)}
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
                          alt='email'
                          onClick={() => setOpenMailModal(true)}
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
              <div className='fs-6 fw-bold color-hd data-summary-heading mb-4'>
                TXN Summary
              </div>
              <div className='moreOptionsNOPExport'>
                <div className='nop-hd-container'>
                  <div className='d-flex align-items-center'>
                    <CustomButton
                      applyClass={"Export-button"}
                      value='Export'
                      onClick={() => setOpenExportDiv(!openExportDiv)}
                    />

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
                            alt='email'
                            onClick={() => setOpenMailModal(true)}
                          />
                          <img
                            src={printImage}
                            className='cursor-pointer'
                            width={30}
                            height={30}
                            alt='print'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Suspense fallback={<SectionLoader />}>
                <TXNSummary />
              </Suspense>
            </>
          )
        )}

        <Suspense fallback={null}>
          {openNopModal && (
            <NopModal
              openNopModal={openNopModal}
              setOpenNopModal={setOpenNopModal}
            />
          )}
          {openMailModal && (
            <MailModal
              openMailModal={openMailModal}
              setOpenMailModal={setOpenMailModal}
            />
          )}
        </Suspense>
      </section>
    </>
  );
};

export default BlotterHeader;
