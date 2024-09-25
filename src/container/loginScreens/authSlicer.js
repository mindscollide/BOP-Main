import { createSlice } from "@reduxjs/toolkit";
import { loginInApi } from "./authActions/logInAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    responseMessage: "",
    loading: false,
    error: null,
    token: null,
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
      .addCase(loginInApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.user = action.payload.message;
        state.token = action.payload.token;
      })
      // Rejected state (when the API call fails)
      .addCase(loginInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = action.payload.message;
      });
  },
});

export default authSlice.reducer;
