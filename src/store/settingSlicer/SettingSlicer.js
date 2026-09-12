import {
  getMarkingTimingApi,
  getUserSettingDataAPI,
  updateUserSettingDataAPI,
} from "@/components/features/settingsModal/settingActions";
import { createSlice } from "@reduxjs/toolkit";

const settingSlicer = createSlice({
  name: "settingSlicer",
  initialState: {
    errorSeverity: null,
    responseMessage: "",
    Loader: false,
    error: null,
    settingData: null,
    updateSettingData: null,
    getMarketTimingData: null,
  },
  reducers: {
    clearSettingResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(getUserSettingDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(getUserSettingDataAPI.fulfilled, (state, { payload }) => {
        console.log(payload, "payloadpayload");
        state.Loader = false;
        state.settingData = payload;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      // Rejected state (when the API call fails)
      .addCase(getUserSettingDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.settingData = null;
        state.errorSeverity = "error";
      })
      .addCase(getMarkingTimingApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(getMarkingTimingApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getMarketTimingData = payload;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getMarkingTimingApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getMarketTimingData = null;
        state.errorSeverity = "error";
      })
      .addCase(updateUserSettingDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(updateUserSettingDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.updateSettingData = payload;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(updateUserSettingDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.updateSettingData = null;
        state.errorSeverity = "error";
      });
  },
});

export const { clearSettingResponseMessage } = settingSlicer.actions;
export default settingSlicer.reducer;
