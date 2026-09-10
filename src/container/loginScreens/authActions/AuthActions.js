import {
  BankResetPassword,
  ForgetPassword,
  EmailTokenVerify,
} from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { roleBasedNavigation } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ResetPasswordApi = createAsyncThunk(
  "auth/bankResetPassword",
  async ({ Data, navigate }, { rejectWithValue }) => {
    try {
      const resetPassword = createPostAPI(
        authApi,
        BankResetPassword.RequestMethod,
      );
      const response = await resetPassword(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const {
          isExecuted,
          responseMessage,
          token,
          refreshToken,
          isPasswordReset,
          user: {
            branch,
            employeeID,
            ldapAccount,
            userID,
            firstName,
            email,
            contactNumber,
            userRoleID,
            userStatusID,
          },
        } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ResetPassword_01".toLowerCase(),
              )
          ) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("name", firstName);
            localStorage.setItem("email", email);
            localStorage.setItem("roleId", userRoleID);
            localStorage.setItem("userID", userID);
            localStorage.setItem("branch", JSON.stringify(branch));
            localStorage.setItem("employeeID", employeeID);
            localStorage.setItem("ldapAccount", ldapAccount);
            localStorage.setItem("contactNumber", contactNumber);
            localStorage.setItem("userStatusID", userStatusID);
            {
              branch !== null &&
                branch !== undefined &&
                localStorage.setItem("isTradeRights", branch.isTrade);
            }
            console.log(userRoleID);
            roleBasedNavigation(navigate, userRoleID);
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ResetPassword_02".toLowerCase(),
              )
          ) {
            return rejectWithValue("Token is Expired");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ResetPassword_03".toLowerCase(),
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ResetPassword_04".toLowerCase(),
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ResetPassword_05".toLowerCase(),
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        }
        return rejectWithValue(responseMessage || "Something went wrong");
      }
      return rejectWithValue("Something went wrong");
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  },
);

export const ForgotPasswordApi = createAsyncThunk(
  "auth/bankForgotPassword",
  async ({ Data, navigate }, { rejectWithValue }) => {
    try {
      const forgetPassword = createPostAPI(
        authApi,
        ForgetPassword.RequestMethod,
      );
      const response = await forgetPassword(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForForgetPasword_01".toLowerCase(),
              )
          ) {
            navigate("/emailsent", {
              replace: true,
              state: "EmailSentSuccessfully",
            });
            return {
              response: response.data.responseResult,
              message: "Email Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForForgetPasword_02".toLowerCase(),
              )
          ) {
            return rejectWithValue("Invalid Email");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForForgetPasword_03".toLowerCase(),
              )
          ) {
            return rejectWithValue("User Inactive");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForForgetPasword_04".toLowerCase(),
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForForgetPasword_05".toLowerCase(),
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      }
      return rejectWithValue("Something went wrong");
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  },
);

export const EmailTokenVerifyApi = createAsyncThunk(
  "auth/emailTokenVerify",
  async ({ Data, navigate }, { rejectWithValue }) => {
    try {
      const emailTokenVerify = createPostAPI(
        authApi,
        EmailTokenVerify.RequestMethod,
      );

      const response = await emailTokenVerify(Data);
      const { responseCode } = response.data;

      if (responseCode !== 200) {
        return rejectWithValue("Something went wrong");
      }

      const { isExecuted, responseMessage } = response.data.responseResult;

      if (!isExecuted) {
        return rejectWithValue(responseMessage || "Something went wrong");
      }
      if (
        responseMessage.toLowerCase() ===
        "ERM_AuthService_AuthManager_EmailToken_01".toLowerCase()
      ) {
        navigate("/resetPassword", {
          replace: true,
          state: {
            email: response.data.responseResult.email,
            requestToken: Data.EncryptedString,
          },
        });

        return {
          response: response.data.responseResult,
          message: "",
        };
      }

      if (
        responseMessage.toLowerCase() ===
        "ERM_AuthService_AuthManager_EmailToken_02".toLowerCase()
      ) {
        navigate("/resetPasswordLinkExpired", {
          replace: true,
          state: response.data.responseResult,
        });

        return rejectWithValue("");
      }

      if (
        responseMessage
          .toLowerCase()
          .includes("ERM_AuthService_AuthManager_EmailToken_03".toLowerCase())
      ) {
        return rejectWithValue("Something went wrong");
      }

      return rejectWithValue(responseMessage || "Something went wrong");
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  },
);
