import {
  GetAllInstrumentForTreasuryRM,
  GetBankForwardForTreasury,
  GetBankSpotForTreasury,
  GetDashboardData,
  GetDiscountingRatesForCounterParty,
  GetDiscountingRatesForTreasury,
  GetForwardRatesForCounterParty,
  GetMisDataByRange,
  SaveUserDashboardRM,
} from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
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
    
      if (responseCode === 417) {
        console.log(responseCode, "responseCoderesponseCode");
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetDashboardDataAPI({ navigate }));
        console.log(responseCode, "responseCoderesponseCode");
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetFXTradingSectionAndApplicableInstrument_01".toLowerCase()
              )
          ) {
            console.log("globalStateWatchlistCardData", response.data);
       

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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(SaveUserDashboardAPI({ Data, navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_WatchlistService_GetFXInstrumentsAPI_01".toLowerCase()
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
                "ERM_WatchlistService_GetFXInstrumentsAPI_02".toLowerCase()
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
      const { responseCode } = response.data;
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getAllTreasuryInstrumentsApi({ navigate }));
      } else if (response.data.responseCode === 200) {
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
            return rejectWithValue("No Record found");
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetForwardRatesForCounterPartyApi({ navigate }));
      } else if (response.data.responseCode === 200) {
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
            return rejectWithValue("No Record found");
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetDiscountingRatesForCounterPartyApi({ navigate }));
      } else if (response.data.responseCode === 200) {
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
            return rejectWithValue("No Record found");
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetBankSpotForTreasuryApi({ navigate, Data }));
      } else if (responseCode === 200) {
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
            return rejectWithValue("No Record Found");
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetBankForwardForTreasuryApi({ navigate }));
      } else if (responseCode === 200) {
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
            return rejectWithValue("No Record Found");
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetMisDataByRangeAPI({ navigate, Data }));
      } else if (response.data.responseCode === 200) {
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
    
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetDiscountingRatesForTreasuryApi({ navigate }));
      } else if (response.data.responseCode === 200) {
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
            return rejectWithValue("No Record found");
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
