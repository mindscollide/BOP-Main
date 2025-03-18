import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ForgotPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
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
            <span className="mb-4">Please type your full email</span>
            <InputGroup className="mb-3">
              <InputGroup.Text className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-user"} />
              </InputGroup.Text>
              <Form.Control
                name='UserName'
                autoComplete='off'
                className={styles["form-comtrol-textfield"]}
                placeholder='Email ID'
                aria-label='Username'
                aria-describedby='basic-addon1'
              />
            </InputGroup>

            <CustomButton value={"Recover"} applyClass={"authLoginBtn"} />
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
