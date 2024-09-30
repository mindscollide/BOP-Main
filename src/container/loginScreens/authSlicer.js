import { createSlice } from "@reduxjs/toolkit";
import { corporateUserLoginInApi, loginInApi } from "./Login/logInAction";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: null,
    responseMessage: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(loginInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(loginInApi.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails)
      .addCase(loginInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      // Pending state (while the API call is being made)
      .addCase(corporateUserLoginInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(corporateUserLoginInApi.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails)
      .addCase(corporateUserLoginInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
