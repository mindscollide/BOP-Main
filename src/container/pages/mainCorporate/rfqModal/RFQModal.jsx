import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/common/globalButton/button";
import { Row, Col } from "react-bootstrap";
import Modal from "../../../../components/common/globalModal/Modal";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import "./RFQModal.css";
import InputFIeld from "../../../../components/common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SaveSpotTransactionAPI,
  SaveSpotTransactionRFQ,
} from "@/components/features/blotter/BlotterActions";
import {
  setIBuySellData,
  setRfqModalOpen,
} from "@/store/modalSlice/modalSlicer";
import { useNotification } from "@/context/NotificationProvider";
import { NumericFormat } from "react-number-format";

/**
 * RFQModal Component
 *
 * A modal dialog for creating Request for Quote (RFQ) transactions in a foreign exchange application.
 * Handles both RFQ creation and direct spot transactions based on context.
 *
 * Features:
 * - Currency selection
 * - Transaction type (Buy/Sell) selection
 * - Amount input with formatting
 * - Account number and LC number inputs
 * - Nature of business selection
 * - Corporate selection (for branch users)
 * - Confirmation dialog for cancellation
 * - Form validation
 *
 * Dependencies:
 * - Redux for state management
 * - React Router for navigation
 * - React Bootstrap for layout
 * - react-number-format for numeric input formatting
 *
 * State Management:
 * - Uses Redux for global state (instruments, nature of business, etc.)
 * - Local state for form inputs and UI state
 */
const RFQModal = () => {
  // Hooks initialization
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  // State for confirmation modal visibility
  const [confirmationModal, setConfirmationModal] = useState(false);

  // State for main RFQ modal visibility
  const [rfqModal, setRfqModal] = useState(true);

  /**
   * Redux Selectors for required data
   */

  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  // Get nature of business list from Redux store
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  // Get all active corporates from Redux store
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  // Get RFQ modal open state from Redux store
  const isRfqModalOpen = useSelector(
    (state) => state.modalReducer.rfqModalOpen
  );

  // Get pre-filled buy/sell data from Redux store (if any)
  const iBuySellData = useSelector((state) => state.modalReducer.IBuySellData);

  console.log(iBuySellData, "iBuySellDataiBuySellData");

  /**
   * Environment Configuration
   */
  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  /**
   * Counterparty Details
   *
   * Retrieves branch or corporate details from localStorage based on environment config
   */
  const counterPartyDetails =
    isBranch && localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : isCorporate && localStorage.getItem("corporate") !== null
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  /**
   * Local State for Form Data
   */
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedNature, setSelectedNature] = useState({
    value: 0,
    label: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  console.log(selectedCurrency, "selectedCurrencyselectedCurrency");
  const [amountData, setAmountData] = useState("");
  const [acNumberData, setAcNumberData] = useState("");
  const [lcNumberData, setLcNumberData] = useState("");

  // Transaction type options (Buy/Sell)
  const [typeOptions, setTypeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });
  console.log(
    typeOptionSelected,
    natureOfBusinessOptions,
    "typeOptionSelectedtypeOptionSelected"
  );
  // Corporate selection (for branch users)
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);

  // Get branch details from localStorage if available
  let branchDetails =
    localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : null;

  /**
   * Modal Handlers
   */

  /**
   * Handles closing the RFQ modal
   * Shows confirmation dialog instead of closing immediately
   */
  const onCloseRfq = () => {
    setRfqModal(false);
    setConfirmationModal(true);
  };

  /**
   * Handles confirmation modal "Yes" action
   * Closes both modals and resets state
   */
  const handleConfimationModalYes = () => {
    setRfqModal(false);
    setConfirmationModal(false);
    dispatch(setIBuySellData(null));
    dispatch(setRfqModalOpen(false));
  };

  /**
   * Cleanup effect
   * Resets state when component unmounts
   */
  useEffect(() => {
    return () => {
      setRfqModal(false);
      setConfirmationModal(false);
      dispatch(setIBuySellData(null));
      dispatch(setRfqModalOpen(false));
    };
  }, []);

  /**
   * Effect for initializing nature of business options
   * Runs when natureOfBusinessList changes
   */
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.map(
          (business) => ({
            ...business,
            label: business.name,
            value: business.id,
          })
        );
        setNatureOfBusinessOptions(formattedOptions);
        setTypeOptionSelected({
          value: typeOptions[0].value,
          label: typeOptions[0].label,
        });
        setSelectedNature(formattedOptions[0]);
      } catch (error) {
        console.error("Error initializing nature of business options:", error);
      }
    }
  }, [natureOfBusinessList]);

  /**
   * Effect for initializing form with pre-filled buy/sell data
   * Runs when iBuySellData changes
   */
  useEffect(() => {
    if (iBuySellData !== null && natureOfBusinessList?.natureOfTransactions) {
      try {
        console.log(iBuySellData, "iBuySellDataiBuySellData");
        const isBuy = iBuySellData.type === "buy";
        const typeValue = isBuy ? 1 : 2;
        const baseCurrency = iBuySellData.currencyLabel.slice(0, 3);
        const quoteCurrency = iBuySellData.currencyLabel.slice(3, 6);

        const newTypesData = isBuy
          ? [
              { label: `Buy ${baseCurrency}`, value: 1 },
              { label: `Sell ${quoteCurrency}`, value: 2 },
            ]
          : [
              { label: `Sell ${baseCurrency}`, value: 2 },
              { label: `Buy ${quoteCurrency}`, value: 1 },
            ];

        const filteredOptions = natureOfBusinessList.natureOfTransactions
          .filter(
            (business) =>
              business.isForSpot &&
              (typeValue === 1 ? business.isForBuy : business.isForSell)
          )
          .map((business) => ({
            ...business,
            label: business.name,
            value: business.id,
          }));

        setNatureOfBusinessOptions(filteredOptions);
        setSelectedCurrency({
          value: iBuySellData.instrumentID,
          label: `${iBuySellData.instrumentName}${
            iBuySellData.secondaryInstrumentName || ""
          }`,
          secondaryInstrumentID: iBuySellData.secondaryInstrumentID,
          secondaryInstrumentName: iBuySellData.secondaryInstrumentName,
        });
        setTypeOptions(newTypesData);

        const selected = newTypesData.find((opt) => opt.value === typeValue);
        setTypeOptionSelected(selected);
      } catch (error) {
        console.error("Error initializing with buy/sell data:", error);
      }
    }
  }, [iBuySellData, natureOfBusinessList]);

  /**
   * Effect for initializing corporate options
   * Runs when GetAllActiveCorproates changes
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
    if (!getAllInstrumentsForCounterPartiesData && iBuySellData === null) {
      return;
    }

    try {
      const { spotApplicableInstruments } =
        getAllInstrumentsForCounterPartiesData;

      // Process instruments to create dropdown options
      const validInstruments = spotApplicableInstruments
        .map((instrument) => {
          // Only include instruments valid for both buy and sell

          return {
            ...instrument,
            // Combine primary and secondary instrument names for display
            label: `${instrument.instrumentName}${
              instrument.secondaryInstrumentName || ""
            }`,
            value: instrument.instrumentID,
            secondaryInstrumentID: instrument.secondaryInstrumentID,
            secondaryInstrumentName: instrument.secondaryInstrumentName,
          };
        })
        .filter(Boolean); // Remove null entries

      // Update state only if valid instruments were found
      if (validInstruments.length > 0) {
        if (iBuySellData === null) {
          setSelectedCurrency(validInstruments[0]);
        }
        setCurrencyOptions(validInstruments);
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
      console.error("Failed to initialize currency options:", {
        error,
        data: getAllInstrumentsForCounterPartiesData,
      });

      // // Reset to empty state on error
      // setSelectedCurrency(null);
      // setCurrencyOptions([]);
    }
  }, [getAllInstrumentsForCounterPartiesData, iBuySellData]);
  /**
   * Form Field Handlers
   */

  /**
   * Handles nature of business selection change
   * @param {Object} selectedOption - The selected option
   */
  const handleNatureChange = (selectedOption) => {
    setSelectedNature(selectedOption);
  };

  /**
   * Handles currency selection change
   * @param {Object} selectedOption - The selected option
   */
  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
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
   * Handles account number input change
   * Validates input to only allow numbers
   * @param {Object} event - The input change event
   */
  const handleChangeAcNumber = (event) => {
    const { name, value } = event.target;
    if (name === "AcNumber") {
      if (value !== "") {
        const regex = /^[A-Za-z0-9]*$/;
        if (regex.test(value)) {
          setAcNumberData(value);
        }
      } else {
        setAcNumberData("");
      }
    }
  };

  /**
   * Handles LC number input change
   * Validates input to only allow numbers
   * @param {Object} event - The input change event
   */
  const handleChangeLcNumber = (event) => {
    const { name, value } = event.target;
    if (name === "LcNumber") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setLcNumberData(value);
      }
    } else {
      setLcNumberData(value);
    }
  };

  /**
   * Handles transaction type (Buy/Sell) selection change
   *
   * @param {Object} selectType - The selected transaction type
   * @param {number} selectType.value - Numeric value (1 = Buy, 2 = Sell)
   * @param {string} selectType.label - Display label ('Buy' or 'Sell')
   *
   * Behavior:
   * 1. Filters nature of business options based on selected transaction type
   * 2. Formats options for dropdown display
   * 3. Updates all related state (selectedNature, natureOfBusinessOptions, typeOptionSelected)
   * 4. Sets first valid option as default selection
   */
  const handleChangeType = (selectType) => {
    // Validate input data exists
    if (!natureOfBusinessList?.natureOfTransactions) {
      console.error("Nature of business data not available");
      return;
    }

    // Filter and transform options based on transaction type
    const filteredOptions = natureOfBusinessList.natureOfTransactions
      .filter((business) => {
        const isSpotTransaction = business.isForSpot === true;

        // Check transaction type compatibility
        if (selectType.value === 1) {
          return isSpotTransaction && business.isForBuy === true;
        }
        return isSpotTransaction && business.isForSell === true;
      })
      .map((business) => ({
        ...business,
        label: business.name,
        value: business.id,
      }));
    // Update state with new options and selections
    setNatureOfBusinessOptions(filteredOptions);

    // Set first option as default if available, otherwise null
    setSelectedNature(filteredOptions[0] || null);

    // Update selected transaction type
    setTypeOptionSelected(selectType);
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
   * Validates form and dispatches appropriate action based on context:
   * - Direct spot transaction if iBuySellData exists
   * - RFQ transaction otherwise
   */
  const handleConfirmButton = () => {
    try {
      // Validate required fields
      if (
        typeOptionSelected.value !== 0 &&
        selectedNature.value !== 0 &&
        selectedCurrency.value !== 0 &&
        amountData !== ""
      ) {
        // Validate amount is greater than 1
        if (Number(amountData.replace(/,/g, "")) < 1) {
          showMessage("Amount should be greater than 1 ");
          return;
        }
        const IsBuySide =
          iBuySellData === null
            ? typeOptionSelected.value === 1
            : iBuySellData.type === "buy";
        // Prepare transaction data
        let amountValue = amountData.replace(/,/g, "");
        let Data = {
          CorporateID: isBranch
            ? corporateValue.value
            : counterPartyDetails.corporateID,
          InstrumentID: selectedCurrency?.value, // TODO: Should this be selectedCurrency.value?
          SecondaryInstrumentID: selectedCurrency?.secondaryInstrumentID,
          IsBuyType: typeOptionSelected.value === 1 ? true : false,
          IsBuySide: IsBuySide,
          Quantity: Number(amountValue),
          AccountNumber: acNumberData,
          NatureOfTransactionID: selectedNature.value,
          LCNumber: lcNumberData,
        };

        // Dispatch appropriate action based on context
        if (iBuySellData !== null) {
          dispatch(SaveSpotTransactionAPI({ navigate, Data }));
        } else {
          dispatch(SaveSpotTransactionRFQ({ navigate, Data }));
        }
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  /**
   * Render Method
   */
  return (
    <>
      <Modal
        show={isRfqModalOpen}
        onHide={onCloseRfq}
        closeButton
        centered={true}
        size={rfqModal ? "lg" : null}
        footerClassName={"d-block border-0"}
        headerClassName='RFQ-header-className'
        modalHeader={
          rfqModal && (
            <>
              <Row>
                <Col lg={12} md={12} sm={12} className=''>
                  {isBranch ? (
                    <>
                      <p className='heading-RfqModal'>
                        {counterPartyDetails.branchName}
                      </p>
                      <p className='heading-branchCode'>
                        Branch Code: {counterPartyDetails.branchCode}
                      </p>
                    </>
                  ) : (
                    isCorporate && (
                      <p className='heading-RfqModal'>
                        {counterPartyDetails.corporateName}
                      </p>
                    )
                  )}
                </Col>
              </Row>
            </>
          )
        }
        modalBody={
          rfqModal ? (
            <>
              {/* Corporate Selection (for branch users) */}
              <Row className='m-0 '>
                {isBranch && (
                  <>
                    <Col lg={2} md={2} sm={2}>
                      <label className='LabelRFQTransactionModal'>
                        Company Name*
                      </label>
                    </Col>
                    <Col lg={4} md={4} sm={4} className='mb-3'>
                      <SelectDropdown
                        classNamePrefix='RfqSpot'
                        placeholder=''
                        options={getAllCorporates}
                        onChange={handleChangeCorporate}
                        isSearchable={true}
                        value={corporateValue}
                      />
                    </Col>
                    <Col lg={2} md={2} sm={2}></Col>
                    <Col lg={4} md={4} sm={4} className='mb-2'></Col>
                  </>
                )}

                {/* Currency Selection */}
                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>Currency*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <SelectDropdown
                    classNamePrefix='RfqSpot'
                    placeholder=''
                    options={currencyOptions}
                    // options={currencyOptions.filter((option) => {
                    //   // For Buy transactions (value === 1), check if option supports buying
                    //   if (typeOptionSelected.value === 1) {
                    //     return option.isBuy === true;
                    //   }
                    //   // For Sell transactions (value === 2), check if option supports selling
                    //   else if (typeOptionSelected.value === 2) {
                    //     return option.isSell === true;
                    //   }
                    //   // If no transaction type selected (shouldn't normally happen), show all options
                    //   return true;
                    // })}
                    onChange={handleCurrencyChange}
                    value={selectedCurrency}
                    isDisabled={iBuySellData !== null ? true : false}
                  />
                </Col>

                {/* Transaction Type Selection */}
                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>Type*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <SelectDropdown
                    placeholder='Select Type'
                    classNamePrefix='RfqSpot'
                    value={
                      typeOptionSelected.value === 0 ? null : typeOptionSelected
                    }
                    onChange={handleChangeType}
                    options={typeOptions}
                    // isDisabled={iBuySellData !== null ? true : false}
                  />
                </Col>
              </Row>

              {/* Amount and Account Number Inputs */}
              <Row className='m-0 mt-2'>
                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>Amount*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <NumericFormat
                    customInput={InputFIeld}
                    thousandSeparator=','
                    allowNegative={false}
                    onChange={handleChangeAmount}
                    maxLength={10}
                    value={amountData}
                    name='Amount'
                    applyClass={"CalculatorTextfield"}
                  />
                </Col>
                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>A/c No*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <InputFIeld
                    onChange={handleChangeAcNumber}
                    value={acNumberData}
                    name='AcNumber'
                    applyClass='CalculatorTextfield'
                  />
                </Col>
              </Row>

              {/* Nature of Business and LC Number Inputs */}
              <Row className='m-0 mt-2'>
                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>Nature*</label>
                </Col>

                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <SelectDropdown
                    placeholder=''
                    classNamePrefix='RfqSpot'
                    options={
                      iBuySellData !== null
                        ? natureOfBusinessOptions.filter((data) => {
                            if (typeOptionSelected.value === 1) {
                              return (
                                data.isForSpot === true &&
                                data.isForBuy === true
                              );
                            }
                            if (typeOptionSelected.value === 2) {
                              return (
                                data.isForSpot === true &&
                                data.isForSell === true
                              );
                            }
                            return false; // Exclude all by default
                          })
                        : natureOfBusinessOptions
                    }
                    onChange={handleNatureChange}
                    value={selectedNature}
                  />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label className='LabelRFQTransactionModal'>LC No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className='mb-2'>
                  <InputFIeld
                    onChange={handleChangeLcNumber}
                    value={lcNumberData}
                    name='LcNumber'
                    applyClass='CalculatorTextfield'
                  />
                </Col>
              </Row>
            </>
          ) : (
            confirmationModal && (
              <Row>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className='text-center d-flex justify-content-center align-items-center fs-6'>
                  Do you want cancel the process
                </Col>
              </Row>
            )
          )
        }
        modalFooter={
          rfqModal ? (
            <>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className='d-flex justify-content-end'>
                  <CustomButton
                    value='Submit'
                    className='btn btn-primary ms-auto px-4'
                    onClick={handleConfirmButton}
                  />
                </Col>
              </Row>
            </>
          ) : (
            confirmationModal && (
              <Row>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className='d-flex justify-content-end'>
                  <CustomButton
                    value='Yes'
                    className='btn btn-primary ms-auto px-4'
                    onClick={handleConfimationModalYes}
                  />
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className='d-flex justify-content-start'>
                  <CustomButton
                    value='No'
                    className='btn btn-primary  px-4'
                    onClick={() => {
                      setRfqModal(true);
                      setConfirmationModal(false);
                    }}
                  />
                </Col>
              </Row>
            )
          )
        }
      />
    </>
  );
};

export default RFQModal;
