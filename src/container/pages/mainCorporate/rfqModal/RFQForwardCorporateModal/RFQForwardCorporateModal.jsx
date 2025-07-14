import React, { useEffect, useState } from "react";
import "./RFQForwardCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
import { useDispatch } from "react-redux";
import { SaveForwardTransactionRFQApi } from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
const RFQForwardCorporateModal = ({
  openRfqModalForwardCorporateComponent,
  setOpenRfqModalForwardCorporateComponent,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  //Local States
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [options, setOptions] = useState("");
  console.log(Tenor, "TenorTenorTenor");

  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState(null);
  console.log(
    natureOfBusinessOptions,
    "natureOfBusinessOptionsnatureOfBusinessOptions"
  );

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedNature, setSelectedNature] = useState({
    value: 0,
    label: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 21,
    label: "USDPKR",
  });

  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });
  const [tenoreDate, setTenorDate] = useState(formatDate(new Date()));
  const [optionsDate, setOptionsDate] = useState(formatDate(new Date()));
  const [accountNumber, setAcNumberData] = useState("");

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  let titleDetails =
    localStorage.getItem("branch") !== null && isBranch
      ? JSON.parse(localStorage.getItem("branch"))
      : localStorage.getItem("corporate") !== null && !isBranch
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.find(
          (business, index) => business.isForForward === true
        );
        setNatureOfBusinessOptions(formattedOptions);
        setTypeOptionSelected({
          value: typeOptions[0].value,
          label: typeOptions[0].label,
        });
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);

  useEffect(() => {
    if (GetAllActiveCorproates !== null) {
      try {
        const { corporates } = GetAllActiveCorproates;
        if (corporates.length > 0) {
          const formattedOptions = corporates.map((corporate) => ({
            label: corporate.corporateName,

            value: corporate.corporateID,
          }));
          setCorporateValue({
            label: formattedOptions[0].label,
            value: formattedOptions[0].value,
          });
          setGetAllCorporates(formattedOptions);
        }
      } catch (error) {
        console.log(error, "Error in GetAllActiveCorproates useEffect");
      }
    }
  }, [GetAllActiveCorproates]);

  const handleChangeAcNo = (event) => {
    const { value } = event.target;

    // Accept only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setAcNumberData(value);
    }
  };

  // handle Change amount
  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        const numericValue = parseInt(value, 10);
        if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
          setAmountData(value);
        }
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

  // handle Change Options
  const handleChangeOptions = (event) => {
    const { value } = event.target;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setOptions(value);

        if (value !== "") {
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
          setOptionsDate(formatDate(newDate));
        } else {
          setOptionsDate(formatDate(new Date())); // Optional: clear tag text if input is empty
        }
      }
    }
  };

  const handleChangeType = (selectedValue) => {
    setTypeOptionSelected(selectedValue);
  };

  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  const handleConfirmButton = () => {
    let Data = {
      CorporateID: corporateValue.value,
      InstrumentID: selectedCurrency.value,
      SecondaryInstrumentID: 0,
      IsBuySide: typeOptionSelected.value === 1 ? true : false,
      Quantity: Number(amountData),
      AccountNumber: accountNumber,
      NatureOfTransactionID:
        natureOfBusinessOptions !== null && natureOfBusinessOptions?.id,
      TenorDays: Number(Tenor),
      OptionDays: Number(options),
      // Swap: 0.3,
    };
    dispatch(SaveForwardTransactionRFQApi({ navigate, Data }));
  };

  return (
    <div>
      {" "}
      <Modal
        show={openRfqModalForwardCorporateComponent}
        setShow={openRfqModalForwardCorporateComponent}
        onHide={() => setOpenRfqModalForwardCorporateComponent(false)}
        closeButton
        headerClassName='RFQModalHeaderForwardTabCorporate'
        footerClassName='RFQModalFooterForwardTabCorporate'
        bodyClassName='RFQModalBodyForwardTabCorporate'
        className=''
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {isBranch ? (
                  <>
                    <p className='heading-RfqModal'>
                      {titleDetails.branchName}
                    </p>
                    <p className='heading-branchCode'>
                      Branch Code: {titleDetails.branchCode}
                    </p>
                  </>
                ) : (
                  <p className='heading-RfqModal'>
                    {titleDetails.corporateName}
                  </p>
                )}
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div>
              <Row>
                {isBranch && (
                  <>
                    {" "}
                    <Col lg={12} md={12} sm={12} className='mb-2'>
                      <label className='LabelRFQTransactionModal'>
                        Company Name*
                      </label>
                      <SelectDropdown
                        classNamePrefix='TransactionModal'
                        placeholder=''
                        options={getAllCorporates}
                        onChange={handleChangeCorporate}
                        isSearchable={true}
                        value={corporateValue}
                      />
                    </Col>
                  </>
                )}
                <Col lg={6} md={6} sm={6}>
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

                <Col lg={6} md={6} sm={6}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Type*</label>
                    <SelectDropdown
                      placeholder=''
                      classNamePrefix='bookaForwardCorporate'
                      options={typeOptions}
                      value={typeOptionSelected}
                      onChange={handleChangeType}
                    />
                  </div>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Col lg={6} md={6} sm={6}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Nature</label>
                    <InputFIeld
                      applyClass='CalculatorTextfield'
                      value={
                        natureOfBusinessOptions !== null
                          ? natureOfBusinessOptions?.name
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>A/c No*</label>
                    <InputFIeld
                      applyClass='CalculatorTextfield'
                      onChange={handleChangeAcNo}
                      type='text'
                      value={accountNumber}
                    />
                  </div>
                </Col>
              </Row>

              <Row className='mt-2'>
                <Col lg={12} md={12} sm={12}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Amount</label>
                    <InputFIeld
                      value={amountData}
                      name='Amount'
                      onChange={handleChangeAmount}
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
                      value={Tenor}
                      name='Tenor'
                      onChange={handleChangeTenor}
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

              <Row className='mt-2 position-relative'>
                <Col lg={9} md={9} sm={9}>
                  <div className='d-flex flex-column flex-wrap'>
                    <label className='LabelRFQTransactionModal'>Options</label>
                    <InputFIeld
                      value={options}
                      onChange={handleChangeOptions}
                      name='Options'
                      applyClass='CalculatorTextfield'
                    />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <span className='DateColumnTenorForwardTabRFQModal'>
                    {optionsDate}
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
                  onClick={handleConfirmButton}
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
