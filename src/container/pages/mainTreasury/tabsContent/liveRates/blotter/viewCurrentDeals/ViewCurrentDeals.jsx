import React, { useEffect, useState } from "react";
import styles from "./ViewCurrentDeals.module.css";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  setBlotterTransactionAddedForTreasuryDealBox,
  setBlotterTransactionRFQExpiredForTreasuryDealBox,
  setBlotterTransactionRFQQuotedForTreasuryDealBox,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { convertDateTimeIntoLocal } from "@/utils/formatters";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RFQTImer } from "@/components/utils/Timer";
import { ExpireRFQTransaction } from "../BlotterActions";
import { formatDateTimeToUTCTime } from "@/components/utils/timeFunction";

const ViewCurrentDeals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBlotterOutstandingData = useSelector(
    (state) => state.BlotterSlicer.getBlotterOutstandingData
  );
  const blotterTransactionAdded = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionAddedForTreasuryDealBox
  );
  const blotterTransactionRFQExpired = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionRFQExpiredForTreasuryDealBox
  );
  const blotterTransactionRFQQuoted = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionRFQQuotedForTreasuryDealBox
  );

  const [outStandingData, setOutStandingData] = useState([]);

  useEffect(() => {
    try {
      if (getBlotterOutstandingData && getBlotterOutstandingData !== null) {
        setOutStandingData(getBlotterOutstandingData.outstandingDeals);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [getBlotterOutstandingData]);

  useEffect(() => {
    if (blotterTransactionAdded !== null) {
      try {
        const { transaction } = blotterTransactionAdded;
        let ishasAlready = outStandingData.find(
          (data, index) =>
            data.pK_TransactionID === transaction?.pK_TransactionID
        );
        if (ishasAlready === undefined) {
          setOutStandingData([transaction, ...outStandingData]);
        }
        dispatch(setBlotterTransactionAddedForTreasuryDealBox(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionAdded");
      }
    }
  }, [blotterTransactionAdded]);

  useEffect(() => {
    if (blotterTransactionRFQExpired !== null) {
      try {
        const { transaction } = blotterTransactionRFQExpired;
        setOutStandingData((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(setBlotterTransactionRFQExpiredForTreasuryDealBox(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionRFQExpired]);

  useEffect(() => {
    if (blotterTransactionRFQQuoted !== null) {
      try {
        const { transaction } = blotterTransactionRFQQuoted;
        setOutStandingData((prevBlotterData) => {
          return prevBlotterData.filter(
            (tblData, index) =>
              tblData.pK_TransactionID !== transaction?.pK_TransactionID
          );
        });
        dispatch(setBlotterTransactionRFQQuotedForTreasuryDealBox(null));
      } catch (error) {
        console.log(error, "error in blotterTransactionRFQExpired");
      }
    }
  }, [blotterTransactionRFQQuoted]);

  return (
    <div className={styles["currentDealsBox"]}>
      <Row>
        <Col sm={6} md={6} lg={6} className='fs-sm color-black fw-bold'>
          TXN ID
        </Col>
        <Col sm={6} md={6} lg={6} className='fs-sm color-black fw-bold'>
          Time Left
        </Col>
      </Row>
      {outStandingData.length > 0 &&
        outStandingData.map((record, index) => {
          let Data = { PK_TransactionID: record.pK_TransactionID };
          // ExpireRFQTransaction({navigate, Data})
          let isRFQ = record.isRFQ
            ? (record.statusID === 2 || record.statusID === 5) &&
              record.rfqTimerDetails !== null &&
              record.rfqTimerDetails?.isEnded === false
              ? true
              : false
            : false;
          let rfqTimer =
            isRFQ && record.rfqTimerDetails.endTime
              ? convertDateTimeIntoLocal(record.rfqTimerDetails.endTime)
              : null;

          if (isRFQ) {
            return (
              <Row className='my-2 '>
                <Col sm={6} md={6} lg={6} className='fs-sm color-black fw-bold d-flex align-items-center'>
                  {record.txnid}
                </Col>
                <Col sm={6} md={6} lg={6} className='fs-sm color-black fw-bold'>
                  {formatDateTimeToUTCTime(record.rfqTimerDetails.endTime)}{" "}
                  <RFQTImer
                    endTime={rfqTimer}
                    dispatch={dispatch}
                    apiFunction={ExpireRFQTransaction}
                    navigate={navigate}
                    Data={Data}
                  />
                </Col>
              </Row>
            );
          }
        })}
    </div>
  );
};

export default ViewCurrentDeals;
