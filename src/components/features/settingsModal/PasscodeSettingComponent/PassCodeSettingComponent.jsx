import React from "react";
import "../settingModal.css";
const PassCodeSettingComponent = () => {
  return (
    <div className="setting-body-content px-3 py-3 h-screen-65">
      <div className="d-flex border-bottom pb-3 pt-2 mb-2 fs-normal">
        <div>Two Factor Authentication</div>
        <label className="form-check form-switch ms-auto">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </label>
      </div>
    </div>
  );
};

export default PassCodeSettingComponent;
