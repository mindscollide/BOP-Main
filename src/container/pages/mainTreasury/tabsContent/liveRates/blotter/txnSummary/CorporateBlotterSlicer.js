import { createSlice } from "@reduxjs/toolkit";
import { CorporateBlotterDataAPI } from "./CorporateBlotterActions";
const CorporateBlotterSlicer = createSlice({
  name: "CorporateBlotterSlicer",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    getBlotterApiData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made CorporateBlotterDataAPI)
      .addCase(CorporateBlotterDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CorporateBlotterDataAPI)
      .addCase(CorporateBlotterDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getBlotterApiData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(CorporateBlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterApiData = null;
      });
  },
});

export default CorporateBlotterSlicer.reducer;
