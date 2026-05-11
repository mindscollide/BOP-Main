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
import {
  clearGetFEDiscountingTransactionDetails,
  clearGetNonFEDiscountingTransactionDetails,
  setDiscountingQuoteModalData,
} from "@/store/BlotterSlicer/BlotterSlicer";
import { NumericFormat } from "react-number-format";
import CancelReasonModal from "@/components/features/blotter/cancelReasonModal/cancelReasonModal";
import moment from "moment";
import { formatDateUTCToGMT } from "@/components/utils/timeFunction";
import TextArea from "@/components/common/textArea/TextArea";
import {
  calculateFeRatesReadyRate,
  calculateNonFeDiscountingRate,
} from "@/utils/formatters";

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const DiscountingRFQQuoteModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readyValue, setReadyValue] = useState("");
  // const [rateValue, setRateValue] = useState("");
  const [kiborValue, setKiborValue] = useState("");
  const [swapValue, setSwapValue] = useState("");
  const [finalValue, setFinalValue] = useState("");

  console.log(readyValue, "finalValuefinalValuefinalValue");
  // const [cancelReasonModal, setCancelReasonModal] = useState(false);
  const [cancelReasonComment, setCancelReasonComment] = useState("");

  const [quoteDataModal, setQuoteDataModal] = useState(true);
  const [cancelReasonModal, setCancelReasonModal] = useState(false);

  const discountingQuoteModalState = useSelector(
    (state) => state.modalReducer.discountingQuoteModal,
  );
  const GetNonFEDiscountingTransactionDetail = useSelector(
    (state) => state.BlotterSlicer.GetNonFEDiscountingTransactionDetails,
  );

  const GetFEDiscountingTransactionDetail = useSelector(
    (state) => state.BlotterSlicer.GetFEDiscountingTransactionDetails,
  );
  const discountingQuoteModalData = useSelector(
    (state) => state.BlotterSlicer.discountingQuoteModalData,
  );
  const [DiscountingQuoteData, setDiscountingQuoteData] = useState(null);

  const RFQNonFEDiscountingTransactionQuotationLoading = useSelector(
    (state) =>
      state.BlotterSlicer.RFQNonFEDiscountingTransactionQuotationLoading,
  );
  const RFQFEDiscountingTransactionQuotationLoading = useSelector(
    (state) => state.BlotterSlicer.RFQFEDiscountingTransactionQuotationLoading,
  );

  const AcceptTransactionAPILoading = useSelector(
    (state) => state.BlotterSlicer.AcceptTransactionAPILoading,
  );

  const RejectTransactionAPILoading = useSelector(
    (state) => state.BlotterSlicer.RejectTransactionAPILoading,
  );

  const closeModal = () => {
    dispatch(setDiscountingQuoteModalData(null));
    dispatch(setDiscountingQuoteModal(false));
    dispatch(clearGetNonFEDiscountingTransactionDetails(null));
    dispatch(clearGetFEDiscountingTransactionDetails(null));
  };

  useEffect(() => {
    if (GetNonFEDiscountingTransactionDetail !== null) {
      try {
        const { rate, ready, swap, kibor } =
          GetNonFEDiscountingTransactionDetail.transactionDetailsModel;

        console.log(
          GetNonFEDiscountingTransactionDetail.transactionDetailsModel,
          "GetNonFEDiscountingTransactionDetails",
        );
        setReadyValue(ready);
        setKiborValue(kibor.toFixed(4));
        setSwapValue(swap);
        setFinalValue(rate);
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetNonFEDiscountingTransactionDetail]);

  useEffect(() => {
    if (GetFEDiscountingTransactionDetail !== null) {
      try {
        const { discountingFactor, ready, rate } =
          GetFEDiscountingTransactionDetail.transactionDetailsModel;
        console.log(
          GetFEDiscountingTransactionDetail.transactionDetailsModel,
          "GetNonFEDiscountingTransactionDetails",
        );

        setKiborValue(discountingFactor.toFixed(4));
        setReadyValue(ready);
        setFinalValue(rate);
      } catch (error) {}
    }
  }, [GetFEDiscountingTransactionDetail]);

  useEffect(() => {
    if (discountingQuoteModalData !== null) {
      try {
        setDiscountingQuoteData(discountingQuoteModalData);
        console.log(
          discountingQuoteModalData,
          "discountingQuoteModalDatadiscountingQuoteModalData",
        );
        let Data = {
          PK_TransactionID: discountingQuoteModalData.pK_TransactionID,
        };
        let val = 1;
        if (discountingQuoteModalData.natureType === 3) {
          dispatch(
            GetFEDiscountingTransactionDetailsApi({ navigate, Data, val }),
          );
        } else if (discountingQuoteModalData.natureType === 4) {
          dispatch(
            GetNonFEDiscountingTransactionDetailsApi({ navigate, Data, val }),
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
      // setRateValue(value.trimStart());
    } else if (name === "swapVal") {
      setSwapValue(value.trimStart());
    } else if (name === "kiborValue") {
      setKiborValue(value.trimStart());
    }
  };
  const handleBlur = () => {
    let ready = parseFloat(readyValue) || 0;
    let kibor = parseFloat(kiborValue) || 0;
    let swap = parseFloat(swapValue) || 0;
    let final = 0;

    if (DiscountingQuoteData?.natureType === 3) {
      // FEDiscounting
      // final = ready - kibor;
      final = calculateFeRatesReadyRate(
        ready,
        kibor,
        DiscountingQuoteData?.rfqDealDetails?.tenorDays,
      );
    } else if (DiscountingQuoteData?.natureType === 4) {
      final = calculateNonFeDiscountingRate(
        ready,
        kibor,
        swap,
        DiscountingQuoteData?.rfqDealDetails?.tenorDays,
      );
    }

    setFinalValue(final.toFixed(2));
  };
  const handleSubmit = () => {
    // scenario is if side is "buy" then bid should be disabled and offer should be enabled
    // RFQTransactionQuotation naturetype 1

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
  const handleAccept = () => {
    let Data = { PK_TransactionID: DiscountingQuoteData.pK_TransactionID };
    let val = 1;
    dispatch(AcceptTransactionAPI({ Data, navigate, val }));
  };

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
      PK_TransactionID: DiscountingQuoteData.pK_TransactionID,
      Comment: cancelReasonComment,
    };
    let val = 1;
    //Reject API Call
    const callFunc = () => {
      setCancelReasonModal(false);
      setCancelReasonComment("");
      setQuoteDataModal(true);
    };
    dispatch(RejectTransactionAPI({ navigate, Data, val, callFunc }));
  };
  const handeClickHide = () => {
    if (cancelReasonModal) {
      setCancelReasonModal(false);
      setQuoteDataModal(true);
      dispatch(setDiscountingQuoteModal(false));
    }
  };
  return (
    <GlobalModal
      show={discountingQuoteModalState}
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
                className={styles["DealViewModal_oneSide"]}>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      Side
                    </label>
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
                    <label className={styles["DealViewModal__label"]}>
                      CCY1
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {DiscountingQuoteData?.ccY1}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      TXN Amount
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {DiscountingQuoteData?.quantity}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      CCY2
                    </label>
                    <p className={styles["DealViewModal__value"]}>
                      {" "}
                      {DiscountingQuoteData?.ccY2}
                    </p>
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <label className={styles["DealViewModal__label"]}>
                      Total Amount
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
                      {moment(
                        formatDateUTCToGMT(
                          DiscountingQuoteData?.rfqDealDetails?.tenorDate,
                        ),
                      ).format("ddd DD MMM, YYYY")}
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
                className={styles["DealViewModal_SecondSide"]}>
                <Row className='mb-3'>
                  <Col sm={10} md={10} lg={10}>
                    {DiscountingQuoteData?.branchName !== "" && (
                      <div className='mb-3 color-black br-detail-hd'>
                        <span className={styles["company-name"]}>
                          {DiscountingQuoteData?.branchName}
                        </span>
                        <span className='br-code fs-sm'>
                          ({DiscountingQuoteData?.branchCode})
                        </span>
                      </div>
                    )}

                    <div className={styles["company-name-hd"]}>
                      {DiscountingQuoteData?.corporateName}
                    </div>
                    <div className='d-inline-block txn-id fs-normal color-black'>
                      {DiscountingQuoteData?.txnid}
                    </div>
                  </Col>
                  <Col
                    sm={2}
                    md={2}
                    lg={2}
                    className='d-flex justify-content-end '>
                    <IconElement
                      onClick={closeModal}
                      iconClass={"icon-close fs-4 cursor-pointer"}
                    />
                  </Col>
                </Row>
                <section className='d-flex justify-content-center align-items-center overflow-hidden h-75'>
                  <Row>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className='d-flex align-items-center gap-2'>
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
                        thousandSeparator=','
                        maxLength={10}
                        disabled={!DiscountingQuoteData?.isRFQ}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className='d-flex mt-3  align-items-center gap-2'>
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
                        isAllowed={(value) => {
                          const { formattedValue, floatValue } = value;
                          return (
                            formattedValue === "" ||
                            (floatValue >= 0 && floatValue <= 100)
                          );
                        }}
                        decimalScale={2}
                        allowNegative={false}
                        disabled={!DiscountingQuoteData?.isRFQ}
                        onBlur={handleBlur}
                      />
                    </Col>
                    {DiscountingQuoteData?.natureType === 4 && (
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className='d-flex mt-3 align-items-center gap-2'>
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
                          isAllowed={(value) => {
                            const { formattedValue, floatValue } = value;
                            return (
                              formattedValue === "" ||
                              (floatValue >= 0 && floatValue <= 100)
                            );
                          }}
                          decimalScale={2}
                          allowNegative={false}
                          onBlur={handleBlur}
                        />
                      </Col>
                    )}

                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className='d-flex mt-3  align-items-center gap-2'>
                      <label className={styles["DealViewModal_label"]}></label>
                      <NumericFormat
                        customInput={InputFIeld}
                        applyClass={"DiscountingQuoteInput"}
                        value={finalValue}
                        disabled={true}
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
                        className='d-flex align-items-center gap-2 mt-4'>
                        <label
                          className={styles["DealViewModal_label"]}></label>
                        <CustomButton
                          icon={<IconElement iconClass={"icon-send fs-5"} />}
                          iconPosition={"left"}
                          value={"Submit"}
                          applyClass={"SubmitButtonFowardDealBox"}
                          className={"px-4"}
                          onClick={handleSubmit}
                          loading={
                            DiscountingQuoteData?.natureType === 4
                              ? RFQNonFEDiscountingTransactionQuotationLoading
                              : DiscountingQuoteData?.natureType === 3
                                ? RFQFEDiscountingTransactionQuotationLoading
                                : false
                          }
                        />
                      </Col>
                    ) : (
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className='d-flex align-items-center justify-content-center gap-2 mt-4'>
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
                          onClick={
                            handleReject
                            // () =>
                            // handleReject(DiscountingQuoteData.pK_TransactionID)
                          }
                          loading={RejectTransactionAPILoading}
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
        ) : cancelReasonModal ? (
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className='modal-title fw-bold color-blue h5'>
                Cancel Reason
              </Col>
            </Row>
            <Row className='form-group'>
              <span className='col-form-label mt-4'>Cancel Reason</span>
              <Col sm={12} md={12} lg={12}>
                <TextArea
                  className='form-control'
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
              className='d-flex gap-1 justify-content-center'>
              <CustomButton
                applyClass={"cancelReasonModalSubmitBtn"}
                value='Submit'
                onClick={handleRejectWithReason}
                disabled={cancelReasonComment !== "" ? false : true}
              />
              <CustomButton
                applyClass={"cancelReasonModalCancelBtn"}
                value='Close'
                onClick={handeClickHide}
              />
            </Col>
          </Row>
        )
      }
    />
  );
};

export default DiscountingRFQQuoteModal;
