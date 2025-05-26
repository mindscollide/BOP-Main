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

      console.log(responseCode,response, "responseCoderesponseCode")
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(LogoutApi({ navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_01".toLowerCase())
          ) {
            navigate("/");
            localStorage.clear();
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_02".toLowerCase())
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_LogOut_03".toLowerCase())
          ) {
            return rejectWithValue("Unsuccessfull");
          } else {
            return rejectWithValue("Unsuccessfull");
          }
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
      console.log(response, "response");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
