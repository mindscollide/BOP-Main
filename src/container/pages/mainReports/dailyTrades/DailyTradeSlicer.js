import { createAction, createSlice } from "@reduxjs/toolkit";
export const setActiveTab = createAction("tabs/setActiveTab");

import { GetAllTradesAPI } from "./DailyTradeActions";
const DailyTradeSlicer = createSlice({
  name: "DailyTradeSlicer",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    GetAllTrades: null,
    // viewAllNatureBussniessData: null,
    // saveRFQTransactionData: null,
    // activeTab: "Spot", // default Tab
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // Pending state (while the API call is being made SaveTransactionRFQAPI)
      .addCase(GetAllTradesAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds SaveTransactionRFQAPI)
      .addCase(GetAllTradesAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetAllTrades = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (when the API call fails ViewAllNatureOfBussinessAPI)
      .addCase(GetAllTradesAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.GetAllTrades = null;
      });

    // builder.addCase(setActiveTab, (state, action) => {
    //   state.activeTab = action.payload;
    // });
  },
});

export default DailyTradeSlicer.reducer;
