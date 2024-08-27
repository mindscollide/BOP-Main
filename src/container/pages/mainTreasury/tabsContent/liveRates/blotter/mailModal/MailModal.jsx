import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import CustomButton from "../../../../../../../components/common/globalButton/button";
import Modal from "../../../../../../../components/common/globalModal/Modal";
import InputFIeld from "../../../../../../../components/common/inputField/InputField";
import PdfIcon from "../../../../../../../assets/pdf-icon.png";
import XlsIcon from "../../../../../../../assets/xls.svg";

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
        size="lg"
        modalBody={
          <>
            <div className="modal-body transaction-doc-content pt-0 pb-0">
              <Row className="mb-3 align-items-start">
                <Col className="transaction-doc-select-wrapper">
                  <InputFIeld type="search" placeholder="" />
                </Col>
                <Col>
                  <CustomButton
                    className="add-user-selected-list"
                    variant="primary"
                    value="Add"
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Message (Optional)</Form.Label>
                <Form.Control as="textarea" name="transaction-doc-message" />
              </Form.Group>
              <Row className="mb-3 doc-attached-wrapper">
                <Col className="doc-attached">
                  <img src={PdfIcon} width={30} alt="PDF" />
                  <i className="icon-trash remove-doc" />
                </Col>
                <Col className="doc-attached">
                  <img src={XlsIcon} width={40} alt="XLS" />
                  <i className="icon-trash remove-doc" />
                </Col>
              </Row>
            </div>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <CustomButton value="Cancel" />
                <CustomButton value="Send" />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default MailModal;
