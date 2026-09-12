import { createSlice } from "@reduxjs/toolkit";
import { GetTresmarkCrossesPremiumsAPI } from "./TresmarkCrossesActions";

const TresmarkCrossesReducer = createSlice({
  name: "TresmarkCrossesReducer",
  initialState: {
    errorSeverity: null,
    GetTresmarkCrossesPremiums: null,
    responseMessage: "",
    error: null,
    Loading: false,
  },
  reducers: {
    clearTresmarkCrossesResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Get Last Publish Rates
      .addCase(GetTresmarkCrossesPremiumsAPI.pending, (state) => {
        state.Loading = true;
        state.error = null;
      })
      .addCase(
        GetTresmarkCrossesPremiumsAPI.fulfilled,
        (state, { payload }) => {
          state.Loading = false;
          state.GetTresmarkCrossesPremiums = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(GetTresmarkCrossesPremiumsAPI.rejected, (state, action) => {
        state.Loading = false;
        state.GetTresmarkCrossesPremiums = null;
        state.error = action.payload;
        state.errorSeverity = "error";
      });
  },
});

export const { clearTresmarkCrossesResponseMessage } =
  TresmarkCrossesReducer.actions;
export default TresmarkCrossesReducer.reducer;
