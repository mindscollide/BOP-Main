import {
  getUserSettingsRM,
  updateUserSettingsRM,
  getMarketingTimingRM,
} from "@/common/api_config";
import { settingApi } from "@/common/apiend_points";
// const { createAsyncThunk } = require("@reduxjs/toolkit");
import { createAsyncThunk } from "@reduxjs/toolkit";
import createPostAPI from "@/utils/axiosInstance";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";

export const getUserSettingDataAPI = createAsyncThunk(
  "setting/getUserSetting",
  async (payload, { rejectWithValue, dispatch }) => {
    const { navigate, setSettingModal } = payload;
 
    try {
      let getUserSetting = createPostAPI(
        settingApi,
        getUserSettingsRM.RequestMethod
      );

      const result = await getUserSetting();
      console.log(result, "result");
      const { responseCode } = result;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
      }
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getUserSettingDataAPI({ navigate, setSettingModal }));
      } else if (responseCode === 200) {
        console.log(result, "result");

        const { isExecuted, responseMessage, userSettingsList } =
          result.responseResult;
        if (!isExecuted) {
          console.log(result, "result");

          return rejectWithValue(responseMessage);
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetUserSettings_01".toLowerCase()
            )
        ) {
          setSettingModal(true);
          return userSettingsList;
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetUserSettings_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetUserSettings_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else {
          return rejectWithValue("Someting went wrong");
        }
      } else {
        return rejectWithValue(result?.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUserSettingDataAPI = createAsyncThunk(
  "setting/updateUserSetting",
  async (payload, { rejectWithValue, dispatch }) => {
    const { navigate, setSettingModal, Data } = payload;
    console.log(
      navigate,
      setSettingModal,
      "getUserSettingDataAPIgetUserSettingDataAPI"
    );
    try {
      let getUserSetting = createPostAPI(
        settingApi,
        updateUserSettingsRM.RequestMethod
      );

      const result = await getUserSetting(Data);
      console.log(result, "result");
      const { responseCode } = result;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
      }
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getUserSettingDataAPI({ navigate, setSettingModal }));
      } else if (responseCode === 200) {
        console.log(result, "result");

        const { isExecuted, responseMessage } =
          result.responseResult;
        if (!isExecuted) {
          console.log(result, "result");

          return rejectWithValue(responseMessage);
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_UpdateUserSettings_01".toLowerCase()
            )
        ) {
          return "Successfully Updated";
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_UpdateUserSettings_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_UpdateUserSettings_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else {
          return rejectWithValue("Someting went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMarkingTimingApi = createAsyncThunk(
  "setting/getMarketTiming",
  async (payload, { rejectWithValue, dispatch }) => {
    const { navigate } = payload;
    try {
      let getMarketTiming = createPostAPI(
        settingApi,
        getMarketingTimingRM.RequestMethod
      );

      const result = await getMarketTiming();
      console.log(result, "result");
      const { responseCode } = result;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
      }
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getMarkingTimingApi({ navigate }));
      } else if (responseCode === 200) {
        console.log(result, "result");

        const {
          responseResult: { isExecuted, responseMessage },
        } = result;
        console.log(isExecuted, "result");

        if (!isExecuted) {
          console.log(result, "result");

          return rejectWithValue(responseMessage);
        }
        console.log(
          responseMessage,
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_01".toLowerCase()
            ),
          result.responseResult,

          "result"
        );

        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_01".toLowerCase()
            )
        ) {
          return result.responseResult;
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_02".toLowerCase()
            )
        ) {
          console.log(responseResult, "result");

          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_03".toLowerCase()
            )
        ) {
          console.log(responseResult, "result");

          return rejectWithValue("Someting went wrong");
        } else {
          console.log(responseResult, "result");

          return rejectWithValue("Someting went wrong");
        }
      } else {
        console.log(responseResult, "result");

        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
