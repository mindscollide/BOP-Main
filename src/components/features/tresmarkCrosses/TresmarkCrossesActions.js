import { GetTresmarkCrossesPremiums } from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetTresmarkCrossesPremiumsAPI = createAsyncThunk(
  "watchlist/GetTresmarkCrossesPremiums", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetTresmarkCrossesPremiumsData = createPostAPI(
        watchListApi,
        GetTresmarkCrossesPremiums.RequestMethod
      );

      const response = await GetTresmarkCrossesPremiumsData();
      console.log(response, "responseresponse");
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetTresmarkCrossesPremiums_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetTresmarkCrossesPremiums_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetTresmarkCrossesPremiums_03".toLowerCase()
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
