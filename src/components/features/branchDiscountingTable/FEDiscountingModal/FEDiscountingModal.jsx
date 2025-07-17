import React, { useEffect, useState } from "react";
import "./FEDiscountingModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const FEDiscountingModal = ({
  feDiscountingModalCall,
  setFeDiscountingModalCall,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const natureOfBusinessList = useSelector(
      (state) => state.authReducer.GetAllNatureOfTransactions
    );
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState(null);
  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 21,
    label: "USDPKR",
  });
  const [tenoreDate, setTenorDate] = useState(formatDate(new Date()));
  const [tenorValue, setTenorValue] = useState("");
  console.log(natureOfBusinessOptions, "natureOfBusinessOptions");
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.find(
          (business, index) => business.isForFE === true
        );
        setSelectedNature(formattedOptions);
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);

  const handleChangeTenor = (event) => {
    const { value } = event.target;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setTenorValue(value);

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
  const handleClickConfirmFERFQ = () => {
    // SaveFEDiscountingTransactionAPI
    let Data = {
      CorporateID: 7,
      InstrumentID: 21,
      Quantity: 15000,
      AccountNumber: "5678901234568882",
      NatureOfTransactionID: 13,
      TenorDays: 12,
      DiscountingFactor: 2.5,
    };
    dispatch(SaveFEDiscountingTransactionAPI({ navigate, Data }));
  };
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
        className=''
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='HeaderHeadingName'>Gull Ahmed</span>
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
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Currency</span>
                      <SelectDropdown
                        options={[]}
                        value={selectedCurrency}
                        placeholder=''
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Nature</span>
                      <InputFIeld
                        value={selectedNature?.name}
                        disabled={true}
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>A/c No*</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={12} md={12} sm={12}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Amount</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='  g-0'>
                  <Col lg={8} md={8} sm={8}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Tenor</span>
                      <InputFIeld
                        onChange={handleChangeTenor}
                        value={tenorValue}
                        applyClass={"BookaForwardCorporateInputFields"}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4} className='d-flex align-items-end'>
                    <span className='dateSpan'>{tenoreDate}</span>
                  </Col>
                </Row>

                <Row className='mt-2'>
                  <Col lg={7} md={7} sm={7}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <div className='d-flex flex-column flex-wrap'>
                          <span className='SubHeadings'>Ready</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className='mt-2 position-relative'>
                      <Col lg={10} md={10} sm={10}>
                        <div className='d-flex flex-column flex-wrap'>
                          <span className='SubHeadings'>Swap</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                          />
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={2}>
                        <span className='SofrPercentSignBox'>%</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={5} md={5} sm={5}>
                    <Row className='mt-4'>
                      <Col lg={12} md={12} sm={12}>
                        <span className='BlueBackGroundboxFEDiscountingModal'>
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
                className='d-flex justify-content-center'>
                <CustomButton
                  value={"Confirm"}
                  applyClass={"ConfirmButtonBookaForward"}
                  onClick={handleClickConfirmFERFQ}
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
