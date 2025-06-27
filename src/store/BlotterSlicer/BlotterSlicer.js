import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
} from "@/container/pages/mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
import { createSlice } from "@reduxjs/toolkit";

const BlotterSlicer = createSlice({
  name: "CorporateBlotterSlicer",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    getBlotterApiData: null,
    getBlotterOutstandingData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getBlotterApiData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterApiData = null;
      })
      .addCase(GetBlotterOutstandingDealsDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(
        GetBlotterOutstandingDealsDataAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.getBlotterOutstandingData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      .addCase(GetBlotterOutstandingDealsDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterOutstandingData = null;
      });
  },
});

export default BlotterSlicer.reducer;
