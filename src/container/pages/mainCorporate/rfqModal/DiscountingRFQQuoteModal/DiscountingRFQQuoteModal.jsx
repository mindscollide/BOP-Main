import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./DiscountingRFQQuoteModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDiscountingQuoteModal } from "@/store/modalSlice/modalSlicer";
import {
  AcceptTransactionAPI,
  GetFEDiscountingTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
  RFQFEDiscountingTransactionQuotation,
  RFQNonFEDiscountingTransactionQuotation,
  RejectTransactionAPI,
} from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
import { setDiscountingQuoteModalData } from "@/store/BlotterSlicer/BlotterSlicer";
import { NumericFormat } from "react-number-format";
import CancelReasonModal from "@/components/features/blotter/cancelReasonModal/cancelReasonModal";
import moment from "moment";
import { formatDateUTCToGMT } from "@/components/utils/timeFunction";

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const DiscountingRFQQuoteModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bid, setBid] = useState("");
  const [offer, setOffer] = useState("");

  const [readyValue, setReadyValue] = useState("");
  const [rateValue, setRateValue] = useState("");
  const [discoutingFactorValue, setDiscoutingFactorValue] = useState("");
  const [kiborValue, setKiborValue] = useState("");
  const [swapValue, setSwapValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [cancelReasonComment, setCancelReasonComment] = useState("");
  const [selectedTransactionID, setSelectedTransactionID] = useState(null);

  const discountingQuoteModalState = useSelector(
    (state) => state.modalReducer.discountingQuoteModal
  );
  const GetNonFEDiscountingTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetNonFEDiscountingTransactionDetails
  );

  const GetFEDiscountingTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetFEDiscountingTransactionDetails
  );
  const discountingQuoteModalData = useSelector(
    (state) => state.BlotterSlicer.discountingQuoteModalData
  );
  const [DiscountingQuoteData, setDiscountingQuoteData] = useState(null);
  const closeModal = () => {
    dispatch(setDiscountingQuoteModalData(null));
    dispatch(setDiscountingQuoteModal(false));
  };

  useEffect(() => {
    if (GetNonFEDiscountingTransactionDetails !== null) {
      try {
        const { rate, ready, swap, kibor } =
          GetNonFEDiscountingTransactionDetails.transactionDetailsModel;
        setReadyValue(ready);
        setKiborValue(kibor.toFixed(4));
        setSwapValue(swap);
        setFinalValue(rate);
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetNonFEDiscountingTransactionDetails]);
  useEffect(() => {
    if (GetFEDiscountingTransactionDetails !== null) {
      try {
        const { discountingFactor, ready, rate } =
          GetFEDiscountingTransactionDetails.transactionDetailsModel;
        setKiborValue(discountingFactor.toFixed(4));
        setReadyValue(ready);
        setFinalValue(rate);
      } catch (error) {}
    }
  }, [GetFEDiscountingTransactionDetails]);

  useEffect(() => {
    if (discountingQuoteModalData !== null) {
      try {
        setDiscountingQuoteData(discountingQuoteModalData);
        console.log(
          discountingQuoteModalData,
          "discountingQuoteModalDatadiscountingQuoteModalData"
        );
        let Data = {
          PK_TransactionID: discountingQuoteModalData.pK_TransactionID,
        };
        let val = 1;
        if (discountingQuoteModalData.natureType === 3) {
          dispatch(
            GetFEDiscountingTransactionDetailsApi({ navigate, Data, val })
          );
        } else if (discountingQuoteModalData.natureType === 4) {
          dispatch(
            GetNonFEDiscountingTransactionDetailsApi({ navigate, Data, val })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      dispatch(setDiscountingQuoteModalData(null));
    };
  }, [discountingQuoteModalData]);

  const handleChangeRate = (name, value) => {
    if (name === "readyVal") {
      setReadyValue(value.trimStart());
    } else if (name === "rateVal") {
      setRateValue(value.trimStart());
    } else if (name === "swapVal") {
      setSwapValue(value.trimStart());
    } else if (name === "kiborValue") {
      setKiborValue(value.trimStart());
    }
  };

  const handleSubmit = () => {
    // scenario is if side is "buy" then bid should be disabled and offer should be enabled
    // RFQTransactionQuotation naturetype 1
    // RFQForwardTransactionQuotation naturetype 2
    // RFQFEDiscountingTransactionQuotation naturetype 3
    // RFQNonFEDiscountingTransactionQuotation naturetype 4
    // let val = 1;
    if (DiscountingQuoteData?.natureType === 4) {
      let Data = {
        PK_TransactionID: DiscountingQuoteData.pK_TransactionID,
        Ready: Number(readyValue),
        Swap: Number(swapValue),
        Kibor: Number(kiborValue),
      };
      dispatch(RFQNonFEDiscountingTransactionQuotation({ navigate, Data }));
    } else if (DiscountingQuoteData?.natureType === 3) {
      let Data = {
        PK_TransactionID: DiscountingQuoteData.pK_TransactionID,
        Ready: Number(readyValue),
        DiscountingFactor: Number(kiborValue),
      };
      dispatch(RFQFEDiscountingTransactionQuotation({ navigate, Data }));
    }
  };
  const handleAccept = (transactionID) => {
    let Data = { PK_TransactionID: transactionID };
    let val = 1;
    dispatch(AcceptTransactionAPI({ Data, navigate, val }));
  };
  // const handleReject = (transactionID) => {
  //   let Data = { PK_TransactionID: transactionID, Comment: "Hello" };
  //   let val = 1;

  //   dispatch(RejectTransactionAPI({ Data, navigate, val }));
  // };
  const handleReject = (transactionID) => {
    // Store the transaction ID and open the modal
    setSelectedTransactionID(transactionID);
    setCancelReasonModal(true);
  };
  const handleRejectWithReason = () => {
    if (cancelReasonComment.trim() === "") {
      // empty msg
      return;
    }

    // Use the stored transaction ID and user's comment
    const Data = {
      PK_TransactionID: selectedTransactionID,
      Comment: cancelReasonComment,
    };
    let val = 1;
    //Reject API Call
    dispatch(RejectTransactionAPI({ navigate, Data, val }));

    // Reset Modal State
    setCancelReasonModal(false);
    setCancelReasonComment("");
  };
  const handleCancel = () => {};
  // if (!viewDealModal && !dealData) return null;
  return (
    <GlobalModal
      show={discountingQuoteModalState}
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
                    {DiscountingQuoteData?.side}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Nature
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {DiscountingQuoteData?.nature}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY1</label>
                  <p className={styles["DealViewModal__value"]}>
                    {DiscountingQuoteData?.ccY1}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {DiscountingQuoteData?.quantity}
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
                    {DiscountingQuoteData?.amount.toFixed(2)}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Tenor
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {DiscountingQuoteData?.rfqDealDetails?.tenorDays}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Maturity Date
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {moment(formatDateUTCToGMT(DiscountingQuoteData?.rfqDealDetails?.tenorDate)).format(
                    "ddd DD MMM, YYYY"
                  )}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Account No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {DiscountingQuoteData?.accountNumber}
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
                  {isBranch && (
                    <div className="mb-3 color-black br-detail-hd">
                      <span className={styles["company-name"]}>
                        {DiscountingQuoteData?.branchName}
                      </span>
                      <span className="br-code fs-sm">
                        ({DiscountingQuoteData?.branchCode})
                      </span>
                    </div>
                  )}

                  <div className={styles["company-name-hd"]}>
                    {DiscountingQuoteData?.corporateName}
                  </div>
                  <div className="d-inline-block txn-id fs-normal color-black">
                    {DiscountingQuoteData?.txnid}
                  </div>
                </Col>
                <Col
                  sm={2}
                  md={2}
                  lg={2}
                  className="d-flex justify-content-end "
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
                      applyClass={"DiscountingQuoteInput"}
                      value={readyValue}
                      onChange={(event) =>
                        handleChangeRate("readyVal", event.target.value)
                      }
                      thousandSeparator=","
                      maxLength={10}
                      disabled={!DiscountingQuoteData?.isRFQ}
                    />
                  </Col>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className="d-flex mt-3  align-items-center gap-2"
                  >
                    <label className={styles["DealViewModal_label"]}>
                      Rate
                    </label>
                    <NumericFormat
                      customInput={InputFIeld}
                      value={kiborValue}
                      applyClass={"DiscountingQuoteInput"}
                      onChange={(event) =>
                        handleChangeRate("kiborValue", event.target.value)
                      }
                      thousandSeparator=","
                      maxLength={10}
                      disabled={!DiscountingQuoteData?.isRFQ}
                    />
                  </Col>
                  {DiscountingQuoteData?.natureType === 4 && (
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="d-flex mt-3 align-items-center gap-2"
                    >
                      <label className={styles["DealViewModal_label"]}>
                        Swap
                      </label>
                      <NumericFormat
                        disabled={!DiscountingQuoteData?.isRFQ}
                        customInput={InputFIeld}
                        value={swapValue}
                        applyClass={"DiscountingQuoteInput"}
                        onChange={(event) =>
                          handleChangeRate("swapVal", event.target.value)
                        }
                        thousandSeparator=","
                        maxLength={10}
                      />
                    </Col>
                  )}

                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className="d-flex mt-3  align-items-center gap-2"
                  >
                    <label className={styles["DealViewModal_label"]}></label>
                    <NumericFormat
                      customInput={InputFIeld}
                      applyClass={"DiscountingQuoteInput"}
                      value={finalValue}
                      disabled={!DiscountingQuoteData?.isRFQ}
                    />
                    {/* <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    // value={"280"}
                    // disabled={true}
                    onChange={(e) => handleChangeRate(e, "bid")}
                  /> */}
                  </Col>
                  {DiscountingQuoteData?.isRFQ ? (
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
                          handleAccept(DiscountingQuoteData.pK_TransactionID)
                        }
                      />
                      <CustomButton
                        icon={<IconElement iconClass={"icon-send fs-5"} />}
                        iconPosition={"left"}
                        value={"Reject"}
                        applyClass={"RejectBtnDealBox"}
                        className={"px-4"}
                        onClick={() =>
                          handleReject(DiscountingQuoteData.pK_TransactionID)
                        }
                      />
                    </Col>
                  )}
                </Row>
              </section>
            </Col>
          </Row>
          <CancelReasonModal
            cancelReasonModal={cancelReasonModal}
            setCancelReasonModal={setCancelReasonModal}
            handleClickReasonSubmit={handleRejectWithReason}
            handleCloseReasonModal={() => {
              setCancelReasonModal(false);
              setCancelReasonComment("");
            }}
            cancelReasonComment={cancelReasonComment}
            setCancelReasonComment={setCancelReasonComment}
          />
        </>
      }
    />
  );
};

export default DiscountingRFQQuoteModal;
