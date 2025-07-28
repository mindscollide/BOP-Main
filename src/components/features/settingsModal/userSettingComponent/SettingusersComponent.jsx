import React, { startTransition, useCallback, useEffect } from "react";
import "../settingModal.css";
import { useSelector } from "react-redux";
import { Checkbox, Switch } from "antd";
import { useDispatch } from "react-redux";
import { setSettingRecords } from "@/store/modalSlice/modalSlicer";
const SettingusersComponent = () => {
  const dispatch = useDispatch();

  const getUserSettingData = useSelector(
    (state) => state.settingSlicer.settingData
  );
  const settingsRecord = useSelector(
    (state) => state.modalReducer.settingsRecord
  );
  const userSettingData = useSelector(
    (state) => state.settingSlicer.settingData
  );

  const shouldIncludeCorporateComponents =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  console.log(settingsRecord, "shouldIncludeCorporateComponents");

  useEffect(() => {
    if (getUserSettingData !== null) {
      try {
        if (userSettingData.response.length > 0) {
          console.log("userSettingData", getUserSettingData);
          const newSettings = {};

          userSettingData.response.forEach((settingData) => {
            newSettings[settingData.configKey] = JSON.parse(
              settingData.configValue
            );
          });

          dispatch(setSettingRecords(newSettings));
        }
      } catch (error) {
        console.error("Error setting user settings:", error);
      }
    }
  }, [userSettingData]);

  const handleChange = useCallback(
    (targetName, CheckedValue) => {
      startTransition(() => {
        dispatch(
          setSettingRecords({
            ...settingsRecord, // This spreads the existing state
            [targetName]: CheckedValue, // This updates only the changed property
          })
        );
      });
    },
    [settingsRecord] // Add settingsRecord as dependency
  );
  const onChangeSwitch = useCallback(
    (e) => {
      console.log(e, "statetdtasdtdst");
      startTransition(() => {
        dispatch(
          setSettingRecords({
            ...settingsRecord, // This spreads the existing state
            CU_Enable2FA: e, // This updates only the changed property
          })
        );
      });
    },
    [settingsRecord] // Add settingsRecord as dependency
  );

  console.log(getUserSettingData, "getUserSettingDatagetUserSettingData");
  return (
    <div className="setting-body-content px-3 py-3 h-screen-65">
      <>
        <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
          <Checkbox
            className="form-check-input"
            // name={"CU_EmailOnEveryMessage"}
            checked={
              shouldIncludeCorporateComponents
                ? settingsRecord.CU_EmailOnEveryMessage
                : settingsRecord.BD_EmailOnEveryMessage
            }
            onChange={(event) =>
              handleChange(
                `${
                  shouldIncludeCorporateComponents
                    ? "CU_EmailOnEveryMessage"
                    : "BD_EmailOnEveryMessage"
                }`,
                event.target.checked
              )
            }
          />
          Chat Panel Overlap
        </label>
        <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
          <Checkbox
            className="form-check-input"
            name="CU_SoundOnEveryMessage"
            checked={
              shouldIncludeCorporateComponents
                ? settingsRecord.CU_SoundOnEveryMessage
                : settingsRecord.BD_SoundOnEveryMessage
            }
            onChange={(event) =>
              handleChange(
                `${
                  shouldIncludeCorporateComponents
                    ? "CU_SoundOnEveryMessage"
                    : "BD_SoundOnEveryMessage"
                }`,
                event.target.checked
              )
            }
          />
          Sound on every personal message
        </label>
        {shouldIncludeCorporateComponents && (
          <div className="d-flex border-bottom pb-3 pt-3 mb-2 fs-normal">
            <div>Two Factor Authentication</div>
            <label className="form-check form-switch ms-auto">
              <Switch
                name="CU_Enable2FA"
                onChange={onChangeSwitch}
                checked={settingsRecord.CU_Enable2FA}
              />
            </label>
          </div>
        )}
      </>
    </div>
  );
};

export default SettingusersComponent;
