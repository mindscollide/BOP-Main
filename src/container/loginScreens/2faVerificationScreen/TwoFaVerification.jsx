import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./TwoFaVerification.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import InputFIeld from "@/components/common/inputField/InputField";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
const TwoFaVerification = () => {
  const [otpValue, setOtpValue] = useState("");
  console.log(otpValue, "otpValueotpValueotpValue");
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
        <Col sm={12} md={12} lg={12}>
          <section className={styles["LoginCard"]}>
            <h4 className={styles["twoFaHeading"]}>2FA Verification</h4>
            <p className={styles["tagLineOtp"]}>Enter your verification code</p>
            <OtpInput
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
              numInputs={6}
              // inputType="number"
              inputStyle={styles["OTPInputField"]}
              containerStyle={styles["OTPContainerStyle"]}
              renderInput={(props) => <input {...props} />}
            />
            <div className='mb-4'>
              <span className='me-2'>Didn't Receive the Code?</span>
              <span className='me-2'> Resend Code</span>
              <span>00:00</span>
            </div>

            <CustomButton value={"NEXT"} applyClass={"authLoginBtn"} />
            <Link to='/' className={styles["GoBackLink"]}>
              Go Back
            </Link>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default TwoFaVerification;
