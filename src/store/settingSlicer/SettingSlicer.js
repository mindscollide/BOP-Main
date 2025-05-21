import {
  getMarkingTimingApi,
  getUserSettingDataAPI,
  updateUserSettingDataAPI,
} from "@/components/features/settingsModal/settingActions";
import { createSlice } from "@reduxjs/toolkit";

const settingSlicer = createSlice({
  name: "settingSlicer",
  initialState: {
    responseMessage: "",
    loading: false,
    error: null,
    settingData: null,
    updateSettingData: null,
    getMarketTimingData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(getUserSettingDataAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(getUserSettingDataAPI.fulfilled, (state, { payload }) => {
        console.log(payload, "payloadpayload");
        state.loading = false;
        state.settingData = payload;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails)
      .addCase(getUserSettingDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.settingData = null;
      })
      .addCase(getMarkingTimingApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarkingTimingApi.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getMarketTimingData = payload;
        state.error = null;
        state.responseMessage = payload.message;
      })
      .addCase(getMarkingTimingApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.getMarketTimingData = null;
      })
      .addCase(updateUserSettingDataAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSettingDataAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.updateSettingData = payload;
        state.error = null;
        state.responseMessage = payload.message;
      })
      .addCase(updateUserSettingDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.updateSettingData = null;
      });
  },
});

export default settingSlicer.reducer;
