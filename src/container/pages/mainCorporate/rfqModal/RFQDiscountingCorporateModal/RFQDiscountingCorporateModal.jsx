import React, { useEffect, useState } from "react";
import "./RFQDiscountingCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
const RFQDiscountingCorporateModal = ({
  openRfqModalDiscountingCorporateComponent,
  setOpenRfqModalDiscountingCorporateComponent,
}) => {
  //Local States
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
  const [tenoreDate, setTenorDate] = useState(formatDate(new Date()));

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 21,
    label: "USDPKR",
  });

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions
          .filter(
            (business, index) =>
              business.isForFE === true || business.isForNonFE === true
          )
          .map((businessDetails, index) => {
            return {
              ...businessDetails,
              value: businessDetails.id,
              label: businessDetails.name,
            };
          });
        setNatureOfBusinessOptions(formattedOptions);
        setTypeOptionSelected({
          value: formattedOptions[0].value,
          label: formattedOptions[0].label,
        });
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);
  // handle Change amount
  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setAmountData(value);
      }
    } 
  };

  const handleChangeTenor = (event) => {
    const { value } = event.target;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setTenor(value);

        if (value !== "") {
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
          setTenorDate(formatDate(newDate));
        } else {
          setTenorDate(formatDate(new Date())); // Optional: clear tag text if input is empty
        }
      }
    }
  };

  // handle Change Tenor
  const handleChangeAccountNumber = (event) => {
    const { name, value } = event.target;
    if (name === "AccountNumber") {
      const regex = /^[a-zA-Z0-9 ]*$/; //its Reges is not decided and not even mentioned int he SRS
      if (regex.test(value)) {
        setAccountNumber(value.trimStart());
      }
    }
  };
  return (
    <div>
      <Modal
        show={openRfqModalDiscountingCorporateComponent}
        setShow={openRfqModalDiscountingCorporateComponent}
        onHide={() => setOpenRfqModalDiscountingCorporateComponent(false)}
        closeButton
        headerClassName='RFQModalHeaderForwardTabCorporate'
        footerClassName='RFQModalFooterForwardTabCorporate'
        bodyClassName='RFQModalBodyForwardTabCorporate'
        className=''
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='DiscountingRFQModalHeadingCorporate'>
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
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>
                      Currency*
                    </label>
                    <SelectDropdown
                      classNamePrefix='bookaForwardCorporate'
                      placeholder=''
                      value={selectedCurrency}
                    />
                  </div>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Col lg={6} md={6} sm={6}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Nature</label>
                    <SelectDropdown
                      options={natureOfBusinessOptions}
                      classNamePrefix='bookaForwardCorporate'
                      value={typeOptionSelected}
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>A/c No*</label>
                    <InputFIeld
                      onChange={handleChangeAccountNumber}
                      value={AccountNumber}
                      name='AccountNumber'
                      applyClass='CalculatorTextfield'
                    />
                  </div>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Col lg={12} md={12} sm={12}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Amount</label>
                    <InputFIeld
                      onChange={handleChangeAmount}
                      value={amountData}
                      name='Amount'
                      applyClass='CalculatorTextfield'
                    />
                  </div>
                </Col>
              </Row>

              <Row className='mt-2 position-relative'>
                <Col lg={9} md={9} sm={9}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Tenor</label>
                    <InputFIeld
                      onChange={handleChangeTenor}
                      value={Tenor}
                      name='Tenor'
                      applyClass='CalculatorTextfield'
                    />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <span className='DateColumnTenorForwardTabRFQModal'>
                    {tenoreDate}
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
                className='d-flex justify-content-center'>
                <CustomButton
                  value='Confirm'
                  applyClass='ConfirmButtonBookaForward'
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
