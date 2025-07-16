import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./DiscountingRFQQuoteModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setViewDealModal } from "@/store/modalSlice/modalSlicer";
import { RFQTransactionQuotation } from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";

const DiscountingRFQQuoteModal = ({ dealData }) => {
  console.log(dealData, "dealDatadealData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bid, setBid] = useState("");
  const [offer, setOffer] = useState("");
  const discountingRFQQuoteModal = useSelector(
    (state) => state.modalReducer.discountingRFQQuoteModal
  );

  const closeModal = () => {
    dispatch(setViewDealModal(false));
  };
  useEffect(() => {
    if (dealData !== null) {
      setBid(dealData?.bid);
      setOffer(dealData?.offer);
    }
    return () => {
      setBid("");
      setOffer("");
    };
  }, [dealData]);

  const handleChangeRate = (event, type) => {
    if (type === "bid") {
      setBid(event.target.value);
    } else {
      setOffer(event.target.value);
    }
  };

  const handleSubmit = () => {
    // scenario is if side is "buy" then bid should be disabled and offer should be enabled
    // RFQTransactionQuotation naturetype 1
    // RFQForwardTransactionQuotation naturetype 2
    // RFQFEDiscountingTransactionQuotation naturetype 3
    // RFQNonFEDiscountingTransactionQuotation naturetype 4
    let Data = {
      PK_TransactionID: dealData?.pK_TransactionID,
      Rate:
        dealData.side.toLowerCase() === "sell" ? Number(bid) : Number(offer),
    };
    dispatch(RFQTransactionQuotation({ navigate, Data }));
  };

  const handleCancel = () => {};
  // if (!viewDealModal && !dealData) return null;
  return (
    <GlobalModal
      show={true}
      size={"md"}
      bodyClassName={styles["DealViewModal__body"]}
      modalBody={
        <>
          <Row>
            <Col
              sm={3}
              md={3}
              lg={3}
              className={styles["DealViewModal_oneSide"]}>
              <Row>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>Side</label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.side}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Nature
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.nature}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY1</label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.ccY1}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.quantity}
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
                    {dealData?.amount}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                   Tenor
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.lcNumber}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Maturity Date
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.accountNumber}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Account No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.accountNumber}
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
                  <div className='mb-3 color-black br-detail-hd'>
                    <span className={styles["company-name"]}>ABC Branch</span>
                    <span className='br-code fs-sm'>(5002)</span>
                  </div>
                  <div className={styles["company-name-hd"]}>Gul Ahmed</div>
                  <div className='d-inline-block txn-id fs-normal color-black'>
                    15-07-2025/cbd9
                  </div>
                </Col>
                <Col
                  sm={2}
                  md={2}
                  lg={2}
                  className='d-flex justify-content-center'>
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
                  className='d-flex align-items-center gap-2'>
                  <label className={styles["DealViewModal_label"]}>Ready</label>
                  <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    value={bid}
                    onChange={(e) => handleChangeRate(e, "bid")}
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className='d-flex mt-3  align-items-center gap-2'>
                  <label className={styles["DealViewModal_label"]}>Rate</label>
                  <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    value={bid}
                    onChange={(e) => handleChangeRate(e, "bid")}
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className='d-flex mt-3 align-items-center gap-2'>
                  <label className={styles["DealViewModal_label"]}>Swap</label>
                  <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    value={"280"}
                    onChange={(e) => handleChangeRate(e, "bid")}
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className='d-flex mt-3  align-items-center gap-2'>
                  <label className={styles["DealViewModal_label"]}></label>
                  <InputFIeld
                    applyClass={"DiscountingQuoteInput"}
                    value={"280"}
                    disabled={true}
                    onChange={(e) => handleChangeRate(e, "bid")}
                  />
                </Col>
                {true ? (
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className='d-flex align-items-center gap-2 mt-4'>
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
                    className='d-flex align-items-center justify-content-center gap-2 mt-4'>
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send fs-5"} />}
                      iconPosition={"left"}
                      value={"Accept"}
                      applyClass={"AcceptBtnDealBox"}
                      className={"px-4"}
                      onClick={handleSubmit}
                    />
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send fs-5"} />}
                      iconPosition={"left"}
                      value={"Reject"}
                      applyClass={"RejectBtnDealBox"}
                      className={"px-4"}
                      onClick={handleSubmit}
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

export default DiscountingRFQQuoteModal;
