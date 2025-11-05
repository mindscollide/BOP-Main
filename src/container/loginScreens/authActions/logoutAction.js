import { LogoutRM } from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LogoutApi = createAsyncThunk(
  "auth/Logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const logoutUser = createPostAPI(authApi, LogoutRM.RequestMethod);
      const response = await logoutUser();
      const { responseCode } = response.data;

      console.log(responseCode, response, "responseCoderesponseCode");

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_01".toLowerCase())
          ) {
            // localStorage.clear();
            window.location.href = "/";
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_02".toLowerCase())
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_03".toLowerCase())
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
