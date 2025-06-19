import {
  SaveTransactionRFQ,
  ViewAllNatureOfBussiness,
} from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the ViewAllNatureOfBussinessAPI async thunk
export const ViewAllNatureOfBussinessAPI = createAsyncThunk(
  "Auth/ViewAllNatureOfBussiness", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let ViewAllNatureOfBussiness = createPostAPI(
        authApi,
        ViewAllNatureOfBussiness.RequestMethod
      );

      const response = await ViewAllNatureOfBussiness(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(ViewAllNatureOfBussinessAPI({ Data, navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_01".toLowerCase()
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
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_03".toLowerCase()
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

// Define the ViewAllNatureOfBussinessAPI async thunk
export const SaveTransactionRFQAPI = createAsyncThunk(
  "Blotter/SaveTransactionRFQAPI", // A unique action type string
  async ({ Data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await SaveTransactionRFQ(Data);
      const { responseCode } = response.data;
     if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_01".toLowerCase()
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
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_ViewAllNatureOfBussiness_03".toLowerCase()
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
