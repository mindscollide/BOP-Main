import React, { useEffect, useState } from "react";
import CustomButton from "../../../../components/common/globalButton/button";
import { Row, Col } from "react-bootstrap";
import Modal from "../../../../components/common/globalModal/Modal";
import SelectDropdown from "../../../../components/common/selectDropdown/SelectDropdown";
import "./RFQModal.css";
import InputFIeld from "../../../../components/common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SaveTransactionRFQAPI,
  ViewAllNatureOfBussinessAPI,
} from "./RFQActions";
import { useSelector } from "react-redux";
import { GetFXInstrumentsAPI } from "@/components/features/SpotBranch/WatchlistAction";

const RFQModal = ({ openRfqModal, setOpenRfqModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [amountData, setAmountData] = useState("");
  const [acNumberData, setAcNumberData] = useState("");
  const [lcNumberData, setLcNumberData] = useState("");

  const onCloseRfq = () => {
    setOpenRfqModal(false);
  };

  //Calling API View Nature of Bussniess
  useEffect(() => {
    try {
      let Data = { PageNumber: 1, Length: 3 };
      dispatch(ViewAllNatureOfBussinessAPI({ Data, navigate }));
      //For having Currency as discussed with MS (worldCrosses)
      dispatch(GetFXInstrumentsAPI({ navigate }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

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

  //Extracting out the Currecnies Data for Dropdown
  useEffect(() => {
    try {
      if (GlobalStateInstrumentFX && GlobalStateInstrumentFX.instruments) {
        console.log(
          GlobalStateInstrumentFX.instruments,
          "currencyOptionscurrencyOptions"
        );
        const formattedCurrencyOptions =
          GlobalStateInstrumentFX.instruments.map((Currency) => {
            console.log(Currency, "Current Currency Object");
            return {
              label: Currency.worldCrosses.instrumentName,
              value: Currency.worldCrosses.instrumentID,
            };
          });
        console.log(formattedCurrencyOptions, "currencyOptionscurrencyOptions");
        setCurrencyOptions(formattedCurrencyOptions);
      }
    } catch (error) {}
  }, [GlobalStateInstrumentFX]);

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

  // Handle Confirm Button
  const handleConfirmButton = () => {
    //Caliing Save RFQ Trasaction API
    let Data = {
      CustomerName: "John Doe",
      CounterPartyID: "BR123456",
      InstrumentID: "IN78910",
      TypeID: 1,
      Amount: 1500.75,
      AccountNumber: "1234567890123456",
      NatureID: 2,
      LCNumber: "LC2024XYZ",
    };

    dispatch(SaveTransactionRFQAPI({ Data }));
  };

  return (
    <>
      <Modal
        show={openRfqModal}
        setShow={setOpenRfqModal}
        onHide={onCloseRfq}
        closeButton
        size="lg"
        // footerClassName="RFQ-footer-className"
        headerClassName="RFQ-header-className"
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="heading-RfqModal">Gul Ahmed</span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div className="modal-body" rfq-type="Forex">
              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label className="label">Currency*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    placeholder="Search"
                    classNamePrefix={"RFQGeneralReactSelectClass"}
                    options={currencyOptions}
                    onChange={handleCurrencyChange}
                    value={selectedCurrency}
                  />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label className="label">Type*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    classNamePrefix={"RFQGeneralReactSelectClass"}
                    placeholder="Search"
                  />
                </Col>
              </Row>

              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label className="label">Amount*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld
                    onChange={handleChangeAccount}
                    value={amountData}
                    name="Amount"
                    applyClass="CalculatorTextfield"
                  />
                </Col>
                <Col lg={2} md={2} sm={2}>
                  <label className="label">A/c No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld
                    onChange={handleChangeAcNumber}
                    value={acNumberData}
                    name="AcNumber"
                    applyClass="CalculatorTextfield"
                  />
                </Col>
              </Row>

              <Row className="m-0">
                <Col lg={2} md={2} sm={2}>
                  <label className="label">Nature*</label>
                </Col>

                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    placeholder="Search"
                    classNamePrefix={"RFQGeneralReactSelectClass"}
                    options={natureOfBusinessOptions}
                    onChange={handleNatureChange}
                    value={selectedNature}
                  />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label className="label">LC No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld
                    onChange={handleChangeLcNumber}
                    value={lcNumberData}
                    name="LcNumber"
                    applyClass="CalculatorTextfield"
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
                className="d-flex justify-content-end"
              >
                <CustomButton
                  value="Confirm"
                  className="btn btn-primary ms-auto px-4"
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
