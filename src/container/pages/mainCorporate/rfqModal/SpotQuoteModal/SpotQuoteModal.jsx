import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./SpotQuoteModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setViewDealModal } from "@/store/modalSlice/modalSlicer";
import { RFQTransactionQuotation } from "@/components/features/blotter/BlotterActions";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const SpotQuoteModal = ({ dealData }) => {
  console.log(dealData, "dealDatadealData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bid, setBid] = useState("");
  const [offer, setOffer] = useState("");
  const spotQuoteModalState = useSelector(
    (state) => state.modalReducer.spotQuoteModal
  );
  const spotQuoteModalData = useSelector(
    (state) => state.BlotterSlicer.spotQuoteModalData
  );

  console.log(spotQuoteModalData, "spotQuoteModalDataspotQuoteModalData");
  const closeModal = () => {
    dispatch(setViewDealModal(false));
  };
  useEffect(() => {
    if (spotQuoteModalData !== null) {
      setBid(spotQuoteModalData?.bid);
      setOffer(spotQuoteModalData?.offer);
    }
    return () => {
      setBid("");
      setOffer("");
    };
  }, [spotQuoteModalData]);

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
    let getRate =
      spotQuoteModalData.side.toLowerCase() === "sell"
        ? bid.replace(/,/g, "")
        : offer.replace(/,/g, "");
    let Data = {
      PK_TransactionID: spotQuoteModalData?.pK_TransactionID,
      Rate: Number(getRate),
    };
    dispatch(RFQTransactionQuotation({ navigate, Data }));
  };

  const handleCancel = () => {};
  // if (!viewDealModal && !dealData) return null;
  return (
    <GlobalModal
      show={spotQuoteModalState}
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
                    {spotQuoteModalData?.side}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Nature
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {spotQuoteModalData?.nature}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY1</label>
                  <p className={styles["DealViewModal__value"]}>
                    {spotQuoteModalData?.ccY1}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {spotQuoteModalData?.quantity}
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
                    {spotQuoteModalData?.amount}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    LC No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {spotQuoteModalData?.lcNumber}
                  </p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Account No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>
                    {spotQuoteModalData?.accountNumber}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col
              sm={9}
              md={9}
              lg={9}
              className={styles["DealViewModal_SecondSide"]}>
              <Row>
                <Col sm={10} md={10} lg={10}>
                  <p className={styles["PartyNamesNew"]}>
                    {spotQuoteModalData?.branchName}
                    <span className={styles["PartyNamesSubHeading"]}>
                      {" ("}
                      {spotQuoteModalData?.branchCode}
                      {")"}
                    </span>
                  </p>
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
                <Col sm={10} md={10} lg={10}>
                  <p className={styles["PartyName"]}>
                    {spotQuoteModalData?.corporateName}
                  </p>
                  <span>{spotQuoteModalData?.txnid}</span>
                </Col>
                <Col
                  sm={2}
                  md={2}
                  lg={2}
                  className='d-flex justify-content-center'></Col>
              </Row>
              <Row className='mt-5'>
                <Col sm={6} md={6} lg={6} className='mt-4'>
                  <div className={styles["DealViewModal_Input"]}>
                    <label className={styles["DealViewModal_label"]}>Bid</label>
                    <NumericFormat
                      customInput={InputFIeld}
                      onChange={(e) => handleChangeRate(e, "bid")}
                      value={bid}
                      disabled={
                        spotQuoteModalData?.side.toLowerCase() === "sell"
                          ? false
                          : true
                      }
                      applyClass={"DealBoxBitInput"}
                      thousandSeparator=','
                      maxLength={10}
                    />
                  </div>
                </Col>
                <Col sm={6} md={6} lg={6} className='mt-4'>
                  <div className={styles["DealViewModal_Input"]}>
                    <label className={styles["DealViewModal_label"]}>
                      Offer
                    </label>
                    <NumericFormat
                      customInput={InputFIeld}
                      onChange={(e) => handleChangeRate(e, "offer")}
                      value={offer}
                      disabled={
                        spotQuoteModalData?.side.toLowerCase() === "buy"
                          ? false
                          : true
                      }
                      applyClass={"DealBoxOfferInput"}
                      thousandSeparator=','
                      maxLength={10}
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
                  {spotQuoteModalData?.isRFQ ? (
                    <CustomButton
                      icon={<IconElement iconClass={"icon-send  fs-5"} />}
                      iconPosition={"left"}
                      value={"Submit"}
                      applyClass={"SubmitBtnDealBox"}
                      className={"px-4"}
                      onClick={handleSubmit}
                    />
                  ) : (
                    <>
                      {" "}
                      <CustomButton
                        icon={<IconElement iconClass={"icon-send  fs-5"} />}
                        iconPosition={"left"}
                        value={"Accept"}
                        applyClass={"AcceptBtnDealBox"}
                        className={"px-4"}
                        onClick={handleSubmit}
                      />
                      <CustomButton
                        value={"Reject"}
                        icon={<IconElement iconClass={"icon-close fs-4"} />}
                        iconPosition={"left"}
                        applyClass={"RejectBtnDealBox"}
                        className={"px-4"}
                      />{" "}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default SpotQuoteModal;
