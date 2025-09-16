import React, { useEffect, useState } from "react";
import "./CorporateBookaForwardModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { calculateDates, formatDate, isWeekend } from "@/common/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCalculateTenorSwapAndForwardRateData } from "@/store/BlotterSlicer/BlotterSlicer";
import {
  SaveForwardTransactionAPI,
  calculateTenorSwapAndForwardRateApi,
} from "../../blotter/BlotterActions";
import { NumericFormat } from "react-number-format";
import { formatPkAmount } from "@/utils/formatters";
import { useNotification } from "@/context/NotificationProvider";

/**
 * CorporateBookaForwardModal Component
 *
 * A comprehensive modal component for booking forward transactions in corporate context.
 * Handles forward foreign exchange transactions with rate calculations, tenor options,
 * and swap pricing.
 *
 * Features:
 * - Currency selection with automatic type (Buy/Sell) determination
 * - Real-time forward rate calculation based on tenor and currency
 * - Tenor and Options date calculation with weekend validation
 * - Corporate/client selection (for branch users)
 * - Swap and ready rate display
 * - Form validation and error handling
 *
 * Props:
 * @param {boolean} bookaForwardModalCall - Controls modal visibility
 * @param {function} setBookaForwardModalCall - Function to update modal visibility
 *
 * State Management:
 * - Uses Redux for global state (rates, calculations, etc.)
 * - Local state for form inputs, UI state, and calculations
 */
const CorporateBookaForwardModal = ({
  bookaForwardModalCall,
  setBookaForwardModalCall,
}) => {
  // Hooks initialization
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showMessage } = useNotification();

  // Environment Configuration
  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  // Error state management
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });

  // Counterparty details from localStorage
  const counterPartyDetails =
    isBranch && localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : isCorporate && localStorage.getItem("corporate") !== null
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  // Redux Selectors for required data
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  const calculatedForwardsSwapandRate = useSelector(
    (state) => state.BlotterSlicer.calculateTenorSwapAndForwardRateData
  );

  const currentRatesData = useSelector(
    (state) => state.WatchListReducer.watchlistTableDataCopy
  );

  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  const SaveForwardTransactionAPILoading = useSelector(
    (state) => state.BlotterSlicer.SaveForwardTransactionAPILoading
  );

  // Local State for Form Data and UI
  const [natureOfBusinessSelcted, setNatureOfBusinessSelected] = useState({
    value: 0,
    label: "",
  });

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [tenorDate, setTenorDate] = useState(new Date());
  const [optionsDate, setOptionsDate] = useState(new Date());
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [errorState, setErrorState] = useState({
    accoutErrorStatus: false,
  });
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [isError, setIsError] = useState(false);

  // Main form state
  const [forwardRFQState, setForwardRFQState] = useState({
    AccNo: "",
    Amount: "",
    TenorDays: "",
    Options: "",
    Ready: "",
    Swap: "",
    CalculateRate: 0,
  });

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

  /**
   * Handles transaction type (Buy/Sell) selection change
   * Triggers rate calculation when type changes
   * @param {Object} selectType - The selected type
   */
  const handleChangeType = (selectType) => {
    setTypeOptionSelected(selectType);

    try {
      if (
        typeOptionSelected.value !== 0 &&
        forwardRFQState.TenorDays !== "" &&
        selectedCurrency.value !== 0
      ) {
        let Data = {
          IsBuySide: selectType.value === 1 ? true : false,
          TenorDays: Number(forwardRFQState.TenorDays),
          InstrumentName: selectedCurrency.label,
          InstrumentID: selectedCurrency.value,
        };
        dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
      }
    } catch (error) {
      console.log("Error in Calculating rates: ", error);
    }
  };

  /**
   * Initialize nature of business options
   * Filters for forward transactions only
   */
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const { natureOfTransactions } = natureOfBusinessList;
        natureOfTransactions.forEach((business) => {
          if (business.isForForward === true) {
            setNatureOfBusinessSelected({
              value: business.id,
              label: business.name,
            });
          }
        });
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
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
        console.log(error, "Error in GetAllActiveCorproates useEffect");
      }
    }
  }, [GetAllActiveCorproates]);

  /**
   * Effect Hook: Update form state with calculated rates
   * Processes forward rate, swap, and ready rate from API response
   */
  useEffect(() => {
    if (calculatedForwardsSwapandRate !== null) {
      try {
        const { forwardRate, swap, readyRate } = calculatedForwardsSwapandRate;
        setForwardRFQState({
          ...forwardRFQState,
          Swap: formatPkAmount(swap, { decimals: 2 }),
          CalculateRate: forwardRate,
          Ready: formatPkAmount(readyRate, { decimals: 2 }),
        });
        dispatch(clearCalculateTenorSwapAndForwardRateData(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [calculatedForwardsSwapandRate]);

  /**
   * Effect Hook: Initialize Currency Options
   *
   * This effect initializes the currency dropdown options by:
   * 1. Filtering instruments that are applicable for forward transactions
   * 2. Formatting them for display in the Select component
   * 3. Setting the default selected currency and transaction type
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
   * Handles corporate selection change (for branch users)
   * @param {Object} selectedOption - The selected corporate
   */
  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
  };

  /**
   * Handles form input changes
   * Validates and updates form state, calculates dates for tenor/options
   * @param {Object} event - The input change event
   */
  const handleChangeValues = (event) => {
    const { name, value } = event.target;

    if (name === "Amount") {
      setForwardRFQState({
        ...forwardRFQState,
        [name]: value,
      });
    } else if (name === "Options") {
      setForwardRFQState({
        ...forwardRFQState,
        Options: value,
      });

      if (value !== "") {
        const newDate = new Date(tenorDate);
        newDate.setDate(newDate.getDate() + Number(value));
        setOptionsDate(newDate);
      } else {
        setOptionsDate(new Date(tenorDate));
      }
    } else if (name === "TenorDays") {
      setForwardRFQState({
        ...forwardRFQState,
        TenorDays: value,
      });

      if (value !== "") {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + Number(value));
        setTenorDate(newDate);
        setOptionsDate(newDate);
      } else {
        setTenorDate(new Date());
        setOptionsDate(new Date());
      }
    } else if (name === "AccNo") {
      if (/^[a-zA-Z0-9]*$/.test(value)) {
        setForwardRFQState({
          ...forwardRFQState,
          AccNo: value,
        });
        setErrorState({ ...errorState, accoutErrorStatus: false });
      }
    }
  };

  /**
   * Handles date calculation for tenor and options
   * Updates the corresponding dates based on input values
   * @param {Object} event - The input change event
   */
  const handleDateValues = (event) => {
    const { name, value } = event.target;

    const updatedState = {
      ...forwardRFQState,
      [name]: value,
    };
    setForwardRFQState(updatedState);

    const { tenorDt, optionDt } = calculateDates(
      updatedState.TenorDays,
      updatedState.Options
    );

    setTenorDate(tenorDt);
    setOptionsDate(optionDt);
  };

  /**
   * Triggers rate calculation when form values change
   * Calls API to calculate forward rates based on current inputs
   */
  const handleUpdateRate = () => {
    if (
      typeOptionSelected.value !== 0 &&
      forwardRFQState.TenorDays !== "" &&
      selectedCurrency.value !== 0
    ) {
      let Data = {
        IsBuySide: typeOptionSelected.value === 1 ? true : false,
        TenorDays: Number(forwardRFQState.TenorDays),
        InstrumentName: selectedCurrency.label,
        InstrumentID: selectedCurrency.value,
      };
      dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
    }
  };

  /**
   * Handles currency selection change
   * Automatically sets appropriate transaction type based on currency capabilities
   * Triggers rate calculation if conditions are met
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

    try {
      if (
        typeOptionSelected.value !== 0 &&
        forwardRFQState.TenorDays !== "" &&
        selectCurrency.value !== 0
      ) {
        let Data = {
          IsBuySide: typeOptionSelected.value === 1 ? true : false,
          TenorDays: Number(forwardRFQState.TenorDays),
          InstrumentName: selectCurrency.label,
          InstrumentID: selectCurrency.value,
        };
        dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
      }
    } catch (error) {
      console.log("Error in Calculating rates: ", error);
    }
  };

  /**
   * Form Submission Handler
   * Validates form and dispatches action to save forward transaction
   */
  const handleConfirm = () => {
    let amountValue = forwardRFQState.Amount.replace(/,/g, "");

    if (
      selectedCurrency &&
      typeOptionSelected.value !== 0 &&
      forwardRFQState.Amount !== "" &&
      Number(amountValue) > 0 &&
      natureOfBusinessSelcted.value !== 0 &&
      forwardRFQState.TenorDays !== "" &&
      forwardRFQState.Options !== "" &&
      forwardRFQState.Swap !== ""
    ) {
      setIsError(false);
      let amountValue = forwardRFQState.Amount.replace(/,/g, "");
      let Data = {
        CorporateID: isBranch
          ? Number(corporateValue.value)
          : Number(counterPartyDetails?.corporateID),
        InstrumentID: Number(selectedCurrency.value),
        SecondaryInstrumentID: 0,
        IsBuySide: typeOptionSelected.value === 1 ? true : false,
        IsBuyType: typeOptionSelected.value === 1 ? true : false,
        Quantity: Number(amountValue),
        AccountNumber: forwardRFQState.AccNo ? forwardRFQState.AccNo : "",
        NatureOfTransactionID: Number(natureOfBusinessSelcted.value),
        TenorDays: Number(forwardRFQState.TenorDays),
        OptionDays: Number(forwardRFQState.Options),
        Swap: Number(forwardRFQState.Swap),
      };
      dispatch(
        SaveForwardTransactionAPI({
          navigate,
          Data,
          setBookaForwardModalCall,
          setErrorMessage,
        })
      );
    } else {
      setIsError(true);
      // showMessage("Please fill all the required fields");
    }
  };

  return (
    <div>
      <Modal
        show={bookaForwardModalCall}
        setShow={setBookaForwardModalCall}
        onHide={() => {
          setBookaForwardModalCall(false);
        }}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        className=""
        modalHeader={
          isBranch ? (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className="Header_BranchName">
                    {counterPartyDetails?.branchName}
                  </span>
                  <p className="Header_BranchCode">
                    Branch Code: {counterPartyDetails?.branchCode}
                  </p>
                </Col>
              </Row>
            </>
          ) : isCorporate ? (
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="Header_BranchName">
                  {counterPartyDetails?.corporateName}
                </span>
              </Col>
            </Row>
          ) : null
        }
        modalBody={
          <>
            <Row className="position-relative">
              <Col lg={9} md={9} sm={9}>
                <Row>
                  {import.meta.env.VITE_APP_INCLUDE_BRANCH === "true" && (
                    <Col lg={12} md={12} sm={12} className="mb-2">
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Client Name</span>
                        <Select
                          options={getAllCorporates}
                          placeholder=""
                          value={corporateValue}
                          onChange={handleChangeCorporate}
                          classNamePrefix="RfqSpot"
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Currency</span>
                      <Select
                        options={currencyOptions}
                        placeholder=""
                        value={selectedCurrency}
                        isSearchable={false}
                        onChange={handleChangeCurrency}
                        classNamePrefix="RfqSpot"
                      />
                      <div className={"rfq-error_message"}>
                        {isError && selectedCurrency === null
                          ? "Please select currency"
                          : null}
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Type</span>
                      <Select
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
                        placeholder="Select the type"
                        isSearchable={false}
                        value={
                          typeOptionSelected.value === 0
                            ? null
                            : typeOptionSelected
                        }
                        onChange={handleChangeType}
                        classNamePrefix="RfqSpot"
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Nature</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={natureOfBusinessSelcted?.label || ""}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">A/c No</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.AccNo}
                        name={"AccNo"}
                        onChange={handleChangeValues}
                        maxLength={25}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount*</span>
                      <NumericFormat
                        allowLeadingZeros={false}
                        value={forwardRFQState.Amount}
                        name={"Amount"}
                        onChange={handleChangeValues}
                        customInput={InputFIeld}
                        thousandSeparator=","
                        maxLength={10}
                        decimalScale={0}
                        allowNegative={false}
                        applyClass={"CalculatorTextfield"}
                      />
                    </div>
                    <div className={"rfq-error_message"}>
                      {isError &&
                        (Number(forwardRFQState.Amount) === 0 ||
                          forwardRFQState.Amount === "") &&
                        "Please enter a valid amount"}
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2  g-0">
                  <Col lg={7} md={7} sm={7}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Tenor*</span>
                      <NumericFormat
                        customInput={InputFIeld}
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.TenorDays}
                        decimalScale={0}
                        name={"TenorDays"}
                        allowNegative={false}
                        isAllowed={(values) => {
                          const { value, floatValue } = values;
                          return (
                            (!floatValue || Number.isInteger(floatValue)) &&
                            value <= 1000
                          );
                        }}
                        onChange={handleDateValues}
                        onBlur={handleUpdateRate}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} className="d-flex align-items-end">
                    <span className="dateSpan">{formatDate(tenorDate)}</span>
                  </Col>
                  <span className={"rfq-error_message"}>
                    {isError &&
                      (Number(forwardRFQState.TenorDays) === 0 ||
                        forwardRFQState.TenorDays === "") &&
                      "Please enter valid tenor days (1-1000)"}
                  </span>
                </Row>
                <Row className="mt-2  g-0">
                  <Col lg={7} md={7} sm={7}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Options*</span>
                      <NumericFormat
                        customInput={InputFIeld}
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.Options}
                        decimalScale={0}
                        name={"Options"}
                        allowNegative={false}
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
                  <Col lg={5} md={5} sm={5} className="d-flex align-items-end">
                    <span className="dateSpan">{formatDate(optionsDate)}</span>
                  </Col>
                  <span className={"rfq-error_message"}>
                    {isError &&
                      (forwardRFQState.Options === "" ||
                        Number(forwardRFQState.Options) === 0) &&
                      "Please enter valid option days (1-1000)"}
                  </span>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Ready</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        disabled={true}
                        value={forwardRFQState.Ready}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Swap</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={formatPkAmount(forwardRFQState.Swap, {
                          decimals: 2,
                        })}
                        disabled={true}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} md={3} sm={3} className="BlueboxStyles  ">
                <span className="BlueBackGroundbox d-flex justify-content-center align-items-centerF ">
                  {forwardRFQState.CalculateRate.toFixed(4)}
                </span>
              </Col>
            </Row>
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
                className="d-flex align-items-center justify-content-end"
              >
                <CustomButton
                  value={"Confirm"}
                  onClick={handleConfirm}
                  applyClass={"ConfirmButtonBookaForward"}
                  disabled={
                    (forwardRFQState.TenorDays !== "" &&
                      isWeekend(tenorDate)) ||
                    (forwardRFQState.Options !== "" && isWeekend(optionsDate))
                  }
                  loading={SaveForwardTransactionAPILoading}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default CorporateBookaForwardModal;
