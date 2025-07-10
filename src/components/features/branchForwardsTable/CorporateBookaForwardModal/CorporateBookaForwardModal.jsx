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
import {
  SaveForwardTransactionAPI,
  calculateTenorSwapAndForwardRateApi,
} from "@/container/pages/mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
import { clearCalculateTenorSwapAndForwardRateData } from "@/store/BlotterSlicer/BlotterSlicer";
const CorporateBookaForwardModal = ({
  bookaForwardModalCall,
  setBookaForwardModalCall,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const calculatedForwardsSwapandRate = useSelector(
    (state) => state.BlotterSlicer.calculateTenorSwapAndForwardRateData
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
  const [instrumentValue, setInstrumentValue] = useState({
    value: 0,
    label: "",
    SecondaryInstrumentID: 0,
  });
  const [tenorDate, setTenorDate] = useState(formatDate(new Date()));
  const [optionsDate, setOptionsDate] = useState(formatDate(new Date()));
  const [getAllCorporates, setGetAllCorporates] = useState([]);

  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [forwardRFQState, setForwardRFQState] = useState({
    AccNo: "",
    Amount: "",
    TenorDays: "",
    Options: "",
    Ready: 290.11,
    Swap: "",
    CalculateRate: 0,
  });

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 21,
    label: "USDPKR",
  });

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
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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

  useEffect(() => {
    if (calculatedForwardsSwapandRate !== null) {
      try {
        const { forwardRate, swap } = calculatedForwardsSwapandRate;
        setForwardRFQState({
          ...forwardRFQState,
          Swap: swap,
          CalculateRate: forwardRate,
        });
        dispatch(clearCalculateTenorSwapAndForwardRateData());
      } catch (error) {}
    }
  }, [calculatedForwardsSwapandRate]);
  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };
  // handle Change amount
  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setForwardRFQState({
          ...forwardRFQState,
          [name]: value,
        });
      }
    } else if (name === "Options") {
      // Allow only digits and up to 4 characters
      if (/^\d{0,4}$/.test(value)) {
        const numericValue = parseInt(value, 10);

        // Allow empty input or numbers from 1 to 1000
        if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
          setForwardRFQState({
            ...forwardRFQState,
            Options: value,
          });

          if (value !== "") {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
            setOptionsDate(formatDate(newDate));
          } else {
            setOptionsDate(formatDate(new Date())); // Optional: clear tag text if input is empty
          }
        }
      }
    } else if (name === "TenorDays") {
      if (/^\d{0,4}$/.test(value)) {
        const numericValue = parseInt(value, 10);

        // Allow empty input or numbers from 1 to 1000
        if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
          setForwardRFQState({
            ...forwardRFQState,
            TenorDays: value,
          });

          if (value !== "") {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
            setTenorDate(formatDate(newDate));
          } else {
            setTenorDate(formatDate(new Date())); // Optional: clear tag text if input is empty
          }
        }
      }
    } else if (name === "AccNo") {
      // Accept only alphanumeric characters
      if (/^[a-zA-Z0-9]*$/.test(value)) {
        setForwardRFQState({
          ...forwardRFQState,
          AccNo: value,
        });
      }
    }
  };

  const handleClickCalculatureForwards = () => {
    let Data = {
      IsBuySide: typeOptionSelected.value === 1 ? true : false,
      TenorDays: forwardRFQState.TenorDays,
      InstrumentName: selectedCurrency.label,
      InstrumentID: selectedCurrency.value,
    };

    dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
  };

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

  const handleConfirm = () => {
    if (
      corporateValue.value !== 0 &&
      selectedCurrency.value !== "" &&
      typeOptionSelected.value !== 0 &&
      forwardRFQState.Amount !== "" &&
      forwardRFQState.AccNo !== "" &&
      natureOfBusinessSelcted.value !== 0 &&
      forwardRFQState.TenorDays !== "" &&
      forwardRFQState.Options !== "" &&
      forwardRFQState.Swap !== ""
    ) {
      let Data = {
        CorporateID: Number(corporateValue.value),
        InstrumentID: Number(selectedCurrency.value),
        SecondaryInstrumentID: 0,
        IsBuySide: typeOptionSelected.value === 1 ? true : false,
        Quantity: Number(forwardRFQState.Amount),
        AccountNumber: forwardRFQState.AccNo,
        NatureOfTransactionID: Number(natureOfBusinessSelcted.value),
        TenorDays: Number(forwardRFQState.TenorDays),
        OptionDays: Number(forwardRFQState.Options),
        Swap: Number(forwardRFQState.Swap),
      };
      dispatch(SaveForwardTransactionAPI({ navigate, Data, setBookaForwardModalCall }));
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
            <Row className='position-relative'>
              <Col lg={9} md={9} sm={9}>
                <Row>
                  <Col lg={12} md={12} sm={12} className='mb-2'>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Client Name</span>
                      <Select
                        options={getAllCorporates}
                        placeholder=''
                        value={corporateValue}
                        onChange={handleChangeCorporate}
                        classNamePrefix='bookaForwardCorporate'
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Currency</span>
                      <Select
                        options={options}
                        placeholder=''
                        value={selectedCurrency}
                        classNamePrefix='bookaForwardCorporate'
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Type</span>
                      <Select
                        options={typeOptions}
                        placeholder=''
                        value={
                          typeOptionSelected.value === 0
                            ? null
                            : typeOptionSelected
                        }
                        onChange={handleChangeType}
                        classNamePrefix='bookaForwardCorporate'
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Nature</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={natureOfBusinessSelcted?.label || ""}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>A/c No*</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.AccNo}
                        name={"AccNo"}
                        onChange={handleChangeValues}
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
                        value={forwardRFQState.Amount}
                        name={"Amount"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={7} md={7} sm={7}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Tenor</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.TenorDays}
                        name={"TenorDays"}
                        onChange={handleChangeValues}
                        onBlur={handleUpdateRate}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} className='d-flex align-items-end'>
                    <span className='dateSpan'>{tenorDate}</span>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={7} md={7} sm={7}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Options</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Options}
                        name={"Options"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={5} className='d-flex align-items-end'>
                    <span className='dateSpatwo'>{optionsDate}</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Ready</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Ready}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Swap</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Swap}
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
                lg={12}
                md={12}
                sm={12}
                className='d-flex justify-content-center'>
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
