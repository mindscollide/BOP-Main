import {
  AcceptTransactionRM,
  AssignTransactionRM,
  BlotterDataRM,
  GetBlotterOutstandingDealsDataRM,
  RejectTransactionRM,
  SaveForwardTransactionRM,
  SaveNonFeDiscountingTransactionRM,
  SaveSpotTransactionRM,
} from "@/common/api_config";
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

export const SaveSpotTransactionAPI = createAsyncThunk(
  "Blotter/SaveSpot",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        SaveSpotTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveSpotTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Spot transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const SaveForwardTransactionAPI = createAsyncThunk(
  "Blotter/SaveForward",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        SaveForwardTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveForwardTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forward transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const SaveFEDiscountingTransactionAPI = createAsyncThunk(
  "Blotter/SaveFEDiscounting",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        SaveFEDiscountingTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveFEDiscountingTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "FE Discounting transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const SaveNonFEDiscountingTransactionAPI = createAsyncThunk(
  "Blotter/SaveNonFEDiscounting",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        SaveNonFeDiscountingTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveNonFEDiscountingTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Non-FE Discounting transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const AssignTransactionAPI = createAsyncThunk(
  "Blotter/Assign",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        AssignTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(AssignTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Transaction assigned successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AssignTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(
            responseMessage || "Failed to assign transaction"
          );
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const AcceptTransactionAPI = createAsyncThunk(
  "Blotter/Accept",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        AcceptTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(AcceptTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Transaction accepted successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(
            responseMessage || "Failed to accept transaction"
          );
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const RejectTransactionAPI = createAsyncThunk(
  "Blotter/Reject",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        BlotterApi,
        RejectTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RejectTransactionAPI({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Transaction rejected successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error rejecting transaction");
    }
  }
);
