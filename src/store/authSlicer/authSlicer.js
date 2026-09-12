import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  corporateUserLoginInApi,
  GenerateOTPApi,
  loginInApi,
  VerifyOTPApi,
} from "../../container/loginScreens/Login/logInAction";
import { resetAndForgotPassword } from "../../container/loginScreens/forgetPassword/forgotPassword_Actions";
import { setCustomHeaders } from "@/common/utils";
import {
  getAllActiveCorporatesApi,
  getAllCategoriesAction,
  getAllInstrumentsApi,
  GetUsersEmailApi,
} from "@/components/utils/globalApis";
import {
  createCorporateCreatePasswordApi,
  validateLinkForCorporateCreatePasswordApi,
} from "@/container/loginScreens/CreatePassword/createPassword_Action";
import { LogoutApi } from "@/container/loginScreens/authActions/logoutAction";
import { GetAllNatureOfTransactionsApi } from "@/container/pages/mainCorporate/rfqModal/RFQActions";
import {
  CreateCorporateUserForgotPasswordApi,
  ResetPasswordCorporateApi,
} from "@/container/loginScreens/ChangePassword/changePasswordActions";
import {
  EmailTokenVerifyApi,
  ForgotPasswordApi,
  ResetPasswordApi,
} from "@/container/loginScreens/authActions/AuthActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: null,
    responseMessage: "",
    errorSeverity: null,
    Loader: false,
    error: null,
    resetPasswordResponse: null,
    refreshTokenResponse: null,
    getAllCategories: null,
    isValidatedCreatePasswordString: null,
    passwordCreated: null,
    logout: null,
    getAllInstruments: null,
    GetAllNatureOfTransactions: null,
    GetAllActiveCorproates: null,
    ResetPasswordCorporate: null,
    CreateCorporateUserForgotPassword: null,
    VerifyOTP: null,
    GenerateOTP: null,
    GetUsersEmail: null,
    globalSnackBarMessage: "",
    resetPassword: null,
    forgotPassword: null,
    resetPasswordEmailVerification: null,
  },
  reducers: {
    clearAuthResponseMessage: (state) => {
      state.responseMessage = "";
    },
    setGlobalSnackBarMessage: (state, { payload }) => {
      state.globalSnackBarMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(loginInApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(loginInApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.userDetails = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      // Rejected state (when the API call fails)
      .addCase(loginInApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.responseMessage = action.payload;
        state.errorSeverity = "error";
        state.user = null;
      })
      // Pending state (while the API call is being made)
      .addCase(corporateUserLoginInApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(corporateUserLoginInApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.userDetails = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      // Rejected state (when the API call fails)
      .addCase(corporateUserLoginInApi.rejected, (state, action) => {
        state.Loader = false;
        state.responseMessage = action.payload;
        state.errorSeverity = "error";
        state.user = null;
      })
      .addCase(resetAndForgotPassword.pending, (state, { payload }) => {
        state.Loader = true;
      })
      .addCase(resetAndForgotPassword.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
        state.resetPasswordResponse = payload?.response;
      })
      .addCase(resetAndForgotPassword.rejected, (state, { payload }) => {
        state.Loader = false;
        state.error = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
        state.resetPasswordResponse = null;
      })

      .addCase(getAllCategoriesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllCategoriesAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategories = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllCategoriesAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategories = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      })
      .addCase(validateLinkForCorporateCreatePasswordApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        validateLinkForCorporateCreatePasswordApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.isValidatedCreatePasswordString = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        },
      )
      .addCase(
        validateLinkForCorporateCreatePasswordApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.isValidatedCreatePasswordString = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        },
      )
      .addCase(createCorporateCreatePasswordApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        createCorporateCreatePasswordApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.passwordCreated = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        },
      )
      .addCase(
        createCorporateCreatePasswordApi.rejected,
        (state, { payload }) => {
          console.log(payload);
          state.Loader = false;
          state.passwordCreated = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        },
      )
      .addCase(LogoutApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(LogoutApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.logout = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(LogoutApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.logout = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(getAllInstrumentsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllInstrumentsApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllInstruments = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllInstrumentsApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllInstruments = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(GetAllNatureOfTransactionsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetAllNatureOfTransactionsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetAllNatureOfTransactions = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        },
      )
      .addCase(GetAllNatureOfTransactionsApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetAllNatureOfTransactions = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(getAllActiveCorporatesApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllActiveCorporatesApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetAllActiveCorproates = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllActiveCorporatesApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetAllActiveCorproates = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(ResetPasswordCorporateApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(ResetPasswordCorporateApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.ResetPasswordCorporate = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(ResetPasswordCorporateApi.rejected, (state, { payload }) => {
        console.log(payload);
        state.Loader = false;
        state.ResetPasswordCorporate = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(CreateCorporateUserForgotPasswordApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        CreateCorporateUserForgotPasswordApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.CreateCorporateUserForgotPassword = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        },
      )
      .addCase(
        CreateCorporateUserForgotPasswordApi.rejected,
        (state, { payload }) => {
          console.log(payload);
          state.Loader = false;
          state.CreateCorporateUserForgotPassword = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        },
      )
      .addCase(VerifyOTPApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(VerifyOTPApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.VerifyOTP = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(VerifyOTPApi.rejected, (state, { payload }) => {
        console.log(payload);
        state.Loader = false;
        state.VerifyOTP = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(GenerateOTPApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GenerateOTPApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GenerateOTP = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GenerateOTPApi.rejected, (state, { payload }) => {
        console.log(payload);
        state.Loader = false;
        state.GetUsersEmail = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(GetUsersEmailApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetUsersEmailApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetUsersEmail = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetUsersEmailApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetUsersEmail = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(ResetPasswordApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(ResetPasswordApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.resetPassword = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(ResetPasswordApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.resetPassword = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(EmailTokenVerifyApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(EmailTokenVerifyApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.resetPasswordEmailVerification = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(EmailTokenVerifyApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.resetPasswordEmailVerification = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(ForgotPasswordApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(ForgotPasswordApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.forgotPassword = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(ForgotPasswordApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.forgotPassword = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      });
  },
});
export const { clearAuthResponseMessage, setGlobalSnackBarMessage } =
  authSlice.actions;
export default authSlice.reducer;
