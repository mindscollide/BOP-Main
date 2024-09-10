import React from "react";
import CustomButton from "../../../../components/common/globalButton/button";
import { Row, Col } from "react-bootstrap";
import Modal from "../../../../components/common/globalModal/Modal";
import IconElement from "../../../../components/common/IconElement/IconElement";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import "./RFQModal.css";
import InputFIeld from "../../../../components/common/inputField/InputField";
import { useState } from "react";

const RFQModal = ({ openRfqModal, setOpenRfqModal }) => {
  const onCloseRfq = () => {
    setOpenRfqModal(false);
  };

  return (
    <>
      <Modal
        show={openRfqModal}
        setShow={setOpenRfqModal}
        onHide={onCloseRfq}
        closeButton
        size="lg"
        // footerClassName="RFQ-footer-className"
        headerClassName="RFQ-header-className"
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="heading-RfqModal">Gul Ahmed</span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div className="modal-body" rfq-type="Forex">
              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label>Currency*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown placeholder="Search" />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label>Type*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown placeholder="Search" />
                </Col>
              </Row>

              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label>Amount*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld applyClass="CalculatorTextfield" />
                </Col>
                <Col lg={2} md={2} sm={2}>
                  <label>A/c No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld applyClass="CalculatorTextfield" />
                </Col>
              </Row>

              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label>Nature*</label>
                </Col>

                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown placeholder="Search" />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label>LC No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld applyClass="CalculatorTextfield" />
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
                className="d-flex justify-content-end"
              >
                <CustomButton
                  value="Confirm"
                  className="btn btn-primary px-4 ms-auto"
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default RFQModal;
