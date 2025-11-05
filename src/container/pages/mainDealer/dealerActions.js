import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, watchListApi } from "@/common/apiend_points";
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
  getDealerDasboardDataRM,
  GetVoltMeterStatus,
  UpdateVoltMeterStatus,
} from "@/common/api_config";
import createPostAPI from "@/utils/axiosInstance";
import {
  setCreateTenorModal,
  setPublishedSpotRates,
} from "@/store/modalSlice/modalSlicer";

// Define the login async thunk
export const clearRatesAction = createAsyncThunk(
  "uploadRate/clearRate", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue, dispatch }) => {
    try {
      let clearRates = createPostAPI(watchListApi, clearRatesRM.RequestMethod);

      const response = await clearRates(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
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

// Define the login async thunk
export const getLastPublishRatesAction = createAsyncThunk(
  "uploadRate/getLastPublishRates", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getLastPublishRates = createPostAPI(
        watchListApi,
        getLastAndCurrentUSDRatesRM.RequestMethod
      );

      const response = await getLastPublishRates();

      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
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
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const PublishNewRatesAction = createAsyncThunk(
  "uploadRate/PublishNewRates", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue, dispatch }) => {
    try {
      let PublishNewRates = createPostAPI(
        watchListApi,
        publishCurrentUSDRatesRM.RequestMethod
      );

      const response = await PublishNewRates(Data);

      const { responseCode } = response.data;
      console.log(responseCode, "responseCoderesponseCode");

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_01".toLowerCase()
              )
          ) {
            dispatch(setPublishedSpotRates(false));

            return {
              response: response.data.responseResult,
              message: "Rates are published",
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
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const marketOnOffAction = createAsyncThunk(
  "watchlist/marketOnOff", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue, dispatch }) => {
    try {
      let marketOnOff = createPostAPI(
        watchListApi,
        marketOnOffRM.RequestMethod
      );

      const response = await marketOnOff(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_MarketONOFF_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_MarketONOFF_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_MarketONOFF_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_MarketONOFF_04".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const getAllTenorsAction = createAsyncThunk(
  "uploadRate/getAllTenors", // A unique action type string
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      let getAllTenors = createPostAPI(authApi, getAllTenorsRM.RequestMethod);

      const response = await getAllTenors();

      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllTenors_01".toLowerCase()
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
                "ERM_AuthService_CommonManager_GetAllTenors_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllTenors_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllTenors_04".toLowerCase()
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
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const createTenorAction = createAsyncThunk(
  "uploadRate/createTenors", // A unique action type string
  async ({ navigate, Data, setCreateTenor }, { dispatch, rejectWithValue }) => {
    try {
      let createTenor = createPostAPI(
        watchListApi,
        createTenorRM.RequestMethod
      );

      const response = await createTenor(Data);

      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_01".toLowerCase()
              )
          ) {
            dispatch(setCreateTenorModal(false));
            setCreateTenor({
              noOfDays: "",
              tenorName: "",
            });
            return {
              response: response.data.responseResult,
              message: "Tenor has been created successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_05".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the login async thunk
export const getTenorWiseForwardsAction = createAsyncThunk(
  "uploadRate/getTenorWiseForward", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getTenorWiseForwards = createPostAPI(
        watchListApi,
        getTenorWiseForwardRatesRM.RequestMethod
      );

      const response = await getTenorWiseForwards();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_04".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
// Define the login async thunk
export const PublishTenorWiseForwardsAction = createAsyncThunk(
  "uploadRate/publishTenorWiseForward", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let PublishTenorWiseForwards = createPostAPI(
        watchListApi,
        publishTenorWiseForwardRatesRM.RequestMethod
      );

      const response = await PublishTenorWiseForwards(Data);

      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forwards Rates are Published",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Forward rates are published");
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

export const getDiscountingRatesAction = createAsyncThunk(
  "uploadRate/getDiscountingRates",
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getDiscountingRates = createPostAPI(
        watchListApi,
        getDiscountingRatesRM.RequestMethod
      );

      const response = await getDiscountingRates();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data?.responseResult,
              message: "Forwards Rates are Published",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_04".toLowerCase()
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
      return rejectWithValue("Something went wrong");
    }
  }
);

export const publishDiscountingRatesAction = createAsyncThunk(
  "uploadRate/publishDiscountingRates",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let publishDiscountingRates = createPostAPI(
        watchListApi,
        getDiscountingRatesRM.RequestMethod
      );
      const response = await publishDiscountingRates(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishDiscountingRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_PublishDiscountingRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishDiscountingRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishDiscountingRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishDiscountingRates_05".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getDealerDashboardApi = createAsyncThunk(
  "uploadRates/getDashboardApi",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      let DealerDashboardApi = createPostAPI(
        watchListApi,
        getDealerDasboardDataRM.RequestMethod
      );
      const response = await DealerDashboardApi();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDealerDashboardData_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_GetDealerDashboardData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDealerDashboardData_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDealerDashboardData_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDealerDashboardData_05".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
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

export const GetVoltMeterStatusApi = createAsyncThunk(
  "uploadRates/GetVoltMeterStatus",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      let GetVoltMeterStatusData = createPostAPI(
        watchListApi,
        GetVoltMeterStatus.RequestMethod
      );
      const response = await GetVoltMeterStatusData();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetVoltMeterStatus_01".toLowerCase()
              )
          ) {
            console.log(response, "GetVoltMeterStatusApiGetVoltMeterStatusApi");
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetVoltMeterStatus_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetVoltMeterStatus_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetVoltMeterStatus_02".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);

export const UpdateVoltMeterStatusApi = createAsyncThunk(
  "uploadRate/UpdateVoltMeterStatus",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let UpdateVoltMeterStatusData = createPostAPI(
        watchListApi,
        UpdateVoltMeterStatus.RequestMethod
      );
      const response = await UpdateVoltMeterStatusData(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_UpdateVoltMeterStatus_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_UpdateVoltMeterStatus_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_UpdateVoltMeterStatus_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_UpdateVoltMeterStatus_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_UpdateVoltMeterStatus_05".toLowerCase()
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
      console.log(error);
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
