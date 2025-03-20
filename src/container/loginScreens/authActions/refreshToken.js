import { refreshTokenRM } from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login async thunk
export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken", // A unique action type string
  async ({ navigate }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();
      let Data = {
        RefreshToken: localStorage.getItem("refreshToken"),
        Token: localStorage.getItem("token"),
        LastLoginDateTime: localStorage.getItem("loginTime"),
      };
      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", refreshTokenRM.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;

        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
              )
          ) {
            console.log("", response.data);
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            return {
              message: "Successfully updated",
              response: response.data.responseResult,
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
              )
          ) {
            localStorage.clear();
            navigate("/");
            return rejectWithValue("Something went wrong");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          localStorage.clear();
          navigate("/");
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
