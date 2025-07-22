import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./TwoFaVerification.module.css";
import CustomButton from "@/components/common/globalButton/button";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { VerifyOTPApi } from "../Login/logInAction";
import { useDispatch } from "react-redux";
const TwoFaVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    // Save intervalId to clear the interval when the component unmounts
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleSaveOtp = () => {
    try {
      if (otpValue.length !== 6) {
        setErrorState(true);
      } else {
        let Data = {
          UserID: Number(localStorage.getItem("userID")),
          Email: localStorage.getItem("email"),
          OTP: otpValue,
          DeviceID: "1",
          Device: "browser",
        };
        dispatch(VerifyOTPApi({ navigate, Data }));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleOTPChange = (value) => {
    setOtpValue(value);
    setErrorState(false);
  };

  const handleResendCode = () => {
    if (!canResend) return;

    // Add your resend code logic here
    console.log("Resending code...");

    // Reset the timer
    setTimeLeft(300);
    setCanResend(false);
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <section className={styles["sign-in"]}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="d-flex justify-content-center mt-5 "
        >
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width="300"
            className="img-fluid"
            alt="BOP Logo"
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <section className={styles["LoginCard"]}>
            <h4 className={styles["twoFaHeading"]}>2FA Verification</h4>
            <p className={styles["tagLineOtp"]}>Enter your verification code</p>
            <OtpInput
              value={otpValue}
              onChange={handleOTPChange}
              numInputs={6}
              // inputType="number"
              inputStyle={styles["OTPInputField"]}
              containerStyle={styles["OTPContainerStyle"]}
              renderInput={(props) => <input {...props} />}
            />
            {errorState && (
              <div className={styles["error_msg"]}>
                Please fill all the fields of OTP
              </div>
            )}
            <div className="mb-4">
              <span className="me-2">Didn't Receive the Code?</span>
              <span
                className={`me-2 ${
                  canResend ? styles["resendEnabled"] : styles["resendDisabled"]
                }`}
                onClick={handleResendCode}
              >
                Resend Code
              </span>
              {!canResend && <span>{formatTime(timeLeft)}</span>}
            </div>

            <CustomButton
              value={"NEXT"}
              applyClass={"authLoginBtn"}
              onClick={handleSaveOtp}
            />
            <Link to="/" className={styles["GoBackLink"]}>
              Go Back
            </Link>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default TwoFaVerification;
