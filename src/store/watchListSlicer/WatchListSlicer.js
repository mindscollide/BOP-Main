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
    error: null,

    // 🎯 loader flags for each API
    GetMisDataByRangeLoading: false,
    GetDashboardDataLoading: false,
    SaveUserDashboardLoading: false,
    GetAllTreasuryInstrumentsLoading: false,
    GetForwardRatesForCounterPartyLoading: false,
    GetDiscountingRatesForCounterPartyLoading: false,
    GetBankSpotForTreasuryLoading: false,
    GetBankForwardForTreasuryLoading: false,
    GetDiscountingRatesForTreasuryLoading: false,
    GetMarketStatusLoading: false,

    // data states
    getAllInstrumentForCounterParties: null,
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
      state.watchlistTableDataCopy = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------ GetMisDataByRange ------------------
      .addCase(GetMisDataByRangeAPI.pending, (state) => {
        state.GetMisDataByRangeLoading = true;
        state.error = null;
      })
      .addCase(GetMisDataByRangeAPI.fulfilled, (state, { payload }) => {
        state.GetMisDataByRangeLoading = false;
        state.GetMisDataByRange = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetMisDataByRangeAPI.rejected, (state, { payload }) => {
        state.GetMisDataByRangeLoading = false;
        state.GetMisDataByRange = null;
        state.error = payload;
      })

      // ------------------ GetDashboardData ------------------
      .addCase(GetDashboardDataAPI.pending, (state) => {
        state.GetDashboardDataLoading = true;
      })
      .addCase(GetDashboardDataAPI.fulfilled, (state, { payload }) => {
        state.GetDashboardDataLoading = false;
        state.getAllInstrumentForCounterParties = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetDashboardDataAPI.rejected, (state, { payload }) => {
        state.GetDashboardDataLoading = false;
        state.getAllInstrumentForCounterParties = null;
        state.error = payload;
      })

      // ------------------ SaveUserDashboard ------------------
      .addCase(SaveUserDashboardAPI.pending, (state) => {
        state.SaveUserDashboardLoading = true;
      })
      .addCase(SaveUserDashboardAPI.fulfilled, (state, { payload }) => {
        state.SaveUserDashboardLoading = false;
        state.SaveUserDashboardData = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(SaveUserDashboardAPI.rejected, (state, { payload }) => {
        state.SaveUserDashboardLoading = false;
        state.SaveUserDashboardData = null;
        state.error = payload;
      })

      // ------------------ GetAllTreasuryInstruments ------------------
      .addCase(getAllTreasuryInstrumentsApi.pending, (state) => {
        state.GetAllTreasuryInstrumentsLoading = true;
      })
      .addCase(getAllTreasuryInstrumentsApi.fulfilled, (state, { payload }) => {
        state.GetAllTreasuryInstrumentsLoading = false;
        state.GetAllInstrumentForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getAllTreasuryInstrumentsApi.rejected, (state, { payload }) => {
        state.GetAllTreasuryInstrumentsLoading = false;
        state.GetAllInstrumentForTreasury = null;
        state.error = payload;
      })

      // ------------------ GetForwardRatesForCounterParty ------------------
      .addCase(GetForwardRatesForCounterPartyApi.pending, (state) => {
        state.GetForwardRatesForCounterPartyLoading = true;
      })
      .addCase(GetForwardRatesForCounterPartyApi.fulfilled, (state, { payload }) => {
        state.GetForwardRatesForCounterPartyLoading = false;
        state.GetForwardRatesForCounterParty = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetForwardRatesForCounterPartyApi.rejected, (state, { payload }) => {
        state.GetForwardRatesForCounterPartyLoading = false;
        state.GetForwardRatesForCounterParty = null;
        state.error = payload;
      })

      // ------------------ GetDiscountingRatesForCounterParty ------------------
      .addCase(GetDiscountingRatesForCounterPartyApi.pending, (state) => {
        state.GetDiscountingRatesForCounterPartyLoading = true;
      })
      .addCase(GetDiscountingRatesForCounterPartyApi.fulfilled, (state, { payload }) => {
        state.GetDiscountingRatesForCounterPartyLoading = false;
        state.GetDiscountingRatesForCounterParty = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetDiscountingRatesForCounterPartyApi.rejected, (state, { payload }) => {
        state.GetDiscountingRatesForCounterPartyLoading = false;
        state.GetDiscountingRatesForCounterParty = null;
        state.error = payload;
      })

      // ------------------ GetBankSpotForTreasury ------------------
      .addCase(GetBankSpotForTreasuryApi.pending, (state) => {
        state.GetBankSpotForTreasuryLoading = true;
      })
      .addCase(GetBankSpotForTreasuryApi.fulfilled, (state, { payload }) => {
        state.GetBankSpotForTreasuryLoading = false;
        state.GetBankSpotForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetBankSpotForTreasuryApi.rejected, (state, { payload }) => {
        state.GetBankSpotForTreasuryLoading = false;
        state.GetBankSpotForTreasury = null;
        state.error = payload;
      })

      // ------------------ GetBankForwardForTreasury ------------------
      .addCase(GetBankForwardForTreasuryApi.pending, (state) => {
        state.GetBankForwardForTreasuryLoading = true;
      })
      .addCase(GetBankForwardForTreasuryApi.fulfilled, (state, { payload }) => {
        state.GetBankForwardForTreasuryLoading = false;
        state.GetBankForwardForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetBankForwardForTreasuryApi.rejected, (state, { payload }) => {
        state.GetBankForwardForTreasuryLoading = false;
        state.GetBankForwardForTreasury = null;
        state.error = payload;
      })

      // ------------------ GetDiscountingRatesForTreasury ------------------
      .addCase(GetDiscountingRatesForTreasuryApi.pending, (state) => {
        state.GetDiscountingRatesForTreasuryLoading = true;
      })
      .addCase(GetDiscountingRatesForTreasuryApi.fulfilled, (state, { payload }) => {
        state.GetDiscountingRatesForTreasuryLoading = false;
        state.GetDiscountingRatesForTreasury = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetDiscountingRatesForTreasuryApi.rejected, (state, { payload }) => {
        state.GetDiscountingRatesForTreasuryLoading = false;
        state.GetDiscountingRatesForTreasury = null;
        state.error = payload;
      })

      // ------------------ GetMarketStatus ------------------
      .addCase(getMarketStatusApi.pending, (state) => {
        state.GetMarketStatusLoading = true;
      })
      .addCase(getMarketStatusApi.fulfilled, (state, { payload }) => {
        state.GetMarketStatusLoading = false;
        state.getMarketStatus = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getMarketStatusApi.rejected, (state, { payload }) => {
        state.GetMarketStatusLoading = false;
        state.getMarketStatus = null;
        state.error = payload;
      });
  },
});

export const {
  clearWatchListResponseMessage,
  setMarketStatus,
  setWatchlistTableDataCopy,
} = WatchListSlice.actions;
export default WatchListSlice.reducer;
