import React from "react";
import "./NonFEDiscoutingModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";

const NonFEDiscountingModal = ({
  nonfeDiscountingModalCall,
  setNonfeDiscountingModalCall,
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
        show={nonfeDiscountingModalCall}
        setShow={nonfeDiscountingModalCall}
        onHide={() => {
          setNonfeDiscountingModalCall(false);
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
                  <Col lg={6} md={6} sm={6}>
                    <Row>
                      <Col lg={5} md={5} sm={5}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">Tenor</span>
                          <InputFIeld
                            applyClass={
                              "BookaForwardCorporateInputFieldsTenorNonFEmodal"
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={7} md={7} sm={7} className="position-relative">
                        <span className="dateSpanNonFeDiscoutingmodal">
                          Fri, Apr 25, 2025
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
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
                      <Col lg={11} md={11} sm={11}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">KIBOR</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                      <Col lg={1} md={1} sm={1}>
                        <span className="SofrPercentSignBoxNonFE">%</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">swap</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={5} md={5} sm={5} className="mt-4">
                    <Row className="mt-4">
                      <Col lg={12} md={12} sm={12}>
                        <span className="BlueBackGroundboxNon_FEDiscountingModal">
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

export default NonFEDiscountingModal;
