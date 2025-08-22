import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./ForwardRFQQuoteModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setForwardQuoteModal,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import {
  AcceptTransactionAPI,
  GetForwardTransactionDetailsApi,
  RejectTransactionAPI,
  RFQForwardTransactionQuotation,
  RFQTransactionQuotation,
} from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
import { setForwardQuoteModalData } from "@/store/BlotterSlicer/BlotterSlicer";
import { NumericFormat } from "react-number-format";

const ForwardRFQQuoteModal = ({ dealData }) => {
  console.log(dealData, "dealDatadealData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [readyValue, setReadyValue] = useState("");
  const [swapValue, setSwapValue] = useState("");
  const [readyRateValue, setReadyRateValue] = useState("");

  const [forwardQuoteData, setForwardQuoteData] = useState(null);
  const forwardQuoteModal = useSelector(
    (state) => state.modalReducer.forwardQuoteModal
  );
  const forwardQuoteModalData = useSelector(
    (state) => state.BlotterSlicer.forwardQuoteModalData
  );
  const GetForwardTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetForwardTransactionDetails
  );
  console.log(GetForwardTransactionDetails, "testGetForwardTransactionDetails");

  const closeModal = () => {
    dispatch(setForwardQuoteModalData(null));
    dispatch(setForwardQuoteModal(false));
    setReadyValue("");
    setSwapValue("");
  };

  useEffect(() => {
    if (forwardQuoteModalData !== null) {
      try {
        setForwardQuoteData(forwardQuoteModalData);
        console.log(
          forwardQuoteModalData,
          "forwardQuoteModalDataforwardQuoteModalData"
        );
        let Data = {
          PK_TransactionID: forwardQuoteModalData.pK_TransactionID,
        };
        let val = 1;
        dispatch(GetForwardTransactionDetailsApi({ navigate, Data, val }));
        setReadyValue(forwardQuoteModalData.rate);
      } catch (error) {
        console.log(error);
      }
    }
    // return () => {
    //   dispatch(setForwardQuoteModalData(null));
    //   setReadyValue("");
    //   setSwapValue("");
    // };
  }, [forwardQuoteModalData]);
  useEffect(() => {
    if (GetForwardTransactionDetails !== null) {
      try {
        const { rate, ready, swap } =
          GetForwardTransactionDetails.transactionDetailsModel;
        setReadyValue(ready);
        setSwapValue(swap);
        setReadyRateValue(rate);
      } catch (error) {}
    }
  }, [GetForwardTransactionDetails]);

  // Get all instruments for counterparties from Redux store
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const handleChangeRate = (event, type) => {
    if (type === "readyValue") {
      setReadyValue(event.target.value);
    } else {
      setSwapValue(event.target.value);
    }
  };

  const handleSubmit = () => {
    // scenario is if side is "buy" then bid should be disabled and offer should be enabled

    // RFQTransactionQuotation naturetype 1
    // RFQForwardTransactionQuotation naturetype 2
    // RFQFEDiscountingTransactionQuotation naturetype 3
    // RFQNonFEDiscountingTransactionQuotation naturetype 4
    if (readyValue !== "" && swapValue !== "") {
      let Data = {
        PK_TransactionID: forwardQuoteData.pK_TransactionID,
        Ready: Number(readyValue),
        Swap: Number(swapValue),
      };
      dispatch(RFQForwardTransactionQuotation({ navigate, Data }));
    }
  };

  const handleAccept = (transactionID) => {
    const Data = { PK_TransactionID: transactionID };
    let val = 1;
    dispatch(AcceptTransactionAPI({ navigate, Data, val }));
  };
  const handleReject = (transactionID) => {
    const Data = { PK_TransactionID: transactionID, Comment: "Hello" };
    let val = 1;
    dispatch(RejectTransactionAPI({ navigate, Data, val }));
  };
  const calculateNewReadyValue = (instrumentName, ready, swap) => {
    const numReady = parseFloat(ready) || 0;
    const numSwap = parseFloat(swap) || 0;
    const adjustedSwap =
      instrumentName?.toUpperCase() === "USD" ? numSwap / 100.0 : numSwap;
    return (numReady + adjustedSwap).toFixed(2); // return formatted string for view
  };

  return (
    <GlobalModal
      show={forwardQuoteModal}
      size={"md"}
      centered={true}
      bodyClassName={styles["DealViewModal__body"]}
      modalBody={
        <>
          <Row>
            <Col
              sm={3}
              md={3}
              lg={3}
              className={styles["DealViewModal_oneSide"]}
            >
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>Side</label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.side}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Nature
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.nature}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY1</label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.ccY1}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.quantity}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY2</label>
                  <p className={styles["DealViewModal__value"]}>PKR</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.amount.toFixed(2)}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Tenor
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.rfqDealDetails !== null
                      ? forwardQuoteData?.rfqDealDetails.tenorDays
                      : "N/A"}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Maturity Date
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.rfqDealDetails !== null
                      ? forwardQuoteData?.rfqDealDetails.tenorDate
                      : "N/A"}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Option Days
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.rfqDealDetails !== null
                      ? forwardQuoteData?.rfqDealDetails.optionsDays
                      : "N/A"}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Option End Date
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.rfqDealDetails !== null
                      ? forwardQuoteData?.rfqDealDetails.optionsDate
                      : "N/A"}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Account No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {forwardQuoteData?.accountNumber}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col
              sm={9}
              md={9}
              lg={9}
              className={styles["DealViewModal_SecondSide"]}
            >
              <Row className="mb-3">
                <Col sm={10} md={10} lg={10}>
                  <div className="mb-3 color-black br-detail-hd">
                    <span className={styles["company-name"]}>
                      {forwardQuoteData?.branchName}
                    </span>
                    <span className="br-code fs-sm">
                      ({forwardQuoteData?.branchCode})
                    </span>
                  </div>
                  <div className={styles["company-name-hd"]}>
                    {forwardQuoteData?.corporateName}
                  </div>
                  <div className="d-inline-block txn-id fs-normal color-black">
                    {forwardQuoteData?.txnid}
                  </div>
                </Col>
                <Col
                  sm={2}
                  md={2}
                  lg={2}
                  className="d-flex justify-content-center"
                >
                  <IconElement
                    onClick={closeModal}
                    iconClass={"icon-close fs-4 cursor-pointer"}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex align-items-center gap-2"
                >
                  <label className={styles["DealViewModal_label"]}>Ready</label>
                  <NumericFormat
                    customInput={InputFIeld}
                    value={readyValue}
                    thousandSeparator=","
                    disabled={!forwardQuoteData?.isRFQ}
                    applyClass={"DiscountingQuoteInput"}
                    maxLength={10}
                    onChange={(e) => handleChangeRate(e, "readyValue")}
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex my-3 align-items-center gap-2"
                >
                  <label className={styles["DealViewModal_label"]}>Swap</label>
                  <NumericFormat
                    customInput={InputFIeld}
                    value={Number(swapValue).toFixed(4)}
                    disabled={!forwardQuoteData?.isRFQ}
                    thousandSeparator=","
                    applyClass={"DiscountingQuoteInput"}
                    maxLength={10}
                    onChange={(e) => handleChangeRate(e, "swapValue")}
                  />
                  {/* <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    value={swapValue}
                    onChange={(e) => handleChangeRate(e, "swapValue")}
                  /> */}
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex align-items-center gap-2"
                >
                  <label className={styles["DealViewModal_label"]}>Rate</label>
                  <span className={styles["CalculateValue"]}>
                    {readyRateValue}
                  </span>
                </Col>

                {forwardQuoteData?.isRFQ ? (
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className="d-flex align-items-center gap-2 mt-4"
                  >
                    <label className={styles["DealViewModal_label"]}></label>
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send fs-5"} />}
                      iconPosition={"left"}
                      value={"Submit"}
                      applyClass={"SubmitButtonFowardDealBox"}
                      className={"px-4"}
                      onClick={handleSubmit}
                    />
                  </Col>
                ) : (
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className="d-flex align-items-center justify-content-center gap-2 mt-4"
                  >
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send fs-5"} />}
                      iconPosition={"left"}
                      value={"Accept"}
                      applyClass={"AcceptBtnDealBox"}
                      className={"px-4"}
                      onClick={() =>
                        handleAccept(forwardQuoteData.pK_TransactionID)
                      }
                    />
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send fs-5"} />}
                      iconPosition={"left"}
                      value={"Reject"}
                      applyClass={"RejectBtnDealBox"}
                      className={"px-4"}
                      onClick={() =>
                        handleReject(forwardQuoteData.pK_TransactionID)
                      }
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default ForwardRFQQuoteModal;
