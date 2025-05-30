import GlobalModal from "@/components/common/globalModal/Modal";
import { useModal } from "@/context/ModalContext";
import React from "react";
import styles from "./InfoTransaction.module.css";
import { Col, Row } from "react-bootstrap";

const InfoTransaction = ({ InfoRecord, setInfoRecord }) => {
  const { transactionInfoModal, setTransactionInfoModal } = useModal();
  console.log(InfoRecord, "transactionRecordtransactionRecord")

  const handleclose = () => {
    setInfoRecord(null);
    setTransactionInfoModal(false);
  };
  return (
    <GlobalModal
      centered={true}
      show={transactionInfoModal}
      size={"md"}
      onHide={handleclose}
      backdrop={true}
      bodyClassName={styles["transactionModal__body"]}
      modalBody={
        <>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className='d-flex align-items-center gap-1'>
              <p className={styles["company-name-hd"]}>test</p>
              <span className={styles["dealstatus"]}>Accepted</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={12} md={12} lg={12}>
              <p className={styles["txn_id"]}>14-05-2025/c619</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Branch Name</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>{InfoRecord?.counterPartyName}</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Branch Code</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>5002</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>TYPE</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Sell</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Nature</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>1</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Currency Pair</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>USDPKR</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Rate</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>289.00</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Amount</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>N/A</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Date</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>N/A</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>TXN TIME</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>14:38 pm</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Cancelled Time</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>N/A</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>LC NO</p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>qwe</p>
            </Col>
          </Row>
          <Row>
            <span className={styles["span_underline"]} />

            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>Account # </p>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <p className={styles["transactionInfolabel"]}>asd</p>
            </Col>
            <span className={styles["span_underline"]} />
          </Row>
        </>
      }
    />
  );
};

export default InfoTransaction;
