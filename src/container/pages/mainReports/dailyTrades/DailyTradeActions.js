import { GetAllTrades } from "@/common/api_config";
import { blotterApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllTradesAPI = createAsyncThunk(
  "Auth/GetAllTrades", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetAllTradesData = createPostAPI(
        blotterApi,
        GetAllTrades.RequestMethod
      );

      const response = await GetAllTradesData(Data);
      console.log(response, "responseresponse");
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetAllTrades_01".toLowerCase()
              )
          ) {
            console.log("", response.data);
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetAllTrades_02".toLowerCase()
              )
          ) {
            return rejectWithValue("");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetAllTrades_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
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
