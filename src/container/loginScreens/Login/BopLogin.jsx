import React, { Fragment, useState } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginInApi } from "../authActions/logInAction";
const BopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [crendentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const disaptch = useDispatch();
  const [showPassowrd, setShowPassword] = useState(false);

  const handleChangeFields = (e) => {
    const { name, value } = e.target;
    if(name === "email") {

    } else if(name === "password") {
      
    }
  };
  const handleSubmit = () => {
    let Data = {
      UserName: "talha1234",
      Password: "0",
      DeviceID: "ABCD1234-5678-90EF-GHIJ-KLMNOPQRSTUV",
      Device: "iPhone 13 Pro",
    };
    disaptch(loginInApi({ Data }));
  };
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
            <h4 className={styles["Heading-js"]}>Corporate Login</h4>
            <InputGroup>
              <InputGroup.Text className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-user"} />
              </InputGroup.Text>
              <Form.Control
                name='email'
                autoComplete='off'
                className={styles["form-comtrol-textfield"]}
                placeholder='Email ID'
                required
                onChange={handleChangeFields}
                type='email'
                pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                aria-label='email'
                maxLength={100}
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <InputGroup className='my-3'>
              <InputGroup.Text
                id='basic-addon1'
                className={styles["Icon-Field-class"]}>
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name='password'
                autoComplete='off'
                className={styles["form-comtrol-textfield-password"]}
                placeholder='Password'
                required
                onChange={handleChangeFields}
                type={showPassowrd ? "text" : "password"}
                aria-label='password'
                aria-describedby='basic-addon2'
              />
              <InputGroup.Text
                id='basic-addon2'
                className={styles["eyeIcon-Field-class-BOP-login"]}>
                {showPassowrd ? (
                  <IconElement
                    iconClass={"icon-eye-slash"}
                    onClick={() => setShowPassword(!showPassowrd)}
                  />
                ) : (
                  <IconElement
                    iconClass={"icon-eye"}
                    onClick={() => setShowPassword(!showPassowrd)}
                  />
                )}
              </InputGroup.Text>
            </InputGroup>

            <CustomButton
              value={"Login"}
              onClick={handleSubmit}
              applyClass={"authLoginBtn"}
            />
            <span className='mt-2'>
              <Link
                to={"/forgotpassword"}
                className={styles["forgotPasswordLink"]}>
                Forgot Password?
              </Link>
            </span>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
