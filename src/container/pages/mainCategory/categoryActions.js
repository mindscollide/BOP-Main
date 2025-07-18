import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import {
  GetAllCounterPartyDataRM,
  GetCategoryWiseDiscountingRates,
  GetCategoryWiseForwardRates,
  GetCategoryWiseSpotRates,
} from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";

export const getAllCategoryTableData = createAsyncThunk(
  "category/getAllCategoryTableData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let getAllCategoryTable = createPostAPI(
        watchListApi,
        GetAllCounterPartyDataRM.RequestMethod
      );

      const response = await getAllCategoryTable(Data);
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getAllCategoryTableData({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_04".toLowerCase()
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
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Define the login async thunk
export const GetCategoryWiseSpotRatesApi = createAsyncThunk(
  "watchlist/GetCategoryWiseSpotRates", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetCategoryWiseSpotRatesData = createPostAPI(
        watchListApi,
        GetCategoryWiseSpotRates.RequestMethod
      );

      const response = await GetCategoryWiseSpotRatesData(Data);

      const { responseCode } = response.data;
    

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetCategoryWiseSpotRatesApi({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseSpotRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseSpotRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseSpotRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched.");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseSpotRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the GetCategoryWiseForwardRates async thunk
export const GetCategoryWiseForwardRatesApi = createAsyncThunk(
  "watchlist/GetCategoryWiseForwardRates", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetCategoryWiseForwardRatesData = createPostAPI(
        watchListApi,
        GetCategoryWiseForwardRates.RequestMethod
      );

      const response = await GetCategoryWiseForwardRatesData(Data);

      const { responseCode } = response.data;
    

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetCategoryWiseForwardRatesApi({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseForwardRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseForwardRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseForwardRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched.");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseForwardRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the GetCategoryWiseDiscountingRates async thunk
export const GetCategoryWiseDiscountingRatesApi = createAsyncThunk(
  "watchlist/GetCategoryWiseDiscountingRates", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetCategoryWiseDiscountingRatesData = createPostAPI(
        watchListApi,
        GetCategoryWiseDiscountingRates.RequestMethod
      );

      const response = await GetCategoryWiseDiscountingRatesData(Data);

      const { responseCode } = response.data;
    

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetCategoryWiseDiscountingRatesApi({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseDiscountingRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseDiscountingRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseDiscountingRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched.");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCategoryWiseDiscountingRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
