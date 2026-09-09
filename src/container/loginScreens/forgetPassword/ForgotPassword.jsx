import React, { useRef, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ForgotPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link, useNavigate } from "react-router-dom";
import { resetAndForgotPassword } from "./forgotPassword_Actions";
import { ForgotPasswordApi } from "../authActions/AuthActions";
import { emailValidation } from "@/common/utils";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { message } from "antd";

const shouldIsCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
const shouldIsBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const shouldIsDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
const shouldIsTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.authReducer);
  // console.log(state, "statestatestate");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ status: false, message: "" });

  const handleClickResetBtn = (e) => {
    e.preventDefault();
    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
      setEmailError({ status: true, message: "Enter a valid email address" });
      return;
    }
    setEmailError({ status: false, message: "" });

    if (shouldIsCorporate) {
      let Data = { Email: email };
      dispatch(resetAndForgotPassword({ navigate, Data }));
      return;
    }

    let Data = {
      Email: email,
      RoleID: shouldIsBranch ? 9 : shouldIsDealer ? 7 : shouldIsTreasury ? 8 : 0,
    };
    dispatch(ForgotPasswordApi({ Data, navigate }))
      .unwrap()
      .then(() => {
        navigate("/emailsent", { state: Data });
      })
      .catch((error) => {
        setEmailError({
          status: true,
          message: error || "Something went wrong",
        });
      });
  };

  const emailRef = useRef(null);
  const handleChangeEmailInput = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      if (value !== "") {
        setEmail(value);
        const isValidEmail = emailValidation(value);
        if (isValidEmail) {
          setEmailError({ status: false, message: "" });
        }
      } else {
        setEmail("");
        setEmailError({ status: true, message: "Enter a valid email address" });
      }
    }
  };

  const handleKeyDown = (e, fieldName) => {
    // console.log(e, fieldName, "testestets");
    if (e.key === "Enter") {
      e.preventDefault();
      if (fieldName === "email") {
        handleClickResetBtn(e);
      }
    }
    // For non-corporate login (no email validation required)
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
            <h4 className={styles["Heading-js"]}>Forgot Passowrd?</h4>
            <span className="mb-4 text-center">
              Please type your full email
            </span>
            <>
              <InputGroup>
                <InputGroup.Text className={styles["Icon-Field-class"]}>
                  <IconElement iconClass={"icon-user"} />
                </InputGroup.Text>
                <Form.Control
                  name="email"
                  ref={emailRef}
                  onKeyDown={(e) => handleKeyDown(e, "email")}
                  autoComplete="off"
                  className={styles["form-comtrol-textfield"]}
                  placeholder="Email ID"
                  onChange={handleChangeEmailInput}
                  value={email}
                  required={true}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {emailError.status === true && (
                <p className={styles["emailErrorText"]}>{emailError.message}</p>
              )}
            </>

            <CustomButton
              className="mt-3"
              value={"Recover"}
              // type="submit"
              onClick={handleClickResetBtn}
              applyClass={"authLoginBtn"}
              disabled={email ? false : true}
            />
            <span className="mt-2 text-center">
              <Link className={styles["forgotPasswordLink"]} to={"/"}>
                Back to Login
              </Link>
            </span>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;
