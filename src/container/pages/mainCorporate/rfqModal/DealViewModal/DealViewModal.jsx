import GlobalModal from "@/components/common/globalModal/Modal";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./DealViewModal.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setViewDealModal } from "@/store/modalSlice/modalSlicer";

const DealViewModal = () => {
  const dispatch = useDispatch()
  const viewDealModal = useSelector(
    (state) => state.modalReducer.viewDealModal
  );

  const closeModal = () => {
    dispatch(setViewDealModal(false));
  }
  return (
    <GlobalModal
      show={viewDealModal}
      size={"md"}
      bodyClassName={"py-0 px-0 overflow-hidden"}
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
                  <p className={styles["DealViewModal__value"]}>Sell</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Nature
                  </label>
                  <p className={styles["DealViewModal__value"]}>ENCASHMENT</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY1</label>
                  <p className={styles["DealViewModal__value"]}>EUR</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>10000</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>CCY2</label>
                  <p className={styles["DealViewModal__value"]}>PKR</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Amount
                  </label>
                  <p className={styles["DealViewModal__value"]}>11285.00</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    LC No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>aa</p>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <label className={styles["DealViewModal__label"]}>
                    Account No.
                  </label>
                  <p className={styles["DealViewModal__value"]}>1213212</p>
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
                  <p className={styles["PartyName"]}>Gul Ahmed</p>
                  <span>18-06-2025/31f7</span>
                </Col>
                <Col
                  sm={2}
                  md={2}
                  lg={2}
                  className='d-flex justify-content-center'>
                  <IconElement onClick={closeModal} iconClass={"icon-close fs-4 cursor-pointer"} />
                </Col>
              </Row>
              <Row className='mt-5'>
                <Col sm={6} md={6} lg={6} className='mt-4'>
                  <div className={styles["DealViewModal_Input"]}>
                    <label className={styles["DealViewModal_label"]}>Bid</label>
                    <InputFIeld
                      applyClass={"DealBoxBitInput"}
                      disabled={true}
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
                      disabled={true}
                      value={"1.12850"}
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
                    icon={<IconElement iconClass={"icon-check fs-5"} />}
                    iconPosition={"left"}
                    value={"Accept"}
                    applyClass={"AcceptBtnDealBox"}
                    className={"px-4"}
                  />
                  <CustomButton
                    value={"Reject"}
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
