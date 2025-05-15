import { CorporateBlotterData } from "@/common/api_config";
import { BlotterApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the ViewAllNatureOfBussinessAPI async thunk
export const CorporateBlotterDataAPI = createAsyncThunk(
  "Blotter/CorporateBlotterData", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", CorporateBlotterData.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: BlotterApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(CorporateBlotterDataAPI({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterData_01".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return {
              response: response.data.responseResult,
              message: "Successfully Rerieved Data",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterData_03".toLowerCase()
              )
          ) {
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
