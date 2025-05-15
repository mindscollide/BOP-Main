import React from "react";
import "./FEDiscountingModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
const FEDiscountingModal = ({
  feDiscountingModalCall,
  setFeDiscountingModalCall,
}) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div>
      {" "}
      <Modal
        show={feDiscountingModalCall}
        setShow={feDiscountingModalCall}
        onHide={() => {
          setFeDiscountingModalCall(false);
        }}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="HeaderHeadingName">Gull Ahmed</span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Currency</span>
                      <Select
                        options={options}
                        placeholder=""
                        classNamePrefix="bookaForwardCorporate"
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Nature</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">A/c No*</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2  g-0">
                  <Col lg={9} md={9} sm={9}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Tenor</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                  <Col lg={3} md={3} sm={3} className="position-relative">
                    <span className="dateSpan">Fri, Apr 25, 2025</span>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col lg={7} md={7} sm={7}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">Ready</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2 position-relative">
                      <Col lg={10} md={10} sm={10}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">Swap</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={2}>
                        <span className="SofrPercentSignBox">%</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={5} md={5} sm={5}>
                    <Row className="mt-4">
                      <Col lg={12} md={12} sm={12}>
                        <span className="BlueBackGroundboxFEDiscountingModal">
                          287.12
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
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
                  value={"Confirm"}
                  applyClass={"ConfirmButtonBookaForward"}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default FEDiscountingModal;
