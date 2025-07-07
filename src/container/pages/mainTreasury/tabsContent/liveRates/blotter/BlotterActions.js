import {
  AcceptRFQTransactionRM,
  AcceptTransactionCancellationRM,
  AcceptTransactionRM,
  AssignTransactionRM,
  BlotterDataRM,
  CalculateTenorSwapAndForwardRateRM,
  CancelPendingTransactionRM,
  CancelTransactionRM,
  ExpireRFQTransactionRM,
  GetBlotterOutstandingDealsDataRM,
  GetFEDiscountingTransactionDetailsRM,
  GetForwardTransactionDetailsRM,
  GetNonFEDiscountingTransactionDetailsRM,
  GetSpotTransactionDetailsRM,
  RFQFEDiscountingTransactionQuotationRM,
  RFQForwardTransactionQuotationRM,
  RFQNonFEDiscountingTransactionQuotationRM,
  RFQTransactionQuotationRM,
  RejectRFQTransactionRM,
  RejectTransactionCancellationRM,
  RejectTransactionRM,
  RequestCancellationRM,
  SaveFEDiscountingTransactionRFQRM,
  SaveForwardTransactionRFQRM,
  SaveForwardTransactionRM,
  SaveNonFEDiscountingTransactionRFQRM,
  SaveNonFeDiscountingTransactionRM,
  SaveSpotTransactionRFQRM,
  SaveSpotTransactionRM,
} from "@/common/api_config";
import { blotterApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import {
  setRfqModalOpen,
  setViewDealModal,
} from "@/store/modalSlice/modalSlicer";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the ViewAllNatureOfBussinessAPI async thunk
export const BlotterDataAPI = createAsyncThunk(
  "Blotter/BlotterData", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let getBlotterData = createPostAPI(
        blotterApi,
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
        blotterApi,
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
        blotterApi,
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
            dispatch(setRfqModalOpen(false));
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
        blotterApi,
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
        blotterApi,
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
        blotterApi,
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
        blotterApi,
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
        blotterApi,
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
  async (
    { navigate, Data, setCancelReasonModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
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
        dispatch(
          RejectTransactionAPI({ navigate, Data, setCancelReasonModal })
        );
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
            if (typeof setCancelReasonModal === "function") {
              setCancelReasonModal(false);
            }
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

export const AcceptTransactionCancellationRequest = createAsyncThunk(
  "Blotter/AcceptTransactionCancellationRequest",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        AcceptTransactionCancellationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(AcceptTransactionCancellationRequest({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          return {
            response: response.data.responseResult,
            message: "Cancellation request accepted successfully",
          };
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error accepting transaction cancellation");
    }
  }
);

export const RejectTransactionCancellationRequest = createAsyncThunk(
  "Blotter/RejectTransactionCancellationRequest",
  async (
    { navigate, Data, setCancelReasonModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RejectTransactionCancellationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RejectTransactionCancellationRequest({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (typeof setCancelReasonModal === "function") {
            setCancelReasonModal(false);
          }
          return {
            response: response.data.responseResult,
            message: "Cancellation request rejected successfully",
          };
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error rejecting transaction cancellation");
    }
  }
);

export const CancelTransaction = createAsyncThunk(
  "Blotter/CancelTransaction",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        CancelTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(CancelTransaction({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Transaction cancelled successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelTransaction_06".toLowerCase()
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
      return rejectWithValue("Error cancelling transaction");
    }
  }
);

export const RequestCancellation = createAsyncThunk(
  "Blotter/RequestCancellation",
  async (
    { navigate, Data, setCancelReasonModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RequestCancellationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RequestCancellation({ navigate, Data, setCancelReasonModal }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_01".toLowerCase()
              )
          ) {
            setCancelReasonModal(false);
            return {
              response: response.data.responseResult,
              message: "Cancellation requested successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RequestCancellation_06".toLowerCase()
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
      return rejectWithValue("Error requesting cancellation");
    }
  }
);

export const AcceptRFQTransaction = createAsyncThunk(
  "Blotter/AcceptRFQTransaction",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        AcceptRFQTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(AcceptRFQTransaction({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "RFQ transaction accepted successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_AcceptRFQTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error accepting RFQ transaction");
    }
  }
);

export const RejectRFQTransaction = createAsyncThunk(
  "Blotter/RejectRFQTransaction",
  async (
    { navigate, Data, setCancelReasonModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RejectRFQTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(
          RejectRFQTransaction({ navigate, Data, setCancelReasonModal })
        );
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_01".toLowerCase()
              )
          ) {
            setCancelReasonModal(false);
            return {
              response: response.data.responseResult,
              message: "RFQ transaction rejected successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RejectRFQTransaction_06".toLowerCase()
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
      return rejectWithValue("Error rejecting RFQ transaction");
    }
  }
);

export const SaveSpotTransactionRFQ = createAsyncThunk(
  "Blotter/SaveSpotTransactionRFQ",
  async (
    { navigate, Data, setOpenRfqModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        SaveSpotTransactionRFQRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveSpotTransactionRFQ({ navigate, Data, setOpenRfqModal }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransactionRFQ_01".toLowerCase()
              )
          ) {
            dispatch(setRfqModalOpen(false));
            return {
              response: response.data.responseResult,
              message: "Spot RFQ transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransactionRFQ_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransactionRFQ_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveSpotTransactionRFQ_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error saving spot RFQ transaction");
    }
  }
);

export const SaveForwardTransactionRFQ = createAsyncThunk(
  "Blotter/SaveForwardTransactionRFQ",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        SaveForwardTransactionRFQRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveForwardTransactionRFQ({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransactionRFQ_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forward RFQ transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransactionRFQ_01".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransactionRFQ_01".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveForwardTransactionRFQ_01".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error saving forward RFQ transaction");
    }
  }
);

export const SaveFEDiscountingTransactionRFQ = createAsyncThunk(
  "Blotter/SaveFEDiscountingTransactionRFQ",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        SaveFEDiscountingTransactionRFQRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveFEDiscountingTransactionRFQ({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransactionRFQ_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "FE Discounting RFQ transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransactionRFQ_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransactionRFQ_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveFEDiscountingTransactionRFQ_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error saving FE discounting RFQ transaction");
    }
  }
);

export const SaveNonFEDiscountingTransactionRFQ = createAsyncThunk(
  "Blotter/SaveNonFEDiscountingTransactionRFQ",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        SaveNonFEDiscountingTransactionRFQRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveNonFEDiscountingTransactionRFQ({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransactionRFQ_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Non-FE Discounting RFQ transaction saved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransactionRFQ_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransactionRFQ_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_SaveNonFEDiscountingTransactionRFQ_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error saving Non-FE discounting RFQ transaction");
    }
  }
);

export const RFQTransactionQuotation = createAsyncThunk(
  "Blotter/RFQTransactionQuotation",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RFQTransactionQuotationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RFQTransactionQuotation({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_01".toLowerCase()
              )
          ) {
            dispatch(setViewDealModal(false));
            return {
              response: response.data.responseResult,
              message: "RFQ quotation generated successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQTransactionQuotation_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error generating RFQ quotation");
    }
  }
);

export const RFQForwardTransactionQuotation = createAsyncThunk(
  "Blotter/RFQForwardTransactionQuotation",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RFQForwardTransactionQuotationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RFQForwardTransactionQuotation({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forward RFQ quotation generated successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQForwardTransactionQuotation_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error generating forward RFQ quotation");
    }
  }
);

export const RFQFEDiscountingTransactionQuotation = createAsyncThunk(
  "Blotter/RFQFEDiscountingTransactionQuotation",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RFQFEDiscountingTransactionQuotationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RFQFEDiscountingTransactionQuotation({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "FE Discounting quotation generated successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQFEDiscountingTransactionQuotation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error generating FE discounting RFQ quotation");
    }
  }
);

export const RFQNonFEDiscountingTransactionQuotation = createAsyncThunk(
  "Blotter/RFQNonFEDiscountingTransactionQuotation",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        RFQNonFEDiscountingTransactionQuotationRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(RFQNonFEDiscountingTransactionQuotation({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Non-FE Discounting quotation generated successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_RFQNonFEDiscountingTransactionQuotation_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        "Error generating Non-FE discounting RFQ quotation"
      );
    }
  }
);

export const ExpireRFQTransaction = createAsyncThunk(
  "Blotter/ExpireRFQTransaction",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    console.log("ExpireRFQTransaction", Data);
    try {
      const postAPI = createPostAPI(
        blotterApi,
        ExpireRFQTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(ExpireRFQTransaction({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "RFQ transaction expired successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_ExpireRFQTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
          return {
            response: response.data.responseResult,
            message: "RFQ transaction expired successfully",
          };
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error expiring RFQ transaction");
    }
  }
);

export const GetSpotTransactionDetails = createAsyncThunk(
  "Blotter/GetSpotTransactionDetails",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        GetSpotTransactionDetailsRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetSpotTransactionDetails({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetSpotTransactionDetails_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Spot transaction details retrieved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetSpotTransactionDetails_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetSpotTransactionDetails_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetSpotTransactionDetails_04".toLowerCase()
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
      return rejectWithValue("Error retrieving spot transaction details");
    }
  }
);

export const GetForwardTransactionDetails = createAsyncThunk(
  "Blotter/GetForwardTransactionDetails",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        GetForwardTransactionDetailsRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetForwardTransactionDetails({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetForwardTransactionDetails_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forward transaction details retrieved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetForwardTransactionDetails_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetForwardTransactionDetails_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetForwardTransactionDetails_04".toLowerCase()
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
      return rejectWithValue("Error retrieving forward transaction details");
    }
  }
);

export const GetFEDiscountingTransactionDetails = createAsyncThunk(
  "Blotter/GetFEDiscountingTransactionDetails",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        GetFEDiscountingTransactionDetailsRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetFEDiscountingTransactionDetails({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetFEDiscountingTransactionDetails_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message:
                "FE Discounting transaction details retrieved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetFEDiscountingTransactionDetails_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetFEDiscountingTransactionDetails_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetFEDiscountingTransactionDetails_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
          return {
            response: responseResult,
            message:
              "FE Discounting transaction details retrieved successfully",
          };
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        "Error retrieving FE discounting transaction details"
      );
    }
  }
);

export const GetNonFEDiscountingTransactionDetails = createAsyncThunk(
  "Blotter/GetNonFEDiscountingTransactionDetails",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        GetNonFEDiscountingTransactionDetailsRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetNonFEDiscountingTransactionDetails({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetNonFEDiscountingTransactionDetails_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message:
                "Non-FE Discounting transaction details retrieved successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetNonFEDiscountingTransactionDetails_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetNonFEDiscountingTransactionDetails_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_GetNonFEDiscountingTransactionDetails_04".toLowerCase()
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
      return rejectWithValue(
        "Error retrieving Non-FE discounting transaction details"
      );
    }
  }
);

export const CancelPendingTransactionApi = createAsyncThunk(
  "Blotter/CancelPendingTransactionApi",
  async (
    { navigate, Data, setCancelReasonModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        CancelPendingTransactionRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(
          CancelPendingTransactionApi({ navigate, Data, setCancelReasonModal })
        );
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_01".toLowerCase()
              )
          ) {
            setCancelReasonModal(false);
            return {
              response: response.data.responseResult,
              message: "Pending transaction cancelled successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Unsuccessfull");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Role");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CancelPendingRFQTransaction_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Transaction Status");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          return rejectWithValue(responseMessage || "Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error cancelling pending transaction");
    }
  }
);

export const calculateTenorSwapAndForwardRateApi = createAsyncThunk(
  "Blotter/calculateForwardRFQData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const postAPI = createPostAPI(
        blotterApi,
        CalculateTenorSwapAndForwardRateRM.RequestMethod
      );
      const response = await postAPI(Data);
      const { responseCode } = response.data;

      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access");
      }

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(calculateForwardRFQData({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CalculateTenorSwapAndForwardRate_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forward RFQ data calculated successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Blotter_BlotterServiceManager_CalculateTenorSwapAndForwardRate_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else return rejectWithValue;
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue("Error calculating forward RFQ data");
    }
  }
);
