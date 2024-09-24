import React, { Fragment } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import IconElement from "@/components/common/IconElement/IconElement";
import Icon from "react-multi-date-picker/components/icon";
import CustomButton from "@/components/common/globalButton/button";
const BopLogin = () => {
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
        <Col sm={12} md={12} lg={12} className=' mt-5'>
          <section className={styles["LoginCard"]}>
            <h4 className={styles["Heading-js"]}>Corporate Login</h4>
            <InputGroup>
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
            <InputGroup className='mt-3'>
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

            <CustomButton value={"Login"} applyClass={"publishBtn"} />
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
