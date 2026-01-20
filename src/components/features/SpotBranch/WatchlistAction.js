import {
  GetAllHolidaysForTransactionRM,
  GetAllInstrumentForTreasuryRM,
  GetBankForwardForTreasury,
  GetBankSpotForTreasury,
  GetBid_OfferStatusRM,
  GetCorporateDailyVolume,
  GetDashboardData,
  GetDiscountingRatesForCounterParty,
  GetDiscountingRatesForTreasury,
  GetForwardRatesForCounterParty,
  GetMisDataByRange,
  SaveUserDashboardRM,
  UpdateBid_OfferStatusRM,
  getMarketStatusRM,
} from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the GetAllFowardsAndDiscountsRates async thunk
export const GetDashboardDataAPI = createAsyncThunk(
  "watchlist/GetDashboardData", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetDashboardDataAction = createPostAPI(
        watchListApi,
        GetDashboardData.RequestMethod
      );

      const response = await GetDashboardDataAction();
      const { responseCode } = response.data;
      console.log(responseCode, "responseCoderesponseCode");

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetFXTradingSectionAndApplicableInstrument_01".toLowerCase()
              )
          ) {
            console.log(
              "getAllInstrumentsForCounterPartiesData",
              response.data
            );

            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDashboardData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const SaveUserDashboardAPI = createAsyncThunk(
  "watchlist/SaveUserDashboard", // A unique action type string
  async ({ Data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      let SaveUserDashboard = createPostAPI(
        watchListApi,
        SaveUserDashboardRM.RequestMethod
      );

      const response = await SaveUserDashboard(Data);
      const { responseCode } = response.data;
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_SaveUserDashboard_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_SaveUserDashboard_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_SaveUserDashboard_03".toLowerCase()
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

// Define the GetAllFowardsAndDiscountsRates async thunk
export const getAllTreasuryInstrumentsApi = createAsyncThunk(
  "watchlist/getAllTreasuryInstruments", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getAllInstruments = createPostAPI(
        watchListApi,
        GetAllInstrumentForTreasuryRM.RequestMethod
      );

      const response = await getAllInstruments();

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllInstrumentForTreasury_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetAllInstrumentForTreasury_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllInstrumentForTreasury_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllInstrumentForTreasury_04".toLowerCase()
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

// Define the GetForwardRatesForCounterParty async thunk
export const GetForwardRatesForCounterPartyApi = createAsyncThunk(
  "watchlist/GetForwardRatesForCounterParty", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetForwardRatesForCounterPartyData = createPostAPI(
        watchListApi,
        GetForwardRatesForCounterParty.RequestMethod
      );

      const response = await GetForwardRatesForCounterPartyData();
      const { responseCode } = response.data;

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetForwardRatesForCounterParty_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetForwardRatesForCounterParty_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetForwardRatesForCounterParty_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetForwardRatesForCounterParty_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
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

// Define the GetForwardRatesForCounterParty async thunk
export const GetDiscountingRatesForCounterPartyApi = createAsyncThunk(
  "watchlist/GetDiscountingRatesForCounterParty", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetDiscountingRatesForCounterPartyData = createPostAPI(
        watchListApi,
        GetDiscountingRatesForCounterParty.RequestMethod
      );

      const response = await GetDiscountingRatesForCounterPartyData();
      const { responseCode } = response.data;

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForCounterParty_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetDiscountingRatesForCounterParty_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForCounterParty_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForCounterParty_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
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

export const GetBankSpotForTreasuryApi = createAsyncThunk(
  "watchlist/GetBankSpotForTreasury",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetBankSpotForTreasuryData = createPostAPI(
        watchListApi,
        GetBankSpotForTreasury.RequestMethod
      );

      const response = await GetBankSpotForTreasuryData(Data);
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankSpotForTreasury_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetBankSpotForTreasury_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankSpotForTreasury_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched.");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankSpotForTreasury_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured.");
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
      return rejectWithValue(error.message);
    }
  }
);

export const GetBankForwardForTreasuryApi = createAsyncThunk(
  "watchlist/GetBankForwardForTreasury",
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetBankForwardForTreasuryData = createPostAPI(
        watchListApi,
        GetBankForwardForTreasury.RequestMethod
      );

      const response = await GetBankForwardForTreasuryData();
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankForwardForTreasury_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetBankForwardForTreasury_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankForwardForTreasury_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched.");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBankForwardForTreasury_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured.");
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
      return rejectWithValue(error.message);
    }
  }
);
// Define the GetMisDataByRangeAPI async thunk
export const GetMisDataByRangeAPI = createAsyncThunk(
  "watchlist/GetMisDataByRange", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetFXInstruGetMisDataByRange = createPostAPI(
        watchListApi,
        GetMisDataByRange.RequestMethod
      );

      const response = await GetFXInstruGetMisDataByRange(Data);
      const { responseCode } = response.data;
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetMisDataByRange_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetMisDataByRange_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
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

// Define the GetDiscountingRatesForTreasury async thunk
export const GetDiscountingRatesForTreasuryApi = createAsyncThunk(
  "watchlist/GetDiscountingRatesForTreasury", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let GetDiscountingRatesForTreasuryData = createPostAPI(
        watchListApi,
        GetDiscountingRatesForTreasury.RequestMethod
      );

      const response = await GetDiscountingRatesForTreasuryData();
      const { responseCode } = response.data;

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForTreasury_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetDiscountingRatesForTreasury_02".toLowerCase()
              )
          ) {
            return rejectWithValue(
              import.meta.env.VITE_MQTT_PORT === "8883" ? "" : "No Record Found"
            );
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForTreasury_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Role doesn’t matched");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetDiscountingRatesForTreasury_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Exception occured");
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

export const getMarketStatusApi = createAsyncThunk(
  "watchlist/getMarketStatus",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      let getMarketStatusPost = createPostAPI(
        watchListApi,
        getMarketStatusRM.RequestMethod
      );

      const response = await getMarketStatusPost();

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, marketStatus } =
          response.data.responseResult;
        if (isExecuted) {
          switch (responseMessage.toLowerCase()) {
            case "WatchList_WatchListServiceManager_GetMarketStatus_01".toLowerCase():
              return {
                response: marketStatus,
                message: "",
              };
              break;
            case "WatchList_WatchListServiceManager_GetMarketStatus_02".toLowerCase():
              return rejectWithValue(
                import.meta.env.VITE_MQTT_PORT === "8883"
                  ? ""
                  : "No Record Found"
              );

            default:
              break;
          }
          console.log(responseMessage, "responseMessage");
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Define the GetCorporateDailyVolume async thunk
export const GetCorporateDailyVolumeAPI = createAsyncThunk(
  "watchlist/GetCorporateDailyVolume", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let GetCorporateDailyVolumeData = createPostAPI(
        watchListApi,
        GetCorporateDailyVolume.RequestMethod
      );

      const response = await GetCorporateDailyVolumeData(Data);
      const { responseCode } = response.data;
      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCorporateDailyVolume_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetCorporateDailyVolume_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetCorporateDailyVolume_03".toLowerCase()
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
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const UpdateBidOfferStatusAPI = createAsyncThunk(
  "watchlist/UpdateBidOfferStatus", // A unique action type string
  async ({ Data }, { dispatch, rejectWithValue }) => {
    try {
      let getBidOfferStatusData = createPostAPI(
        watchListApi,
        UpdateBid_OfferStatusRM.RequestMethod
      );

      const response = await getBidOfferStatusData(Data);
      const { responseCode } = response.data;
      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_WatchListServiceManager_UpdateBid_OfferStatus_01".toLowerCase()
              )
          ) {
            dispatch(GetBidOfferStatusApi({}));
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_WatchListServiceManager_UpdateBid_OfferStatus_03".toLowerCase()
              )
          ) {
            return rejectWithValue("No Record Found");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_WatchListServiceManager_UpdateBid_OfferStatus_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_WatchListServiceManager_UpdateBid_OfferStatus_05".toLowerCase()
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
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const GetBidOfferStatusApi = createAsyncThunk(
  "watchlist/GetBidOfferStatus", // A unique action type string
  async ({ Data }, { dispatch, rejectWithValue }) => {
    try {
      let getBidOfferStatusData = createPostAPI(
        watchListApi,
        GetBid_OfferStatusRM.RequestMethod
      );

      const response = await getBidOfferStatusData(Data);
      const { responseCode } = response.data;
      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetBid_OfferStatus_01".toLowerCase()
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
                "WatchList_WatchListServiceManager_GetBid_OfferStatus_03".toLowerCase()
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
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getAllHolidaysForTransactionApi = createAsyncThunk(
  "watchlist/getAllHolidaysForTransaction", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      let getAllHolidaysForTransaction = createPostAPI(
        watchListApi,
        GetAllHolidaysForTransactionRM.RequestMethod
      );

      const response = await getAllHolidaysForTransaction();

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllHolidaysForTransaction_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult.holidays,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllHolidaysForTransaction_02".toLowerCase()
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
