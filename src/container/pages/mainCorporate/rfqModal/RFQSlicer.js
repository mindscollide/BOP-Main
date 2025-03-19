import { createSlice } from "@reduxjs/toolkit";
import { ViewAllNatureOfBussinessAPI } from "./RFQActions";
const RFQSlice = createSlice({
  name: "RFQSlice",
  initialState: {
    responseMessage: "",
    loading: false,
    error: null,
    viewAllNatureBussniessData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made ViewAllNatureOfBussinessAPI)
      .addCase(ViewAllNatureOfBussinessAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds ViewAllNatureOfBussinessAPI)
      .addCase(ViewAllNatureOfBussinessAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.viewAllNatureBussniessData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails ViewAllNatureOfBussinessAPI)
      .addCase(ViewAllNatureOfBussinessAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.viewAllNatureBussniessData = null;
      });
  },
});

export default RFQSlice.reducer;
