import {
  GetAllCounterPartyData,
  GetAllFowardsAndDiscountsRates,
  GetDashboardData,
  GetFXInstruments,
  GetMisDataByRange,
  SaveUserDashboard,
} from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the GetFXInstruments async thunk
export const GetFXInstrumentsAPI = createAsyncThunk(
  "watchlist/GetFXInstruments", // A unique action type string
  async ({}, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", GetFXInstruments.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (responseMessage.toLowerCase().includes("Success".toLowerCase())) {
            console.log("", response.data);
            return {
              response: response.data.responseResult,
              message: "Successfully Rerieved Data",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_03".toLowerCase()
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

// Define the GetMisDataByRangeAPI async thunk
export const GetMisDataByRangeAPI = createAsyncThunk(
  "watchlist/GetMisDataByRange", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", GetMisDataByRange.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_01".toLowerCase()
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
                "ERM_WatchlistService_GetFXInstrumentsAPI_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_03".toLowerCase()
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const GetAllFowardsAndDiscountsRatesAPI = createAsyncThunk(
  "watchlist/GetAllFowardsAndDiscountsRates", // A unique action type string
  async ({}, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append(
        "RequestMethod",
        GetAllFowardsAndDiscountsRates.RequestMethod
      );

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllFowardsAndDiscountsRates_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetAllFowardsAndDiscountsRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllFowardsAndDiscountsRates_03".toLowerCase()
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const GetAllCounterPartyDataAPI = createAsyncThunk(
  "watchlist/GetAllCounterPartyData", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", GetAllCounterPartyData.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_01".toLowerCase()
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
                "ERM_WatchlistService_GetFXInstrumentsAPI_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_03".toLowerCase()
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const GetDashboardDataAPI = createAsyncThunk(
  "watchlist/GetDashboardData", // A unique action type string
  async ({}, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", GetDashboardData.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      console.log(responseCode, "responseCoderesponseCode");
      if (responseCode === 417) {
        console.log(responseCode, "responseCoderesponseCode");
        await dispatch(refreshTokenAction({ navigate }));
        console.log(responseCode, "responseCoderesponseCode");
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDashboardData_01".toLowerCase()
              )
          ) {
            console.log("globalStateWatchlistCardData", response.data);
            return {
              response: response.data.responseResult,
              message: "Successfully Rerieved Data",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDashboardData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDashboardData_03".toLowerCase()
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const SaveUserDashboardAPI = createAsyncThunk(
  "watchlist/SaveUserDashboard", // A unique action type string
  async ({ Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", SaveUserDashboard.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: watchListApi,
        data: form,
        headers, // Use custom headers here
      });
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_01".toLowerCase()
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
                "ERM_WatchlistService_GetFXInstrumentsAPI_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_03".toLowerCase()
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
