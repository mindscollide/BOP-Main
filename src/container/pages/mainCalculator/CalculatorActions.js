import {
  calculateForwardsData,
  calculateFxDiscountingData,
  calculateNonFxDiscountingData,
  getAllCalculatorData,
} from "@/common/api_config";
import { CalculatorApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the GetAllCalculatorData async thunk
export const GetAllCalculatorData = createAsyncThunk(
  "Calculator/GetAllCalculatorData", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetAllCalculator = createPostAPI(
        CalculatorApi,
        getAllCalculatorData.RequestMethod
      );

      const response = await GetAllCalculator(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetAllCalculatorData({ Data, navigate }));
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
              message: "Successfully Rerieved Data",
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
        CalculatorApi,
        calculateFxDiscountingData.RequestMethod
      );

      const response = await CalculateFxDiscounting(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
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
              message: "Successfully Rerieved Data",
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
        CalculatorApi,
        calculateNonFxDiscountingData.RequestMethod
      );

      const response = await CalculateNonFxDiscounting(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
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
              message: "Successfully Rerieved Data",
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
        CalculatorApi,
        calculateForwardsData.RequestMethod
      );

      const response = await CalculateForwards(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
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
              message: "Successfully Rerieved Data",
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
