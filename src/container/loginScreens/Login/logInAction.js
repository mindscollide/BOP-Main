import {
  corporateUserRequestMethod,
  loginRequestMethod,
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
        const {
          isExecuted,
          responseMessage,
          roleID,
          userID,
          token,
          userName,
          firstName,
          lastName,
          refreshToken,
          bankID,
        } = response.data.responseResult;
        if (isExecuted) {
          // localStorage.setItem("user", userID);
          // localStorage.setItem("roleID", roleID);
          // roleBasedNavigation(navigate, roleID);
          if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_01".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_02".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
          ) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("name", firstName);
            localStorage.setItem("email", userName);
            localStorage.setItem("roleId", roleID);
            localStorage.setItem("userID", userID);
            // localStorage.setItem("roleID", roleID);
            roleBasedNavigation(navigate, roleID);
            return {
              response: response.data.responseResult,
              message: "Successfully logged In",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_04".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_13".toLowerCase())
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else {
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
        const {
          isExecuted,
          responseMessage,
          corporateID,
          roleID,
          userID,
          token,
          userName,
          firstName,
          lastName,
          refreshToken,
          bankID,
        } = response.data.responseResult;

        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_01".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_02".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_03".toLowerCase()
              )
          ) {
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("token", token);
            localStorage.setItem("name", firstName);
            localStorage.setItem("email", userName);
            localStorage.setItem("roleId", roleID);
            localStorage.setItem("corporateID", corporateID);
            localStorage.setItem("userID", userID);
            roleBasedNavigation(navigate, roleID);
            return {
              response: response.data.responseResult,
              message: "Successfully logged In",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_04".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_05".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_06".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_07".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_08".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_09".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_10".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_11".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_12".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_13".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          } else {
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
      return rejectWithValue(error.response.data);
    }
  }
);
