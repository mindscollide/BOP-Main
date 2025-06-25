import {
  GetAllNatureOfTransactionsRM,
  SaveTransactionRFQ,
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

export const GetAllNatureOfTransactionsApi = createAsyncThunk(
  "auth/GetAllNatureOfTransactions",
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getNatureOfTransactions = createPostAPI(
        authApi,
        GetAllNatureOfTransactionsRM.RequestMethod
      );

      const response = await getNatureOfTransactions();
      if (response.data.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please log in again.");
      }
      if (response.data.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetAllNatureOfTransactionsApi({ navigate }));
      } else if (response.data.responseCode === 200) {
        return {
          response: {
            natureOfTransactions: [
              {
                id: 1,
                name: "ENCASHMENT",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 2,
                name: "EXPORT PAYMENT",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 3,
                name: "EXPORT ADVANCE PAYMENT",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 4,
                name: "CLOSE-OUT IMPORT BOOKING",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 5,
                name: "INWARD REMITTANCE",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 6,
                name: "FC LOAN (EXPORT)",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: false,
                isForSell: true,
              },
              {
                id: 7,
                name: "IMPORT PAYMENT",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 8,
                name: "OUTWARD REMITTANCE",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 9,
                name: "CLOSE-OUT EXPORT BOOKING",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 10,
                name: "REIMBURSEMENT CLAIM",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 11,
                name: "FC LOAN SETTLEMENT (IMPORT)",
                isForSpot: true,
                isForForward: false,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 12,
                name: "FORWARD",
                isForSpot: false,
                isForForward: true,
                isForFE: false,
                isForNonFE: false,
                isForBuy: true,
                isForSell: true,
              },
              {
                id: 13,
                name: "FE Discounting",
                isForSpot: false,
                isForForward: false,
                isForFE: true,
                isForNonFE: false,
                isForBuy: true,
                isForSell: false,
              },
              {
                id: 14,
                name: "NON FE Discounting",
                isForSpot: false,
                isForForward: false,
                isForFE: false,
                isForNonFE: true,
                isForBuy: true,
                isForSell: false,
              },
            ],
            responseMessage:
              "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_01",
            isExecuted: true,
          },
          message: "Data available",
        };

        // const { isExecuted, responseMessage } = response.data.responseResult;
        // if (isExecuted) {
        //   if (
        //     responseMessage
        //       .toLowerCase()
        //       .includes(
        //         "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_01".toLowerCase()
        //       )
        //   ) {
        //     return {
        //       response: response.data.responseResult,
        //       message: "Data available",
        //     };
        //   } else if (
        //     responseMessage
        //       .toLowerCase()
        //       .includes(
        //         "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_02".toLowerCase()
        //       )
        //   ) {
        //     return rejectWithValue("No Data available");
        //   } else if (
        //     responseMessage
        //       .toLowerCase()
        //       .includes(
        //         "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_03".toLowerCase()
        //       )
        //   ) {
        //     return rejectWithValue("Something went wrong");
        //   } else {
        //     return rejectWithValue("Something went wrong");
        //   }
        // } else {
        //   console.log("", response.data);
        //   return rejectWithValue("Something went wrong");
        // }
      } else {
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
