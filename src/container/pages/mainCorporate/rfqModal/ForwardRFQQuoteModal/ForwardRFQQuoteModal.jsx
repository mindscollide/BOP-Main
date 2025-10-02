import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./ForwardRFQQuoteModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setForwardQuoteModal } from "@/store/modalSlice/modalSlicer";
import {
  AcceptTransactionAPI,
  GetForwardTransactionDetailsApi,
  RejectTransactionAPI,
  RFQForwardTransactionQuotation,
} from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
import {
  clearGetForwardTransactionDetails,
  setForwardQuoteModalData,
} from "@/store/BlotterSlicer/BlotterSlicer";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { formatDateUTCToGMT } from "@/components/utils/timeFunction";
import TextArea from "@/components/common/textArea/TextArea";
import { formatPkAmount } from "@/utils/formatters";

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

const ForwardRFQQuoteModal = ({ dealData }) => {
  console.log(dealData, "dealDatadealData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [readyValue, setReadyValue] = useState("");
  const [swapValue, setSwapValue] = useState("");
  const [readyRateValue, setReadyRateValue] = useState("");

  // console.log(readyRateValue, "readyRateValuereadyRateValue");
  const [cancelReasonComment, setCancelReasonComment] = useState("");

  const [quoteDataModal, setQuoteDataModal] = useState(true);
  const [cancelReasonModal, setCancelReasonModal] = useState(false);

  const [forwardQuoteData, setForwardQuoteData] = useState(null);

  console.log(forwardQuoteData, "forwardQuoteData");
  const forwardQuoteModal = useSelector(
    (state) => state.modalReducer.forwardQuoteModal
  );
  const forwardQuoteModalData = useSelector(
    (state) => state.BlotterSlicer.forwardQuoteModalData
  );
  const GetForwardTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetForwardTransactionDetails
  );

  const RFQForwardTransactionQuotationLoading = useSelector(
    (state) => state.BlotterSlicer.RFQForwardTransactionQuotationLoading
  );

  const AcceptTransactionAPILoading = useSelector(
    (state) => state.BlotterSlicer.AcceptTransactionAPILoading
  );

  const RejectTransactionAPILoading = useSelector(
    (state) => state.BlotterSlicer.RejectTransactionAPILoading
  );
  console.log(GetForwardTransactionDetails, "testGetForwardTransactionDetails");

  const closeModal = () => {
    dispatch(setForwardQuoteModalData(null));
    dispatch(clearGetForwardTransactionDetails());
    dispatch(setForwardQuoteModal(false));
    setReadyValue("");
    setSwapValue("");
    setReadyRateValue("");
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
        setReadyValue(forwardQuoteModalData.treasuryRate);
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

        setSwapValue(swap.toFixed(4));
        setReadyRateValue(rate);
      } catch (error) {}
    }
  }, [GetForwardTransactionDetails]);

  // Get all instruments for counterparties from Redux store
  // const getAllInstrumentsForCounterPartiesData = useSelector(
  //   (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  // );

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

  const handleAccept = () => {
    const Data = { PK_TransactionID: forwardQuoteData.pK_TransactionID };
    let val = 1;
    dispatch(AcceptTransactionAPI({ navigate, Data, val }));
  };

  // const handleReject = (transactionID) => {
  //   const Data = { PK_TransactionID: transactionID, Comment: "Hello" };
  //   let val = 1;
  //   dispatch(RejectTransactionAPI({ navigate, Data, val }));
  // };

  const handleReject = () => {
    // Store the transaction ID and open the modal
    setQuoteDataModal(false);
    setCancelReasonModal(true);
  };

  const handleRejectWithReason = () => {
    if (cancelReasonComment.trim() === "") {
      // empty msg
      return;
    }

    // Use the stored transaction ID and user's comment
    const Data = {
      PK_TransactionID: forwardQuoteData.pK_TransactionID,
      Comment: cancelReasonComment,
    };
    let val = 1;
    //Reject API Call
    dispatch(RejectTransactionAPI({ navigate, Data, val }));
    // Reset Modal State
    setCancelReasonModal(false);
    setCancelReasonComment("");
    setQuoteDataModal(true);
    // dispatch(setForwardQuoteModal(false));
  };
  const parseNumber = (val) => {
    if (!val) return 0;
    return Number(val.toString().replace(/,/g, ""));
  };

  const calculateNewReadyValue = (instrumentName) => {
    const numReady = parseNumber(readyValue);
    const numSwap = parseNumber(swapValue);

    console.log(
      { numSwap, numReady, readyValue, swapValue },
      "numReadynumReady"
    );
    const adjustedSwap =
      // instrumentName?.toUpperCase() === "USD" ? numSwap / 100.0 : numSwap;
      forwardQuoteData?.ccY1?.toUpperCase() === "USD"
        ? numSwap / 100.0
        : numSwap;
    return (numReady + adjustedSwap).toFixed(4); // return formatted string for view
  };

  const handeClickHide = () => {
    if (cancelReasonModal) {
      setCancelReasonModal(false);
      setQuoteDataModal(true);
      dispatch(setForwardQuoteModal(false));
    }
  };

  return (
    <GlobalModal
      show={forwardQuoteModal}
      size={"md"}
      onHide={handeClickHide}
      centered={true}
      bodyClassName={!cancelReasonModal && styles["DealViewModal__body"]}
      footerClassName={cancelReasonModal && "d-block border-0"}
      modalBody={
        quoteDataModal ? (
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
                    <label className={styles["DealViewModal__label"]}>
                      Side
                    </label>
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
                    <label className={styles["DealViewModal__label"]}>
                      CCY1
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {forwardQuoteData?.ccY1}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      TXN Amount
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {forwardQuoteData?.quantity}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      CCY2
                    </label>
                    <p className={styles["DealViewModal__value"]}>PKR</p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      Total Amount
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {forwardQuoteData?.amount.toFixed(2)}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      Fixed Days
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
                      {forwardQuoteData?.rfqDealDetails !== null ? (
                        <>
                          {" "}
                          {moment(
                            formatDateUTCToGMT(
                              forwardQuoteData?.rfqDealDetails.tenorDate
                            )
                          ).format("ddd, MMM DD, YYYY")}
                        </>
                      ) : (
                        "N/A"
                      )}
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
                      {forwardQuoteData?.rfqDealDetails !== null ? (
                        <>
                          {" "}
                          {moment(
                            formatDateUTCToGMT(
                              forwardQuoteData?.rfqDealDetails.optionsDate
                            )
                          ).format("ddd, MMM DD, YYYY")}
                        </>
                      ) : (
                        "N/A"
                      )}
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
                    {forwardQuoteData?.branchName !== "" &&
                    forwardQuoteData?.branchCode !== "" ? (
                      <div className="mb-3 color-black br-detail-hd">
                        <span className={styles["company-name"]}>
                          {forwardQuoteData?.branchName}
                        </span>
                        <span className="br-code fs-sm">
                          ({forwardQuoteData?.branchCode})
                        </span>
                      </div>
                    ) : null}

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
                    className="d-flex justify-content-end"
                  >
                    <IconElement
                      onClick={closeModal}
                      iconClass={"icon-close fs-4 cursor-pointer"}
                    />
                  </Col>
                </Row>
                <section className="d-flex justify-content-center align-items-center overflow-hidden h-75">
                  <Row>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="d-flex align-items-center gap-2"
                    >
                      <label className={styles["DealViewModal_label"]}>
                        Ready
                      </label>
                      <NumericFormat
                        customInput={InputFIeld}
                        value={readyValue}
                        thousandSeparator=","
                        disabled={!forwardQuoteData?.isRFQ}
                        applyClass={"DiscountingQuoteInput"}
                        maxLength={5}
                        allowNegative={false}
                        onChange={(e) => handleChangeRate(e, "readyValue")}
                      />
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="d-flex my-3 align-items-center gap-2"
                    >
                      <label className={styles["DealViewModal_label"]}>
                        Swap
                      </label>
                      <NumericFormat
                        customInput={InputFIeld}
                        value={formatPkAmount(swapValue, { decimals: 0 })}
                        disabled={!forwardQuoteData?.isRFQ}
                        thousandSeparator=","
                        applyClass={"DiscountingQuoteInput"}
                        maxLength={8}
                        allowNegative={false}
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
                      <label className={styles["DealViewModal_label"]}>
                        Rate
                      </label>
                      <span className={styles["CalculateValue"]}>
                        {forwardQuoteData?.isRFQ
                          ? // ? calculateNewReadyValue("USD", readyRateValue)
                            calculateNewReadyValue()
                          : readyRateValue}
                      </span>
                    </Col>

                    {forwardQuoteData?.isRFQ ? (
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="d-flex align-items-center gap-2 mt-4"
                      >
                        <label
                          className={styles["DealViewModal_label"]}
                        ></label>
                        <CustomButton
                          icon={<IconElement iconClass={"icon-send fs-5"} />}
                          iconPosition={"left"}
                          value={"Submit"}
                          applyClass={"SubmitButtonFowardDealBox"}
                          className={"px-4"}
                          onClick={handleSubmit}
                          loading={RFQForwardTransactionQuotationLoading}
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
                          onClick={handleAccept}
                          loading={AcceptTransactionAPILoading}
                        />
                        <CustomButton
                          icon={<IconElement iconClass={"icon-send fs-5"} />}
                          iconPosition={"left"}
                          value={"Reject"}
                          applyClass={"RejectBtnDealBox"}
                          className={"px-4"}
                          onClick={handleReject}
                          loading={RejectTransactionAPILoading}
                        />
                      </Col>
                    )}
                  </Row>
                </section>
              </Col>
            </Row>
          </>
        ) : cancelReasonModal ? (
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className="modal-title fw-bold color-blue h5"
              >
                Cancel Reason
              </Col>
            </Row>
            <Row className="form-group">
              <span className="col-form-label mt-4">Cancel Reason</span>
              <Col sm={12} md={12} lg={12}>
                <TextArea
                  className="form-control"
                  name={"cancelReasonInput"}
                  value={cancelReasonComment}
                  maxLength={1500}
                  onChange={(event) =>
                    setCancelReasonComment(event.target.value.trim())
                  }
                  placeholder={"Please enter cancel reason"}
                  applyClass={"cancelReasonModalInputField"}
                />
              </Col>
            </Row>
          </>
        ) : null
      }
      modalFooter={
        cancelReasonModal && (
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex gap-1 justify-content-center"
            >
              <CustomButton
                applyClass={"cancelReasonModalSubmitBtn"}
                value="Submit"
                onClick={handleRejectWithReason}
                disabled={cancelReasonComment !== "" ? false : true}
              />
              <CustomButton
                applyClass={"cancelReasonModalCancelBtn"}
                value="Close"
                onClick={handeClickHide}
              />
            </Col>
          </Row>
        )
      }
    />
  );
};

export default ForwardRFQQuoteModal;
