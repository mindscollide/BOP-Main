import React, { useEffect, useState } from "react";
import "./CorporateBookaForwardModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import {
//   SaveForwardTransactionAPI,
//   calculateTenorSwapAndForwardRateApi,
// } from "@/container/pages/mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
import { clearCalculateTenorSwapAndForwardRateData } from "@/store/BlotterSlicer/BlotterSlicer";
import {
  SaveForwardTransactionAPI,
  calculateTenorSwapAndForwardRateApi,
} from "../../blotter/BlotterActions";

import { NumericFormat } from "react-number-format";
const CorporateBookaForwardModal = ({
  bookaForwardModalCall,
  setBookaForwardModalCall,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });

  const counterPartyDetails =
    isBranch && localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : isCorporate && localStorage.getItem("corporate") !== null
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const calculatedForwardsSwapandRate = useSelector(
    (state) => state.BlotterSlicer.calculateTenorSwapAndForwardRateData
  );
  const currentRatesData = useSelector(
    (state) => state.WatchListReducer.watchlistTableDataCopy
  );

  console.log(currentRatesData, "watchlistTableDatawatchlistTableData");

  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  console.log(
    calculatedForwardsSwapandRate,
    "calculatedForwardsSwapandRatecalculatedForwardsSwapandRate"
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );
  const [natureOfBusinessSelcted, setNatureOfBusinessSelected] = useState({
    value: 0,
    label: "",
  });
  // const [instrumentValue, setInstrumentValue] = useState({
  //   value: 0,
  //   label: "",
  //   SecondaryInstrumentID: 0,
  // });
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
  const [forwardRFQState, setForwardRFQState] = useState({
    AccNo: "",
    Amount: "",
    TenorDays: "",
    Options: "",
    Ready: "",
    Swap: "",
    CalculateRate: 0,
  });

  console.log(forwardRFQState, "forwardRFQStateforwardRFQStateforwardRFQState");
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  const handleChangeType = (selectType) => {
    console.log("selectType", selectType);
    setTypeOptionSelected(selectType);

    try {
      if (
        typeOptionSelected.value !== 0 &&
        forwardRFQState.TenorDays !== "" &&
        // forwardRFQState.TenorDays !== "0" &&
        selectedCurrency.value !== 0
      ) {
        let Data = {
          IsBuySide: selectType.value === 1 ? true : false,
          TenorDays: Number(forwardRFQState.TenorDays),
          InstrumentName: selectedCurrency.label,
          InstrumentID: selectedCurrency.value,
        };
        dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
        console.log(findCurrentRates, "findCurrentRatesfindCurrentRates");
      }
    } catch (error) {
      console.log("Error in Calculating rated: ", error);
    }
  };
  const options = [];

  useEffect(() => {
    if (natureOfBusinessList !== null) {
      console.log(
        natureOfBusinessList,
        "natureOfBusinessListnatureOfBusinessList"
      );
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
        setTypeOptionSelected({
          value: typeOptions[0].value,
          label: typeOptions[0].label,
        });
        // setNatureOfBusinessSelected(formattedOptions);
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

  console.log(
    calculatedForwardsSwapandRate,
    "calculatedForwardsSwapandRatecalculatedForwardsSwapandRate"
  );
  useEffect(() => {
    if (calculatedForwardsSwapandRate !== null) {
      try {
        const { forwardRate, swap, readyRate } = calculatedForwardsSwapandRate;
        setForwardRFQState({
          ...forwardRFQState,
          Swap: swap,
          CalculateRate: forwardRate,
          Ready: readyRate,
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
            if (data.isBuy === true || data.isSell === true) {
              return {
                ...data, // Spread all existing instrument properties
                label: `${data.instrumentName}`, // Display name for dropdown
                value: data.instrumentID, // Unique identifier for selection
              };
            }
            return null; // Explicitly return null for non-matching instruments
          })
          .filter(Boolean); // Remove any null values from the array
        console.log(
          spotApplicableInstrumentList,
          "spotApplicableInstrumentList"
        );
        // Set the first valid instrument as default selection if available
        if (spotApplicableInstrumentList.length > 0) {
          setSelectedCurrency(spotApplicableInstrumentList[0]);
          // let findCurrentRates = currentRatesData.find(
          //   (rates, index) =>
          //     rates.instrumentID === spotApplicableInstrumentList[0].value
          // );
          // if (findCurrentRates !== undefined) {
          //   let getRates =
          //     typeOptionSelected.value === 1
          //       ? findCurrentRates.bid
          //       : findCurrentRates.offer;
          //   setForwardRFQState({
          //     ...forwardRFQState,
          //     Ready: getRates,
          //   });
          // }
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

  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  const handleChangeValues = (event) => {
    const { name, value } = event.target;

    if (name === "Amount") {
      if (value !== "") {
        setForwardRFQState({
          ...forwardRFQState,
          [name]: value,
        });
      }
    } else if (name === "Options") {
      setForwardRFQState({
        ...forwardRFQState,
        Options: value,
      });

      if (value !== "") {
        const newDate = new Date(tenorDate); // start from tenorDate
        newDate.setDate(newDate.getDate() + Number(value));
        setOptionsDate(newDate);
      } else {
        setOptionsDate(new Date(tenorDate)); // reset to tenorDate
      }
    } else if (name === "TenorDays") {
      setForwardRFQState({
        ...forwardRFQState,
        TenorDays: value,
      });

      if (value !== "") {
        const newDate = new Date(); // always base from today
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

  // const handleClickCalculatureForwards = () => {
  //   let Data = {
  //     IsBuySide: typeOptionSelected.value === 1 ? true : false,
  //     TenorDays: forwardRFQState.TenorDays,
  //     InstrumentName: selectedCurrency.label,
  //     InstrumentID: selectedCurrency.value,
  //   };

  //   dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
  // };

  const handleUpdateRate = () => {
    if (
      typeOptionSelected.value !== 0 &&
      forwardRFQState.TenorDays !== "" &&
      // forwardRFQState.TenorDays !== "0" &&
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

  const handleChangeCurrency = (selectCurrenty) => {
    console.log(selectCurrenty, "selectCurrenty");
    setSelectedCurrency(selectCurrenty);
    // let findCurrentRates = currentRatesData.find(
    //   (rates, index) => rates.instrumentID === selectCurrenty.value
    // );
    // if (findCurrentRates !== undefined) {
    //   let getRates =
    //     typeOptionSelected.value === 1
    //       ? findCurrentRates.bid
    //       : findCurrentRates.offer;
    //   setForwardRFQState({
    //     ...forwardRFQState,
    //     Ready: getRates,
    //   });
    // }
    try {
      if (
        typeOptionSelected.value !== 0 &&
        forwardRFQState.TenorDays !== "" &&
        // forwardRFQState.TenorDays !== "0" &&
        selectCurrenty.value !== 0
      ) {
        let Data = {
          IsBuySide: typeOptionSelected.value === 1 ? true : false,
          TenorDays: Number(forwardRFQState.TenorDays),
          InstrumentName: selectCurrenty.label,
          InstrumentID: selectCurrenty.value,
        };
        dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
        console.log(findCurrentRates, "findCurrentRatesfindCurrentRates");
      }
    } catch (error) {
      console.log("Error in Calculating rated: ", error);
    }
  };

  const handleConfirm = () => {
    if (forwardRFQState.AccNo === "") {
      setErrorState({
        accoutErrorStatus: true,
      });
      return;
    } else if (
      selectedCurrency.value !== "" &&
      typeOptionSelected.value !== 0 &&
      forwardRFQState.Amount !== "" &&
      forwardRFQState.AccNo !== "" &&
      natureOfBusinessSelcted.value !== 0 &&
      forwardRFQState.TenorDays !== "" &&
      forwardRFQState.Options !== "" &&
      forwardRFQState.Swap !== ""
    ) {
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
        AccountNumber: forwardRFQState.AccNo,
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
    }
  };

  return (
    <div>
      {" "}
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
        className=''
        modalHeader={
          isBranch ? (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className='Header_BranchName'>
                    {counterPartyDetails?.branchName}
                  </span>
                  <p className='Header_BranchCode'>
                    {counterPartyDetails?.branchCode}
                  </p>
                </Col>
              </Row>
            </>
          ) : isCorporate ? (
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='Header_BranchName'>
                  {counterPartyDetails?.corporateName}
                </span>
              </Col>
            </Row>
          ) : null
        }
        modalBody={
          <>
            <Row className='position-relative'>
              <Col lg={9} md={9} sm={9}>
                <Row>
                  {import.meta.env.VITE_APP_INCLUDE_BRANCH === "true" && (
                    <Col lg={12} md={12} sm={12} className='mb-2'>
                      <div className='d-flex flex-column flex-wrap'>
                        <span className='SubHeadings'>Client Name</span>
                        <Select
                          options={getAllCorporates}
                          placeholder=''
                          value={corporateValue}
                          onChange={handleChangeCorporate}
                          classNamePrefix='RfqSpot'
                        />
                      </div>
                    </Col>
                  )}

                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Currency</span>
                      <Select
                        options={currencyOptions}
                        placeholder=''
                        value={selectedCurrency}
                        isSearchable={false}
                        onChange={handleChangeCurrency}
                        classNamePrefix='RfqSpot'
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Type</span>
                      <Select
                        options={typeOptions}
                        placeholder=''
                        isSearchable={false}
                        value={
                          typeOptionSelected.value === 0
                            ? null
                            : typeOptionSelected
                        }
                        onChange={handleChangeType}
                        classNamePrefix='RfqSpot'
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Nature</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={natureOfBusinessSelcted?.label || ""}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>A/c No*</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.AccNo}
                        name={"AccNo"}
                        onChange={handleChangeValues}
                      />
                    </div>
                    {errorState.accoutErrorStatus === true && (
                      <div className='rfq-error_message'>
                        Account No. is Required
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={12} md={12} sm={12}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Amount</span>
                      <NumericFormat
                        value={forwardRFQState.Amount}
                        name={"Amount"}
                        onChange={handleChangeValues}
                        customInput={InputFIeld}
                        thousandSeparator=','
                        maxLength={10}
                        allowNegative={false}
                        applyClass={"CalculatorTextfield"}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={7} md={7} sm={7}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Tenor</span>
                      <NumericFormat
                        customInput={InputFIeld}
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.TenorDays}
                        name={"TenorDays"}
                        allowNegative={false}
                        minLength={1}
                        maxLength={1000}
                        onChange={handleChangeValues}
                        onBlur={handleUpdateRate}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} className='d-flex align-items-end'>
                    <span className='dateSpan'>{formatDate(tenorDate)}</span>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={7} md={7} sm={7}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Options</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={forwardRFQState.Options}
                        name={"Options"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} className='d-flex align-items-end'>
                    <span className='dateSpan'>{formatDate(optionsDate)}</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Ready</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={Number(forwardRFQState.Ready).toFixed(2)}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Swap</span>
                      <InputFIeld
                        applyClass={"CalculatorTextfield"}
                        value={Number(forwardRFQState.Swap).toFixed(4)}
                        disabled={true}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} md={3} sm={3} className='BlueboxStyles  '>
                <span className='BlueBackGroundbox d-flex justify-content-center align-items-centerF '>
                  {forwardRFQState.CalculateRate}
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
                className='d-flex justify-content-start align-items-center rfqLimit_error-style'>
                {errorMessage.status === true && errorMessage.message !== ""
                  ? errorMessage.message
                  : ""}
                {/* Limit should be lower than 1000 */}
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                className='d-flex align-items-center justify-content-end'>
                <CustomButton
                  value={"Confirm"}
                  onClick={handleConfirm}
                  applyClass={"ConfirmButtonBookaForward"}
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
