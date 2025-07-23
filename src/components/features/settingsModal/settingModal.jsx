import React, { lazy, Suspense, useEffect, useState } from "react";
import GlobalModal from "../../common/globalModal/Modal";
import "./settingModal.css";
import { Button, Col, Row } from "react-bootstrap";
import UserSetting from "@/components/features/settingsModal/userSettingComponent/SettingusersComponent";
import PassCode from "@/components/features/settingsModal/PasscodeSettingComponent/PassCodeSettingComponent";
import Markettiming from "@/components/features/settingsModal/MarketTimingComponent/MarketTIming";
import CustomButton from "@/components/common/globalButton/button";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMarkingTimingApi,
  updateUserSettingDataAPI,
} from "./settingActions";
import IconElement from "@/components/common/IconElement/IconElement";
import { setSettingModal } from "@/store/modalSlice/modalSlicer";
import { useSelector } from "react-redux";
import { ResetPasswordCorporateApi } from "@/container/loginScreens/ChangePassword/changePasswordActions";

const SettingModal = () => {
  const settingsRecordData = useSelector(
    (state) => state.modalReducer.settingsRecord
  );
  const settingModal = useSelector((state) => state.modalReducer.settingModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabActive, setTabActive] = useState(1);
  console.log({ location, tabActive }, "settingModalsettingModalsettingModal");
  console.log(typeof tabActive, "settingModalsettingModalsettingModal");
  const [createPasswordData, setCreatePasswordData] = useState({
    userID: localStorage.getItem("userID"),
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
  useEffect(() => {
    dispatch(getMarkingTimingApi({ navigate }));
  }, []);

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeBranchComponents =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeTreasuryComponents =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeDealerComponents =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  // Conditionally import CustomButton based on the environment variables
  const shouldIncludeCorporateComponents =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  const HandleOnHideModal = () => {
    dispatch(setSettingModal(false));
  };

  // const handeClickSave = () => {
  //   console.log(settingsRecordData, "settingsRecordsettingsRecord");
  //   let Data = {
  //     //to do
  //     Settings: [
  //       {
  //         Key: shouldIncludeCorporateComponents
  //           ? "CU_EmailOnEveryMessage"
  //           : "BD_EmailOnEveryMessage", //to do
  //         Value: shouldIncludeCorporateComponents
  //           ? String(settingsRecordData?.CU_EmailOnEveryMessage)
  //           : String(settingsRecordData?.BD_EmailOnEveryMessage),
  //       },

  //       {
  //         Key: shouldIncludeCorporateComponents
  //           ? "CU_SoundOnEveryMessage"
  //           : "BD_SoundOnEveryMessage",
  //         Value: shouldIncludeCorporateComponents
  //           ? String(settingsRecordData?.CU_SoundOnEveryMessage)
  //           : String(settingsRecordData?.BD_SoundOnEveryMessage),
  //       },

  //       {
  //         Key: shouldIncludeCorporateComponents
  //           ? "CU_Enable2FA"
  //           : "BD_Enable2FA",
  //         Value: shouldIncludeBranchComponents
  //           ? String(settingsRecordData?.CU_Enable2FA)
  //           : String(settingsRecordData?.BD_Enable2FA),
  //       },
  //     ],
  //   };
  //   console.log(Data, "Data2Data2");
  //   // dispatch(updateUserSettingDataAPI({ navigate, Data }));
  // };

  const handeClickSave = () => {
    console.log(settingsRecordData, "settingsRecordsettingsRecord");

    let Data = {
      Settings: [
        {
          Key: shouldIncludeCorporateComponents
            ? "CU_EmailOnEveryMessage"
            : "BD_EmailOnEveryMessage",
          Value: shouldIncludeCorporateComponents
            ? String(settingsRecordData?.CU_EmailOnEveryMessage)
            : String(settingsRecordData?.BD_EmailOnEveryMessage),
        },
        {
          Key: shouldIncludeCorporateComponents
            ? "CU_SoundOnEveryMessage"
            : "BD_SoundOnEveryMessage",
          Value: shouldIncludeCorporateComponents
            ? String(settingsRecordData?.CU_SoundOnEveryMessage)
            : String(settingsRecordData?.BD_SoundOnEveryMessage),
        },
        {
          Key: shouldIncludeCorporateComponents
            ? "CU_Enable2FA"
            : "BD_Enable2FA",
          Value: shouldIncludeCorporateComponents
            ? String(settingsRecordData?.CU_Enable2FA)
            : String(settingsRecordData?.BD_Enable2FA),
        },
      ],
    };
    console.log(Data, "Data2Data2");
    dispatch(updateUserSettingDataAPI({ navigate, Data }));

    let PasswordData = {
      userID: Number(createPasswordData.userID),
      Password: createPasswordData.createPassword,
    };
    // dispatch(createCorporateCreatePasswordApi({ navigate, Data }));
    dispatch(ResetPasswordCorporateApi({ navigate, PasswordData }));

    console.log(
      "handleClickCreatePassword",
      "handleClickCreatePasswordhandleClickCreatePassword"
    );
  };
  return (
    <div>
      {" "}
      <GlobalModal
        show={settingModal}
        backdrop="static"
        onHide={HandleOnHideModal}
        centered={true}
        className={"ModalClassNameSettings"}
        bodyClassName={"ModalClassNameSettings"}
        headerClassName={"border-0"}
        footerClassName={"border-0 d-block"}
        size={"md"}
        modalHeader={false}
        modalBody={
          <>
            <>
              <>
                <Row>
                  <Col
                    sm={8}
                    md={8}
                    lg={8}
                    className="d-flex justify-content-start gap-1"
                  >
                    <CustomButton
                      applyClass={
                        tabActive === 1 ? "tabsButton_active" : "tabsButton"
                      }
                      value={"User Settings"}
                      onClick={() => setTabActive(1)}
                    />
                    {shouldIncludeCorporateComponents && (
                      <CustomButton
                        applyClass={
                          tabActive === 2 ? "tabsButton_active" : "tabsButton"
                        }
                        onClick={() => setTabActive(2)}
                        value={"PassCode Setting"}
                      />
                    )}

                    <CustomButton
                      applyClass={
                        tabActive === 3 ? "tabsButton_active" : "tabsButton"
                      }
                      value={"Market Timing"}
                      onClick={() => setTabActive(3)}
                    />
                  </Col>
                  <Col
                    sm={4}
                    md={4}
                    lg={4}
                    className="d-flex justify-content-end align-items-center "
                  >
                    <IconElement
                      applyClass={"icon-close"}
                      iconClass={"cursor-pointer"}
                      onClick={HandleOnHideModal}
                    />
                  </Col>
                </Row>
                <Row className="mt-3 d-flex justify-content-start">
                  <Col sm={12} md={12} lg={12}>
                    {tabActive === 1 ? (
                      <UserSetting />
                    ) : tabActive === 2 ? (
                      <PassCode
                        createPasswordData={createPasswordData}
                        setCreatePasswordData={setCreatePasswordData}
                        validations={validations}
                        setValidations={setValidations}
                      />
                    ) : (
                      <Markettiming />
                    )}
                  </Col>
                </Row>
              </>

              {/* <GlobalTabs
                tabs={tabsContent}
                tabClass='mb-4 d-flex justify-content-start'
              /> */}
            </>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className="d-flex justify-content-center"
              >
                {!(tabActive === 3) && (
                  <CustomButton
                    applyClass="saveSettingBtn"
                    value="Save"
                    onClick={handeClickSave}
                  />
                )}
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default SettingModal;
