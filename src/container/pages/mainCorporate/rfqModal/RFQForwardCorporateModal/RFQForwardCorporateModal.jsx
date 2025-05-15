import React from "react";
import "./RFQForwardCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
const RFQForwardCorporateModal = ({
  openRfqModalForwardCorporateComponent,
  setOpenRfqModalForwardCorporateComponent,
}) => {
  return (
    <div>
      {" "}
      <Modal
        show={openRfqModalForwardCorporateComponent}
        setShow={openRfqModalForwardCorporateComponent}
        onHide={() => setOpenRfqModalForwardCorporateComponent(false)}
        closeButton
        headerClassName="RFQModalHeaderForwardTabCorporate"
        footerClassName="RFQModalFooterForwardTabCorporate"
        bodyClassName="RFQModalBodyForwardTabCorporate"
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="ForwardRFQModalHeadingCorporate">
                  Gul Ahmed{" "}
                </span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">
                      Currency*
                    </label>
                    <SelectDropdown
                      classNamePrefix="bookaForwardCorporate"
                      placeholder=""
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Type*</label>
                    <SelectDropdown
                      placeholder=""
                      classNamePrefix="bookaForwardCorporate"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Nature</label>
                    <InputFIeld applyClass="CalculatorTextfield" />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">A/c No*</label>
                    <InputFIeld applyClass="CalculatorTextfield" />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Amount</label>
                    <InputFIeld applyClass="CalculatorTextfield" />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2 position-relative">
                <Col lg={9} md={9} sm={9}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Tenor</label>
                    <InputFIeld applyClass="CalculatorTextfield" />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <span className="DateColumnTenorForwardTabRFQModal">
                    Wed, Apr 30, 2025
                  </span>
                </Col>
              </Row>

              <Row className="mt-2 position-relative">
                <Col lg={9} md={9} sm={9}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Options</label>
                    <InputFIeld applyClass="CalculatorTextfield" />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <span className="DateColumnTenorForwardTabRFQModal">
                    Wed, Apr 30, 2025
                  </span>
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
                className="d-flex justify-content-center"
              >
                <CustomButton
                  value="Confirm"
                  applyClass="ConfirmButtonBookaForward"
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default RFQForwardCorporateModal;
