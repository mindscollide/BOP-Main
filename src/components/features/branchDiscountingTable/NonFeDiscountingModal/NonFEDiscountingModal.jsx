import React, { useEffect, useState } from "react";
import "./NonFEDiscoutingModal.css";
import Select from "react-select";
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
import { formatDate } from "@/common/utils";
import { useSelector } from "react-redux";
const shouldIncludeBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const NonFEDiscountingModal = ({
  nonfeDiscountingModalCall,
  setNonfeDiscountingModalCall,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const calculatedForwardsSwapandRate = useSelector(
    (state) => state.BlotterSlicer.calculateNonFeSwapAndDiscountingRate
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );
  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState(null);
  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 21,
    label: "USDPKR",
  });
  const [tenoreDate, setTenorDate] = useState(formatDate(new Date()));
  const [tenorValue, setTenorValue] = useState("");
  const [amount, setAmount] = useState("");
  const [accNo, setAcc] = useState("");
  const [calculatedData, setCalulatedData] = useState({
    kiborValue: "",
    swapValue: "",
    nonFeRate: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });

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
          setTenorDate(formatDate(newDate));
        } else {
          setTenorDate(formatDate(new Date())); // Optional: clear tag text if input is empty
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
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setAmount(value);
      }
    } else if (name === "accNo") {
      const regex = /^[a-zA-Z0-9]*$/;
      if (regex.test(value)) {
        setAcc(value);
      }
    }
  };

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
    if (calculatedForwardsSwapandRate !== null) {
      try {
        const { kibor, nonFERate, swap } = calculatedForwardsSwapandRate;
        setCalulatedData({
          kiborValue: kibor,
          nonFeRate: nonFERate,
          swapValue: swap,
        });
      } catch (error) {}
    }
  }, [calculatedForwardsSwapandRate]);

  const handleConfirm = () => {
    let Data = {
      CorporateID: corporateValue.value,
      InstrumentID: selectedCurrency.value,
      Quantity: Number(amount),
      AccountNumber: accNo,
      NatureOfTransactionID: selectedNature?.id,
      TenorDays: Number(tenorValue),
      Kibor: calculatedData.kiborValue,
      Swap: calculatedData.swapValue,
    };
    dispatch(SaveNonFEDiscountingTransactionAPI({ navigate, Data }));
  };
  let branchDetais =
    localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : null;
  return (
    <div>
      {" "}
      <Modal
        show={nonfeDiscountingModalCall}
        setShow={nonfeDiscountingModalCall}
        onHide={() => {
          setNonfeDiscountingModalCall(false);
        }}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        className=""
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="HeaderHeadingName">
                  {branchDetais !== null ? branchDetais.branchName : ""}
                </span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {shouldIncludeBranch && (
                  <Row className="mb-2">
                    <Col lg={12} md={12} sm={12}>
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Client name</span>
                        <SelectDropdown
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
                      <span className="SubHeadings">Currency</span>
                      <SelectDropdown
                        options={[]}
                        placeholder=""
                        value={selectedCurrency}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Nature</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={selectedNature?.name}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">A/c No*</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={accNo}
                        onChange={(e) => handleChangeState("accNo", e)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex align-items-end ">
                      <div>
                        <p className="SubHeadings m-0">Tenor</p>
                        <InputFIeld
                          onChange={handleChangeTenor}
                          value={tenorValue}
                          onBlur={handleUpdateRate}
                          applyClass={
                            "BookaForwardCorporateInputFieldsTenorNonFEmodal"
                          }
                        />
                      </div>
                      <span className="dateSpanNonFeDiscoutingmodal">
                        {tenoreDate}
                      </span>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className="d-flex flex-column flex-wrap">
                      <span className="SubHeadings">Amount</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={amount}
                        onChange={(e) => handleChangeState("amount", e)}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col lg={6} md={6} sm={6}>
                    <Col lg={12} md={12} sm={12}>
                      <div className="d-flex flex-column flex-wrap">
                        <span className="SubHeadings">Ready</span>
                        <InputFIeld
                          applyClass={"BookaForwardCorporateInputFields"}
                          disabled={true}
                        />
                      </div>
                    </Col>
                    <Row className="mt-2 ">
                      <Col lg={10} md={10} sm={10} className="pe-0">
                        <div className="d-flex flex-column flex-wrap">
                          <span className="SubHeadings">KIBOR</span>
                          <InputFIeld
                            applyClass={"BookaForwardCorporateInputFields"}
                            value={calculatedData.kiborValue}
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
                            applyClass={"BookaForwardCorporateInputFields"}
                            value={calculatedData.swapValue}
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
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <CustomButton
                  value={"Confirm"}
                  applyClass={"ConfirmButtonBookaForward"}
                  onClick={handleConfirm}
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
