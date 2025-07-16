import { createSlice } from "@reduxjs/toolkit";
import {
  GetBankForwardForTreasuryApi,
  GetBankSpotForTreasuryApi,
  GetDashboardDataAPI,
  GetDiscountingRatesForCounterPartyApi,
  GetDiscountingRatesForTreasuryApi,
  GetForwardRatesForCounterPartyApi,
  GetMisDataByRangeAPI,
  SaveUserDashboardAPI,
  getAllTreasuryInstrumentsApi,
} from "../../components/features/SpotBranch/WatchlistAction";
const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    GettheDashboardData: null,
    GetMisDataByRange: null,
    SaveUserDashboardData: null,
    allInstrumentForTreasury: null,
    GetAllFowardsAndDiscountsRatesData: null,
    GetForwardRatesForCounterParty: null,
    GetDiscountingRatesForCounterParty: null,
    GetAllInstrumentForTreasury: null,
    GetBankSpotForTreasury: null,
    GetBankForwardForTreasury: null,
    GetDiscountingRatesForTreasury: null,
  },
  reducers: {
    clearWatchListResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is in Pending State GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetMisDataByRange = payload?.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (while the API call is fail GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.GetMisDataByRange = null;
      })
      // Pending state (while the API call is in Pending State GetDashboardData)
      .addCase(GetDashboardDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetDashboardData)
      .addCase(GetDashboardDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GettheDashboardData = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(GetDashboardDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.GettheDashboardData = null;
      })

      // Pending state (while the API call is in Pending State SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveUserDashboardData = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.SaveUserDashboardData = null;
      })

      .addCase(getAllTreasuryInstrumentsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllTreasuryInstrumentsApi.fulfilled, (state, { payload }) => {
        // console.log(payload.response, "globalStateWatchlistCardData");
        state.Loader = false;
        state.GetAllInstrumentForTreasury = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(getAllTreasuryInstrumentsApi.rejected, (state, action) => {
        // console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.GetAllInstrumentForTreasury = null;
      })

      //***************** */
      // Pending state (while the API call is in Pending State GetDashboardData)
      .addCase(GetForwardRatesForCounterPartyApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetDashboardData)
      .addCase(
        GetForwardRatesForCounterPartyApi.fulfilled,
        (state, { payload }) => {
          // console.log(payload.response, "globalStateWatchlistCardData");
          state.Loader = false;
          state.GetForwardRatesForCounterParty = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(GetForwardRatesForCounterPartyApi.rejected, (state, action) => {
        // console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.GetForwardRatesForCounterParty = null;
      })

      //***************** */
      // Pending state (while the API call is in Pending State GetDashboardData)
      .addCase(GetDiscountingRatesForCounterPartyApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetDashboardData)
      .addCase(
        GetDiscountingRatesForCounterPartyApi.fulfilled,
        (state, { payload }) => {
          // console.log(payload.response, "globalStateWatchlistCardData");
          state.Loader = false;
          state.GetDiscountingRatesForCounterParty = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(
        GetDiscountingRatesForCounterPartyApi.rejected,
        (state, action) => {
          // console.log(action, "actionaction");
          state.Loader = false;
          state.error = action.payload;
          state.GetDiscountingRatesForCounterParty = null;
        }
      )
      .addCase(GetBankSpotForTreasuryApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetBankSpotForTreasuryApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetBankSpotForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetBankSpotForTreasuryApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetBankSpotForTreasury = null;
        state.responseMessage = payload;
      })
      .addCase(GetBankForwardForTreasuryApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetBankForwardForTreasuryApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetBankForwardForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetBankForwardForTreasuryApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetBankForwardForTreasury = null;
        state.responseMessage = payload;
      })
      .addCase(GetDiscountingRatesForTreasuryApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetDiscountingRatesForTreasuryApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetDiscountingRatesForTreasury = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        GetDiscountingRatesForTreasuryApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetDiscountingRatesForTreasury = null;
          state.responseMessage = payload;
        }
      );
  },
});

export const { clearWatchListResponseMessage } = WatchListSlice.actions;
export default WatchListSlice.reducer;
