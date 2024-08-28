import React, { useState } from "react";
import "./BlotterHeader.css";
import { Col, Row } from "react-bootstrap";
import GlobalTabs from "../../../../../../../components/common/tabs/Tabs";
import TXNSummary from "../txnSummary/TXNSummary";
import OutstandingDeals from "../outstandingDeals/OutstandingDeals";
import CustomButton from "../../../../../../../components/common/globalButton/button";
import NopModal from "../nopModal/NopModal";
import MailModal from "../mailModal/MailModal";
import pdfImage from "./../../../../../../../assets/icons/pdf.png";
import emailImage from "./../../../../../../../assets/icons/email.png";
import excelImage from "./../../../../../../../assets/icons/excel.png";
import printImage from "./../../../../../../../assets/icons/print.png";

const BlotterHeader = () => {
  const [openNopModal, setOpenNopModal] = useState(false);
  const [openExportDiv, setOpenExportDiv] = useState(false);
  const [openMailModal, setOpenMailModal] = useState(false);

  const tabsData = [
    { title: "TXN Summary", content: <TXNSummary /> },
    { title: "Outstanding Deals", content: <OutstandingDeals /> },
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

  return (
    <>
      <div className="box-header">
        <GlobalTabs
          tabClass="buttonClassTab"
          tabs={tabsData}
          defaultActiveKey={"0"}
        />
        <div className="filter-export-wrapper ms-auto">
          <div className="d-flex align-items-center">
            <div className="nop-hd-container">
              <div className="d-flex align-items-center">
                <span className="hd-txt me-3">NOP (US$)</span>
                <span className="hd-cr me-2">46,999</span>
                <CustomButton
                  applyClass={"NOP-button"}
                  value="+"
                  onClick={onClickNopModal}
                />
                <CustomButton
                  applyClass={"Export-button"}
                  value="Export"
                  onClick={onClickOpenExport}
                />

                {openExportDiv ? (
                  <>
                    <div className="dropdown-menu dropdown-ex-doc border show export-class">
                      <Row align="middle">
                        <Col className="export-to-doc cursor-pointer">
                          <img
                            src={pdfImage}
                            width={30}
                            height={30}
                            alt="pdf"
                          />
                        </Col>
                        <Col className="export-to-doc cursor-pointer">
                          <img
                            src={excelImage}
                            width={30}
                            height={30}
                            alt="excel"
                          />
                        </Col>
                        <Col>
                          <img
                            src={emailImage}
                            width={30}
                            height={30}
                            alt="email"
                            onClick={onClickMailModal}
                          />
                        </Col>
                        <Col>
                          <img
                            src={printImage}
                            width={30}
                            height={30}
                            alt="print"
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openNopModal ? (
        <NopModal
          openNopModal={openNopModal}
          setOpenNopModal={setOpenNopModal}
        />
      ) : null}

      {MailModal ? (
        <MailModal
          openMailModal={openMailModal}
          setOpenMailModal={setOpenMailModal}
        />
      ) : null}
    </>
  );
};

export default BlotterHeader;
