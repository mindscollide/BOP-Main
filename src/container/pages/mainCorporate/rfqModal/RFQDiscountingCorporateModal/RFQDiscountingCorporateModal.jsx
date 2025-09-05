import React, { useEffect, useState } from "react";
import "./RFQDiscountingCorporateModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { formatDate, isWeekend } from "@/common/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CalculateFESwapAndDiscountingApi,
  SaveFEDiscountingTransactionRFQ,
  SaveNonFEDiscountingTransactionRFQ,
  calculateNonFeSwapAndDiscountingRateApi,
} from "@/components/features/blotter/BlotterActions";
import { NumericFormat } from "react-number-format";
import { setDiscountingRFQModal } from "@/store/modalSlice/modalSlicer";
const RFQDiscountingCorporateModal = () => {
  //Local States
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const CalculateFESwapAndDiscountingRate = useSelector(
    (state) => state.BlotterSlicer.CalculateFESwapAndDiscountingRate
  );
  const calculateNonFeSwapAndDiscountingRate = useSelector(
    (state) => state.BlotterSlicer.calculateNonFeSwapAndDiscountingRate
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  const rfqDiscountingModal = useSelector(
    (state) => state.modalReducer.DiscountingRFQModal
  );
  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );
  const [amountData, setAmountData] = useState("");
  const [Tenor, setTenor] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });
  const [isError, setIsError] = useState(false);

  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [tenoreDate, setTenorDate] = useState(new Date());
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

  let titleDetails =
    localStorage.getItem("branch") !== null && isBranch
      ? JSON.parse(localStorage.getItem("branch"))
      : localStorage.getItem("corporate") !== null && !isBranch
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });
  console.log(typeOptionSelected, "typeOptionSelectedtypeOptionSelected");
  const [calculatedData, setCalulatedData] = useState({
    kiborValue: "",
    swapValue: "",
    nonFeRate: "",
    feRate: "",
    DiscountingFactor: "",
  });
  console.log(typeOptionSelected, "typeOptionSelectedtypeOptionSelected");
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
        const {
          discountingApplicableInstruments,
          nonFEDiscountingApplicableInstruments,
        } = getAllInstrumentsForCounterPartiesData;

        let currenciesArr =
          typeOptionSelected.value === 13
            ? discountingApplicableInstruments
            : typeOptionSelected.value === 14
            ? nonFEDiscountingApplicableInstruments
            : discountingApplicableInstruments;

        // Filter and map instruments to create dropdown options
        const spotApplicableInstrumentList = currenciesArr
          .map((data) => {
            // Only include instruments that are valid for both buy and sell
            if (data.isBuy === true) {
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
  }, [getAllInstrumentsForCounterPartiesData, typeOptionSelected?.value]); // Only re-run when instrument data changes

  useEffect(() => {
    if (CalculateFESwapAndDiscountingRate !== null) {
      try {
        const { feRate, discountingFactor } = CalculateFESwapAndDiscountingRate;

        // Validate the received data
        if (
          typeof feRate !== "number" ||
          typeof discountingFactor !== "number"
        ) {
          throw new Error(
            "Invalid data format received from CalculateFESwapAndDiscountingRate"
          );
        }

        // Update state with the calculated values
        setCalulatedData({
          DiscountingFactor: discountingFactor,
          feRate: feRate,
        });
      } catch (error) {
        console.error(
          "Error while calculating FE Swap and Discounting Rate:",
          error.message
        );
        // Optionally set some error state or show user notification
        // setErrorState(error.message);
      }
    }
  }, [CalculateFESwapAndDiscountingRate]);

  useEffect(() => {
    if (calculateNonFeSwapAndDiscountingRate !== null) {
      try {
        const { kibor, nonFERate, swap } = calculateNonFeSwapAndDiscountingRate;
        setCalulatedData({
          kiborValue: kibor,
          nonFeRate: nonFERate,
          swapValue: swap,
        });
      } catch (error) {}
    }
  }, [calculateNonFeSwapAndDiscountingRate]);

  // handle Change amount
  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (name === "Amount") {
      // Allow only positive numbers
      if (value === "" || Number(value) <= 0) {
        setIsError(true);
        setAmountData(""); // reset if invalid
      } else {
        setAmountData(value);
        setIsError(false);
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
          setTenorDate(newDate);
        } else {
          setTenorDate(new Date()); // Optional: clear tag text if input is empty
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

  const handleChangeNature = (value) => {
    setTypeOptionSelected(value);
  };

  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  const handleBlurTenor = () => {
    if (Tenor !== "" && selectedCurrency.value !== 0) {
      if (typeOptionSelected.value === 14) {
        let Data = {
          TenorDays: Number(Tenor),
          InstrumentName: selectedCurrency.label,
          InstrumentID: Number(selectedCurrency.value),
        };
        dispatch(calculateNonFeSwapAndDiscountingRateApi({ Data, navigate }));
      } else {
        let Data = {
          TenorDays: Number(Tenor),
          InstrumentName: selectedCurrency.label,
          InstrumentID: Number(selectedCurrency.value),
        };
        dispatch(CalculateFESwapAndDiscountingApi({ Data, navigate }));
      }
    }
  };
  const handleClickConfirm = () => {
    let corporateDetail =
      localStorage.getItem("corporate") !== null
        ? JSON.parse(localStorage.getItem("corporate"))
        : null;
    if (typeOptionSelected.value === 14) {
      let AmountValue = amountData.replace(/,/g, "");
      if (Number(AmountValue) > 0 && Number(Tenor) > 0) {
        setIsError(false);
        let Data = {
          CorporateID: isBranch
            ? corporateValue.value
            : corporateDetail.corporateID,
          InstrumentID: selectedCurrency.value,
          Quantity: Number(AmountValue),
          AccountNumber: AccountNumber,
          NatureOfTransactionID: Number(typeOptionSelected.value),
          TenorDays: Number(Tenor),
          Kibor: Number(calculatedData.kiborValue),
          Swap: Number(calculatedData.swapValue),
        };
        dispatch(
          SaveNonFEDiscountingTransactionRFQ({
            Data,
            navigate,
            setErrorMessage,
          })
        );
      } else {
        setIsError(true);
      }
    } else {
      let AmountValue = amountData.replace(/,/g, "");
      if (Number(AmountValue) > 0 && Number(Tenor) > 0) {
        setIsError(false);
        let Data = {
          CorporateID: isBranch
            ? corporateValue.value
            : corporateDetail.corporateID,
          InstrumentID: selectedCurrency.value,
          Quantity: Number(AmountValue),
          AccountNumber: AccountNumber,
          NatureOfTransactionID: Number(typeOptionSelected.value),
          TenorDays: Number(Tenor),
          DiscountingFactor: Number(calculatedData.DiscountingFactor),
        };
        dispatch(
          SaveFEDiscountingTransactionRFQ({ Data, navigate, setErrorMessage })
        );
      } else {
        setIsError(true);
      }
    }
  };
  return (
    <div>
      <Modal
        show={rfqDiscountingModal}
        onHide={() => dispatch(setDiscountingRFQModal(false))}
        closeButton
        headerClassName="RFQModalHeaderForwardTabCorporate"
        footerClassName="RFQModalFooterForwardTabCorporate"
        bodyClassName="RFQModalBodyForwardTabCorporate"
        className=""
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
              {import.meta.env.VITE_APP_INCLUDE_BRANCH === "true" && (
                <Row className="mb-2">
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <label className="LabelRFQTransactionModal">
                        Customer name*
                      </label>
                      <SelectDropdown
                        classNamePrefix="RfqSpot"
                        options={getAllCorporates}
                        placeholder=""
                        value={corporateValue}
                        onChange={handleChangeCorporate}
                        isSearchable={true}
                      />
                    </div>
                  </Col>
                </Row>
              )}

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">
                      Currency*
                    </label>
                    <SelectDropdown
                      classNamePrefix="RfqSpot"
                      placeholder=""
                      options={currencyOptions}
                      onChange={(selectCurrency) =>
                        setSelectedCurrency(selectCurrency)
                      }
                      value={selectedCurrency}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Nature*</label>
                    <SelectDropdown
                      classNamePrefix="RfqSpot"
                      options={natureOfBusinessOptions}
                      value={typeOptionSelected}
                      onChange={handleChangeNature}
                    />
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">A/c No</label>
                    <InputFIeld
                      onChange={handleChangeAccountNumber}
                      value={AccountNumber}
                      name="AccountNumber"
                      applyClass="CalculatorTextfield"
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
                      customInput={InputFIeld}
                      value={amountData}
                      name="Amount"
                      applyClass="CalculatorTextfield"
                      thousandSeparator={true}
                      maxLength={10}
                      onChange={handleChangeAmount}
                      allowNegative={false}
                    />
                  </div>
                  {isError &&
                    (Number(amountData) <= 0 || amountData === "") && (
                      <span className="text-danger small">
                        Please enter a valid amount
                      </span>
                    )}
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={7} md={7} sm={7} className="pe-0">
                  <div className="d-flex flex-column flex-wrap">
                    <label className="LabelRFQTransactionModal">Tenor*</label>
                    <InputFIeld
                      onChange={handleChangeTenor}
                      value={Tenor}
                      name="Tenor"
                      applyClass="CalculatorTextfield"
                      onBlur={handleBlurTenor}
                    />
                  </div>
                </Col>
                <Col
                  lg={5}
                  md={5}
                  sm={5}
                  className="ps-0 d-flex align-items-end"
                >
                  <span className="DateColumnTenorForwardTabRFQModal">
                    {formatDate(tenoreDate)}
                  </span>
                </Col>
                {isError && (Number(Tenor) <= 0 || Tenor === "") && (
                  <span className="text-danger small">
                    Please enter valid tenor days (1-1000)
                  </span>
                )}
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
              <Col lg={6} md={6} sm={12} className="d-flex justify-content-end">
                <CustomButton
                  value="Confirm"
                  applyClass="ConfirmButtonBookaForward"
                  onClick={handleClickConfirm}
                  disabled={Tenor !== "" && isWeekend(tenoreDate)}
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
