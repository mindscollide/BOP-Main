import { createSlice } from "@reduxjs/toolkit";
import { DownloadFileAPI } from "./ReportActions";

const ReportSlicer = createSlice({
  name: "ReportSlicer",
  initialState: {
    Loader: false,
    error: null,
    responseMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(DownloadFileAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.responseMessage = "";
      })
      // Fulfilled state
      .addCase(DownloadFileAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.error = null;
        state.responseMessage = payload?.message || "Download successful";
      })
      // Rejected state
      .addCase(DownloadFileAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload || "Download failed";
        state.responseMessage = "";
      });
  },
});

export default ReportSlicer.reducer;
