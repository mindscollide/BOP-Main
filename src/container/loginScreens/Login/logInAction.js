import {
  corporateUserRequestMethod,
  GenerateOTP,
  loginRequestMethod,
  VerifyOTP,
} from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { roleBasedNavigation, setCustomHeaders } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the login async thunk
export const loginInApi = createAsyncThunk(
  "auth/login", // A unique action type string
  async ({ navigate, Data, shouldIsCorporate }, { rejectWithValue }) => {
    try {
      let getBlotterData = createPostAPI(
        authApi,
        loginRequestMethod.RequestMethod
      );

      const response = await getBlotterData(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;
        console.log(isExecuted, "messageKeymessageKey");

        if (isExecuted) {
          console.log(responseMessage, "responseMessage");

          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_Login_01".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_02".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_04".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_05".toLowerCase():
              return rejectWithValue("User is Locked");
            case "ERM_AuthService_AuthManager_Login_06".toLowerCase():
              return rejectWithValue("User is Disabled");
            case "ERM_AuthService_AuthManager_Login_07".toLowerCase():
              return rejectWithValue("User is Closed");
            case "ERM_AuthService_AuthManager_Login_08".toLowerCase():
              return rejectWithValue("User is Dormant");
            case "ERM_AuthService_AuthManager_Login_09".toLowerCase():
              return rejectWithValue("Login Failed");
            case "ERM_AuthService_AuthManager_Login_10".toLowerCase():
              return rejectWithValue("Login Failed");
            case "ERM_AuthService_AuthManager_Login_11".toLowerCase():
              return rejectWithValue("Someting went wrong");
            case "ERM_AuthService_AuthManager_Login_12".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Not A valid role to login");

            case "ERM_AuthService_AuthManager_Login_13".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Branch is InActive");
            case "ERM_AuthService_AuthManager_Login_14".toLowerCase():
              return rejectWithValue("Invalid Role");
            case "ERM_AuthService_AuthManager_Login_03".toLowerCase():
              const {
                branch,
                employeeID,
                ldapAccount,
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

              roleBasedNavigation(navigate, userRoleID);

              return {
                response: response.data.responseResult,
                message: "",
              };

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const corporateUserLoginInApi = createAsyncThunk(
  "auth/corporateLogIn", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let corporateUserLoginIn = createPostAPI(
        authApi,
        corporateUserRequestMethod.RequestMethod
      );

      const response = await corporateUserLoginIn(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_CorporateUserLogin_01".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_02".toLowerCase():
              return rejectWithValue("Something Went Wrong");
            case "ERM_AuthService_AuthManager_CorporateUserLogin_04".toLowerCase():
              return rejectWithValue("Incorrect Password");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_05".toLowerCase():
              return rejectWithValue("User is Locked");
            case "ERM_AuthService_AuthManager_CorporateUserLogin_06".toLowerCase():
              return rejectWithValue("User is Disabled");
            case "ERM_AuthService_AuthManager_CorporateUserLogin_07".toLowerCase():
              return rejectWithValue("User is Closed");
            case "ERM_AuthService_AuthManager_CorporateUserLogin_08".toLowerCase():
              return rejectWithValue("User is Dormant");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_09".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_10".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_11".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_12".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Something went wrong");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_13".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Corporate is InActive");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_03".toLowerCase():
              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem(
                "name",
                response.data.responseResult.user.firstName
              );
              localStorage.setItem(
                "email",
                response.data.responseResult.user.email
              );
              localStorage.setItem(
                "roleId",
                response.data.responseResult.user.userRoleID
              );
              localStorage.setItem(
                "userID",
                response.data.responseResult.user.userID
              );
              localStorage.setItem(
                "corporate",
                JSON.stringify(response.data.responseResult.user.corporate)
              );
              localStorage.setItem(
                "employeeID",
                response.data.responseResult.user.employeeID
              );
              localStorage.setItem(
                "ldapAccount",
                response.data.responseResult.user.ldapAccount
              );
              localStorage.setItem(
                "contactNumber",
                response.data.responseResult.user.contactNumber
              );
              localStorage.setItem(
                "userStatusID",
                response.data.responseResult.user.userStatusID
              );
              localStorage.setItem(
                "isFEEnabled",
                JSON.parse(response.data.responseResult.user.isFEEnabled)
              );
              localStorage.setItem(
                "isNonFEEnabled",
                JSON.parse(response.data.responseResult.user.isNonFEEnabled)
              );
              localStorage.setItem(
                "isTradeRights",
                response.data.responseResult.user.corporate.isTrade
              );

              roleBasedNavigation(
                navigate,
                response.data.responseResult.user.userRoleID
              );
              return {
                response: response.data.responseResult,
                message: "",
              };

            case "ERM_AuthService_AuthManager_CorporateUserLogin_15".toLowerCase():
              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem(
                "name",
                response.data.responseResult.user.firstName
              );
              localStorage.setItem(
                "email",
                response.data.responseResult.user.email
              );
              localStorage.setItem(
                "roleId",
                response.data.responseResult.user.userRoleID
              );
              localStorage.setItem(
                "userID",
                response.data.responseResult.user.userID
              );
              localStorage.setItem(
                "corporate",
                JSON.stringify(response.data.responseResult.user.corporate)
              );
              localStorage.setItem(
                "employeeID",
                response.data.responseResult.user.employeeID
              );
              localStorage.setItem(
                "ldapAccount",
                response.data.responseResult.user.ldapAccount
              );
              localStorage.setItem(
                "contactNumber",
                response.data.responseResult.user.contactNumber
              );
              localStorage.setItem(
                "userStatusID",
                response.data.responseResult.user.userStatusID
              );
              localStorage.setItem(
                "isFEEnabled",
                JSON.parse(response.data.responseResult.user.isFEEnabled)
              );
              localStorage.setItem(
                "isNonFEEnabled",
                JSON.parse(response.data.responseResult.user.isNonFEEnabled)
              );
              localStorage.setItem(
                "isTradeRights",
                response.data.responseResult.user.corporate.isTrade
              );

              navigate("/2fa");
              // roleBasedNavigation(navigate, userRoleID);
              return {
                response: response.data.responseResult,
                message: "",
              };

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const VerifyOTPApi = createAsyncThunk(
  "auth/VerifyOTP", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let VerifyOTPMethod = createPostAPI(authApi, VerifyOTP.RequestMethod);

      const response = await VerifyOTPMethod(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_VerifyOTP_02".toLowerCase():
              return rejectWithValue("Invalid OTP");
            case "ERM_AuthService_AuthManager_VerifyOTP_03".toLowerCase():
              return rejectWithValue("Verification Failed");

            case "ERM_AuthService_AuthManager_VerifyOTP_04".toLowerCase():
              return rejectWithValue("Verification Failed");

            case "ERM_AuthService_AuthManager_VerifyOTP_05".toLowerCase():
              return rejectWithValue(
                "The user has reached the maximum number of wrong attempts"
              );

            case "ERM_AuthService_AuthManager_VerifyOTP_01".toLowerCase():
              const { token, refreshToken, loginTime } =
                response.data.responseResult;
              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("loginTime", loginTime);

              roleBasedNavigation(navigate, 2);
              return {
                response: response.data.responseResult,
                message: "OTP Verified Successfully",
              };

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const GenerateOTPApi = createAsyncThunk(
  "auth/GenerateOTP", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let GenerateOTPMethod = createPostAPI(authApi, GenerateOTP.RequestMethod);

      const response = await GenerateOTPMethod(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_SignUpManager_GenerateOTP_01".toLowerCase():
              // navigate("", Data);
              return {
                response: response.data.responseResult,
                message: "OTP Generated Successfully",
              };
            case "ERM_AuthService_SignUpManager_GenerateOTP_02".toLowerCase():
              return rejectWithValue("OTP Not Generated ");
            case "ERM_AuthService_SignUpManager_GenerateOTP_04".toLowerCase():
              return rejectWithValue("Something Went Wrong");

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
