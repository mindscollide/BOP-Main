import React, { useState } from "react";
import "./RFQDiscountingCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
const RFQDiscountingCorporateModal = ({
  openRfqModalDiscountingCorporateComponent,
  setOpenRfqModalDiscountingCorporateComponent,
}) => {
  //Local States
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");

  // handle Change amount
  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setAmountData(value);
      }
    } else {
      setAmountData(value);
    }
  };

  // handle Change Tenor
  const handleChangeTenor = (event) => {
    const { name, value } = event.target;
    if (name === "Tenor") {
      const regex = /^[0-9]*$/; // in the SRS Here in Discounting Corporate they didnt mentioned that its restrcited to 4 Digits
      if (regex.test(value)) {
        setTenor(value);
      }
    } else {
      setTenor(value);
    }
  };

  // handle Change Tenor
  const handleChangeAccountNumber = (event) => {
    const { name, value } = event.target;
    if (name === "AccountNumber") {
      const regex = /^[0-9]*$/; //its Reges is not decided and not even mentioned int he SRS
      if (regex.test(value)) {
        setAccountNumber(value);
      }
    } else {
      setAccountNumber(value);
    }
  };
  return (
    <div>
      <Modal
        show={openRfqModalDiscountingCorporateComponent}
        setShow={openRfqModalDiscountingCorporateComponent}
        onHide={() => setOpenRfqModalDiscountingCorporateComponent(false)}
        closeButton
        headerClassName="RFQModalHeaderForwardTabCorporate"
        footerClassName="RFQModalFooterForwardTabCorporate"
        bodyClassName="RFQModalBodyForwardTabCorporate"
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="DiscountingRFQModalHeadingCorporate">
                  Gul Ahmed
                </span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div>
              <Row>
                <Col lg={12} md={12} sm={12}>
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
                    <InputFIeld
                      onChange={handleChangeAccountNumber}
                      value={AccountNumber}
                      name="AccountNumber"
                      applyClass="CalculatorTextfield"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Amount</label>
                    <InputFIeld
                      onChange={handleChangeAmount}
                      value={amountData}
                      name="Amount"
                      applyClass="CalculatorTextfield"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2 position-relative">
                <Col lg={9} md={9} sm={9}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Tenor</label>
                    <InputFIeld
                      onChange={handleChangeTenor}
                      value={Tenor}
                      name="Tenor"
                      applyClass="CalculatorTextfield"
                    />
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

export default RFQDiscountingCorporateModal;
