import { BlotterDataRM,GetBlotterOutstandingDealsDataRM } from "@/common/api_config";
import { BlotterApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the ViewAllNatureOfBussinessAPI async thunk
export const BlotterDataAPI = createAsyncThunk(
  "Blotter/BlotterData", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let getBlotterData = createPostAPI(
        BlotterApi,
        BlotterDataRM.RequestMethod
      );

      const response = await getBlotterData(Data);
      const { responseCode } = response.data;
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(BlotterDataAPI({ navigate, Data }));
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
      } else {
        console.log("", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the ViewAllNatureOfBussinessAPI async thunk
export const GetBlotterOutstandingDealsDataAPI = createAsyncThunk(
  "Blotter/GetOutStandingData", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let getBlotterOutStandingData = createPostAPI(
        BlotterApi,
        GetBlotterOutstandingDealsDataRM.RequestMethod
      );

      const response = await getBlotterOutStandingData(Data);
      const { responseCode } = response.data;
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterOutstandingDealsData_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Successfully Rerieved Data",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterOutstandingDealsData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetBlotterOutstandingDealsData_03".toLowerCase()
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
        console.log("", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);