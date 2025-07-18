import GlobalModal from "@/components/common/globalModal/Modal";
import React, { useEffect, useState } from "react";
import styles from "./InfoTransaction.module.css";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTransactionInfoModal } from "@/store/modalSlice/modalSlicer";
import {
  clearGetFEDiscountingTransactionDetails,
  clearGetForwardTransactionDetails,
  clearGetNonFEDiscountingTransactionDetails,
  clearGetSpotTransactionDetails,
} from "@/store/BlotterSlicer/BlotterSlicer";
import {
  extractTimeFromCompactDate,
  formatCompactDateTime,
} from "@/components/utils/timeFunction";

const InfoTransaction = () => {
  const dispatch = useDispatch();
  const [InfoRecord, setInfoRecord] = useState(null);

  const GetNonFEDiscountingTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetNonFEDiscountingTransactionDetails
  );
  const GetFEDiscountingTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetFEDiscountingTransactionDetails
  );

  const GetForwardTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetForwardTransactionDetails
  );

  const GetSpotTransactionDetails = useSelector(
    (state) => state.BlotterSlicer.GetSpotTransactionDetails
  );
  console.log(GetForwardTransactionDetails, "GetForwardTransactionDetails");

  useEffect(() => {
    if (GetFEDiscountingTransactionDetails !== null) {
      setInfoRecord(GetFEDiscountingTransactionDetails.transactionDetailsModel);
    } else if (GetNonFEDiscountingTransactionDetails !== null) {
      setInfoRecord(
        GetNonFEDiscountingTransactionDetails.transactionDetailsModel
      );
    } else if (GetForwardTransactionDetails !== null) {
      setInfoRecord(GetForwardTransactionDetails.transactionDetailsModel);
    } else if (GetSpotTransactionDetails !== null) {
      setInfoRecord(GetSpotTransactionDetails.transactionDetailsModel);
    }
  }, [
    GetSpotTransactionDetails,
    GetForwardTransactionDetails,
    GetFEDiscountingTransactionDetails,
    GetNonFEDiscountingTransactionDetails,
  ]);

  const handleclose = () => {
    dispatch(setTransactionInfoModal(false));
    dispatch(clearGetFEDiscountingTransactionDetails());
    dispatch(clearGetSpotTransactionDetails());
    dispatch(clearGetNonFEDiscountingTransactionDetails());
    dispatch(clearGetForwardTransactionDetails());
  };

  console.log("Data: ", { InfoRecord: InfoRecord });
  return (
    <GlobalModal
      centered={true}
      show={true}
      size={"md"}
      onHide={handleclose}
      bodyClassName={styles["transactionModal__body"]}
      modalBody={
        <>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className="d-flex align-items-center gap-1"
            >
              <p className={styles["company-name-hd"]}>
                {InfoRecord?.corporateName}
              </p>
              <span className={styles["dealstatus"]}>{InfoRecord?.status}</span>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm={12} md={12} lg={12}>
              <p className={styles["txn_id"]}>{InfoRecord?.txnid}</p>
            </Col>
          </Row>

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Branch Name</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.branchName}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Branch Code</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.branchCode}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p className={styles["transactionInfolabelInititedBy"]}>
                  Initiated By
                </p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <Row>
                  <p className={styles["transactionInfolabel"]}>
                    {InfoRecord?.initiatedByUserName
                      ? InfoRecord?.initiatedByUserName
                      : "N/A"}
                  </p>
                  <p className={styles["transactionInfolabelEmail"]}>
                    {InfoRecord?.initiatedByUserEmail
                      ? InfoRecord?.initiatedByUserEmail
                      : "N/A"}
                  </p>
                </Row>
              </Col>
            </Row>
          )}
          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>TYPE</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.side}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Nature</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.nature}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Currency Pair</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.ccY1}
                  {InfoRecord?.ccY2}
                </p>
              </Col>
            </Row>
          )}

          {InfoRecord?.natureType === 1 && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Rate</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.rate}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Amount</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.amount}
                </p>
              </Col>
            </Row>
          )}

          {InfoRecord?.natureType === 1 && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Date</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {formatCompactDateTime(InfoRecord?.tradeDateTime)}
                </p>
              </Col>
            </Row>
          )}
          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Tenor</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.tenorDays}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Maturity Date</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {formatCompactDateTime(InfoRecord?.tradeDateTime)}
                </p>
              </Col>
            </Row>
          )}
          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Option Days</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.optionsDays}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  Option End Date
                </p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.optionsDate
                    ? formatCompactDateTime(InfoRecord?.optionsDate)
                    : "N/A"}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Ready</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.ready}
                </p>
              </Col>
            </Row>
          )}

          {InfoRecord?.natureType === 3 && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>SOFR</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>{"N/A"}</p>
              </Col>
            </Row>
          )}

          {InfoRecord?.natureType === 4 && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>KIBOR</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.kibor}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 2 || InfoRecord?.natureType === 4) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Swap</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.swap}
                </p>
              </Col>
            </Row>
          )}
          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  TXN Accepted Time
                </p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {extractTimeFromCompactDate(InfoRecord?.settlementDateTime)}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 1 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p className={styles["transactionInfolabelInititedBy"]}>
                  Accepted By
                </p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <Row>
                  <p className={styles["transactionInfolabel"]}>
                    {InfoRecord?.acceptedByUserName
                      ? InfoRecord?.acceptedByUserName
                      : "N/A"}
                  </p>
                  <p className={styles["transactionInfolabelEmail"]}>
                    {InfoRecord?.acceptedByUserEmail
                      ? InfoRecord?.acceptedByUserEmail
                      : "N/A"}
                  </p>
                </Row>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Cancelled Time</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.cancelledTime !== "N/A"
                    ? extractTimeFromCompactDate(InfoRecord?.cancelledTime)
                    : InfoRecord?.cancelledTime}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 1 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p className={styles["transactionInfolabelInititedBy"]}>
                  Cancelled By
                </p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <Row>
                  <p className={styles["transactionInfolabel"]}>
                    {InfoRecord?.cancelledByUserName
                      ? InfoRecord?.cancelledByUserName
                      : "N/A"}
                  </p>
                  <p className={styles["transactionInfolabelEmail"]}>
                    {InfoRecord?.cancelledByUserEmail
                      ? InfoRecord?.cancelledByUserEmail
                      : "N/A"}
                  </p>
                </Row>
              </Col>
            </Row>
          )}
          {InfoRecord?.natureType === 1 && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>LC NO</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.lcNumber !== "" ? InfoRecord?.lcNumber : "-"}
                </p>
              </Col>
            </Row>
          )}
          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>LC/Doc. NO</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.lcNumber !== "" ? InfoRecord?.lcNumber : "-"}
                </p>
              </Col>
            </Row>
          )}

          {(InfoRecord?.natureType === 3 ||
            InfoRecord?.natureType === 4 ||
            InfoRecord?.natureType === 2 ||
            InfoRecord?.natureType === 1) && (
            <Row>
              <span className={styles["span_underline"]} />
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>Account #</p>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <p className={styles["transactionInfolabel"]}>
                  {InfoRecord?.accountNumber}
                </p>
              </Col>
              <span className={styles["span_underline"]} />
            </Row>
          )}
        </>
      }
    />
  );
};

export default InfoTransaction;
