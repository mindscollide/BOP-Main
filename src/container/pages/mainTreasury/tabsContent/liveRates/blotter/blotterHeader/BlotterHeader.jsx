import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const BlotterHeader = () => {
  const navigate = useNavigate();
  const [openNopModal, setOpenNopModal] = useState(false);
  const [openExportDiv, setOpenExportDiv] = useState(false);
  const [openMailModal, setOpenMailModal] = useState(false);
  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

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
  const activeTab =
    isBranch || isCorporate
      ? tabsData.filter((data, index) => index === 0)
      : tabsData;
  return (
    <>
      <div className='box-header position-relative'>
        {isTreasury ? (
          <>
            {" "}
            <div className='filter-export-wrapper ms-auto'>
              <div className='d-flex align-items-center'>
                <div className='nop-hd-container'>
                  <div className='d-flex align-items-center'>
                    {isTreasury && (
                      <>
                        {" "}
                        <span className='hd-txt me-3'>NOP (US$)</span>
                        <span className='hd-cr me-2'>46,999</span>
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
                    )}

                    {openExportDiv ? (
                      <>
                        <div className='dropdown-menu dropdown-ex-doc border show export-class'>
                          <Row align='middle'>
                            <Col className='export-to-doc cursor-pointer'>
                              <img
                                src={pdfImage}
                                width={30}
                                height={30}
                                alt='pdf'
                              />
                            </Col>
                            <Col className='export-to-doc cursor-pointer'>
                              <img
                                src={excelImage}
                                width={30}
                                height={30}
                                alt='excel'
                              />
                            </Col>
                            <Col>
                              <img
                                src={emailImage}
                                width={30}
                                height={30}
                                alt='email'
                                onClick={onClickMailModal}
                              />
                            </Col>
                            <Col>
                              <img
                                src={printImage}
                                width={30}
                                height={30}
                                alt='print'
                              />
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>{" "}
            <GlobalTabs
              tabClass='buttonClassTab'
              tabs={activeTab}
              defaultActiveKey={"0"}
            />{" "}
          </>
        ) : isBranch || isCorporate ? (
          <TXNSummary />
        ) : null}
      </div>
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
