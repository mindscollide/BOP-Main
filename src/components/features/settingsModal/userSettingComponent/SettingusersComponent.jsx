import React, { startTransition, useCallback, useEffect } from "react";
import "../settingModal.css";
import { useSelector } from "react-redux";
import { useModal } from "@/context/ModalContext";
import { Checkbox } from "antd";
const SettingusersComponent = () => {
  const { settingsRecord, setSettingRecords } = useModal();
  const userSettingData = useSelector(
    (state) => state.settingSlicer.settingData
  );

  useEffect(() => {
    if (userSettingData !== null) {
      console.log(userSettingData, "Error setting user settings");

      try {
        if (userSettingData.length > 0) {
          const newSettings = {};

          userSettingData.forEach((settingData) => {
            newSettings[settingData.configKey] = JSON.parse(
              settingData.configValue
            );
          });

          console.log(newSettings, "Error setting user settings");

          setSettingRecords((prev) => ({
            ...prev,
            [userSettingData[0].configKey]: JSON.parse(
              userSettingData[0].configValue
            ),
            [userSettingData[1].configKey]: JSON.parse(
              userSettingData[1].configValue
            ),

            [userSettingData[2].configKey]: JSON.parse(
              userSettingData[2].configValue
            ),
          }));
        }
      } catch (error) {
        console.error("Error setting user settings:", error);
      }
    }
  }, [userSettingData]);

  const handleChange = useCallback(
    (event) => {
      console.log({ event }, "valuevaluevaluevalue");
      const { name, checked } = event.target;
      startTransition(() => {
        setSettingRecords({
          ...settingsRecord,
          [name]: checked,
        });
      });
    },
    [settingsRecord, setSettingRecords]
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
