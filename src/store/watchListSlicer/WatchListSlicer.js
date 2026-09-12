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
  GetCorporateDailyVolumeAPI,
  UpdateBidOfferStatusAPI,
  GetBidOfferStatusApi,
  getAllHolidaysForTransactionApi,
} from "../../components/features/SpotBranch/WatchlistAction";

const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: {
    errorSeverity: null,
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
    GetCorporateDailyVolumeLoading: false,
    UpdateBidOfferStatusLoading: false,
    GetBidOfferStatusLoading: false,

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
    GetCorporateDailyVolume: null,
    getBidOfferStatus: null,
    UpdateBidOfferStatus: null,
    getAllHolidays: null,
  },
  reducers: {
    clearBidOfferStatus: (state) => {
      state.getBidOfferStatus = null;
    },
    clearWatchListResponseMessage: (state) => {
      state.responseMessage = "";
    },
    setMarketStatus: (state, action) => {
      state.getMarketStatus = action.payload;
    },
    setWatchlistTableDataCopy(state, { payload }) {
      state.watchlistTableDataCopy = payload;
    },
    clearCorporateDailyVolume: (state) => {
      state.GetCorporateDailyVolume = null;
      state.GetCorporateDailyVolumeLoading = false;
    },
    setBidOfferStatus: (state, { payload }) => {
      state.getBidOfferStatus = payload.bid_OfferStatus;
    },
    updateHolidays: (state, { payload }) => {
      state.getAllHolidays = payload;
    },
    setHolidayAdded: (state, { payload }) => {
      state.getAllHolidays.push(payload.holidays); // immer-safe
    },

    setHolidayUpdated: (state, { payload }) => {
      if (Array.isArray(state.getAllHolidays)) {
        state.getAllHolidays = state.getAllHolidays.map((holiday) =>
          holiday.pK_HolidayId === payload.holidays.pK_HolidayId ? payload.holidays
        : holiday
        );
      }
    },

    setHolidayDeleted: (state, { payload }) => {
      if (Array.isArray(state.getAllHolidays)) {
        state.getAllHolidays = state.getAllHolidays.filter(
          (holiday) => holiday.pK_HolidayId !== payload.holidayId
        );
      }
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
        state.errorSeverity = "success";
      })
      .addCase(GetMisDataByRangeAPI.rejected, (state, { payload }) => {
        state.GetMisDataByRangeLoading = false;
        state.GetMisDataByRange = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ GetDashboardData ------------------
      .addCase(GetDashboardDataAPI.pending, (state) => {
        state.GetDashboardDataLoading = true;
      })
      .addCase(GetDashboardDataAPI.fulfilled, (state, { payload }) => {
        state.GetDashboardDataLoading = false;
        state.getAllInstrumentForCounterParties = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetDashboardDataAPI.rejected, (state, { payload }) => {
        state.GetDashboardDataLoading = false;
        state.getAllInstrumentForCounterParties = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ SaveUserDashboard ------------------
      .addCase(SaveUserDashboardAPI.pending, (state) => {
        state.SaveUserDashboardLoading = true;
      })
      .addCase(SaveUserDashboardAPI.fulfilled, (state, { payload }) => {
        state.SaveUserDashboardLoading = false;
        state.SaveUserDashboardData = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(SaveUserDashboardAPI.rejected, (state, { payload }) => {
        state.SaveUserDashboardLoading = false;
        state.SaveUserDashboardData = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ GetAllTreasuryInstruments ------------------
      .addCase(getAllTreasuryInstrumentsApi.pending, (state) => {
        state.GetAllTreasuryInstrumentsLoading = true;
      })
      .addCase(getAllTreasuryInstrumentsApi.fulfilled, (state, { payload }) => {
        state.GetAllTreasuryInstrumentsLoading = false;
        state.GetAllInstrumentForTreasury = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllTreasuryInstrumentsApi.rejected, (state, { payload }) => {
        state.GetAllTreasuryInstrumentsLoading = false;
        state.GetAllInstrumentForTreasury = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ GetForwardRatesForCounterParty ------------------
      .addCase(GetForwardRatesForCounterPartyApi.pending, (state) => {
        state.GetForwardRatesForCounterPartyLoading = true;
      })
      .addCase(
        GetForwardRatesForCounterPartyApi.fulfilled,
        (state, { payload }) => {
          state.GetForwardRatesForCounterPartyLoading = false;
          state.GetForwardRatesForCounterParty = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetForwardRatesForCounterPartyApi.rejected,
        (state, { payload }) => {
          state.GetForwardRatesForCounterPartyLoading = false;
          state.GetForwardRatesForCounterParty = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      )

      // ------------------ GetDiscountingRatesForCounterParty ------------------
      .addCase(GetDiscountingRatesForCounterPartyApi.pending, (state) => {
        state.GetDiscountingRatesForCounterPartyLoading = true;
      })
      .addCase(
        GetDiscountingRatesForCounterPartyApi.fulfilled,
        (state, { payload }) => {
          state.GetDiscountingRatesForCounterPartyLoading = false;
          state.GetDiscountingRatesForCounterParty = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetDiscountingRatesForCounterPartyApi.rejected,
        (state, { payload }) => {
          state.GetDiscountingRatesForCounterPartyLoading = false;
          state.GetDiscountingRatesForCounterParty = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      )

      // ------------------ GetBankSpotForTreasury ------------------
      .addCase(GetBankSpotForTreasuryApi.pending, (state) => {
        state.GetBankSpotForTreasuryLoading = true;
      })
      .addCase(GetBankSpotForTreasuryApi.fulfilled, (state, { payload }) => {
        state.GetBankSpotForTreasuryLoading = false;
        state.GetBankSpotForTreasury = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetBankSpotForTreasuryApi.rejected, (state, { payload }) => {
        state.GetBankSpotForTreasuryLoading = false;
        state.GetBankSpotForTreasury = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ GetBankForwardForTreasury ------------------
      .addCase(GetBankForwardForTreasuryApi.pending, (state) => {
        state.GetBankForwardForTreasuryLoading = true;
      })
      .addCase(GetBankForwardForTreasuryApi.fulfilled, (state, { payload }) => {
        state.GetBankForwardForTreasuryLoading = false;
        state.GetBankForwardForTreasury = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetBankForwardForTreasuryApi.rejected, (state, { payload }) => {
        state.GetBankForwardForTreasuryLoading = false;
        state.GetBankForwardForTreasury = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ------------------ GetDiscountingRatesForTreasury ------------------
      .addCase(GetDiscountingRatesForTreasuryApi.pending, (state) => {
        state.GetDiscountingRatesForTreasuryLoading = true;
      })
      .addCase(
        GetDiscountingRatesForTreasuryApi.fulfilled,
        (state, { payload }) => {
          state.GetDiscountingRatesForTreasuryLoading = false;
          state.GetDiscountingRatesForTreasury = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetDiscountingRatesForTreasuryApi.rejected,
        (state, { payload }) => {
          state.GetDiscountingRatesForTreasuryLoading = false;
          state.GetDiscountingRatesForTreasury = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      )

      // ------------------ GetMarketStatus ------------------
      .addCase(getMarketStatusApi.pending, (state) => {
        state.GetMarketStatusLoading = true;
      })
      .addCase(getMarketStatusApi.fulfilled, (state, { payload }) => {
        state.GetMarketStatusLoading = false;
        state.getMarketStatus = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getMarketStatusApi.rejected, (state, { payload }) => {
        state.GetMarketStatusLoading = false;
        state.getMarketStatus = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      //----------------GetCorporateDailyVolume------------------
      .addCase(GetCorporateDailyVolumeAPI.pending, (state) => {
        state.GetCorporateDailyVolumeLoading = true;
      })
      .addCase(GetCorporateDailyVolumeAPI.fulfilled, (state, { payload }) => {
        state.GetCorporateDailyVolumeLoading = false;
        state.GetCorporateDailyVolume = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetCorporateDailyVolumeAPI.rejected, (state, { payload }) => {
        state.GetCorporateDailyVolumeLoading = false;
        state.GetCorporateDailyVolume = null;
        state.error = payload;
        state.errorSeverity = "error";
      })
      .addCase(UpdateBidOfferStatusAPI.pending, (state) => {
        state.UpdateBidOfferStatusLoading = true;
      })
      .addCase(UpdateBidOfferStatusAPI.fulfilled, (state, { payload }) => {
        state.UpdateBidOfferStatusLoading = false;
        state.UpdateBidOfferStatus = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(UpdateBidOfferStatusAPI.rejected, (state, { payload }) => {
        state.UpdateBidOfferStatusLoading = false;
        state.UpdateBidOfferStatus = null;
        state.error = payload;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      })
      .addCase(GetBidOfferStatusApi.pending, (state) => {
        state.GetBidOfferStatusLoading = true;
      })
      .addCase(GetBidOfferStatusApi.fulfilled, (state, { payload }) => {
        state.GetBidOfferStatusLoading = false;
        state.getBidOfferStatus = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetBidOfferStatusApi.rejected, (state, { payload }) => {
        state.GetBidOfferStatusLoading = false;
        state.getBidOfferStatus = null;
        state.error = payload;
        state.errorSeverity = "error";
      })
      .addCase(getAllHolidaysForTransactionApi.pending, (state) => {})
      .addCase(
        getAllHolidaysForTransactionApi.fulfilled,
        (state, { payload }) => {
          state.getAllHolidays = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        getAllHolidaysForTransactionApi.rejected,
        (state, { payload }) => {
          state.getAllHolidays = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      );
  },
});

export const {
  clearWatchListResponseMessage,
  setMarketStatus,
  setWatchlistTableDataCopy,
  clearCorporateDailyVolume,
  setBidOfferStatus,
  clearBidOfferStatus,
  updateHolidays,
  setHolidayAdded,
  setHolidayUpdated,
  setHolidayDeleted,
} = WatchListSlice.actions;
export default WatchListSlice.reducer;
