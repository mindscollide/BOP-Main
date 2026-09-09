import React from "react";
import { Col, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ForgotPassword.module.css";


const ForgotPasswordEmailSentTo = () => {
  return (
    <section className={styles["sign-in"]}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className='d-flex justify-content-center mt-5 '>
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width='300'
            className='img-fluid'
            alt='BOP Logo'
          />
        </Col>
        <Col sm={12} md={12} lg={12} className='d-flex justify-content-center'>
          <section className={styles["forgetPasswordEMailSentPage"]}>
            <h4 className={styles["Heading-passwordResetEMailSentTo"]}>
              {`Email has been sent `}
            </h4>
            {/* <h4>{localStorage.getItem.email}</h4> */}
            <span className='d-block text-center mb-4'>
              Please check your email and click on the Password Reset Link
            </span>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPasswordEmailSentTo;
