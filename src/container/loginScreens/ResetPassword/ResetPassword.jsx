import React, { useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./ResetPassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
const ResetPassword = () => {
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
            <h4 className={styles["Heading-js"]}>Reset Password</h4>
            <InputGroup className='mb-3'>
              <InputGroup.Text
                id='basic-addon1'
                className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name='passwordText'
                autoComplete='off'
                className={styles["form-comtrol-textfield-password"]}
                placeholder='Password'
                aria-label='passwordText'
                aria-describedby='basic-addon2'
              />
              <InputGroup.Text
                id='basic-addon2'
                className={styles["eyeIcon-Field-class-BOP-login"]}>
                <IconElement iconClass={"icon-eye"} />
                {/* {showPassword ? (
                  <IconElement iconClass={"icon-eye-slash"} />
                ) : (
                  <IconElement iconClass={"icon-eye"} />
                )} */}
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text
                id='basic-addon1'
                className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name='passwordText'
                autoComplete='off'
                className={styles["form-comtrol-textfield-password"]}
                placeholder='New Confirm Password'
                aria-label='passwordText'
                aria-describedby='basic-addon2'
              />
              <InputGroup.Text
                id='basic-addon2'
                className={styles["eyeIcon-Field-class-BOP-login"]}>
                <IconElement iconClass={"icon-eye"} />
                {/* {showPassword ? (
                  <IconElement iconClass={"icon-eye-slash"} />
                ) : (
                  <IconElement iconClass={"icon-eye"} />
                )} */}
              </InputGroup.Text>
            </InputGroup>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span>
                <IconElement
                  applyClass={styles["closeIcon"]}
                  iconClass={"icon-close"}
                />
                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Length of at least 8 characters</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span>
                <IconElement
                  applyClass={styles["closeIcon"]}
                  iconClass={"icon-close"}
                />
                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Contains numbers</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span>
                <IconElement
                  applyClass={styles["closeIcon"]}
                  iconClass={"icon-close"}
                />
                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Contains special characters</span>
            </div>
            <div className='d-flex gap-1 align-items-end mb-2'>
              <span>
                {/* <IconElement
                  applyClass={styles["closeIcon"]}
                  iconClass={"icon-close"}
                /> */}
                <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                />
              </span>{" "}
              <span>Password match</span>
            </div>
            <CustomButton
              disabled={true}
              value={"Change Password"}
              applyClass={"changePasswordBtn"}
            />
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default ResetPassword;
