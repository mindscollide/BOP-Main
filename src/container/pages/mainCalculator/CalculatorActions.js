import {
  calculateForwardsData,
  calculateFxDiscountingData,
  calculateNonFxDiscountingData,
  getAllCalculatorData,
} from "@/common/api_config";
import { calculatorApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the GetAllCalculatorData async thunk
export const GetAllCalculatorData = createAsyncThunk(
  "Calculator/GetAllCalculatorData", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetAllCalculator = createPostAPI(
        calculatorApi,
        getAllCalculatorData.RequestMethod
      );

      const response = await GetAllCalculator();
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(GetAllCalculatorData({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Calculator_CalculatorServiceManager_GetCalculatorData_01".toLowerCase()
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
                "Calculator_CalculatorServiceManager_GetCalculatorData_02".toLowerCase()
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

// Define the CalculateFxDiscounting async thunk
export const CalculateFxDiscountingAPI = createAsyncThunk(
  "Calculator/CalculateFxDiscountingAPI", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let CalculateFxDiscounting = createPostAPI(
        calculatorApi,
        calculateFxDiscountingData.RequestMethod
      );

      const response = await CalculateFxDiscounting(Data);
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(CalculateFxDiscountingAPI({ Data, navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Calculator_CalculatorServiceManager_CalculateFxDiscounting_01".toLowerCase()
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
                "Calculator_CalculatorServiceManager_CalculateFxDiscounting_02".toLowerCase()
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

// Define the CalculateNonFxDiscounting async thunk
export const CalculateNonFxDiscountingAPI = createAsyncThunk(
  "Calculator/CalculateNonFxDiscountingAPI", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let CalculateNonFxDiscounting = createPostAPI(
        calculatorApi,
        calculateNonFxDiscountingData.RequestMethod
      );

      const response = await CalculateNonFxDiscounting(Data);
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(CalculateNonFxDiscountingAPI({ Data, navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Calculator_CalculatorServiceManager_CalculateNonFxDiscounting_01".toLowerCase()
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
                "Calculator_CalculatorServiceManager_CalculateNonFxDiscounting_02".toLowerCase()
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

// Define the CalculateNonFxDiscounting async thunk
export const CalculateForwardsAPI = createAsyncThunk(
  "Calculator/CalculateForwardsAPI", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let CalculateForwards = createPostAPI(
        calculatorApi,
        calculateForwardsData.RequestMethod
      );

      const response = await CalculateForwards(Data);
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(CalculateForwardsAPI({ Data, navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Calculator_CalculatorServiceManager_CalculateForward_01".toLowerCase()
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
                "Calculator_CalculatorServiceManager_CalculateForward_02".toLowerCase()
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
