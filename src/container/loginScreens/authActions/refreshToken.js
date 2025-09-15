import { refreshTokenRM } from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the login async thunk
export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken", // A unique action type string
  async ({ navigate }, { rejectWithValue }) => {
    try {
      // // Set Axios headers using your custom headers function
      // let Data = {
      //   RefreshToken: localStorage.getItem("refreshToken"),
      //   Token: localStorage.getItem("token"),
      // };

      // let refreshToken = createPostAPI(authApi, refreshTokenRM.RequestMethod);

      // const response = await refreshToken(Data);
      // if (response.data.responseCode === 205) {
      //   localStorage.clear();
      //   window.location.href = "/";
      //   return rejectWithValue("Something went wrong");
      // } else if (response.data.responseCode === 200) {
      //   const { isExecuted, responseMessage, token, refreshToken } =
      //     response.data.responseResult;

      //   if (isExecuted) {
      //     if (
      //       responseMessage
      //         .toLowerCase()
      //         .includes(
      //           "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
      //         )
      //     ) {
      //       console.log("", response.data);
      //       localStorage.setItem("token", token);
      //       localStorage.setItem("refreshToken", refreshToken);
      //       return {
      //         message: "",
      //         response: response.data.responseResult,
      //       };
      //     } else if (
      //       responseMessage
      //         .toLowerCase()
      //         .includes(
      //           "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
      //         )
      //     ) {
      //       // localStorage.clear();
      //       window.location.href = "/";
      //       return rejectWithValue("Something went wrong");
      //     } else {
      //       console.log("", response.data);
      //       return rejectWithValue("Something went wrong");
      //     }
      //   } else {
      //     console.log("", response.data);
      //     // localStorage.clear();
      //     window.location.href = "/";
      //     return rejectWithValue("Something went wrong");
      //   }
      // }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// ✅ Plain async function (can be called anywhere)
export const refreshTokenFn = async () => {
  try {
    let Data = {
      RefreshToken: localStorage.getItem("refreshToken"),
      Token: localStorage.getItem("token"),
    };

    let refreshToken = createPostAPI(authApi, refreshTokenRM.RequestMethod);

    const response = await refreshToken(Data);

    if (response.data.responseCode === 205) {
      localStorage.clear();
      window.location.href = "/";
      throw new Error("Invalid refresh token");
    } else if (response.data.responseCode === 200) {
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
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          return { token, refreshToken };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
            )
        ) {
          window.location.href = "/";
          throw new Error("Refresh token expired");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        window.location.href = "/";
        throw new Error("Execution failed");
      }
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};
