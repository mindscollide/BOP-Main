import {
  corporateUserRequestMethod,
  loginRequestMethod,
} from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { roleBasedNavigation, setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login async thunk
export const loginInApi = createAsyncThunk(
  "auth/login", // A unique action type string
  async ({ navigate, Data, shouldIsCorporate }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", loginRequestMethod.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const {
          isExecuted,
          responseMessage,
          roleID,
          userID,
          token,
          firstName,
          lastName,
        } = response.data.responseResult;
        if (isExecuted) {
          localStorage.setItem("user", userID);
          localStorage.setItem("roleID", roleID);
          roleBasedNavigation(navigate, roleID);
          if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_01".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_02".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
          ) {
            localStorage.setItem("user", userID);
            localStorage.setItem("roleID", roleID);
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
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_13".toLowerCase())
          ) {
          } else {
          }
        } else {
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something-went-wrong");
    }
  }
);

// Define the login async thunk
export const corporateUserLoginInApi = createAsyncThunk(
  "auth/corporateLogIn", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", corporateUserRequestMethod.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const {
          isExecuted,
          responseMessage,
          roleID,
          userID,
          token,
          firstName,
          lastName,
        } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_01".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_02".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_03".toLowerCase()
              )
          ) {
            localStorage.setItem("user", userID);
            localStorage.setItem("roleID", roleID);
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
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_05".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_06".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_07".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_08".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_09".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_10".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_11".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_12".toLowerCase()
              )
          ) {
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CorporateUserLogin_13".toLowerCase()
              )
          ) {
          } else {
          }
        } else {
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
