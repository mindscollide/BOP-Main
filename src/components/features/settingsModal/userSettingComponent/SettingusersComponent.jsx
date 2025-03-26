import React from "react";
import "../settingModal.css";
import { Container } from "react-bootstrap";
const SettingusersComponent = () => {
  return (
    <div className="setting-body-content px-3 py-3 h-screen-65">
      <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
        <input
          className="form-check-input"
          name="chat_penal_overlap"
          type="checkbox"
          defaultValue=""
          id=""
        />
        Chat Panel Overlap
      </label>
      <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
        <input
          className="form-check-input"
          name="Sound_on_message"
          type="checkbox"
          defaultValue=""
          id=""
        />
        Sound on every personal message
      </label>
    </div>
  );
};

export default SettingusersComponent;
