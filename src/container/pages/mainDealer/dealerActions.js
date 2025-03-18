import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadRatesApi } from "@/common/apiend_points";
import {
  clearRatesRM,
  marketOnOffRM,
  getLastAndCurrentUSDRatesRM,
  publishCurrentUSDRatesRM,
  createTenorRM,
  getAllTenorsRM,
  getTenorWiseForwardRatesRM,
  publishTenorWiseForwardRatesRM,
  getDiscountingRatesRM,
  publishDiscountingRatesRM,
} from "@/common/api_config";
import axios from "axios";

// Define the login async thunk
export const clearRatesAction = createAsyncThunk(
  "uploadRate/clearRate", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", clearRatesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_ClearRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_04".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const getLastPublishRatesAction = createAsyncThunk(
  "uploadRate/getLastPublishRates", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getLastAndCurrentUSDRatesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_04".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const PublishNewRatesAction = createAsyncThunk(
  "uploadRate/PublishNewRates", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", publishCurrentUSDRatesRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_05".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const marketOnOffAction = createAsyncThunk(
  "uploadRate/marketOnOff", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", marketOnOffRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_MarketONOFF_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_04".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
