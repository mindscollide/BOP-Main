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
import { setSettingModal } from "@/store/modalSlice/modalSlicer";

export const getUserSettingDataAPI = createAsyncThunk(
  "setting/getUserSetting",
  async (payload, { rejectWithValue, dispatch }) => {
    const { navigate } = payload;

    try {
      let getUserSetting = createPostAPI(
        settingApi,
        getUserSettingsRM.RequestMethod
      );

      const result = await getUserSetting();
      console.log(result, "result");
      const { responseCode } = result.data;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getUserSettingDataAPI({ navigate }));
      } else if (responseCode === 200) {
        console.log(result, "result");

        const { isExecuted, responseMessage, userSettingsList } =
          result.data.responseResult;
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
          dispatch(setSettingModal(true));
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
    const { navigate, Data } = payload;

    try {
      let getUserSetting = createPostAPI(
        settingApi,
        updateUserSettingsRM.RequestMethod
      );

      const response = await getUserSetting(Data);
      console.log(response, "result");
      const { responseCode } = response.data;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        console.log(response, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getUserSettingDataAPI({ navigate }));
      } else if (responseCode === 200) {
        console.log(response, "result");

        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          console.log(response, "result");

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

      const response = await getMarketTiming();
      console.log(response, "result");
      const { responseCode } = response.data;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        console.log(response, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getMarkingTimingApi({ navigate }));
      } else if (responseCode === 200) {
        console.log(response, "result");

        const {
          responseResult: { isExecuted, responseMessage },
        } = response.data;
        console.log(isExecuted, "result");

        if (!isExecuted) {
          return rejectWithValue(responseMessage);
        }

        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_01".toLowerCase()
            )
        ) {
          return response.data.responseResult;
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Setting_SettingServiceManager_GetMarketTimeSettings_03".toLowerCase()
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
