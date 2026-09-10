import React, { startTransition, useCallback, useEffect } from "react";
import "../settingModal.css";
import { Switch } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSettingRecords } from "@/store/modalSlice/modalSlicer";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import styles from "./PassCodeSettingComponent.module.css";
import IconElement from "@/components/common/IconElement/IconElement";
import MaskedPasswordInput from "@/components/common/maskedPasswordInput/MaskedPasswordInput";
const PassCodeSettingComponent = ({
  createPasswordData,
  setCreatePasswordData,
  validations,
  setValidations,
}) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const settingsRecord = useSelector(
  //   (state) => state.modalReducer.settingsRecord
  // );

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

  // console.log(settingsRecord, "settingsRecordsettingsRecordsettingsRecord");

  // const onChangeSwitch = useCallback(
  //   (e) => {
  //     console.log(e, "statetdtasdtdst");
  //     startTransition(() => {
  //       dispatch(
  //         setSettingRecords({
  //           ...settingsRecord, // This spreads the existing state
  //           CU_Enable2FA: e, // This updates only the changed property
  //         })
  //       );
  //     });
  //   },
  //   [settingsRecord] // Add settingsRecord as dependency
  // );

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

  const getUserSettingData = useSelector(
    (state) => state.settingSlicer.settingData.userSettingsList
  );
  console.log(getUserSettingData, "getUserSettingDatagetUserSettingData");
  return (
    <div className="setting-body-content px-2 py-3 h-screen-65">
      {/* <div className="d-flex border-bottom pb-3 pt-2 mb-2 fs-normal">
        <div>Two Factor Authentication</div>
        <label className="form-check form-switch ms-auto">
          <Switch
            name="CU_Enable2FA"
            onChange={onChangeSwitch}
            checked={settingsRecord.CU_Enable2FA}
          />
        </label>
      </div> */}
      <div className="pb-3 pt-2 mb-2 fs-normal collapsible">
        <label className="fs-6 fw-bold mb-1 color-primary">
          Change Password
        </label>
        <InputGroup className="mb-3">
          <InputGroup.Text
            id="basic-addon1"
            className={styles["Icon-Field-class"]}
          >
            <IconElement iconClass={"icon-lock"} />
          </InputGroup.Text>
          <MaskedPasswordInput
            name="passwordText"
            onChange={(event) => handleChangePassword("createPassword", event)}
            className={styles["form-comtrol-textfield-password"]}
            placeholder="Password"
            revealed={createPasswordData.showPassword}
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
                iconClass={"icon-eye"}
              />
            ) : (
              <IconElement
                iconClass={"icon-eye-slash"}
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
          <MaskedPasswordInput
            name="passwordText"
            revealed={createPasswordData.showConfirmPassword}
            onChange={(event) => handleChangePassword("confirmPassword", event)}
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
                iconClass={"icon-eye"}
              />
            ) : (
              <IconElement
                iconClass={"icon-eye-slash"}
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
      </div>
    </div>
  );
};

export default PassCodeSettingComponent;
