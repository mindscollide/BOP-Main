import { loginRequestMethod } from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login async thunk
export const loginInApi = createAsyncThunk(
  "auth/login", // A unique action type string
  async ({ navigate, data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();
      form.append("RequestMethod", loginRequestMethod.RequestMethod);
      form.append("RequestData", JSON.stringify(data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });
      console.log(response, "isExecutedisExecutedisExecuted");
      //   if(response.data.resonseCode === 200) {
      //     const { isExecuted, responseMessage } = response.data.responseResult;
      //     if(isExecuted) {
      //         if(responseMessage.toLowerCase().includes("")) {

      //         } else {

      //         }
      //     } else {

      //     }
      //   }
    } catch (error) {
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
