import React, { useEffect, useState } from "react";
import "./RFQForwardCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { calculateDates, formatDate, isWeekend } from "@/common/utils";
import { useDispatch } from "react-redux";
import { SaveForwardTransactionRFQApi } from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { setForwardRFQModal } from "@/store/modalSlice/modalSlicer";

/**
 * RFQForwardCorporateModal Component
 *
 * A modal component for creating Forward RFQ (Request for Quote) transactions in corporate context.
 * Handles the creation of forward foreign exchange transactions with tenor and options.
 *
 * Features:
 * - Currency selection
 * - Transaction type (Buy/Sell) selection
 * - Amount input with formatting
 * - Account number input with validation
 * - Tenor and Options date calculation
 * - Corporate selection (for branch users)
 * - Form validation
 *
 * Props:
 * @param {boolean} openRfqModalForwardCorporateComponent - Controls modal visibility
 * @param {function} setOpenRfqModalForwardCorporateComponent - Function to update modal visibility
 *
 * State Management:
 * - Uses Redux for global state (instruments, nature of business, etc.)
 * - Local state for form inputs and UI state
 */
const RFQForwardCorporateModal = ({
  openRfqModalForwardCorporateComponent,
  setOpenRfqModalForwardCorporateComponent,
}) => {
  // Hooks initialization
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  // Redux Selectors for required data
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const rfqForwardModal = useSelector(
    (state) => state.modalReducer.forwardRFQModal
  );

  const SaveForwardTransactionRFQApiLoading = useSelector(
    (state) => state.BlotterSlicer.SaveForwardTransactionRFQApiLoading
  );

  // Local State for Form Data
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [options, setOptions] = useState("");
  const [accountNumber, setAcNumberData] = useState("");
  const [accountError, setAccountError] = useState({
    message: "",
    status: false,
  });
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);
  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });
  const [tenoreDate, setTenorDate] = useState(new Date());
  const [optionsDate, setOptionsDate] = useState(new Date());

  // Environment Configuration
  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  // Get title details from localStorage based on user type
  let titleDetails =
    localStorage.getItem("branch") !== null && isBranch
      ? JSON.parse(localStorage.getItem("branch"))
      : localStorage.getItem("corporate") !== null && !isBranch
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  /**
   * Initialize nature of business options
   * Filters for forward transactions only
   */
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.find(
          (business, index) => business.isForForward === true
        );
        setNatureOfBusinessOptions(formattedOptions);
      } catch (error) {
        console.error("Error initializing nature of business options:", error);
      }
    }
  }, [natureOfBusinessList]);

  /**
   * Initialize corporate options
   * Only for branch users
   */
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
        console.error("Error initializing corporate options:", error);
      }
    }
  }, [GetAllActiveCorproates]);

  /**
   * Effect Hook: Initialize Currency Options
   *
   * This effect initializes the currency dropdown options by:
   * 1. Filtering instruments that are applicable for both buy and sell
   * 2. Formatting them for display in the SelectDropdown component
   * 3. Setting the default selected currency
   *
   * Dependencies:
   * - getAllInstrumentsForCounterPartiesData: Redux state containing available instruments
   */
  useEffect(() => {
    if (getAllInstrumentsForCounterPartiesData !== null) {
      try {
        const { forwardApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;

        const spotApplicableInstrumentList = forwardApplicableInstruments
          .map((data) => {
            if (data.isBuy === true || data.isSell === true) {
              return {
                ...data,
                label: `${data.instrumentName}`,
                value: data.instrumentID,
                isSell: data.isSell,
                isBuy: data.isBuy,
              };
            }
            return null;
          })
          .filter(Boolean);

        if (spotApplicableInstrumentList.length > 0) {
          const firstInstrument = spotApplicableInstrumentList[0];
          setSelectedCurrency(firstInstrument);

          let defaultType = { value: 0, label: "" };

          if (firstInstrument.isBuy && firstInstrument.isSell) {
            defaultType = isCorporate
              ? { value: 2, label: "Sell" }
              : { value: 1, label: "Buy" };
          } else if (firstInstrument.isBuy) {
            defaultType = { value: 1, label: "Buy" };
          } else if (firstInstrument.isSell) {
            defaultType = { value: 2, label: "Sell" };
          }

          setTypeOptionSelected(defaultType);
          setCurrencyOptions(spotApplicableInstrumentList);
        } else {
          console.warn("No instruments available for buy or sell");
          setSelectedCurrency(null);
          setTypeOptionSelected({ value: 0, label: "" });
          setCurrencyOptions([]);
        }
      } catch (error) {
        console.error("Error initializing currency options:", error);
        setSelectedCurrency(null);
        setCurrencyOptions([]);
      }
    } else {
      setSelectedCurrency(null);
      setCurrencyOptions([]);
    }
  }, [getAllInstrumentsForCounterPartiesData]);

  /**
   * Handles account number input change
   * Validates input to only allow alphanumeric characters
   * @param {Object} event - The input change event
   */
  const handleChangeAcNo = (event) => {
    const { value } = event.target;

    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setAcNumberData(value);
      setAccountError({
        message: "",
        status: false,
      });
    }
  };

  /**
   * Handles amount input change
   * @param {Object} event - The input change event
   */
  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      if (value !== "") {
        setAmountData(value);
      }
    }
  };

  /**
   * Handles transaction type (Buy/Sell) selection change
   * @param {Object} selectedValue - The selected type
   */
  const handleChangeType = (selectedValue) => {
    setTypeOptionSelected(selectedValue);
  };

  /**
   * Handles corporate selection change (for branch users)
   * @param {Object} selectedOption - The selected corporate
   */
  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
  };

  /**
   * Handles date calculation for tenor and options
   * Updates the corresponding dates based on input values
   * @param {Object} event - The input change event
   */
  const handleDateValues = (event) => {
    const { name, value } = event.target;

    let newTenor = Tenor;
    let newOptions = options;

    if (name === "Tenor") {
      newTenor = value;
      setTenor(value);
    }
    if (name === "Options") {
      newOptions = value;
      setOptions(value);
    }

    const { tenorDt, optionDt } = calculateDates(newTenor, newOptions);
    setTenorDate(tenorDt);
    setOptionsDate(optionDt);
  };

  /**
   * Handles currency selection change
   * Automatically sets appropriate transaction type based on currency capabilities
   * @param {Object} selectCurrency - The selected currency
   */
  const handleChangeCurrency = (selectCurrency) => {
    setSelectedCurrency(selectCurrency);
    if (selectCurrency?.isBuy && selectCurrency?.isSell) {
      const defaultType = isCorporate
        ? { value: 2, label: "Sell" }
        : { value: 1, label: "Buy" };
      setTypeOptionSelected(defaultType);
    } else if (selectCurrency?.isBuy && !selectCurrency?.isSell) {
      const defaultType = { value: 1, label: "Buy" };
      setTypeOptionSelected(defaultType);
    } else if (!selectCurrency?.isBuy && selectCurrency?.isSell) {
      const defaultType = { value: 2, label: "Sell" };
      setTypeOptionSelected(defaultType);
    } else {
      setTypeOptionSelected({ value: 0, label: "" });
    }
  };

  /**
   * Form Submission Handler
   * Validates form and dispatches action to save forward RFQ transaction
   */
  const handleConfirmButton = () => {
    let amountValue = amountData.replace(/,/g, "");
    if (
      Number(Tenor) !== 0 &&
      Number(options) !== 0 &&
      Number(amountValue) > 0
    ) {
      setIsError(false);
      let amountValue = amountData.replace(/,/g, "");
      let Data = {
        CorporateID: corporateValue.value,
        InstrumentID: selectedCurrency.value,
        SecondaryInstrumentID: 0,
        IsBuySide: typeOptionSelected.value === 1 ? true : false,
        IsBuyType: typeOptionSelected.value === 1 ? true : false,
        Quantity: Number(amountValue),
        AccountNumber: accountNumber ? accountNumber : "",
        NatureOfTransactionID:
          natureOfBusinessOptions !== null && natureOfBusinessOptions?.id,
        TenorDays: Number(Tenor),
        OptionDays: Number(options),
      };
      dispatch(
        SaveForwardTransactionRFQApi({ navigate, Data, setErrorMessage })
      );
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      <Modal
        show={rfqForwardModal}
        onHide={() => dispatch(setForwardRFQModal(false))}
        closeButton
        headerClassName="RFQModalHeaderForwardTabCorporate"
        footerClassName="RFQModalFooterForwardTabCorporate"
        bodyClassName="RFQModalBodyForwardTabCorporate"
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {isBranch ? (
                  <>
                    <p className="heading-RfqModal">
                      {titleDetails.branchName}
                    </p>
                    <p className="heading-branchCode">
                      Branch Code: {titleDetails.branchCode}
                    </p>
                  </>
                ) : (
                  <p className="heading-RfqModal">
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
                  <Col lg={12} md={12} sm={12} className="mb-2">
                    <label className="LabelRFQTransactionModal">
                      Customer Name*
                    </label>
                    <SelectDropdown
                      classNamePrefix="RfqSpot"
                      placeholder=""
                      options={getAllCorporates}
                      onChange={handleChangeCorporate}
                      isSearchable={true}
                      value={corporateValue}
                    />
                  </Col>
                )}

                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">
                      Currency*
                    </label>
                    <SelectDropdown
                      classNamePrefix="RfqSpot"
                      placeholder=""
                      options={currencyOptions}
                      value={selectedCurrency}
                      onChange={handleChangeCurrency}
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Type*</label>
                    <SelectDropdown
                      placeholder=""
                      classNamePrefix="RfqSpot"
                      options={typeOptions.filter((option) => {
                        if (
                          selectedCurrency?.isBuy &&
                          selectedCurrency?.isSell
                        ) {
                          return option.value === 1 || option.value === 2;
                        }
                        if (selectedCurrency?.isBuy) {
                          return option.value === 1;
                        }
                        if (selectedCurrency?.isSell) {
                          return option.value === 2;
                        }
                        return true;
                      })}
                      value={typeOptionSelected}
                      onChange={handleChangeType}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Nature</label>
                    <InputFIeld
                      applyClass="CalculatorTextfield"
                      disabled={true}
                      value={
                        natureOfBusinessOptions !== null
                          ? natureOfBusinessOptions?.name
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">A/c No</label>
                    <InputFIeld
                      applyClass="CalculatorTextfield"
                      onChange={handleChangeAcNo}
                      type="text"
                      value={accountNumber}
                      maxLength={25}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Amount*</label>
                    <NumericFormat
                      allowLeadingZeros={false}
                      value={amountData}
                      decimalScale={0}
                      maxLength={10}
                      allowNegative={false}
                      name={"Amount"}
                      applyClass={"CalculatorTextfield"}
                      customInput={InputFIeld}
                      onChange={handleChangeAmount}
                      thousandSeparator=","
                    />
                  </div>
                  <div className={"rfq-error_message"}>
                    {isError &&
                      (Number(amountData) === 0 || amountData === "") &&
                      "Please enter a valid amount"}
                  </div>
                </Col>
              </Row>

              <Row className="mt-2 ">
                <Col lg={7} md={7} sm={7} className="pe-0">
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">
                      Fixed Days*
                    </label>
                    <NumericFormat
                      customInput={InputFIeld}
                      applyClass="CalculatorTextfield"
                      value={Tenor}
                      decimalScale={0}
                      allowNegative={false}
                      name="Tenor"
                      maxLength={4}
                      isAllowed={(values) => {
                        const { value, floatValue } = values;
                        return (
                          (!floatValue || Number.isInteger(floatValue)) &&
                          value <= 1000
                        );
                      }}
                      onChange={handleDateValues}
                    />
                  </div>
                </Col>
                <Col
                  lg={5}
                  md={5}
                  sm={5}
                  className="d-flex align-items-end justify-content-start ps-0 "
                >
                  <span className="DateColumnTenorForwardTabRFQModal">
                    {formatDate(tenoreDate)}
                  </span>
                </Col>
                <span className={"rfq-error_message"}>
                  {isError &&
                    (Number(Tenor) === 0 || Tenor === "") &&
                    "Please enter valid tenor days (1-1000)"}
                </span>
              </Row>

              <Row className="mt-2 ">
                <Col lg={7} md={7} sm={7} className="pe-0">
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">
                      Option Days*
                    </label>
                    <NumericFormat
                      customInput={InputFIeld}
                      value={options}
                      decimalScale={0}
                      allowNegative={false}
                      onChange={handleDateValues}
                      name="Options"
                      applyClass="CalculatorTextfield"
                      isAllowed={(values) => {
                        const { value, floatValue } = values;
                        return (
                          (!floatValue || Number.isInteger(floatValue)) &&
                          value <= 1000 &&
                          value.length < 5
                        );
                      }}
                    />
                  </div>
                </Col>

                <Col
                  lg={5}
                  md={5}
                  sm={5}
                  className="d-flex align-items-end ps-0"
                >
                  <span className="DateColumnTenorForwardTabRFQModal">
                    {formatDate(optionsDate)}
                  </span>
                </Col>
                <span className={"rfq-error_message"}>
                  {isError &&
                    (options === "" || Number(options) === 0) &&
                    "Please enter valid option days (1-1000)"}
                </span>
              </Row>
            </div>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex justify-content-start align-items-center rfqLimit_error-style"
              >
                {errorMessage.status === true && errorMessage.message !== ""
                  ? errorMessage.message
                  : ""}
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex align-items-center justify-content-end "
              >
                <CustomButton
                  value="Confirm"
                  applyClass="ConfirmButtonBookaForward"
                  onClick={handleConfirmButton}
                  disabled={
                    (Tenor !== "" && isWeekend(tenoreDate)) ||
                    (options !== "" && isWeekend(optionsDate))
                  }
                  loading={SaveForwardTransactionRFQApiLoading}
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
