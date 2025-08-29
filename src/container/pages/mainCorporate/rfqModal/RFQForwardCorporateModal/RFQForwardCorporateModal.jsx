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

  /**
   * Redux Selectors for required data
   */

  // Get nature of business list from Redux store
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  // Get all active corporates from Redux store
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const rfqForwardModal = useSelector(
    (state) => state.modalReducer.forwardRFQModal
  );

  /**
   * Local State for Form Data
   */

  // Transaction details
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [options, setOptions] = useState("");
  const [accountNumber, setAcNumberData] = useState("");

  // Form validation state
  const [accountError, setAccountError] = useState({
    message: "",
    status: false,
  });

  // Dropdown options and selections
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  // Transaction type options (Buy/Sell)
  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  // Corporate selection (for branch users)
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });
  // Date calculations
  const [tenoreDate, setTenorDate] = useState(new Date());
  const [optionsDate, setOptionsDate] = useState(new Date());

  /**
   * Environment Configuration
   */
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
   * Effect Hooks
   */

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
        if (isCorporate) {
          setTypeOptionSelected({
            value: typeOptions[1].value,
            label: typeOptions[1].label,
          });
        } else {
          setTypeOptionSelected({
            value: typeOptions[0].value,
            label: typeOptions[0].label,
          });
        }
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
   *
   * Behavior:
   * - Only runs when getAllInstrumentsForCounterPartiesData changes
   * - Filters instruments where both isBuy and isSell are true
   * - Formats instrument data for dropdown display
   * - Sets first valid instrument as default selection
   * - Handles errors gracefully with console logging
   */
  useEffect(() => {
    // Only proceed if instrument data is available
    if (getAllInstrumentsForCounterPartiesData !== null) {
      try {
        // Destructure spot applicable instruments from the data
        const { forwardApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;

        // Filter and map instruments to create dropdown options
        const spotApplicableInstrumentList = forwardApplicableInstruments
          .map((data) => {
            // Only include instruments that are valid for both buy and sell
            if (data.isBuy === true && data.isSell === true) {
              return {
                ...data, // Spread all existing instrument properties
                label: `${data.instrumentName}`, // Display name for dropdown
                value: data.instrumentID, // Unique identifier for selection
              };
            }
            return null; // Explicitly return null for non-matching instruments
          })
          .filter(Boolean); // Remove any null values from the array

        // Set the first valid instrument as default selection if available
        if (spotApplicableInstrumentList.length > 0) {
          setSelectedCurrency(spotApplicableInstrumentList[0]);
          setCurrencyOptions(spotApplicableInstrumentList);
        } else {
          // Handle case where no valid instruments were found
          console.warn("No instruments available for both buy and sell");
          setSelectedCurrency(null);
          setCurrencyOptions([]);
        }
      } catch (error) {
        // Error handling with detailed error message
        console.error("Error initializing currency options:", error);

        // Reset currency options to empty array on error
        setSelectedCurrency(null);
        setCurrencyOptions([]);
      }
    } else {
      // Handle case where instrument data is not yet loaded
      setSelectedCurrency(null);
      setCurrencyOptions([]);
    }
  }, [getAllInstrumentsForCounterPartiesData]); // Only re-run when instrument data changes

  /**
   * Handles account number input change
   * Validates input to only allow alphanumeric characters
   * @param {Object} event - The input change event
   */
  const handleChangeAcNo = (event) => {
    const { value } = event.target;

    // Accept only alphanumeric characters
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
   * Handles tenor input change
   * Validates input (1-1000 days) and calculates maturity date
   * @param {Object} event - The input change event
   */
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
          newDate.setDate(newDate.getDate() + numericValue);
          setTenorDate(newDate);
          setOptionsDate(newDate); // Reset options date to new tenor date
        } else {
          setTenorDate(new Date());
          setOptionsDate(new Date());
        }
      }
    }
  };

  /**
   * Handles options input change
   * Validates input (1-1000 days) and calculates options date
   * @param {Object} event - The input change event
   */
  const handleChangeOptions = (event) => {
    const { value } = event.target;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setOptions(value);

        if (value !== "") {
          const newDate = new Date(tenoreDate); // start from tenorDate
          newDate.setDate(newDate.getDate() + numericValue);
          setOptionsDate(newDate);
        } else {
          setOptionsDate(tenoreDate);
        }
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
   * Form Submission Handler
   *
   * Validates form and dispatches action to save forward RFQ transaction
   */
  const handleConfirmButton = () => {
    // Validate required fields
    // if (accountNumber !== "") {
    //   setAccountError({ status: false, message: "" });

    // Prepare transaction data
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

    // Dispatch action to save forward RFQ
    dispatch(SaveForwardTransactionRFQApi({ navigate, Data, setErrorMessage }));
    // } else if (accountNumber === "") {
    //   // Show validation error
    //   setAccountError({
    //     message: "Account Number is Required",
    //     status: true,
    //   });
    // }
  };

  /**
   * Render Method
   */
  return (
    <div>
      <Modal
        show={rfqForwardModal}
        // setShow={openRfqModalForwardCorporateComponent}
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
              {/* Corporate Selection (for branch users) */}
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

                {/* Currency and Type Selection */}
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
                      onChange={(selectCurrency) =>
                        setSelectedCurrency(selectCurrency)
                      }
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Type*</label>
                    <SelectDropdown
                      placeholder=""
                      classNamePrefix="RfqSpot"
                      options={typeOptions}
                      value={typeOptionSelected}
                      onChange={handleChangeType}
                    />
                  </div>
                </Col>
              </Row>

              {/* Nature and Account Number */}
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
                  {/* {accountError.status === true && (
                    <div className="rfq-error_message">
                      Account Number is required
                    </div>
                  )} */}
                </Col>
              </Row>

              {/* Amount Input */}
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Amount</label>
                    <NumericFormat
                      maxLength={10}
                      allowNegative={false}
                      name={"Amount"}
                      applyClass={"CalculatorTextfield"}
                      customInput={InputFIeld}
                      onChange={handleChangeAmount}
                      thousandSeparator=","
                    />
                  </div>
                </Col>
              </Row>

              {/* Tenor Input with Date Calculation */}
              <Row className="mt-2 ">
                <Col lg={7} md={7} sm={7} className="pe-0">
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Tenor</label>
                    <InputFIeld
                      value={Tenor}
                      name="Tenor"
                      onChange={handleChangeTenor}
                      applyClass="CalculatorTextfield"
                      maxLength={4}
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
              </Row>

              {/* Options Input with Date Calculation */}
              <Row className="mt-2 ">
                <Col lg={7} md={7} sm={7} className="pe-0">
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Options</label>
                    <InputFIeld
                      value={options}
                      onChange={handleChangeOptions}
                      name="Options"
                      applyClass="CalculatorTextfield"
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
                {/* Limit should be lower than 1000 */}
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex align-items-center justify-content-end"
              >
                <CustomButton
                  value="Confirm"
                  applyClass="ConfirmButtonBookaForward"
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
