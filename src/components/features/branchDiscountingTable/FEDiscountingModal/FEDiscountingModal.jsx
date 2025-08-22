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
import { NumericFormat } from "react-number-format";
import {
  CalculateFESwapAndDiscountingApi,
  SaveFEDiscountingTransactionAPI,
} from "../../blotter/BlotterActions";
import { setCalculateFESwapAndDiscountingRate } from "@/store/BlotterSlicer/BlotterSlicer";

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const counterPartyDetails =
  isBranch && localStorage.getItem("branch") !== null
    ? JSON.parse(localStorage.getItem("branch"))
    : isCorporate && localStorage.getItem("corporate") !== null
    ? JSON.parse(localStorage.getItem("corporate"))
    : null;

const FEDiscountingModal = ({
  feDiscountingModalCall,
  setFeDiscountingModalCall,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });
  // Redux selectors
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  const CalculateFESwapAndDiscountingRate = useSelector(
    (state) => state.BlotterSlicer.CalculateFESwapAndDiscountingRate
  );

  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  // State for dropdown options
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions, "currencyOptionscurrencyOptions");
  const [getAllCorporates, setGetAllCorporates] = useState([]);

  // State for form fields
  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [tenoreDate, setTenorDate] = useState(formatDate(new Date()));
  const [tenorValue, setTenorValue] = useState("");

  // Main form state
  const [formData, setFormData] = useState({
    corproateObj: null,
    InstrumentID: {
      value: 0,
      label: "",
    },
    Quantity: "",
    AccountNumber: "",
    NatureOfTransactionID: 0,
    TenorDays: "",
    DiscountingFactor: "",
    Ready: "",
    feRate: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    corproateObj: false,
    AccountNumber: false,
    Quantity: false,
    TenorDays: false,
    DiscountingFactor: false,
    Ready: false,
  });

  /**
   * Effect Hook: Initialize Currency Options
   *
   * This effect initializes the currency dropdown options when:
   * - Instrument data is available (getAllInstrumentsForCounterPartiesData)
   * - No pre-filled transaction data exists (iBuySellData === null)
   *
   * Key Responsibilities:
   * 1. Filters instruments that are applicable for both buy and sell (isBuy && isSell)
   * 2. Formats instrument data for dropdown display with combined instrument names
   * 3. Sets the first valid instrument as default selection
   * 4. Handles errors gracefully with comprehensive logging
   *
   * Dependencies:
   * - getAllInstrumentsForCounterPartiesData: Redux state containing available instruments
   * - iBuySellData: Pre-filled transaction data (if exists)
   *
   * Behavior:
   * - Skips execution if iBuySellData exists (to avoid overwriting pre-selected values)
   * - Creates dropdown options only for instruments valid for both buy/sell
   * - Combines instrumentName and secondaryInstrumentName for display
   * - Provides proper error states and fallbacks
   */
  useEffect(() => {
    // Skip if pre-filled transaction data exists or instrument data isn't loaded
    if (getAllInstrumentsForCounterPartiesData === null) {
      return;
    }
    console.log(
      getAllInstrumentsForCounterPartiesData,
      "getAllInstrumentsForCounterPartiesData"
    );
    try {
      const { discountingApplicableInstruments } =
        getAllInstrumentsForCounterPartiesData;
      console.log(
        discountingApplicableInstruments,
        "getAllInstrumentsForCounterPartiesData"
      );
      // Process instruments to create dropdown options
      const validInstruments = discountingApplicableInstruments
        .map((instrument) => {
          // Only include instruments valid for both buy and sell
          if (instrument.isBuy) {
            return {
              ...instrument,
              // Combine primary and secondary instrument names for display
              label: `${instrument.instrumentName}`,
              value: instrument.instrumentID,
            };
          }
          return null; // Explicit return for non-matching instruments
        })
        .filter(Boolean); // Remove null entries
      console.log(validInstruments, "validInstrumentsvalidInstruments");
      // Update state only if valid instruments were found
      if (validInstruments.length > 0) {
        setSelectedCurrency(validInstruments[0]);
        setCurrencyOptions(validInstruments);
        setFormData({
          ...formData,
          InstrumentID: {
            value: validInstruments[0].value,
            label: validInstruments[0].label,
          },
        });
      } else {
        // Handle empty state
        console.warn(
          "No instruments available for both buy and sell operations"
        );
        setSelectedCurrency(null);
        setCurrencyOptions([]);
      }
    } catch (error) {
      // Comprehensive error handling
      console.log("Failed to initialize currency options:", {
        data: getAllInstrumentsForCounterPartiesData,
      });

      // // Reset to empty state on error
      // setSelectedCurrency(null);
      // setCurrencyOptions([]);
    }
  }, [getAllInstrumentsForCounterPartiesData]);

  // Effect to set nature of business options when data is available
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.find(
          (business) => business.isForFE === true
        );

        if (formattedOptions) {
          setFormData((prev) => ({
            ...prev,
            NatureOfTransactionID: formattedOptions.id,
          }));
          setSelectedNature(formattedOptions);
        }
      } catch (error) {
        console.error("Error setting nature of business:", error);
      }
    }
  }, [natureOfBusinessList]);

  // Effect to set corporate options when data is available
  useEffect(() => {
    if (GetAllActiveCorproates !== null) {
      try {
        const { corporates } = GetAllActiveCorproates;
        if (corporates.length > 0) {
          const formattedOptions = corporates.map((corporate) => ({
            label: corporate.corporateName,
            value: corporate.corporateID,
          }));

          setFormData((prev) => ({
            ...prev,
            corproateObj: formattedOptions[0], // Set first corporate as default
          }));
          setGetAllCorporates(formattedOptions);
        }
      } catch (error) {
        console.error("Error setting corporate options:", error);
      }
    }
  }, [GetAllActiveCorproates]);

  useEffect(() => {
    if (CalculateFESwapAndDiscountingRate !== null) {
      try {
        const { feRate, discountingFactor, readyRate } =
          CalculateFESwapAndDiscountingRate;
        setFormData((prev) => ({
          ...prev,
          DiscountingFactor: discountingFactor,
          feRate: feRate,
          Ready: readyRate,
        }));
        dispatch(setCalculateFESwapAndDiscountingRate(null));
      } catch (error) {
        console.log(
          error,
          "Error while calculating FE Swap and Discounting Rate"
        );
      }
    }
  }, [CalculateFESwapAndDiscountingRate]);

  // Handler for tenor days input changes
  const handleChangeTenor = (event) => {
    const { value } = event.target;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Validate range (1-1000)
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setTenorValue(value);
        setFormData((prev) => ({
          ...prev,
          TenorDays: value,
        }));

        // Clear tenor date if input is empty
        if (value === "") {
          setTenorDate(formatDate(new Date()));
          return;
        }

        // Calculate new date based on tenor days
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + numericValue);
        setTenorDate(formatDate(newDate));
      }
    }
  };

  // Handler for input field changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Handler for dropdown changes
  const handleDropdownChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption,
    }));

    console.log({ field, selectedOption }, "sdfsdfsdfdsfdfs");

    if (field === "InstrumentID") {
      if (Number(tenorValue) !== 0 && selectedOption.value !== 0) {
        let Data = {
          TenorDays: Number(tenorValue),
          InstrumentName: selectedOption.label,
          InstrumentID: Number(selectedOption.value),
        };
        dispatch(CalculateFESwapAndDiscountingApi({ Data, navigate }));
      }
    }
    // Clear error when dropdown is updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {
      // corproateObj: !formData.corproateObj,
      InstrumentID: !formData.InstrumentID || !formData.InstrumentID.value,
      AccountNumber: !formData.AccountNumber,

      TenorDays:
        !formData.TenorDays ||
        isNaN(formData.TenorDays) ||
        parseInt(formData.TenorDays) <= 0,
      DiscountingFactor:
        !formData.DiscountingFactor || isNaN(formData.DiscountingFactor),
      Ready: !formData.Ready || isNaN(formData.Ready),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const onBlurTenorDays = () => {
    if (Number(formData.TenorDays) !== 0 && formData.InstrumentID.value !== 0) {
      let Data = {
        TenorDays: Number(formData.TenorDays),
        InstrumentName: formData.InstrumentID.label,
        InstrumentID: formData.InstrumentID.value,
      };
      dispatch(CalculateFESwapAndDiscountingApi({ Data, navigate }));
    }
  };
  // Handler for confirm button click
  const handleClickConfirmFERFQ = () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    let convertIntoNumber = formData.Quantity.replace(/,/g, "");
    // Prepare API payload
    const payload = {
      CorporateID: isBranch
        ? Number(formData.corproateObj.value)
        : Number(counterPartyDetails?.corporateID),
      InstrumentID: formData.InstrumentID.value,
      Quantity: parseFloat(convertIntoNumber),
      AccountNumber: formData.AccountNumber,
      NatureOfTransactionID: formData.NatureOfTransactionID,
      TenorDays: parseInt(formData.TenorDays),
      // DiscountingFactor: parseFloat(formData.DiscountingFactor),
      // Ready: parseFloat(formData.Ready),
    };
    console.log(payload, "payloadpayloadpayloadtest");
    // Dispatch API action
    dispatch(
      SaveFEDiscountingTransactionAPI({
        navigate,
        Data: payload,
        setFeDiscountingModalCall,
        setErrorMessage,
      })
    );

    // Close modal after submission
    // setFeDiscountingModalCall(false);
  };

  const handleClose = () => {
    setFeDiscountingModalCall(false);
    setFormData({
      corproateObj: null,
      InstrumentID: {
        value: 0,
        label: "",
      },
      Quantity: "",
      AccountNumber: "",
      NatureOfTransactionID: 0,
      TenorDays: "",
      DiscountingFactor: "",
      Ready: "",
      feRate: "",
    });
  };

  return (
    <div>
      <Modal
        show={feDiscountingModalCall}
        setShow={feDiscountingModalCall}
        onHide={handleClose}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {isBranch ? (
                  <>
                    <span className="FeDiscountingHeader_BranchName">
                      {counterPartyDetails?.branchName}
                    </span>
                    <p className="FeDiscountingHeader_BranchCode">
                      {counterPartyDetails?.branchCode}
                    </p>
                  </>
                ) : isCorporate ? (
                  <span className="FeDiscountingHeader_BranchName">
                    {counterPartyDetails?.corporateName}
                  </span>
                ) : null}
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {/* Company Name Field */}
                {isBranch && (
                  <Row className="mb-2">
                    <Col lg={12} md={12} sm={12}>
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Client name*</span>
                        <SelectDropdown
                          classNamePrefix="RfqSpot"
                          options={getAllCorporates}
                          value={formData.corproateObj}
                          isSearchable={true}
                          onChange={(selected) =>
                            handleDropdownChange("corproateObj", selected)
                          }
                          placeholder="Select Company"
                        />
                        {errors.corproateObj && (
                          <span className="text-danger small">
                            Please select a company
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                )}

                {/* Currency Field */}
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Currency</span>
                      <SelectDropdown
                        classNamePrefix="RfqSpot"
                        options={currencyOptions}
                        value={formData.InstrumentID}
                        onChange={(selected) =>
                          handleDropdownChange("InstrumentID", selected)
                        }
                        placeholder="Select Currency"
                      />
                    </div>
                  </Col>
                </Row>

                {/* Nature and Account Number Fields */}
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Nature</span>
                      <InputFIeld
                        value={selectedNature?.name || ""}
                        disabled={true}
                        applyClass={"CalculatorTextfield"}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">A/c No*</span>
                      <InputFIeld
                        value={formData.AccountNumber}
                        onChange={(e) =>
                          handleInputChange("AccountNumber", e.target.value)
                        }
                        applyClass={"CalculatorTextfield"}
                      />
                      {errors.AccountNumber && (
                        <span className="text-danger small">
                          Please enter a valid account number
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                {/* Amount Field */}
                <Row className="my-2">
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount</span>
                      <NumericFormat
                        customInput={InputFIeld}
                        value={formData.Quantity}
                        onChange={(e) =>
                          handleInputChange("Quantity", e.target.value)
                        }
                        thousandSeparator=","
                        maxLength={10}
                        name={"Amount"}
                        applyClass={"CalculatorTextfield"}
                      />
                      {errors.Quantity && (
                        <span className="text-danger small">
                          Please enter a valid amount
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                {/* Tenor Field */}
                <Row className="">
                  <Col lg={8} md={8} sm={8} className="pe-0">
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Tenor*</span>
                      <InputFIeld
                        onChange={handleChangeTenor}
                        value={tenorValue}
                        applyClass={"CalculatorTextfield"}
                        onBlur={onBlurTenorDays}
                      />
                      {errors.TenorDays && (
                        <span className="text-danger small">
                          Please enter valid tenor days (1-1000)
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    md={4}
                    sm={4}
                    className="d-flex align-items-end justify-content-start ps-0"
                  >
                    <span className="feDiscuntingBookAForward_tenorDateSpan">
                      {tenoreDate}
                    </span>
                  </Col>
                </Row>

                {/* Ready and Swap Fields */}
                <Row className="mt-2">
                  <Col lg={7} md={7} sm={7}>
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">Ready</span>
                          <InputFIeld
                            value={formData.Ready}
                            // onChange={(e) =>
                            //   handleInputChange("Ready", e.target.value)
                            // }
                            disabled={true}
                            applyClass={"CalculatorTextfield"}
                          />
                          {errors.Ready && (
                            <span className="text-danger small">
                              Please enter a valid value
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2 position-relative">
                      <Col lg={10} md={10} sm={10} className="pe-0">
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">
                            Discounting Factor
                          </span>
                          <InputFIeld
                            value={Number(formData.DiscountingFactor).toFixed(
                              4
                            )}
                            // onChange={(e) => handleInputChange('Swap', e.target.value)}
                            disabled={true}
                            applyClass={"CalculatorTextfield"}
                          />
                        </div>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        className="d-flex align-items-end justify-content-start ps-0"
                      >
                        <span className="SofrPercentSignBox">%</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    lg={5}
                    md={5}
                    sm={5}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <span className="BlueBackGroundboxFEDiscountingModal">
                      {/* This would be calculated based on form values */}
                      {formData.feRate || "0.00"}
                    </span>
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
