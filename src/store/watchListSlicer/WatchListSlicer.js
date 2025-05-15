import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllCounterPartyDataAPI,
  GetAllFowardsAndDiscountsRatesAPI,
  GetDashboardDataAPI,
  GetFXInstrumentsAPI,
  GetMisDataByRangeAPI,
  SaveUserDashboardAPI,
} from "../../components/features/SpotBranch/WatchlistAction";
const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: {
    responseMessage: "",
    loading: false,
    error: null,
    WatchListData: null,
    GetMisDataByRange: null,
    GetAllFowardsAndDiscountsRatesData: null,
    GetAllCounterPartyData: null,
    GettheDashboardData: null,
    SaveUserDashboardData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made)
      .addCase(GetFXInstrumentsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds)
      .addCase(GetFXInstrumentsAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.WatchListData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails)
      .addCase(GetFXInstrumentsAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.WatchListData = null;
      })

      // Pending state (while the API call is in Pending State GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.GetMisDataByRange = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (while the API call is fail GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.GetMisDataByRange = null;
      })

      // Pending state (while the API call is in Pending State GetAllFowardsAndDiscountsRates)
      .addCase(GetAllFowardsAndDiscountsRatesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetAllFowardsAndDiscountsRates)
      .addCase(
        GetAllFowardsAndDiscountsRatesAPI.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.GetAllFowardsAndDiscountsRatesData = payload.response;
          state.error = null;
          state.responseMessage = payload.message;
        }
      )
      // Rejected state (while the API call is fail GetAllFowardsAndDiscountsRates)
      .addCase(GetAllFowardsAndDiscountsRatesAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.GetAllFowardsAndDiscountsRatesData = null;
      })

      // Pending state (while the API call is in Pending State GetAllCounterPartyDataAPI)
      .addCase(GetAllCounterPartyDataAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetAllCounterPartyDataAPI)
      .addCase(GetAllCounterPartyDataAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.GetAllCounterPartyData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (while the API call is fail GetAllCounterPartyDataAPI)
      .addCase(GetAllCounterPartyDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.GetAllCounterPartyData = null;
      })

      // Pending state (while the API call is in Pending State GetDashboardData)
      .addCase(GetDashboardDataAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetDashboardData)
      .addCase(GetDashboardDataAPI.fulfilled, (state, { payload }) => {
        console.log(payload.response, "globalStateWatchlistCardData");
        state.loading = false;
        state.GettheDashboardData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(GetDashboardDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.GettheDashboardData = null;
      })

      // Pending state (while the API call is in Pending State SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.SaveUserDashboardData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (while the API call is fail SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.SaveUserDashboardData = null;
      });
  },
});

export default WatchListSlice.reducer;
