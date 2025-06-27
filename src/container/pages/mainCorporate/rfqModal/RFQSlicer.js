import { createAction, createSlice } from "@reduxjs/toolkit";
export const setActiveTab = createAction("tabs/setActiveTab");
import {
  SaveTransactionRFQAPI,
  ViewAllNatureOfBussinessAPI,
} from "./RFQActions";
const RFQSlice = createSlice({
  name: "RFQSlice",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    viewAllNatureBussniessData: null,
    saveRFQTransactionData: null,
    activeTab: "Spot", // default Tab
  },
  reducers: {},
  extraReducers: (builder) => {
    builder      // Pending state (while the API call is being made SaveTransactionRFQAPI)
      .addCase(SaveTransactionRFQAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds SaveTransactionRFQAPI)
      .addCase(SaveTransactionRFQAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveRFQTransactionData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails ViewAllNatureOfBussinessAPI)
      .addCase(SaveTransactionRFQAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.saveRFQTransactionData = null;
      });

    builder.addCase(setActiveTab, (state, action) => {
      state.activeTab = action.payload;
    });
  },
});

export default RFQSlice.reducer;
