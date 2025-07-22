import React, { startTransition, useCallback, useEffect } from "react";
import "../settingModal.css";
import { useSelector } from "react-redux";
import { Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { setSettingRecords } from "@/store/modalSlice/modalSlicer";
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
          console.log("userSettingData", userSettingData);
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

  // const handleChange = useCallback(
  //   (event) => {
  //     // const { name, checked } = event.target;

  //     console.log({ event }, "valuevaluevaluevalue");

  //     // startTransition(() => {
  //     //   dispatch(
  //     //     setSettingRecords({
  //     //       ...settingsRecord,
  //     //       [name]: checked,
  //     //     })
  //     //   );
  //     // });
  //     if (event.target.name === "CU_EmailOnEveryMessage") {
  //       startTransition(() => {
  //         dispatch(
  //           setSettingRecords({
  //             ...settingsRecord,
  //             CU_EmailOnEveryMessage: event.target.checked,
  //           })
  //         );
  //       });
  //     } else if (event.target.name === "CU_SoundOnEveryMessage") {
  //       startTransition(() => {
  //         dispatch(
  //           setSettingRecords({
  //             ...settingsRecord,
  //             CU_SoundOnEveryMessage: event.target.checked,
  //           })
  //         );
  //       });
  //     }
  //   },
  //   [dispatch, settingsRecord]
  // );

  const handleChange = useCallback(
    (event) => {
      const { name, checked } = event.target;

      startTransition(() => {
        dispatch(
          setSettingRecords({
            ...settingsRecord, // This spreads the existing state
            [name]: checked, // This updates only the changed property
          })
        );
      });
    },
    [dispatch, settingsRecord] // Add settingsRecord as dependency
  );
  console.log(settingsRecord, "settingsRecordsettingsRecord");
  return (
    <div className="setting-body-content px-3 py-3 h-screen-65">
      <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
        <Checkbox
          className="form-check-input"
          name="CU_EmailOnEveryMessage"
          checked={settingsRecord?.CU_EmailOnEveryMessage}
          onChange={handleChange}
        />
        Chat Panel Overlap
      </label>
      <label className="form-check border-bottom pb-3 pt-2 mb-2 fs-normal">
        <Checkbox
          className="form-check-input"
          name="CU_SoundOnEveryMessage"
          checked={settingsRecord.CU_SoundOnEveryMessage}
          onChange={handleChange}
        />
        Sound on every personal message
      </label>
    </div>
  );
};

export default SettingusersComponent;
