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
  getMarketStatusApi,
} from "../../components/features/SpotBranch/WatchlistAction";
const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    getAllInstrumentForCounterParties: null,
    GetMisDataByRange: null,
    GetMisDataByRangeSpinner: false,
    SaveUserDashboardData: null,
    allInstrumentForTreasury: null,
    GetAllFowardsAndDiscountsRatesData: null,
    GetForwardRatesForCounterParty: null,
    GetDiscountingRatesForCounterParty: null,
    GetAllInstrumentForTreasury: null,
    GetBankSpotForTreasury: null,
    GetBankSpotForTreasurySpinner: false,
    GetBankForwardForTreasury: null,
    GetDiscountingRatesForTreasury: null,
    getMarketStatus: null,
    watchlistTableDataCopy: null,
  },
  reducers: {
    clearWatchListResponseMessage: (state) => {
      state.responseMessage = "";
    },
    setMarketStatus: (state, action) => {
      state.getMarketStatus = action.payload;
    },
    setWatchlistTableDataCopy(state, { payload }) {
      state.watchlistTableDataCopy = payload; // Updates the state with the payload value for watchlistTableData.
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is in Pending State GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.GetMisDataByRangeSpinner = true;
      })
      // Fulfilled state (while the API call is being made GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetMisDataByRange = payload?.response;
        state.error = null;
        state.GetMisDataByRangeSpinner = false;

        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail GetMisDataByRange)
      .addCase(GetMisDataByRangeAPI.rejected, (state, action) => {
        state.Loader = false;
        state.GetMisDataByRangeSpinner = false;

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
        state.getAllInstrumentForCounterParties = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(GetDashboardDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.getAllInstrumentForCounterParties = null;
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
        // console.log(payload.response, "getAllInstrumentsForCounterPartiesData");
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
          // console.log(payload.response, "getAllInstrumentsForCounterPartiesData");
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
          // console.log(payload.response, "getAllInstrumentsForCounterPartiesData");
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
        state.GetBankSpotForTreasurySpinner = true;
      })
      .addCase(GetBankSpotForTreasuryApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetBankSpotForTreasury = payload?.response;
        state.GetBankSpotForTreasurySpinner = false;
        state.responseMessage = payload?.message;
      })
      .addCase(GetBankSpotForTreasuryApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetBankSpotForTreasury = null;
        state.GetBankSpotForTreasurySpinner = false;

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
      )
      .addCase(getMarketStatusApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getMarketStatusApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getMarketStatus = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getMarketStatusApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getMarketStatus = null;
        state.responseMessage = payload;
      });
  },
});

export const {
  clearWatchListResponseMessage,
  setMarketStatus,
  setWatchlistTableDataCopy,
} = WatchListSlice.actions;
export default WatchListSlice.reducer;
