import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { useNotification } from "@/context/NotificationProvider";

// Conditionally import CustomButton based on the environment variables
const shouldIsCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const BopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  useEffect(() => {}, []);
  const [crendentials, setCredentials] = useState({
    email: "",
    password: "",
    hasErrorOnEmail: false,
    hasEmailisValid: true,
    hasErrorOnPassword: false,
    hasErrorOnUserName: false,
  });
  const [showPassowrd, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  /**
   * Handles input field changes for email and password.
   * Validates email format and updates the credentials state.
   *
   * @param {object} e - Event object from the input field change.
   */

  useEffect(() => {
    localStorage.clear();
  }, []);
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
  const handleSubmit = (e) => {
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
      console.log(shouldIsCorporate, "shouldIsCorporateshouldIsCorporate");
      if (!emailValidation(email) && email !== "") {
        const handleClick = () => {
          showMessage("Email should be in Valid Format");
        };
        handleClick();
        return;
      }

      if (email && password && !hasErrorOnEmail && !hasErrorOnPassword) {
        Data = {
          Email: email,
          Password: password,
          DeviceID: "1",
          Device: "Browser",
        };
        // Dispatch the login API action for corporate user
        dispatch(
          corporateUserLoginInApi({ Data, navigate, shouldIsCorporate })
        );
      } else {
        if (password === "") {
          setPasswordError("Please enter a password.");
        }
        if (!hasEmailisValid) {
          setEmailError("Enter a valid email address");
        }
        return;
      }
    } else {
      console.log("shouldIsCorporateshouldIsCorporate");
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
          DeviceID: "1",
          Device: "Browser",
        };

        // Dispatch the login API action for non-corporate user
        dispatch(loginInApi({ Data, navigate, shouldIsCorporate }));
      } else {
        if (password === "") {
          setPasswordError("Please enter a password");
        }
        if (email === "") {
          setUserNameError("Please enter a username");
        }
        return;
      }
    }
  };

  //  if (shouldIsCorporate && crendentials.email.includes("@")){}
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // Handle key down events
  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // For corporate login (email validation required)
      if (shouldIsCorporate) {
        if (fieldName === "email") {
          // Validate email before moving to password field
          if (crendentials.email && crendentials.hasEmailisValid) {
            passwordRef.current.focus();
          } else {
            if (!crendentials.email) {
              setEmailError("Please enter an email address");
            } else if (
              !crendentials.email.includes("@") ||
              !crendentials.hasEmailisValid
            ) {
              setEmailError("Enter a valid email address");
            }
          }
        } else if (fieldName === "password") {
          handleSubmit(e);
        }
      }
      // For non-corporate login (no email validation required)
      else {
        if (fieldName === "email") {
          // Only move to password if username is not empty
          if (crendentials.email) {
            passwordRef.current.focus();
          } else {
            setUserNameError("Please enter a username");
          }
        } else if (fieldName === "password") {
          handleSubmit(e);
        }
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
          <Form onSubmit={handleSubmit}>
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
                      name="email"
                      ref={emailRef}
                      onKeyDown={(e) => handleKeyDown(e, "email")}
                      autoComplete="off"
                      className={styles["form-comtrol-textfield"]}
                      placeholder="Email ID"
                      required
                      value={crendentials.email}
                      onChange={handleChangeFields}
                      type="email"
                      // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                      aria-label="email"
                      maxLength={100}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  {crendentials.hasEmailisValid === false && (
                    <p className="color-red fs-sm d-flex justify-content-start m-0">
                      {emailError}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <InputGroup>
                    <InputGroup.Text className={styles["Icon-Field-class"]}>
                      <IconElement iconClass={"icon-user"} />
                    </InputGroup.Text>
                    <Form.Control
                      ref={emailRef}
                      onKeyDown={(e) => handleKeyDown(e, "email")}
                      name="email"
                      autoComplete="off"
                      className={styles["form-comtrol-textfield"]}
                      placeholder="User Name"
                      required
                      value={crendentials.email}
                      onChange={handleChangeFields}
                      type="text"
                      // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                      aria-label="email"
                      maxLength={100}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  {crendentials.email === "" && (
                    <p className="color-red fs-sm d-flex justify-content-start m-0">
                      {userNameError}
                    </p>
                  )}
                </>
              )}

              <InputGroup className="mt-3">
                <InputGroup.Text
                  id="basic-addon1"
                  className={styles["Icon-Field-class"]}
                >
                  <IconElement iconClass={"icon-lock"} />
                </InputGroup.Text>
                <Form.Control
                  ref={passwordRef}
                  onKeyDown={(e) => handleKeyDown(e, "password")}
                  name="password"
                  autoComplete="off"
                  className={styles["form-comtrol-textfield-password"]}
                  placeholder="Password"
                  required
                  value={crendentials.password}
                  onChange={handleChangeFields}
                  type={showPassowrd ? "text" : "password"}
                  aria-label="password"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className={styles["eyeIcon-Field-class-BOP-login"]}
                >
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
              {crendentials.password === "" && (
                <p className="color-red fs-sm d-flex justify-content-start m-0">
                  {passwordError}
                </p>
              )}

              <CustomButton
                value={"Login"}
                onClick={handleSubmit}
                applyClass={"authLoginBtn"}
                className={"mt-3"}
              />

              {shouldIsCorporate && (
                <p className="mt-2">
                  <Link
                    to={"/forgotpassword"}
                    className={styles["forgotPasswordLink"]}
                  >
                    Forgot Password?
                  </Link>
                </p>
              )}
            </section>
          </Form>
          z
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
