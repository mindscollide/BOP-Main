import CustomButton from "@/components/common/globalButton/button";
import React, { useEffect, useState } from "react";
import styles from "./DealBox.module.css";

import { Col, Row } from "react-bootstrap";
import IconElement from "@/components/common/IconElement/IconElement";
import { useDispatch } from "react-redux";
import {
  setDealModalRequest,
  setDiscountingQuoteModal,
  setForwardQuoteModal,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import { motion } from "framer-motion";
import { setBlotterTransactionAddedForTreasuryDealBox } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useSelector } from "react-redux";
import {
  setActiveTreasuryTab,
  setDiscountingQuoteModalData,
  setForwardQuoteModalData,
  setSpotQuoteModalData,
} from "@/store/BlotterSlicer/BlotterSlicer";
import { useNavigate } from "react-router-dom";

const DealBox = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState(null);
  const blotterTransactionAdded = useSelector(
    (state) => state.RealtimeActionsSlice.BlotterTransactionAddedForTreasury
  );

  console.log(
    blotterTransactionAdded,
    transactionData,
    "blotterTransactionAddedblotterTransactionAdded"
  );

  const dispatch = useDispatch();
  const openViewDealModal = () => {
    navigate("/BOP/treasury");
    localStorage.setItem("activeTreasuryTab", "Live Rates");
    dispatch(setActiveTreasuryTab("Outstanding Deals"));
    dispatch(setDealModalRequest(false));
    dispatch(setBlotterTransactionAddedForTreasuryDealBox(null));
    // if (transactionData.natureType === 1) {
    //   dispatch(setViewDealModal(true));
    //   dispatch(setSpotQuoteModalData(transactionData));
    // } else if (transactionData.natureType === 2) {
    //   dispatch(setForwardQuoteModal(true));
    //   dispatch(setForwardQuoteModalData(transactionData));
    // } else if (
    //   transactionData.natureType === 3 ||
    //   transactionData.natureType === 4
    // ) {
    //   dispatch(setDiscountingQuoteModal(true));
    //   dispatch(setDiscountingQuoteModalData(transactionData));
    // }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(setDealModalRequest(false));
    //   dispatch(setBlotterTransactionAddedForTreasuryDealBox(null));
    // }, 9000);
  }, []);

  useEffect(() => {
    if (blotterTransactionAdded !== null) {
      try {
        const { transaction } = blotterTransactionAdded;
        setTransactionData(transaction);
      } catch (error) {}
    }
  }, [blotterTransactionAdded]);

  const handleClosePopup = () => {
    dispatch(setDealModalRequest(false));
    dispatch(setBlotterTransactionAddedForTreasuryDealBox(null));
  };

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
            onClick={handleClosePopup}
            iconClass={"icon-close cursor-pointer"}
          />
        </Col>
      </Row>

      <Row className='my-3'>
        <Col sm={4} md={4} lg={4}>
          ID
        </Col>

        <Col sm={8} md={8} lg={8}>
          {transactionData?.txnid}
        </Col>
      </Row>
      <Row className='my-3'>
        <Col sm={4} md={4} lg={4}>
          Type
        </Col>
        <Col sm={8} md={8} lg={8}>
          {transactionData?.side}
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
