import { roleBasedNavigation } from "@/common/utils";
import { authApi } from "@/common/apiend_points";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ResetPasswordCorporate,
  CreateCorporateUserForgotPassword,
} from "@/common/api_config";
import createPostAPI from "@/utils/axiosInstance";

export const ResetPasswordCorporateApi = createAsyncThunk(
  "auth/ResetPasswordCorporate", // A unique action type string
  async ({ navigate, PasswordData }, { rejectWithValue }) => {
    try {
      let ResetPasswordCorporateDate = createPostAPI(
        authApi,
        ResetPasswordCorporate.RequestMethod
      );

      const response = await ResetPasswordCorporateDate(PasswordData);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage.toLowerCase();

          switch (msg) {
            case "ERM_AuthService_AuthManager_ResetPasswordCorporate_01".toLowerCase():
              // const {
              //   corporate,
              //   userID,
              //   firstName,
              //   email,
              //   contactNumber,
              //   userRoleID,
              //   userStatusID,
              // } = response.data.responseResult.user;
              // localStorage.setItem("token", token);
              // localStorage.setItem("refreshToken", refreshToken);
              // localStorage.setItem("name", firstName);
              // localStorage.setItem("email", email);
              // localStorage.setItem("roleId", userRoleID);
              // localStorage.setItem("userID", userID);
              // localStorage.setItem("corporate", JSON.stringify(corporate));
              // localStorage.setItem("contactNumber", contactNumber);
              // localStorage.setItem("userStatusID", userStatusID);
              // roleBasedNavigation(navigate, userRoleID);
              return {
                response: response.data.responseResult,
                message: "",
              };

            case "ERM_AuthService_AuthManager_ResetPasswordCorporate_02".toLowerCase():
              return rejectWithValue("Password Not Reset");

            case "ERM_AuthService_AuthManager_ResetPasswordCorporate_03".toLowerCase():
              return rejectWithValue("Something Went Wrong");

            default:
              return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

export const CreateCorporateUserForgotPasswordApi = createAsyncThunk(
  "auth/CreateCorporateUserForgotPassword", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let CreateCorporateUserForgotPasswordDate = createPostAPI(
        authApi,
        CreateCorporateUserForgotPassword.RequestMethod
      );

      const response = await CreateCorporateUserForgotPasswordDate(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          const msg = responseMessage.toLowerCase();

          switch (msg) {
            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_01".toLowerCase():
              const {
                corporate,
                userID,
                firstName,
                email,
                contactNumber,
                userRoleID,
                userStatusID,
              } = response.data.responseResult.user;
              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("name", firstName);
              localStorage.setItem("email", email);
              localStorage.setItem("roleId", userRoleID);
              localStorage.setItem("userID", userID);
              localStorage.setItem("corporate", JSON.stringify(corporate));
              localStorage.setItem("contactNumber", contactNumber);
              localStorage.setItem("userStatusID", userStatusID);
              roleBasedNavigation(navigate, userRoleID);
              return {
                response: response.data.responseResult,
                message: "Password Reset Successfully",
              };

            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_02".toLowerCase():
              return rejectWithValue("Invalid Email");

            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_03".toLowerCase():
              return rejectWithValue("Invalid Corporate User");

            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_04".toLowerCase():
              return rejectWithValue("User is InActive");

            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_05".toLowerCase():
              return rejectWithValue("Error While Creating Password");

            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_07".toLowerCase():
              return rejectWithValue("Password Created But Corporate InActive");
            case "ERM_AuthService_AuthManager_CreateCorporateUserForgotPassword_06".toLowerCase():
              return rejectWithValue("Exception");
            default:
              return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
