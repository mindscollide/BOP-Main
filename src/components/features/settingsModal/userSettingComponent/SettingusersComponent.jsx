import React, { startTransition, useCallback, useEffect } from "react";
import "../settingModal.css";
import { useSelector } from "react-redux";
import { Checkbox } from "antd";
import { setSettingRecords } from "@/store/modalSlice/modalSlicer";
import { useDispatch } from "react-redux";
const SettingusersComponent = () => {
  const dispatch = useDispatch();
  const settingsRecord = useSelector(
    (state) => state.modalReducer.settingsRecord
  );
  const userSettingData = useSelector(
    (state) => state.settingSlicer.settingData
  );

  useEffect(() => {
    if (userSettingData !== null) {
      try {
        if (userSettingData.length > 0) {
          const newSettings = {};

          userSettingData.forEach((settingData) => {
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
    (event) => {
      const { name, checked } = event.target;

      console.log({ event }, "valuevaluevaluevalue");

      startTransition(() => {
        dispatch(
          setSettingRecords({
            [name]: checked,
          })
        );
      });
    },
    [dispatch]
  );

  console.log(settingsRecord, "settingsRecordsettingsRecord");
  return (
    <div className='setting-body-content px-3 py-3 h-screen-65'>
      <label className='form-check border-bottom pb-3 pt-2 mb-2 fs-normal'>
        <Checkbox
          className='form-check-input'
          name='BD_EmailOnEveryMessage'
          checked={settingsRecord?.BD_EmailOnEveryMessage}
          onChange={handleChange}
        />
        Chat Panel Overlap
      </label>
      <label className='form-check border-bottom pb-3 pt-2 mb-2 fs-normal'>
        <Checkbox
          className='form-check-input'
          name='BD_SoundOnEveryMessage'
          checked={settingsRecord.BD_SoundOnEveryMessage}
          onChange={handleChange}
        />
        Sound on every personal message
      </label>
    </div>
  );
};

export default SettingusersComponent;
