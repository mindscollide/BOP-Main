import React, { useEffect, useState } from "react";
import "./NonFEDiscoutingModal.css";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SaveNonFEDiscountingTransactionAPI,
  calculateNonFeSwapAndDiscountingRateApi,
} from "../../blotter/BlotterActions";
import { formatDate, isWeekend } from "@/common/utils";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { setCalculateNonFeSwapAndDiscountingRate } from "@/store/BlotterSlicer/BlotterSlicer";
const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const counterPartyDetails =
  isBranch && localStorage.getItem("branch") !== null
    ? JSON.parse(localStorage.getItem("branch"))
    : isCorporate && localStorage.getItem("corporate") !== null
    ? JSON.parse(localStorage.getItem("corporate"))
    : null;
const NonFEDiscountingModal = ({
  nonfeDiscountingModalCall,
  setNonfeDiscountingModalCall,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );
  const calculateNonFeSwapAndDiscountingRate = useSelector(
    (state) => state.BlotterSlicer.calculateNonFeSwapAndDiscountingRate
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );
  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [tenoreDate, setTenorDate] = useState(new Date());
  const [tenorValue, setTenorValue] = useState("");
  const [amount, setAmount] = useState("");
  const [accNo, setAcc] = useState("");
  const [calculatedData, setCalulatedData] = useState({
    kiborValue: "",
    swapValue: "",
    nonFeRate: "",
    Ready: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });

  const [errors, setErrors] = useState({
    tenorValue: false,
    accNo: false,
    amount: false,
  });

  const [isError, setIsError] = useState(false);

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
          setTenorDate(newDate);
        } else {
          setTenorDate(new Date()); // Optional: clear tag text if input is empty
        }
      }
    }
  };

  const handleUpdateRate = () => {
    if (selectedCurrency.value !== 0 && tenorValue !== "") {
      let Data = {
        TenorDays: Number(tenorValue),
        InstrumentName: selectedCurrency.label,
        InstrumentID: Number(selectedCurrency.value),
      };
      dispatch(calculateNonFeSwapAndDiscountingRateApi({ Data, navigate }));
    }
  };
  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  const handleChangeState = (name, event) => {
    const { value } = event.target;
    if (name === "amount") {
      setAmount(value);
    } else if (name === "accNo") {
      const regex = /^[a-zA-Z0-9]*$/;
      if (regex.test(value)) {
        setAcc(value);
      }
    }
    // if (errors.Quantity) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     Quantity: false,
    //   }));
    // }
  };
  // Form validation function
  const validateForm = () => {
    let convertIntoNumber = amount.replace(/,/g, "");

    const newErrors = {
      tenorValue: !tenorValue || isNaN(tenorValue) || parseInt(tenorValue) <= 0,
      // accNo: !accNo,
      Quantity:
        !convertIntoNumber ||
        isNaN(convertIntoNumber) ||
        parseInt(convertIntoNumber) <= 0,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  useEffect(() => {
    // Skip if pre-filled transaction data exists or instrument data isn't loaded
    if (getAllInstrumentsForCounterPartiesData === null) {
      return;
    }
    console.log(
      getAllInstrumentsForCounterPartiesData,
      "getAllInstrumentsForCounterPartiesData..."
    );
    try {
      const { nonFEDiscountingApplicableInstruments } =
        getAllInstrumentsForCounterPartiesData;
      console.log(
        nonFEDiscountingApplicableInstruments,
        "getAllInstrumentsForCounterPartiesData"
      );
      // Process instruments to create dropdown options
      const validInstruments = nonFEDiscountingApplicableInstruments
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
  useEffect(() => {
    if (natureOfBusinessList !== null) {
      try {
        const formattedOptions = natureOfBusinessList.natureOfTransactions.find(
          (business, index) => business.isForNonFE === true
        );
        setSelectedNature(formattedOptions);
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

  useEffect(() => {
    if (calculateNonFeSwapAndDiscountingRate !== null) {
      try {
        const { kibor, nonFERate, swap, readyRate } =
          calculateNonFeSwapAndDiscountingRate;
        setCalulatedData({
          kiborValue: kibor,
          nonFeRate: nonFERate,
          swapValue: swap,
          Ready: readyRate,
        });
        dispatch(setCalculateNonFeSwapAndDiscountingRate(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [calculateNonFeSwapAndDiscountingRate]);

  // const handleConfirm = () => {
  //   if (
  //     corporateValue.value !== 0 &&
  //     selectedCurrency.value !== 0 &&
  //     amount !== "" &&
  //     tenorValue !== "" &&
  //     accNo !== ""
  //   ) {
  //     let amountValue = amount.replace(/,/g, "");
  //     let Data = {
  //       CorporateID: isBranch
  //         ? corporateValue.value
  //         : counterPartyDetails?.corporateID,
  //       InstrumentID: selectedCurrency.value,
  //       Quantity: Number(amountValue),
  //       AccountNumber: accNo,
  //       NatureOfTransactionID: selectedNature?.id,
  //       TenorDays: Number(tenorValue),
  //       Kibor: calculatedData.kiborValue,
  //       Swap: calculatedData.swapValue,
  //     };
  //     dispatch(
  //       SaveNonFEDiscountingTransactionAPI({
  //         navigate,
  //         Data,
  //         setNonfeDiscountingModalCall,
  //       })
  //     );
  //   }
  // };

  const handleConfirm = () => {
    if (!validateForm()) {
      return;
    }

    let amountValue = amount.replace(/,/g, "");
    const Data = {
      CorporateID: isBranch
        ? corporateValue.value
        : counterPartyDetails?.corporateID,
      InstrumentID: selectedCurrency.value,
      Quantity: Number(amountValue),
      AccountNumber: accNo ? accNo : "",
      NatureOfTransactionID: selectedNature?.id,
      TenorDays: Number(tenorValue),
      Kibor: calculatedData.kiborValue,
      Swap: calculatedData.swapValue,
    };

    dispatch(
      SaveNonFEDiscountingTransactionAPI({
        navigate,
        Data,
        setNonfeDiscountingModalCall,
        setErrorMessage,
      })
    );
  };

  const handleCurrencyChange = (selectedOption) => {
    console.log(selectedOption, "selectedOptionselectedOption");
    setSelectedCurrency(selectedOption);
    if (selectedOption.value !== 0 && Number(tenorValue) !== 0) {
      let Data = {
        TenorDays: Number(tenorValue),
        InstrumentName: selectedOption.label,
        InstrumentID: Number(selectedOption.value),
      };
      dispatch(calculateNonFeSwapAndDiscountingRateApi({ Data, navigate }));
    }
  };

  return (
    <div>
      {" "}
      <Modal
        show={nonfeDiscountingModalCall}
        setShow={nonfeDiscountingModalCall}
        onHide={() => {
          setNonfeDiscountingModalCall(false);
        }}
        centered={true}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {isBranch ? (
                  <>
                    <span className="NonFeDiscountingHeader_BranchName">
                      {counterPartyDetails?.branchName}
                    </span>
                    <p className="NonFeDiscountingHeader_BranchCode">
                      Branch Code: {counterPartyDetails?.branchCode}
                    </p>
                  </>
                ) : isCorporate ? (
                  <span className="NonFeDiscountingHeader_BranchName">
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
                {isBranch && (
                  <Row className="mb-2">
                    <Col lg={12} md={12} sm={12}>
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Client name*</span>
                        <SelectDropdown
                          classNamePrefix="RfqSpot"
                          options={getAllCorporates}
                          placeholder="Please Select Corporate"
                          isSearchable={true}
                          value={
                            corporateValue?.value !== 0 ? corporateValue : null
                          }
                          onChange={handleChangeCorporate}
                        />
                      </div>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Currency*</span>
                      <SelectDropdown
                        classNamePrefix="RfqSpot"
                        options={currencyOptions}
                        placeholder=""
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
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
                        value={selectedNature?.name}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">A/c No</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={accNo}
                        onChange={(e) => handleChangeState("accNo", e)}
                        maxLength={25}
                      />
                      {/* {errors.accNo && (
                        <span className="text-danger small">
                          Account number is required
                        </span>
                      )} */}
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={12} md={12} sm={12}>
                    <div className="d-flex align-items-end ">
                      <div className="w-100">
                        <p className="SubHeadings m-0">Tenor*</p>
                        <InputFIeld
                          onChange={handleChangeTenor}
                          value={tenorValue}
                          onBlur={handleUpdateRate}
                          applyClass="CalculatorTextfield"
                        />
                      </div>
                      <span className="dateSpanNonFeDiscoutingmodal">
                        {formatDate(tenoreDate)}
                      </span>
                    </div>
                    {errors.tenorValue && (
                      <span className="text-danger small">
                        Please enter valid tenor days (1-1000)
                      </span>
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount</span>
                      <NumericFormat
                        customInput={InputFIeld}
                        decimalScale={0}
                        allowNegative={false}
                        value={amount}
                        applyClass={"CalculatorTextfield"}
                        name={"amount"}
                        thousandSeparator=","
                        maxLength={10}
                        onChange={(e) => handleChangeState("amount", e)}
                      />
                      {errors.Quantity && (
                        <span className="text-danger small">
                          Please enter a valid amount
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <Col lg={12} md={12} sm={12}>
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Ready</span>
                        <InputFIeld
                          applyClass={"CalculatorTextfield"}
                          disabled={true}
                          value={calculatedData.Ready}
                        />
                      </div>
                    </Col>
                    <Row className="mt-2 ">
                      <Col lg={10} md={10} sm={10} className="pe-0">
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">KIBOR</span>
                          <InputFIeld
                            applyClass={"CalculatorTextfield"}
                            value={Number(calculatedData.kiborValue).toFixed(4)}
                            disabled={true}
                          />
                        </div>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        className="d-flex align-items-end justify-content-start ps-0"
                      >
                        <span className="SofrPercentSignBoxNonFE">%</span>
                      </Col>
                    </Row>
                    <Row className="mt-2 position-relative">
                      <Col lg={12} md={12} sm={12}>
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">Swap</span>
                          <InputFIeld
                            applyClass={"CalculatorTextfield"}
                            value={Number(calculatedData.swapValue).toFixed(2)}
                            disabled={true}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={5} md={5} sm={5} className="mt-4">
                    <span className="BlueBackGroundboxNon_FEDiscountingModal">
                      {calculatedData.nonFeRate !== ""
                        ? Number(calculatedData.nonFeRate).toFixed(2)
                        : 0}
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
                  onClick={handleConfirm}
                  disabled={tenorValue !== "" && isWeekend(tenoreDate)}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default NonFEDiscountingModal;
