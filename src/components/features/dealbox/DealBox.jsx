import CustomButton from "@/components/common/globalButton/button";
import React from "react";
import styles from "./DealBox.module.css";
import { Col, Row } from "react-bootstrap";
import IconElement from "@/components/common/IconElement/IconElement";

const DealBox = () => {
  return (
    <section className={styles["DealBoxContainer"]}>
      <Row>
        <Col sm={10} md={10} lg={10} className={styles["DealBox__Heading"]}>
          You have a new deal
        </Col>
        <Col sm={2} md={2} lg={2} className="d-flex justify-content-end px-0">
          <IconElement  iconClass={"icon-close cursor-pointer"}/>
        </Col>
      </Row>

      <Row className='my-3'>
        <Col sm={4} md={4} lg={12}>
          ID
        </Col>

        <Col sm={8} md={8} lg={12}>
          27-06-2024/f9f2
        </Col>
      </Row>
      <Row className='my-3'>
        <Col sm={4} md={4} lg={12}>
          Type
        </Col>
        <Col sm={8} md={8} lg={12}>
          Sell
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} className='d-flex justify-content-end'>
          <CustomButton applyClass={"viewDealBtn"} value={"View Deal"} />
        </Col>
      </Row>
    </section>
  );
};

export default DealBox;
