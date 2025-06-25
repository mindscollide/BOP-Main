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
import { SaveSpotTransactionAPI } from "../../mainTreasury/tabsContent/liveRates/blotter/BlotterActions";

const RFQModal = ({ openRfqModal, setOpenRfqModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  console.log(natureOfBusinessList, "natureOfBusinessList");
  //Const Nature of Busniess Global State Data
  const viewNatureOfBussniessGlobalStateData = useSelector(
    (state) => state.RFQReducer.viewAllNatureBussniessData
  );

  //Global State for Currency Data
  const GlobalStateInstrumentFX = useSelector(
    (state) => state.WatchListReducer.WatchListData
  );

  //Local states
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedNature, setSelectedNature] = useState({
    value: 0,
    label: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 0,
    label: "",
  });
  const [amountData, setAmountData] = useState("");
  const [acNumberData, setAcNumberData] = useState("");
  const [lcNumberData, setLcNumberData] = useState("");
  const [typeOptions, setTypeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  const onCloseRfq = () => {
    setOpenRfqModal(false);
  };

  //Extracting out the Nature of Busniess Data
  useEffect(() => {
    try {
      if (
        viewNatureOfBussniessGlobalStateData &&
        viewNatureOfBussniessGlobalStateData.natureofBusinesses
      ) {
        const formattedOptions =
          viewNatureOfBussniessGlobalStateData.natureofBusinesses.map(
            (business) => ({
              label: business.name,
              value: business.pK_NatureOfBusiness,
            })
          );
        setNatureOfBusinessOptions(formattedOptions);
      }
    } catch (error) {}
  }, [viewNatureOfBussniessGlobalStateData]);

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
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);

  console.log(currencyOptions, "currencyOptionscurrencyOptions");

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
      }
    } else {
      setAcNumberData(value);
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
    setTypeOptionSelected(selectType);
  };

  // Handle Confirm Button
  const handleConfirmButton = () => {
    if (
      typeOptionSelected.value !== 0 &&
      selectedNature.value !== 0 &&
      selectedCurrency.value === 0 &&
      lcNumberData !== "" &&
      amountData !== ""
    ) {
      let corporate = JSON.parse(localStorage.getItem("corporate"));
      //Caliing Save RFQ Trasaction API
      let Data = {
        CorporateID: corporate.corporateID,
        InstrumentID: 21,
        // InstrumentID: selectedCurrency.value,
        SecondaryInstrumentID: 0,
        IsBuySide: typeOptionSelected.value === 1 ? true : false,
        Quantity: Number(amountData),
        AccountNumber: acNumberData,
        NatureOfTransactionID: selectedNature.value,
        LCNumber: lcNumberData,
      };

      dispatch(SaveSpotTransactionAPI({ navigate, Data }));
    }
  };

  return (
    <>
      <Modal
        show={openRfqModal}
        setShow={setOpenRfqModal}
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
            <div className='modal-body' rfq-type='Forex'>
              <Row className='m-0 '>
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
            </div>
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
