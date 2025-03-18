import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ForgotPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link, useNavigate } from "react-router-dom";
import { resetAndForgotPassword } from "./forgotPassword_Actions";
import { emailValidation } from "@/common/utils";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.authReducer) 
  console.log(state, "statestatestate")
  const [email, setEmail] = useState("");

  const handleClickResetBtn = (e) => {
    e.preventDefault();
    const isValidEmail = emailValidation(email);
    if (isValidEmail) {
      let Data = {
        Email: email,
      };
      dispatch(resetAndForgotPassword({ navigate, Data }));
    }
  };
  const handleChangeEmailInput = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      if (value !== "") {
        setEmail(value);
      } else {
      }
    } else {
    }
  };

  console.log(email, "emailemailemail");
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
            <h4 className={styles["Heading-js"]}>Forgot Passowrd?</h4>
            <span className='mb-4'>Please type your full email</span>
            <InputGroup className='mb-3'>
              <InputGroup.Text className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-user"} />
              </InputGroup.Text>
              <Form.Control
                name='email'
                autoComplete='off'
                className={styles["form-comtrol-textfield"]}
                placeholder='Email ID'
                onChange={handleChangeEmailInput}
                value={email}
                required={true}
                pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                aria-label='Username'
                aria-describedby='basic-addon1'
              />
            </InputGroup>

            <CustomButton
              value={"Recover"}
              type='submit'
              onClick={handleClickResetBtn}
              applyClass={"authLoginBtn"}
            />
            <span className='mt-2'>
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
