import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./DealViewModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setViewDealModal } from "@/store/modalSlice/modalSlicer";
import { RFQTransactionQuotation } from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";

const DealViewModal = ({ dealData }) => {
  console.log(dealData, "dealDatadealData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bid, setBid] = useState("");
  const [offer, setOffer] = useState("");
  const viewDealModal = useSelector(
    (state) => state.modalReducer.viewDealModal
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
    // RFQTransactionQuotation
    // RFQForwardTransactionQuotation
    // RFQFEDiscountingTransactionQuotation
    // RFQNonFEDiscountingTransactionQuotation
    let Data = {
      PK_TransactionID: dealData?.pK_TransactionID,
      Rate:
        dealData.side.toLowerCase() === "sell" ? Number(bid) : Number(offer),
    };
    dispatch(RFQTransactionQuotation({ navigate, Data }));
  };

  const handleCancel = () => {};
  if (!viewDealModal && !dealData) return null;
  return (
    <GlobalModal
      show={viewDealModal}
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
                    LC No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {dealData?.lcNumber}
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
              <Row className='mb-5'>
                <Col sm={10} md={10} lg={10}>
                  <p className={styles["PartyName"]}>
                    {dealData?.corporateName}
                  </p>
                  <span>{dealData?.txnid}</span>
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
              <Row className='mt-5'>
                <Col sm={6} md={6} lg={6} className='mt-4'>
                  <div className={styles["DealViewModal_Input"]}>
                    <label className={styles["DealViewModal_label"]}>Bid</label>
                    <InputFIeld
                      applyClass={"DealBoxBitInput"}
                      disabled={
                        dealData.side.toLowerCase() === "sell" ? false : true
                      }
                      value={bid}
                      onChange={(e) => handleChangeRate(e, "bid")}
                    />
                  </div>
                </Col>
                <Col sm={6} md={6} lg={6} className='mt-4'>
                  <div className={styles["DealViewModal_Input"]}>
                    <label className={styles["DealViewModal_label"]}>
                      Offer
                    </label>
                    <InputFIeld
                      applyClass={"DealBoxOfferInput"}
                      disabled={
                        dealData.side.toLowerCase() === "buy" ? false : true
                      }
                      value={offer}
                      onChange={(e) => handleChangeRate(e, "offer")}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className='d-flex justify-content-center gap-3 mt-5'>
                  <CustomButton
                    icon={<IconElement iconClass={"icon-send  fs-5"} />}
                    iconPosition={"left"}
                    value={"Submit"}
                    applyClass={"AcceptBtnDealBox"}
                    className={"px-4"}
                    onClick={handleSubmit}
                  />
                  <CustomButton
                    value={"Cancel"}
                    icon={<IconElement iconClass={"icon-close fs-4"} />}
                    iconPosition={"left"}
                    applyClass={"RejectBtnDealBox"}
                    className={"px-4"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default DealViewModal;
