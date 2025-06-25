import CustomButton from "@/components/common/globalButton/button";
import React, { useEffect } from "react";
import styles from "./DealBox.module.css";

import { Col, Row } from "react-bootstrap";
import IconElement from "@/components/common/IconElement/IconElement";
import { useDispatch } from "react-redux";
import {
  setDealModalRequest,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import { motion } from "framer-motion";

const DealBox = () => {
  const dispatch = useDispatch();
  const openViewDealModal = () => {
    dispatch(setDealModalRequest(false));
    dispatch(setViewDealModal(true));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setDealModalRequest(false));
    }, 3000);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles["DealBoxContainer"]}>
      <Row>
        <Col sm={10} md={10} lg={10} className={styles["DealBox__Heading"]}>
          You have a new deal
        </Col>
        <Col sm={2} md={2} lg={2} className='d-flex justify-content-end px-0'>
          <IconElement
            onClick={() => dispatch(setDealModalRequest(false))}
            iconClass={"icon-close cursor-pointer"}
          />
        </Col>
      </Row>

      <Row className='my-3'>
        <Col sm={4} md={4} lg={4}>
          ID
        </Col>

        <Col sm={8} md={8} lg={8}>
          27-06-2024/f9f2
        </Col>
      </Row>
      <Row className='my-3'>
        <Col sm={4} md={4} lg={4}>
          Type
        </Col>
        <Col sm={8} md={8} lg={8}>
          Sell
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12} className='d-flex justify-content-end'>
          <CustomButton
            applyClass={"viewDealBtn"}
            onClick={openViewDealModal}
            value={"View Deal"}
          />
        </Col>
      </Row>
    </motion.section>
  );
};

export default DealBox;
