import React, { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import BOPLogo from "@/assets/logo.png";
import styles from "./CreatePassword.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import CustomButton from "@/components/common/globalButton/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createCorporateCreatePasswordApi,
  validateLinkForCorporateCreatePasswordApi,
} from "./createPassword_Action";
import { useSelector } from "react-redux";
const CreatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createPasswordData, setCreatePasswordData] = useState({
    userID: 0,
    email: "",
    createPassword: "",
    confirmPassowrd: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [validations, setValidations] = useState({
    isLengthValid: false,
    hasNumber: false,
    hasSpecialChar: false,
    isMatch: false,
  });

  console.log(validations, "validationsvalidations");
  const isValidatedCreatePasswordString = useSelector(
    (state) => state.authReducer.isValidatedCreatePasswordString
  );
  console.log(
    isValidatedCreatePasswordString,
    "action_createpasswordaction_createpassword"
  );
  useEffect(() => {
    if (location.search.includes("action_createpassword")) {
      let validateValue = location.search.split("action_createpassword=")[1];
      dispatch(validateLinkForCorporateCreatePasswordApi({ validateValue }));
      console.log(validateValue, "validateValue");
      console.log(location, "validateLinkForCorporateCreatePasswordApi");
    }
  }, [location]);
  useEffect(() => {
    const lengthValid = createPasswordData.createPassword.length >= 8;
    const numberValid = /\d/.test(createPasswordData.createPassword);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(
      createPasswordData.createPassword
    );
    const matchValid =
      createPasswordData.createPassword !== "" &&
      createPasswordData.createPassword === createPasswordData.confirmPassowrd;

    setValidations({
      isLengthValid: lengthValid,
      hasNumber: numberValid,
      hasSpecialChar: specialCharValid,
      isMatch: matchValid,
    });
  }, [createPasswordData.createPassword, createPasswordData.confirmPassowrd]);
  console.log(createPasswordData, "validateLinkForCorporateCreatePasswordApi");

  useEffect(() => {
    if (isValidatedCreatePasswordString !== null) {
      try {
        const { userID, email } = isValidatedCreatePasswordString;
        setCreatePasswordData({
          ...createPasswordData,
          email: email,
          userID: userID,
        });
      } catch (error) {}
    }
  }, [isValidatedCreatePasswordString]);

  const handleChangePassword = (fieldName, event) => {
    const { value } = event.target;
    if (fieldName === "createPassword") {
      if (value !== "") {
        setCreatePasswordData({
          ...createPasswordData,
          createPassword: value,
        });
      } else {
        setCreatePasswordData({
          ...createPasswordData,
          createPassword: "",
        });
      }
    } else if (fieldName === "confirmPassword")
      if (value !== "") {
        setCreatePasswordData({
          ...createPasswordData,
          confirmPassowrd: value,
        });
      } else {
        setCreatePasswordData({
          ...createPasswordData,
          confirmPassowrd: "",
        });
      }
  };
  const handleClickCreatePassword = () => {
    let Data = {
      UserID: createPasswordData.userID,
      Email: createPasswordData.email,
      Password: createPasswordData.createPassword,
      DeviceID: "1",
      Device: "Browser",
    };
    dispatch(createCorporateCreatePasswordApi({ navigate, Data }));
    console.log(
      "handleClickCreatePassword",
      "handleClickCreatePasswordhandleClickCreatePassword"
    );
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
            <h4 className={styles["Heading-js"]}>Create Password</h4>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                className={styles["Icon-Field-class"]}
              >
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name="passwordText"
                autoComplete="off"
                onChange={(event) =>
                  handleChangePassword("createPassword", event)
                }
                className={styles["form-comtrol-textfield-password"]}
                placeholder="Password"
                type={createPasswordData.showPassword ? "text" : "password"}
                aria-label="passwordText"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text
                id="basic-addon2"
                className={styles["eyeIcon-Field-class-BOP-login"]}
              >
                {/* <IconElement iconClass={"icon-eye"} /> */}
                {createPasswordData.showPassword ? (
                  <IconElement
                    onClick={() => {
                      setCreatePasswordData({
                        ...createPasswordData,
                        showPassword: !createPasswordData.showPassword,
                      });
                    }}
                    iconClass={"icon-eye-slash"}
                  />
                ) : (
                  <IconElement
                    iconClass={"icon-eye"}
                    onClick={() => {
                      setCreatePasswordData({
                        ...createPasswordData,
                        showPassword: !createPasswordData.showPassword,
                      });
                    }}
                  />
                )}
                {/* {showPassword ? (
                 
                ) : (
                  <IconElement iconClass={"icon-eye"} />
                )} */}
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="basic-addon1"
                className={styles["Icon-Field-class"]}
              >
                <IconElement iconClass={"icon-lock"} />
              </InputGroup.Text>
              <Form.Control
                name="passwordText"
                autoComplete="off"
                type={
                  createPasswordData.showConfirmPassword ? "text" : "password"
                }
                onChange={(event) =>
                  handleChangePassword("confirmPassword", event)
                }
                className={styles["form-comtrol-textfield-password"]}
                placeholder="Confirm Password"
                aria-label="passwordText"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text
                id="basic-addon2"
                className={styles["eyeIcon-Field-class-BOP-login"]}
              >
                {createPasswordData.showConfirmPassword ? (
                  <IconElement
                    onClick={() => {
                      setCreatePasswordData({
                        ...createPasswordData,
                        showConfirmPassword:
                          !createPasswordData.showConfirmPassword,
                      });
                    }}
                    iconClass={"icon-eye-slash"}
                  />
                ) : (
                  <IconElement
                    iconClass={"icon-eye"}
                    onClick={() => {
                      setCreatePasswordData({
                        ...createPasswordData,
                        showConfirmPassword:
                          !createPasswordData.showConfirmPassword,
                      });
                    }}
                  />
                )}
                {/* {showPassword ? (
                  <IconElement iconClass={"icon-eye-slash"} />
                ) : (
                  <IconElement iconClass={"icon-eye"} />
                )} */}
              </InputGroup.Text>
            </InputGroup>
            <div className="d-flex gap-1 align-items-end mb-2">
              <span>
                {validations.isLengthValid ? (
                  <IconElement
                    applyClass={styles["checkIcon"]}
                    iconClass={"icon-check"}
                  />
                ) : (
                  <IconElement
                    applyClass={styles["closeIcon"]}
                    iconClass={"icon-close"}
                  ></IconElement>
                )}

                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Length of at least 8 characters</span>
            </div>
            <div className="d-flex gap-1 align-items-end mb-2">
              <span>
                {validations.hasNumber ? (
                  <IconElement
                    applyClass={styles["checkIcon"]}
                    iconClass={"icon-check"}
                  />
                ) : (
                  <IconElement
                    applyClass={styles["closeIcon"]}
                    iconClass={"icon-close"}
                  />
                )}

                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Contains numbers</span>
            </div>
            <div className="d-flex gap-1 align-items-end mb-2">
              <span>
                {validations.hasSpecialChar ? (
                  <IconElement
                    applyClass={styles["checkIcon"]}
                    iconClass={"icon-check"}
                  />
                ) : (
                  <IconElement
                    applyClass={styles["closeIcon"]}
                    iconClass={"icon-close"}
                  />
                )}

                {/* <IconElement
                  applyClass={styles["checkIcon"]}
                  iconClass={"icon-check"}
                /> */}
              </span>{" "}
              <span>Contains special characters</span>
            </div>
            <div className="d-flex gap-1 align-items-end mb-2">
              <span>
                {validations.isMatch ? (
                  <IconElement
                    applyClass={styles["checkIcon"]}
                    iconClass={"icon-check"}
                  />
                ) : (
                  <IconElement
                    applyClass={styles["closeIcon"]}
                    iconClass={"icon-close"}
                  />
                )}
              </span>{" "}
              <span>Password match</span>
            </div>
            <CustomButton
              disabled={
                validations.hasNumber &&
                validations.hasSpecialChar &&
                validations.isLengthValid &&
                validations.isMatch
                  ? false
                  : true
              }
              onClick={handleClickCreatePassword}
              value={"Change Password"}
              applyClass={"changePasswordBtn"}
            />
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default CreatePassword;
