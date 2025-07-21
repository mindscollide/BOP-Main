import React, { startTransition, useCallback } from "react";
import "../settingModal.css";
import { Switch } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSettingRecords } from "@/store/modalSlice/modalSlicer";
const PassCodeSettingComponent = () => {
  const dispatch = useDispatch();
  const settingsRecord = useSelector(
    (state) => state.modalReducer.settingsRecord
  );

  // console.log(settingsRecord, "settingsRecordsettingsRecordsettingsRecord");

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
    [dispatch, settingsRecord] // Add settingsRecord as dependency
  );
  return (
    <div className="setting-body-content px-2 py-3 h-screen-65">
      <div className="d-flex border-bottom pb-3 pt-2 mb-2 fs-normal">
        <div>Two Factor Authentication</div>
        <label className="form-check form-switch ms-auto">
          <Switch
            // className="form-check-input"
            // type="checkbox"
            // id="flexSwitchCheckDefault"
            name="CU_Enable2FA"
            onChange={onChangeSwitch}
            checked={settingsRecord?.CU_Enable2FA}
            value={settingsRecord?.CU_Enable2FA}
          />
        </label>
      </div>
      <div className="pb-3 pt-2 mb-2 fs-normal collapsible">
        <label className="fs-6 fw-bold mb-1 color-primary">
          Change Password
        </label>
        <div
          className="collapsible-conent collapse show mt-2"
          id="ChangepasswordUserSetitng"
        >
          <div className="form-group d-flex">
            <label className="col-form-label col-4">Enter New Password*</label>
            <div className="col-8">
              <input
                type="password"
                name="new-password"
                className="form-control form-control-sm Position-input"
              />
            </div>
          </div>
          <div className="form-group d-flex">
            <label className="col-form-label col-4">
              Confirm New Password*
            </label>
            <div className="col-8">
              <input
                type="password"
                name="re-password"
                className="form-control form-control-sm Position-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassCodeSettingComponent;
