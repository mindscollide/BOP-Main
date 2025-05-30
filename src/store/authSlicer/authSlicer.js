import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  corporateUserLoginInApi,
  loginInApi,
} from "../../container/loginScreens/Login/logInAction";
import { resetAndForgotPassword } from "../../container/loginScreens/forgetPassword/forgotPassword_Actions";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "../../container/loginScreens/authActions/refreshToken";
import { getAllCategoriesAction } from "@/components/utils/globalApis";
import {
  createCorporateCreatePasswordApi,
  validateLinkForCorporateCreatePasswordApi,
} from "@/container/loginScreens/CreatePassword/createPassword_Action";
import { LogoutApi } from "@/container/loginScreens/authActions/logoutAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: null,
    responseMessage: "",
    loading: false,
    error: null,
    resetPasswordResponse: null,
    refreshTokenResponse: null,
    getAllCategories: null,
    isValidatedCreatePasswordString: null,
    passwordCreated: null,
    logout: null,
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
        console.log(action, "actionaction");
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
        console.log(action, "actionaction");

        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(resetAndForgotPassword.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(resetAndForgotPassword.fulfilled, (state, { payload }) => {
        console.log(payload, "payloadpayload");
        state.loading = false;
        state.error = null;
        state.responseMessage = payload.message;
        state.resetPasswordResponse = payload.response;
      })
      .addCase(resetAndForgotPassword.rejected, (state, { payload }) => {
        console.log(payload, "payloadpayload");
        state.loading = false;
        state.error = null;
        state.responseMessage = payload;
        state.resetPasswordResponse = null;
      })
      .addCase(refreshTokenAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokenAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.refreshTokenResponse = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(refreshTokenAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.refreshTokenResponse = null;
        state.responseMessage = payload;
      })
      .addCase(getAllCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoriesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getAllCategories = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getAllCategoriesAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.getAllCategories = null;
        state.responseMessage = payload.message;
      })
      .addCase(validateLinkForCorporateCreatePasswordApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        validateLinkForCorporateCreatePasswordApi.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.isValidatedCreatePasswordString = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        validateLinkForCorporateCreatePasswordApi.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.isValidatedCreatePasswordString = null;
          state.responseMessage = payload.message;
        }
      )
      .addCase(createCorporateCreatePasswordApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCorporateCreatePasswordApi.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.passwordCreated = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        createCorporateCreatePasswordApi.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.passwordCreated = null;
          state.responseMessage = payload.message;
        }
      )
      .addCase(LogoutApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogoutApi.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.logout = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(LogoutApi.rejected, (state, { payload }) => {
        state.loading = false;
        state.logout = null;
        state.responseMessage = payload.message;
      });
  },
});

export default authSlice.reducer;
