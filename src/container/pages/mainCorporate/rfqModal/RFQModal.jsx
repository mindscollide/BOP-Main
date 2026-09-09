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

const isCorproate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
const RFQModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [rfqModal, setRfqModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: false,
  });

  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );
  const GetAllActiveCorproates = useSelector(
    (state) => state.authReducer.GetAllActiveCorproates
  );
  const isRfqModalOpen = useSelector(
    (state) => state.modalReducer.rfqModalOpen
  );
  const iBuySellData = useSelector((state) => state.modalReducer.IBuySellData);
  const SaveSpotTransactionLoading = useSelector(
    (state) => state.BlotterSlicer.SaveSpotTransactionAPILoading
  );
  const SaveSpotTransactionRFQLoading = useSelector(
    (state) => state.BlotterSlicer.SaveSpotTransactionRFQLoading
  );

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  const counterPartyDetails =
    isBranch && localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : isCorporate && localStorage.getItem("corporate") !== null
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  const [natureOfBusinessOptions, setNatureOfBusinessOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedNature, setSelectedNature] = useState({
    value: 0,
    label: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState(null);
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
  const [corporateValue, setCorporateValue] = useState({
    value: 0,
    label: "",
  });
  const [getAllCorporates, setGetAllCorporates] = useState([]);

  let branchDetails =
    localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : null;

  const onCloseRfq = () => {
    setRfqModal(false);
    setConfirmationModal(true);
  };

  const handleConfimationModalYes = () => {
    setRfqModal(false);
    setConfirmationModal(false);
    dispatch(setIBuySellData(null));
    dispatch(setRfqModalOpen(false));
  };

  useEffect(() => {
    return () => {
      setRfqModal(false);
      setConfirmationModal(false);
      dispatch(setIBuySellData(null));
      dispatch(setRfqModalOpen(false));
    };
  }, []);

  useEffect(() => {
    if (!natureOfBusinessList?.natureOfTransactions) return;

    try {
      const spotTransactions = natureOfBusinessList.natureOfTransactions.filter(
        (item) => item.isForSpot
      );

      if (spotTransactions.length === 0) return;

      if (iBuySellData) {
        try {
          const isBuy = iBuySellData.type === "buy";
          const typeValue = isBuy ? 1 : 2;

          const baseCurrency = isBranch
            ? iBuySellData.cardData.viewInstumentName
            : iBuySellData.currencyLabel.slice(0, 3);

          const quoteCurrency = isBranch
            ? iBuySellData.cardData.viewSecondaryInstumentName
            : iBuySellData.currencyLabel.slice(3, 6);

          const newTypesData = isBuy
            ? [
                { label: `Buy ${baseCurrency}`, value: 1 },
                { label: `Sell ${quoteCurrency}`, value: 2 },
              ]
            : [
                { label: `Sell ${baseCurrency}`, value: 2 },
                { label: `Buy ${quoteCurrency}`, value: 1 },
              ];

          setTypeOptions(newTypesData);

          const filteredOptions = spotTransactions
            .filter((item) =>
              typeValue === 1 ? item.isForBuy : item.isForSell
            )
            .map((item) => ({
              ...item,
              label: item.name,
              value: item.id,
            }));

          setNatureOfBusinessOptions(filteredOptions);
          setSelectedNature(filteredOptions.length > 0 ? filteredOptions[0] : null);

          setSelectedCurrency({
            value: iBuySellData.instrumentID,
            label: isBranch
              ? `${iBuySellData.cardData.viewInstumentName}${
                  iBuySellData.cardData.viewSecondaryInstumentName || ""
                }`
              : `${iBuySellData.instrumentName} ${
                  iBuySellData.secondaryInstrumentName || ""
                }`,
            secondaryInstrumentID: iBuySellData.secondaryInstrumentID,
            secondaryInstrumentName: iBuySellData.secondaryInstrumentName,
          });

          const selectedType = newTypesData.find(
            (opt) => opt.value === typeValue
          );
          setTypeOptionSelected(selectedType);
        } catch (error) {
          console.error("Error initializing with RFQ data:", error);
        }
      } else {
        const defaultTypeValue = typeOptions?.[0]?.value || 1;
        setTypeOptionSelected(typeOptions?.[0] || null);

        const filteredOptions = spotTransactions
          .filter((item) =>
            defaultTypeValue === 1 ? item.isForBuy : item.isForSell
          )
          .map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }));

        setNatureOfBusinessOptions(filteredOptions);
        setSelectedNature(filteredOptions.length > 0 ? filteredOptions[0] : null);
      }
    } catch (error) {
      console.error("Error initializing nature of business options:", error);
    }
  }, [natureOfBusinessList, iBuySellData]);

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

  useEffect(() => {
    // Skip if no instrument data loaded, or if iBuySellData already pre-filled currency
    if (!getAllInstrumentsForCounterPartiesData || iBuySellData !== null) {
      return;
    }

    try {
      const { spotApplicableInstruments } =
        getAllInstrumentsForCounterPartiesData;

      const validInstruments = spotApplicableInstruments
        .map((instrument) => {
          if (instrument.isBuy === true || instrument.isSell == true) {
            return {
              ...instrument,
              label: instrument.isWeakCurrency
                ? `${instrument.secondaryInstrumentName}${
                    instrument.instrumentName || ""
                  }`
                : `${instrument.instrumentName}${
                    instrument.secondaryInstrumentName || ""
                  }`,
              value: instrument.instrumentID,
              secondaryInstrumentID: instrument.secondaryInstrumentID,
              secondaryInstrumentName: instrument.secondaryInstrumentName,
            };
          }
          return null;
        })
        .filter(Boolean);

      if (validInstruments.length > 0) {
        const firstInstrument = validInstruments[0];
        setSelectedCurrency(firstInstrument);

        let defaultType = { value: 0, label: "" };
        if (firstInstrument.isBuy && firstInstrument.isSell) {
          defaultType = isCorporate
            ? { value: 2, label: "Sell" }
            : { value: 1, label: "Buy" };
        } else if (firstInstrument.isBuy) {
          defaultType = { value: 1, label: "Buy" };
        } else if (firstInstrument.isSell) {
          defaultType = { value: 2, label: "Sell" };
        }

        setTypeOptionSelected(defaultType);
        setCurrencyOptions(validInstruments);
      } else {
        setSelectedCurrency(null);
        setCurrencyOptions([]);
      }
    } catch (error) {
      console.error("Failed to initialize currency options:", {
        error,
        data: getAllInstrumentsForCounterPartiesData,
      });
    }
  }, [getAllInstrumentsForCounterPartiesData, iBuySellData]);

  const handleNatureChange = (selectedOption) => {
    setSelectedNature(selectedOption);
  };

  const handleCurrencyChange = (selectCurrency) => {
    setSelectedCurrency(selectCurrency);
    if (selectCurrency?.isBuy && selectCurrency?.isSell) {
      const defaultType = isCorporate
        ? { value: 2, label: "Sell" }
        : { value: 1, label: "Buy" };
      setTypeOptionSelected(defaultType);
    } else if (selectCurrency?.isBuy && !selectCurrency?.isSell) {
      setTypeOptionSelected({ value: 1, label: "Buy" });
    } else if (!selectCurrency?.isBuy && selectCurrency?.isSell) {
      setTypeOptionSelected({ value: 2, label: "Sell" });
    } else {
      setTypeOptionSelected({ value: 0, label: "" });
    }
  };

  const handleChangeAmount = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      setAmountData(value);
    }
  };

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

  const handleChangeLcNumber = (event) => {
    const { name, value } = event.target;
    if (name === "LcNumber") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setLcNumberData(value);
      }
    }
  };

  const handleChangeType = (selectType) => {
    if (!natureOfBusinessList?.natureOfTransactions) {
      console.error("Nature of business data not available");
      return;
    }

    const isBuy = selectType.value === 1;

    const filteredOptions = natureOfBusinessList.natureOfTransactions
      .filter((business) => {
        const isSpotTransaction = business.isForSpot === true;
        if (!isSpotTransaction) return false;
        if (isCorporate) {
          return isBuy ? business.isForSell : business.isForBuy;
        }
        return isBuy ? business.isForBuy : business.isForSell;
      })
      .map((business) => ({
        ...business,
        label: business.name,
        value: business.id,
      }));

    if (iBuySellData === null) {
      setNatureOfBusinessOptions(filteredOptions);
      setSelectedNature(filteredOptions.length ? filteredOptions[0] : null);
    }

    setTypeOptionSelected(selectType);
  };

  const handleChangeCorporate = (selectedOption) => {
    setCorporateValue(selectedOption);
  };

  const handleConfirmButton = () => {
    try {
      if (
        typeOptionSelected.value !== 0 &&
        selectedNature.value !== 0 &&
        selectedCurrency.value !== 0 &&
        amountData !== ""
      ) {
        if (Number(amountData.replace(/,/g, "")) < 1) {
          showMessage("Amount should be greater than 1 ");
          return;
        }

        const IsBuySide =
          iBuySellData === null
            ? typeOptionSelected.value === 1
            : iBuySellData?.type === "buy";

        let amountValue = amountData.replace(/,/g, "");
        let Data = {
          CorporateID: isBranch
            ? corporateValue.value
            : counterPartyDetails.corporateID,
          InstrumentID: selectedCurrency?.value,
          SecondaryInstrumentID: selectedCurrency?.secondaryInstrumentID,
          IsBuyType: IsBuySide,
          IsBuySide: typeOptionSelected.value === 1,
          Quantity: Number(amountValue),
          AccountNumber: acNumberData,
          NatureOfTransactionID: selectedNature.value,
          LCNumber: lcNumberData,
        };

        if (iBuySellData !== null) {
          dispatch(SaveSpotTransactionAPI({ navigate, Data, setErrorMessage }));
        } else {
          dispatch(SaveSpotTransactionRFQ({ navigate, Data, setErrorMessage }));
        }
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <>
      <Modal
        show={isRfqModalOpen}
        onHide={onCloseRfq}
        closeButton
        centered={true}
        size={rfqModal ? "lg" : null}
        footerClassName={"d-block border-0"}
        headerClassName="RFQ-header-className"
        modalHeader={
          rfqModal && (
            <>
              <Row>
                <Col lg={12} md={12} sm={12} className="">
                  {isBranch ? (
                    <>
                      <p className="heading-RfqModal">
                        {counterPartyDetails?.branchName}
                      </p>
                      <p className="heading-branchCode">
                        Branch Code: {counterPartyDetails?.branchCode}
                      </p>
                    </>
                  ) : (
                    isCorporate && (
                      <p className="heading-RfqModal">
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
              <Row className="m-0 ">
                {isBranch && (
                  <>
                    <Col lg={2} md={2} sm={2}>
                      <label className="LabelRFQTransactionModal">
                        Customer Name*
                      </label>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mb-3">
                      <SelectDropdown
                        classNamePrefix="RfqSpot"
                        placeholder=""
                        options={getAllCorporates}
                        onChange={handleChangeCorporate}
                        isSearchable={true}
                        value={corporateValue}
                      />
                    </Col>
                    <Col lg={2} md={2} sm={2}></Col>
                    <Col lg={4} md={4} sm={4} className="mb-2"></Col>
                  </>
                )}

                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">Currency*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    classNamePrefix="RfqSpot"
                    placeholder=""
                    options={currencyOptions.filter((option) => {
                      if (typeOptionSelected.value === 1) {
                        return option.isBuy === true;
                      } else if (typeOptionSelected.value === 2) {
                        return option.isSell === true;
                      }
                      return true;
                    })}
                    onChange={handleCurrencyChange}
                    value={selectedCurrency}
                    isDisabled={iBuySellData !== null}
                  />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">Type*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    placeholder="Select Type"
                    classNamePrefix="RfqSpot"
                    value={typeOptionSelected}
                    onChange={handleChangeType}
                    options={typeOptions.filter((option) => {
                      if (selectedCurrency?.isBuy && selectedCurrency?.isSell) {
                        return option.value === 1 || option.value === 2;
                      }
                      if (selectedCurrency?.isBuy) {
                        return option.value === 1;
                      }
                      if (selectedCurrency?.isSell) {
                        return option.value === 2;
                      }
                      return true;
                    })}
                  />
                </Col>
              </Row>

              <Row className="m-0 mt-2">
                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">Amount*</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <NumericFormat
                    customInput={InputFIeld}
                    thousandSeparator=","
                    allowNegative={false}
                    onChange={handleChangeAmount}
                    maxLength={10}
                    value={amountData}
                    name="Amount"
                    applyClass={"CalculatorTextfield"}
                  />
                </Col>
                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">A/c No</label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld
                    onChange={handleChangeAcNumber}
                    value={acNumberData}
                    name="AcNumber"
                    applyClass="CalculatorTextfield"
                    maxLength={25}
                  />
                </Col>
              </Row>

              <Row className="m-0 mt-2">
                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">Nature*</label>
                </Col>

                <Col lg={4} md={4} sm={4} className="mb-2">
                  <SelectDropdown
                    placeholder=""
                    classNamePrefix="RfqSpot"
                    options={natureOfBusinessOptions}
                    onChange={handleNatureChange}
                    value={selectedNature}
                  />
                </Col>

                <Col lg={2} md={2} sm={2}>
                  <label className="LabelRFQTransactionModal">
                    Reference No (LC/Contract/Doc)
                  </label>
                </Col>
                <Col lg={4} md={4} sm={4} className="mb-2">
                  <InputFIeld
                    onChange={handleChangeLcNumber}
                    value={lcNumberData}
                    name="LcNumber"
                    applyClass="CalculatorTextfield"
                    maxLength={35}
                  />
                </Col>
              </Row>
            </>
          ) : (
            confirmationModal && (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className={"confirmationLabel"}>Confirmation</span>
                  </Col>
                </Row>
                <Row className={"mt-2"}>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className={
                      "d-flex justify-content-center align-items-center"
                    }
                  >
                    <span className="confirmationModalText">
                      Do you want cancel the process?
                    </span>
                  </Col>
                </Row>
              </>
            )
          )
        }
        modalFooter={
          rfqModal ? (
            <Row>
              <Col
                lg={6}
                md={6}
                sm={6}
                className={"d-flex justify-content-start rfqLimit_error-style"}
              >
                {errorMessage.status === true && errorMessage.message !== ""
                  ? errorMessage.message
                  : ""}
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                className={"d-flex justify-content-end"}
              >
                <CustomButton
                  value="Submit"
                  className={
                    "btn btn-primary ms-auto d-flex gap-2 align-items-center justify-content-center"
                  }
                  onClick={handleConfirmButton}
                  loading={
                    iBuySellData !== null
                      ? SaveSpotTransactionLoading
                      : SaveSpotTransactionRFQLoading
                  }
                  SaveSpotTransactionRFQLoading
                />
              </Col>
            </Row>
          ) : (
            confirmationModal && (
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className={"d-flex justify-content-center gap-2"}
                >
                  <CustomButton
                    value="Yes"
                    icon={<i className={"icon-check"}></i>}
                    className={"confirmationYesButton"}
                    onClick={handleConfimationModalYes}
                  />
                  <CustomButton
                    value="No"
                    icon={<i className={"icon-close"}></i>}
                    className={"confirmationNoButton"}
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
