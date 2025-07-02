import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/common/globalButton/button";
import { Row, Col } from "react-bootstrap";
import Modal from "../../../../components/common/globalModal/Modal";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import "./RFQModal.css";
import InputFIeld from "../../../../components/common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveTransactionRFQAPI } from "./RFQActions";
import { useSelector } from "react-redux";
import { GetFXInstrumentsAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { set } from "zod";
import {
  SaveSpotTransactionAPI,
  SaveSpotTransactionRFQ,
} from "../../mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
import {
  setIBuySellData,
  setRfqModalOpen,
} from "@/store/modalSlice/modalSlicer";

const RFQModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  console.log(
    GetAllActiveCorproates,
    "GetAllActiveCorproatesGetAllActiveCorproates"
  );
  // const isCorporate =
  //Const Nature of Busniess Global State Data
  const viewNatureOfBussniessGlobalStateData = useSelector(
    (state) => state.RFQReducer.viewAllNatureBussniessData
  );

  //Global State for Currency Data
  const GlobalStateInstrumentFX = useSelector(
    (state) => state.WatchListReducer.WatchListData
  );
  const isRfqModalOpen = useSelector(
    (state) => state.modalReducer.rfqModalOpen
  );

  const iBuySellData = useSelector((state) => state.modalReducer.IBuySellData);
  console.log(iBuySellData, "iBuySellDataiBuySellData");
  //Local states
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
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
  const [amountData, setAmountData] = useState("");
  const [acNumberData, setAcNumberData] = useState("");
  const [lcNumberData, setLcNumberData] = useState("");
  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  const onCloseRfq = () => {
    dispatch(setRfqModalOpen(false));
  };

  useEffect(() => {
    return () => {
      dispatch(setIBuySellData(null));
    };
  }, []);

  useEffect(() => {
    if (natureOfBusinessList !== null) {
      console.log(
        natureOfBusinessList,
        "natureOfBusinessListnatureOfBusinessList"
      );
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
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);
  useEffect(() => {
    if (iBuySellData !== null) {
      try {
        setTypeOptionSelected({
          value: iBuySellData.type === "buy" ? 1 : 2,
          label: iBuySellData.type === "buy" ? "Buy" : "Sell",
        });
        setSelectedCurrency({
          value: 21,
          label: iBuySellData.currencyLabel,
        });
        console.log(iBuySellData, "iBuySellDataiBuySellDataiBuySellData");
      } catch (error) {
        console.log(error, "Error in iBuySellData useEffect");
      }
    }
  }, [iBuySellData]);

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

  //Onchange for Selecting the nature of business

  const handleNatureChange = (selectedOption) => {
    setSelectedNature(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  //Onchange for Selecting the Currency

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    console.log("selectedOption", selectedOption);
  };

  // handle Change amount
  const handleChangeAccount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setAmountData(value);
      }
    } else {
      setAmountData(value);
    }
  };

  // handle Change A/C number
  const handleChangeAcNumber = (event) => {
    const { name, value } = event.target;
    if (name === "AcNumber") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setAcNumberData(value);
      } else {
        setAcNumberData("");
      }
    }
  };

  // handle Change L/C number
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

  const handleChangeType = (selectType) => {
    console.log("selectType", selectType);
    setTypeOptionSelected(selectType);
    console.log(natureOfBusinessOptions[0], "selectedNatureselectedNature");
    // setSelectedNature({
    //   value: natureOfBusinessOptions[0].value,
    //   label: natureOfBusinessOptions[0].label,
    // });
  };
  console.log(selectedNature, "selectedNatureselectedNature");

  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
    console.log("selectedOption", selectedOption);
  };
  console.log(
    typeOptionSelected.value,
    selectedNature.value,
    selectedCurrency.value,
    lcNumberData,
    amountData,
    corporateValue.value,

    "handleConfirmButtonhandleConfirmButton"
  );
  // Handle Confirm Button
  const handleConfirmButton = () => {
    console.log(
      typeOptionSelected.value,
      selectedNature.value,
      selectedCurrency.value,
      lcNumberData,
      amountData,
      corporateValue.value,
      "handleConfirmButtonhandleConfirmButton"
    );
    try {
      console.log(
        typeOptionSelected.value !== 0 &&
          selectedNature.value !== 0 &&
          selectedCurrency.value === 0 &&
          lcNumberData !== "" &&
          amountData !== "",
        "handleConfirmButtonhandleConfirmButton"
      );
      if (
        typeOptionSelected.value !== 0 &&
        selectedNature.value !== 0 &&
        selectedCurrency.value !== 0 &&
        lcNumberData !== "" &&
        amountData !== ""
      ) {
        console.log(selectedNature, "selectedNatureselectedNature");

        let corporate = JSON.parse(localStorage.getItem("corporate"));
        console.log(corporate, "selectedNatureselectedNature");

        //Caliing Save RFQ Trasaction API
        let Data = {
          CorporateID: isBranch ? corporateValue.value : corporate.corporateID,
          InstrumentID: 21,
          // InstrumentID: selectedCurrency.value,
          SecondaryInstrumentID: 0,
          IsBuySide: typeOptionSelected.value === 1 ? true : false,
          Quantity: Number(amountData),
          AccountNumber: acNumberData,
          NatureOfTransactionID: selectedNature.value,
          LCNumber: lcNumberData,
        };
        console.log(Data, "selectedNatureselectedNature");
        if (iBuySellData !== null) {
          dispatch(SaveSpotTransactionAPI({ navigate, Data }));
        } else {
          dispatch(SaveSpotTransactionRFQ({ navigate, Data }));
        }
        // dispatch(SaveSpotTransactionAPI({ navigate, Data }));
      }
    } catch (error) {
      console.log(error, "Error in handleConfirmButton");
    }
  };

  return (
    <>
      <Modal
        show={isRfqModalOpen}
        // setShow={setOpenRfqModal}
        onHide={onCloseRfq}
        closeButton
        size='lg'
        // footerClassName="RFQ-footer-className"
        headerClassName='RFQ-header-className'
        className=''
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='heading-RfqModal'>Gul Ahmed</span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row className='m-0 '>
              {isBranch && (
                <>
                  {" "}
                  <Col lg={2} md={2} sm={2}>
                    <label className='LabelRFQTransactionModal'>
                      Company Name*
                    </label>
                  </Col>
                  <Col lg={4} md={4} sm={4} className='mb-3'>
                    <SelectDropdown
                      classNamePrefix='bookaForwardCorporate'
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

              <Col lg={2} md={2} sm={2}>
                <label className='LabelRFQTransactionModal'>Currency*</label>
              </Col>
              <Col lg={4} md={4} sm={4} className='mb-2'>
                <SelectDropdown
                  classNamePrefix='bookaForwardCorporate'
                  placeholder=''
                  options={currencyOptions}
                  onChange={handleCurrencyChange}
                  value={selectedCurrency}
                  isDisabled={iBuySellData !== null ? true : false}
                />
              </Col>

              <Col lg={2} md={2} sm={2}>
                <label className='LabelRFQTransactionModal'>Type*</label>
              </Col>
              <Col lg={4} md={4} sm={4} className='mb-2'>
                <SelectDropdown
                  placeholder='Select Type'
                  value={
                    typeOptionSelected.value === 0 ? null : typeOptionSelected
                  }
                  onChange={handleChangeType}
                  options={typeOptions}
                  classNamePrefix='bookaForwardCorporate'
                  isDisabled={iBuySellData !== null ? true : false}
                />
              </Col>
            </Row>

            <Row className='m-0 mt-2'>
              <Col lg={2} md={2} sm={2}>
                <label className='LabelRFQTransactionModal'>Amount*</label>
              </Col>
              <Col lg={4} md={4} sm={4} className='mb-2'>
                <InputFIeld
                  onChange={handleChangeAccount}
                  value={amountData}
                  name='Amount'
                  applyClass='CalculatorTextfield'
                />
              </Col>
              <Col lg={2} md={2} sm={2}>
                <label className='LabelRFQTransactionModal'>A/c No</label>
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

            <Row className='m-0 mt-2'>
              <Col lg={2} md={2} sm={2}>
                <label className='LabelRFQTransactionModal'>Nature*</label>
              </Col>

              <Col lg={4} md={4} sm={4} className='mb-2'>
                <SelectDropdown
                  placeholder=''
                  classNamePrefix='bookaForwardCorporate'
                  options={natureOfBusinessOptions.filter((option) => {
                    if (typeOptionSelected?.value === 1 && option.isForSpot) {
                      return option.isForBuy;
                    }
                    if (typeOptionSelected?.value === 2 && option.isForSpot) {
                      return option.isForSell;
                    }
                    return false; // if value is neither 1 nor 2, show no options
                  })}
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
        }
        modalFooter={
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
        }
      />
    </>
  );
};

export default RFQModal;
