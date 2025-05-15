import { setCustomHeaders } from "@/common/utils";
import { authApi } from "@/common/apiend_points";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendEmailForResetPaswordRM } from "@/common/api_config";

// Define the login async thunk
export const resetAndForgotPassword = createAsyncThunk(
  "auth/resetPassword", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", sendEmailForResetPaswordRM.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        console.log(responseMessage, "responseMessageresponseMessage")
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Email for Reset Password Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Emailsent for Reset Password");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Corporate User");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Please Enter A valid Email");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Something-went-wrong");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something-went-wrong");
    }
  }
);
