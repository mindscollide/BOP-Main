import React, { useEffect, useState } from "react";
import "./BlotterHeader.css";
import { Col, Row } from "react-bootstrap";
import GlobalTabs from "@/components/common/tabs/Tabs";
import TXNSummary from "../txnSummary/TXNSummary";
import OutstandingDeals from "../outstandingDeals/OutstandingDeals";
import CustomButton from "@/components/common/globalButton/button";
import NopModal from "../nopModal/NopModal";
import MailModal from "../mailModal/MailModal";
import pdfImage from "@/assets/icons/pdf.png";
import emailImage from "@/assets/icons/email.png";
import excelImage from "@/assets/icons/excel.png";
import printImage from "@/assets/icons/print.png";
import { useNavigate } from "react-router-dom";
import TXNTreasurySummary from "../txnTreasurySummary/TxnTreasurySummary";
import { useSelector } from "react-redux";
import { setActiveTreasuryTab } from "@/store/BlotterSlicer/BlotterSlicer";
import { useDispatch } from "react-redux";
import {
  DownloadExcelReportBlotterTrasactionBranchAPI,
  DownloadExcelReportBlotterTrasactionCorporateAPI,
  DownloadExcelReportBlotterTrasactionTreasuryAPI,
  DownloadPDFReportBlotterTrasactionBranchAPI,
  DownloadPDFReportBlotterTrasactionCorporateAPI,
  DownloadPDFReportBlotterTrasactionTreasuryAPI,
} from "@/store/ReportSlicer/ReportActions";

const BlotterHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      content: activeTab === "TXN Summary" && (
        <TXNTreasurySummary isTreasuryVal={isTreasuryVal} />
      ),
    },
    {
      title: "Outstanding Deals",
      content: activeTab === "Outstanding Deals" && <OutstandingDeals />,
    },
  ];

  const onClickNopModal = () => {
    setOpenNopModal(true);
  };

  const onClickOpenExport = () => {
    setOpenExportDiv(!openExportDiv);
  };

  const onClickMailModal = () => {
    setOpenMailModal(true);
  };

  const handleTabChange = (tabTitle) => {
    console.log(tabTitle, "tabTitletabTitletabTitle");
    dispatch(setActiveTreasuryTab(tabTitle));
  };

  const HandlePDFDownloadFunc = () => {
    console.log("Bracnhhhh");

    if (isTreasury) {
      dispatch(DownloadPDFReportBlotterTrasactionTreasuryAPI({ navigate }));
    } else if (isCorporate) {
      dispatch(DownloadPDFReportBlotterTrasactionCorporateAPI({ navigate }));
    } else if (isBranch) {
      console.log("Bracnhhhh");
      dispatch(DownloadPDFReportBlotterTrasactionBranchAPI({ navigate }));
    }
  };

  const HandleExcelDownloadFunc = () => {
    if (isTreasury) {
      dispatch(DownloadExcelReportBlotterTrasactionTreasuryAPI({ navigate }));
    } else if (isCorporate) {
      dispatch(DownloadExcelReportBlotterTrasactionCorporateAPI({ navigate }));
    } else if (isBranch) {
      console.log("Bracnhhhh");
      dispatch(DownloadExcelReportBlotterTrasactionBranchAPI({ navigate }));
    }
  };
  return (
    <>
      <section className="position-relative">
        {isTreasury ? (
          <>
            <GlobalTabs
              tabClass=" d-flex justify-content-start gap-2 mb-3 align-items-center"
              tabs={tabsData}
              onTabChange={handleTabChange}
              activeKey={activeTab}
              defaultActiveKey={"0"}
            />
            <div className="moreOptionsNOPExport">
              <div className="nop-hd-container">
                <div className="d-flex align-items-center">
                  <>
                    {" "}
                    <span className="hd-txt me-3">NOP (US$)</span>
                    <span className="hd-cr me-2">46,999</span>
                    <CustomButton
                      applyClass={"NOP-button"}
                      value="+"
                      onClick={onClickNopModal}
                    />{" "}
                    <CustomButton
                      applyClass={"Export-button"}
                      value="Export"
                      onClick={onClickOpenExport}
                    />
                  </>

                  {openExportDiv ? (
                    <>
                      <div className="exportOptions">
                        <div className="exportOptionsBox">
                          <img
                            src={pdfImage}
                            width={30}
                            height={30}
                            className="cursor-pointer"
                            alt="pdf"
                            onClick={HandlePDFDownloadFunc}
                          />
                          <img
                            src={excelImage}
                            width={30}
                            height={30}
                            alt="excel"
                            className="cursor-pointer"
                            onClick={HandleExcelDownloadFunc}
                          />
                          <img
                            src={emailImage}
                            width={30}
                            height={30}
                            className="cursor-pointer"
                            alt="email"
                            onClick={onClickMailModal}
                          />
                          <img
                            src={printImage}
                            width={30}
                            className="cursor-pointer"
                            height={30}
                            alt="print"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : isBranch || isCorporate ? (
          <>
            <div className="fs-6 fw-bold color-hd data-summary-heading mb-4">
              TXN Summary
            </div>
            <div className="moreOptionsNOPExport">
              <div className="nop-hd-container">
                <div className="d-flex align-items-center">
                  <>
                    {" "}
                    <CustomButton
                      applyClass={"Export-button"}
                      value="Export"
                      onClick={onClickOpenExport}
                    />
                  </>

                  {openExportDiv ? (
                    <>
                      <div className="exportOptions">
                        <div className="exportOptionsBox">
                          <img
                            src={pdfImage}
                            width={30}
                            height={30}
                            className="cursor-pointer"
                            alt="pdf"
                            onClick={HandlePDFDownloadFunc}
                          />
                          <img
                            src={excelImage}
                            width={30}
                            className="cursor-pointer"
                            height={30}
                            alt="excel"
                            onClick={HandleExcelDownloadFunc}
                          />
                          <img
                            src={emailImage}
                            width={30}
                            className="cursor-pointer"
                            height={30}
                            alt="email"
                            onClick={onClickMailModal}
                          />
                          <img
                            src={printImage}
                            className="cursor-pointer"
                            width={30}
                            height={30}
                            alt="print"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <TXNSummary />
          </>
        ) : null}
      </section>

      {openNopModal ? (
        <NopModal
          openNopModal={openNopModal}
          setOpenNopModal={setOpenNopModal}
        />
      ) : null}

      {openMailModal ? (
        <MailModal
          openMailModal={openMailModal}
          setOpenMailModal={setOpenMailModal}
        />
      ) : null}
    </>
  );
};

export default BlotterHeader;
