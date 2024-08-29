import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import CustomButton from "../../../../../../../components/common/globalButton/button";
import Modal from "../../../../../../../components/common/globalModal/Modal";
import InputFIeld from "../../../../../../../components/common/inputField/InputField";
import PdfIcon from "../../../../../../../assets/pdf-icon.png";
import XlsIcon from "../../../../../../../assets/xls.svg";
import TextArea from "../../../../../../../components/common/textArea/TextArea";
import SelectDropdown from "../../../../../../../components/common/selectDropdown/SelectDropdown";
import "./MailModal.css";
import IconElement from "../../../../../../../components/common/IconElement/IconElement";

const MailModal = ({ openMailModal, setOpenMailModal }) => {
  const onCloseModal = () => {
    setOpenMailModal(false);
  };
  return (
    <>
      <Modal
        show={openMailModal}
        onHide={onCloseModal}
        setShow={setOpenMailModal}
        className="MailModal-MainClass"
        size="lg"
        footerClassName="Mail-footer-className"
        headerClassName="Mail-header-className"
        closeButton
        modalHeader={
          <>
            <Row>
              <Col>
                <p className="transaaction-headings mt-2">
                  Transaction Document
                </p>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div>
              <Row className="mb-5">
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  className="transaction-doc-select-wrapper"
                >
                  <SelectDropdown
                    classNamePrefix="BlotterSearchDropdown"
                    placeholder="Search"
                  />
                </Col>
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-end"
                >
                  <CustomButton applyClass="addMailModalBtn" value="Add" />
                </Col>
              </Row>
              <Row>
                <Col className="mb-3 mt-5">
                  <label>Message (Optional)</label>
                  <TextArea rows={2} />
                </Col>
              </Row>
              <Row className="mb-3 doc-attached-wrapper ps-3">
                <Col lg={1} md={1} sm={1} className="doc-attached">
                  <img src={PdfIcon} width={30} alt="PDF" />
                  <IconElement iconClass={"icon-trash remove-doc"} />
                </Col>
              </Row>
            </div>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2 modal-footer-column"
              >
                <CustomButton
                  icon={<IconElement iconClass={"icon-close"} />}
                  value="Cancel"
                  className="cancel-button-mail"
                />
                <CustomButton
                  icon={<IconElement iconClass={"icon-send"} />}
                  className="Send-button-mail"
                  value="Send"
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default MailModal;
