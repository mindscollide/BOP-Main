import React, { Fragment, useEffect, useState } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { corporateUserLoginInApi, loginInApi } from "./logInAction";
import { emailValidation } from "@/common/utils";
import { updateEmail, updatePassword, updateUsername } from "./Loginfunctions";

// Conditionally import CustomButton based on the environment variables
const shouldIsCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const BopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [crendentials, setCredentials] = useState({
    email: "",
    password: "",
    hasErrorOnEmail: false,
    hasEmailisValid: true,
    hasErrorOnPassword: false,
    hasErrorOnUserName: false,
  });
  const [showPassowrd, setShowPassword] = useState(false);
  useEffect(() => {
    localStorage.clear();
  }, []);
  /**
   * Handles input field changes for email and password.
   * Validates email format and updates the credentials state.
   *
   * @param {object} e - Event object from the input field change.
   */
  const handleChangeFields = (e) => {
    const { name, value } = e.target;
    // Update the email field and handle validation
    if (name === "email") {
      updateEmail(value, setCredentials);
    }
    // Update the password field and handle validation
    if (name === "password") {
      updatePassword(value, setCredentials);
    }
    // Update the userName field and handle validation
    if (name === "username") {
      updateUsername(value, setCredentials);
    }
  };

  /**
   * Handles the submission of the login form.
   * Validates the credentials and dispatches the login action if valid.
   */
  const handleSubmit = () => {
    const {
      email,
      password,
      hasEmailisValid,
      hasErrorOnEmail,
      hasErrorOnPassword,
      hasErrorOnUserName, // Typo corrected in state initialization to hasErrorOnUserName
    } = crendentials;

    let Data;

    // Validation for Corporate login (shouldIsCorporate === true)
    if (shouldIsCorporate) {
      if (!hasEmailisValid) {
        alert("Email is Not Valid");
        return; // Early return to stop further execution
      }

      if (email && password && !hasErrorOnEmail && !hasErrorOnPassword) {
        Data = {
          Email: email,
          Password: password,
          DeviceID: "ABCD1234-5678-90EF-GHIJ-KLMNOPQRSTUV",
          Device: "iPhone 13 Pro",
        };
      } else {
        alert("Please fill out all required fields.");
        return;
      }

      // Dispatch the login API action for corporate user
      dispatch(corporateUserLoginInApi({ Data, navigate, shouldIsCorporate }));
    } else {
      // Validation for non-corporate login
      if (
        email &&
        password &&
        !hasErrorOnEmail &&
        !hasErrorOnPassword &&
        !hasErrorOnUserName
      ) {
        Data = {
          UserName: email,
          Password: password,
          DeviceID: "ABCD1234-5678-90EF-GHIJ-KLMNOPQRSTUV",
          Device: "iPhone 13 Pro",
        };

        // Dispatch the login API action for non-corporate user
        dispatch(loginInApi({ Data, navigate, shouldIsCorporate }));
      } else {
        alert("Please fill out all required fields.");
        return;
      }
    }
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
            <h4 className={styles["Heading-js"]}>
              {shouldIsCorporate === true && "Corporate Login"}
            </h4>
            {shouldIsCorporate === true ? (
              <>
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
                    value={crendentials.email}
                    onChange={handleChangeFields}
                    type='email'
                    // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                    aria-label='email'
                    maxLength={100}
                    aria-describedby='basic-addon1'
                  />
                </InputGroup>
                {crendentials.hasEmailisValid === false && (
                  <p style={{ textAlign: "left" }}>"Email is Not Valid"</p>
                )}
              </>
            ) : (
              <InputGroup>
                <InputGroup.Text className={styles["Icon-Field-class"]}>
                  <IconElement iconClass={"icon-user"} />
                </InputGroup.Text>
                <Form.Control
                  name='email'
                  autoComplete='off'
                  className={styles["form-comtrol-textfield"]}
                  placeholder='User Name'
                  required
                  value={crendentials.email}
                  onChange={handleChangeFields}
                  type='text'
                  // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                  aria-label='email'
                  maxLength={100}
                  aria-describedby='basic-addon1'
                />
              </InputGroup>
            )}

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
                value={crendentials.password}
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
            <p className='mt-2'>
              <Link
                to={"/forgotpassword"}
                className={styles["forgotPasswordLink"]}>
                Forgot Password?
              </Link>
            </p>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
