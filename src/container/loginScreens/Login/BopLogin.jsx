import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./BopLogin.module.css";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { corporateUserLoginInApi, loginInApi } from "./logInAction";
import {
  decrypt,
  emailValidation,
  bopEmailValidation,
  encrypt,
  encryptField,
} from "@/common/utils";
import { updateEmail, updatePassword, updateUsername } from "./Loginfunctions";
import { useNotification } from "@/context/NotificationProvider";

const shouldIsCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
const shouldIsBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const shouldIsDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
const shouldIsTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const BopLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    hasErrorOnEmail: false,
    hasEmailisValid: true,
    hasErrorOnPassword: false,
    hasErrorOnUserName: false,
    hasUserNameIsValid: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  // Load remembered credentials on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const encryptedPassword = localStorage.getItem("rememberedPassword");
    localStorage.clear(); // Clear localStorage to avoid conflicts with other data
    console.log(
      rememberedEmail,
      encryptedPassword,
      "encryptedPasswordencryptedPassword",
    );
    if (rememberedEmail || (encryptedPassword && encryptedPassword === null)) {
      setCredentials((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
      setRememberMe(true);
      localStorage.setItem("rememberedEmail", rememberedEmail);

      try {
        const decryptedPassword = decrypt(
          encryptedPassword,
          import.meta.env.VITE_BOP_KEY,
        );
        setCredentials((prev) => ({
          ...prev,
          password: decryptedPassword,
        }));
        setRememberMe(true);
        const encryptedPassword2 = encrypt(
          decryptedPassword,
          import.meta.env.VITE_BOP_KEY,
        );
        localStorage.setItem("rememberedPassword", encryptedPassword2);
      } catch (error) {
        console.error("Failed to decrypt password:", error);
        localStorage.removeItem("rememberedPassword");
      }
    } else {
      localStorage.clear(); // Clear localStorage to avoid conflicts with other data
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, []);

  const handleChangeRememberMe = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (!isChecked) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };

  const handleChangeFields = (e) => {
    const { name, value } = e.target;
    if (name === "email") updateEmail(value, setCredentials);
    if (name === "password") updatePassword(value, setCredentials);
    if (name === "username") updateUsername(value, setCredentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save credentials if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", credentials.email);
      if (credentials.password) {
        try {
          const encryptedPassword = encrypt(
            credentials.password,
            import.meta.env.VITE_BOP_KEY,
          );
          localStorage.setItem("rememberedPassword", encryptedPassword);
        } catch (error) {
          console.error("Failed to encrypt password:", error);
          showMessage("Failed to save credentials securely");
        }
      }
    }

    const {
      email,
      password,
      hasEmailisValid,
      hasUserNameIsValid,
      hasErrorOnEmail,
      hasErrorOnPassword,
    } = credentials;

    let Data;

    if (shouldIsCorporate) {
      if (!emailValidation(email) && email !== "") {
        showMessage("Email should be in Valid Format");
        return;
      }

      if (email && password && !hasErrorOnEmail && !hasErrorOnPassword) {
        Data = {
          Email: email,
          Password: password,
          DeviceID: "1",
          Device: "Browser",
        };
        dispatch(
          corporateUserLoginInApi({ Data, navigate, shouldIsCorporate }),
        );
      } else {
        if (password === "") setPasswordError("Please enter a password.");
        if (!hasEmailisValid) setEmailError("Enter a valid email address");
        return;
      }
    } else {
      if (!bopEmailValidation(email) && email !== "") {
        setUserNameError("Email must be a valid @bop.com.pk address");
        return;
      }

      if (
        email &&
        password &&
        hasUserNameIsValid &&
        !hasErrorOnEmail &&
        !hasErrorOnPassword
      ) {
        const encryptedEmail = await encryptField(email);
        const encryptedPassword = await encryptField(password);
        Data = {
          Email: encryptedEmail,
          Password: encryptedPassword,
          DeviceID: "1",
          Device: "Browser",
          RoleID: shouldIsBranch
            ? 9
            : shouldIsDealer
              ? 7
              : shouldIsTreasury
                ? 8
                : 0,
        };
        dispatch(loginInApi({ Data, navigate, shouldIsCorporate }));
      } else {
        if (password === "") setPasswordError("Please enter a password");
        if (email === "") setUserNameError("Please enter your email");
        return;
      }
    }
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (shouldIsCorporate) {
        if (fieldName === "email") {
          if (credentials.email && credentials.hasEmailisValid) {
            passwordRef.current.focus();
          } else {
            if (!credentials.email) {
              setEmailError("Please enter an email address");
            } else if (
              !credentials.email.includes("@") ||
              !credentials.hasEmailisValid
            ) {
              setEmailError("Enter a valid email address");
            }
          }
        } else if (fieldName === "password") {
          handleSubmit(e);
        }
      } else {
        if (fieldName === "email") {
          if (credentials.email && credentials.hasUserNameIsValid) {
            passwordRef.current.focus();
          } else {
            if (!credentials.email) {
              setUserNameError("Please enter your email");
            } else if (!credentials.hasUserNameIsValid) {
              setUserNameError("Email must be a valid @bop.com.pk address");
            }
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
          className='d-flex justify-content-center mt-5'>
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width='300'
            className='img-fluid'
            alt='BOP Logo'
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <Form onSubmit={handleSubmit}>
            <section className={styles["LoginCard"]}>
              <h4 className={styles["Heading-js"]}>
                {shouldIsCorporate === true ? "Corporate Login" : "Login"}
              </h4>
              {shouldIsCorporate === true ? (
                <>
                  <InputGroup>
                    <InputGroup.Text className={styles["Icon-Field-class"]}>
                      <IconElement iconClass={"icon-user"} />
                    </InputGroup.Text>
                    <Form.Control
                      name='email'
                      ref={emailRef}
                      onKeyDown={(e) => handleKeyDown(e, "email")}
                      autoComplete='off'
                      className={styles["form-comtrol-textfield"]}
                      placeholder='Email ID'
                      required
                      value={credentials.email}
                      onChange={handleChangeFields}
                      type='email'
                      aria-label='email'
                      maxLength={100}
                    />
                  </InputGroup>
                  {credentials.hasEmailisValid === false && (
                    <p className='color-red fs-sm d-flex justify-content-start m-0'>
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
                      name='username'
                      autoComplete='off'
                      className={styles["form-comtrol-textfield"]}
                      placeholder='Email ID'
                      required
                      value={credentials.email}
                      onChange={handleChangeFields}
                      type='email'
                      aria-label='email'
                      maxLength={100}
                    />
                  </InputGroup>
                  {credentials.hasUserNameIsValid === false && (
                    <p className='color-red fs-sm d-flex justify-content-start m-0'>
                      {userNameError}
                    </p>
                  )}
                </>
              )}

              <InputGroup className='mt-3'>
                <InputGroup.Text className={styles["Icon-Field-class"]}>
                  <IconElement iconClass={"icon-lock"} />
                </InputGroup.Text>
                <Form.Control
                  ref={passwordRef}
                  onKeyDown={(e) => handleKeyDown(e, "password")}
                  name='password'
                  autoComplete='off'
                  className={styles["form-comtrol-textfield-password"]}
                  placeholder='Password'
                  required
                  value={credentials.password}
                  onChange={handleChangeFields}
                  type={showPassword ? "text" : "password"}
                  aria-label='password'
                />
                {/* <InputGroup.Text
                  className={styles["eyeIcon-Field-class-BOP-login"]}>
                  <IconElement
                    iconClass={showPassword ? "icon-eye" : "icon-eye-slash"}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputGroup.Text> */}
              </InputGroup>
              {credentials.password === "" && (
                <p className='color-red fs-sm d-flex justify-content-start m-0'>
                  {passwordError}
                </p>
              )}

              {/* {shouldIsCorporate && ( */}
                <Row className='d-flex align-items-center mt-2'>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    className='d-flex justify-content-start'>
                    <Form.Check
                      checked={rememberMe}
                      type='checkbox'
                      onChange={handleChangeRememberMe}
                      label='Remember me'
                    />
                  </Col>
                  <Col
                    sm={6}
                    md={6}
                    lg={6}
                    className='d-flex justify-content-end'>
                    <Link
                      to={"/forgotpassword"}
                      className={styles["forgotPasswordLink"]}>
                      Forgot Password?
                    </Link>
                  </Col>
                </Row>
              {/* )} */}

              <CustomButton
                value={"Login"}
                onClick={handleSubmit}
                applyClass={"authLoginBtn"}
                className={"mt-3"}
              />
            </section>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default BopLogin;
