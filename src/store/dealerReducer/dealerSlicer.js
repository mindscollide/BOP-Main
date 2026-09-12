import {
  GetFEDiscountingTableApi,
  PublishFEDiscountingTableApi,
} from "@/components/features/FeDiscountingTable/FeDiscountTableAction";
import {
  GetNonFEDiscountingTableApi,
  PublishNonFEDiscountingTableApi,
} from "@/components/features/NonFeDiscountingTable/NonFeDiscountingAction";
import {
  GetVoltMeterStatusApi,
  PublishNewRatesAction,
  PublishTenorWiseForwardsAction,
  UpdateVoltMeterStatusApi,
  clearRatesAction,
  createTenorAction,
  getAllTenorsAction,
  getDealerDashboardApi,
  getDiscountingRatesAction,
  getLastPublishRatesAction,
  getTenorWiseForwardsAction,
  marketOnOffAction,
  publishDiscountingRatesAction,
} from "@/container/pages/mainDealer/dealerActions";
import { createSlice } from "@reduxjs/toolkit";

const dealerReducer = createSlice({
  name: "uploadRates",
  initialState: {
    errorSeverity: null,
    ratesData: null,
    responseMessage: "",
    error: null,

    // 🔄 Loading states per action
    marketOnOffLoading: false,
    clearRatesLoading: false,
    getLastPublishRatesLoading: false,
    publishNewRatesLoading: false,
    getAllTenorsLoading: false,
    createTenorLoading: false,
    getTenorWiseForwardsLoading: false,
    publishTenorWiseForwardsLoading: false,
    getDiscountingRatesLoading: false,
    publishDiscountingRatesLoading: false,
    getFeDiscountingLoading: false,
    publishFeDiscountingLoading: false,
    getNonFeDiscountingLoading: false,
    publishNonFeDiscountingLoading: false,
    getDealerDashboardLoading: false,
    getVoltMeterStatusLoading: false,
    updateVoltMeterStatusLoading: false,

    // 🔄 Data states
    marketOnOff: null,
    clearRates: null,
    getLastPublishRates: null,
    getCurrentPublishRate: null,
    getAllTenors: null,
    createTenor: null,
    getTenorWiseForwardsRates: null,
    publishTenorwiseForwardRates: null,
    getDiscountingWiseRates: null,
    publishDiscountRates: null,
    getFeDiscounting: null,
    publishFeDiscounting: null,
    getNonFeDiscounting: null,
    publishNonFeDiscounting: null,
    getDealerDashboardData: null,
    forwardsForTreasuryBranch: [],
    GetCategoryWiseSpotRates: null,
    categoryValue: {
      value: 0,
      label: "",
    },
    GetVoltMeterStatus: null,
    UpdateVoltMeterStatus: null,
    GetVoltMeterStatusRealtime: null,
    setUpdateTenors: null,
  },
  reducers: {
    setUpdateVolMeterRealtime: (state, action) => {
      state.GetVoltMeterStatusRealtime = action.payload;
    },
    clearDealerResponseMessage: (state) => {
      state.responseMessage = "";
    },
    setForwardsForTreasuryBranch: (state, action) => {
      state.forwardsForTreasuryBranch = action.payload;
    },
    setCategoryValue: (state, action) => {
      state.categoryValue = action.payload;
    },
    updateForwardItem: (state, action) => {
      const { tenorID, view, value } = action.payload;
      state.forwardsForTreasuryBranch = state.forwardsForTreasuryBranch.map(
        (item) => {
          if (item.tenorID === tenorID) {
            return {
              ...item,
              currentBid: view === "bid" ? value : item.currentBid,
              currentAsk: view === "ask" ? value : item.currentAsk,
            };
          }
          return item;
        }
      );
    },
    updateForwardTenors(state, { payload }) {
      const { removedtenorList, newIsForwardtenorList } =
        payload.updatedTenorList;

      const removedIds = new Set(removedtenorList.map((r) => r.tenorID));

      const forwardIds = new Set(newIsForwardtenorList.map((f) => f.tenorID));

      state.getAllTenors.tenors = state.getAllTenors.tenors.map((tenor) => {
        // Disable forwarding
        if (removedIds.has(tenor.tenorID)) {
          return {
            ...tenor,
            isForwardingApplicable: false,
          };
        }

        // Enable forwarding
        if (forwardIds.has(tenor.tenorID)) {
          return {
            ...tenor,
            isForwardingApplicable: true,
          };
        }

        return tenor;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Market On/Off
      .addCase(marketOnOffAction.pending, (state) => {
        state.marketOnOffLoading = true;
      })
      .addCase(marketOnOffAction.fulfilled, (state, { payload }) => {
        state.marketOnOffLoading = false;
        state.responseMessage = payload?.message;
        state.marketOnOff = payload?.response;
        state.errorSeverity = "success";
      })
      .addCase(marketOnOffAction.rejected, (state, { payload }) => {
        state.marketOnOffLoading = false;
        state.marketOnOff = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Clear Rates
      .addCase(clearRatesAction.pending, (state) => {
        state.clearRatesLoading = true;
      })
      .addCase(clearRatesAction.fulfilled, (state, { payload }) => {
        state.clearRatesLoading = false;
        state.clearRates = payload?.response;
        state.errorSeverity = "success";
      })
      .addCase(clearRatesAction.rejected, (state, { payload }) => {
        state.clearRatesLoading = false;
        state.clearRates = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Get Last Publish Rates
      .addCase(getLastPublishRatesAction.pending, (state) => {
        state.getLastPublishRatesLoading = true;
      })
      .addCase(getLastPublishRatesAction.fulfilled, (state, { payload }) => {
        state.getLastPublishRatesLoading = false;
        state.getLastPublishRates = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getLastPublishRatesAction.rejected, (state, { payload }) => {
        state.getLastPublishRatesLoading = false;
        state.getLastPublishRates = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Publish New Rates
      .addCase(PublishNewRatesAction.pending, (state) => {
        state.publishNewRatesLoading = true;
      })
      .addCase(PublishNewRatesAction.fulfilled, (state, { payload }) => {
        state.publishNewRatesLoading = false;
        state.getCurrentPublishRate = payload?.response;
        state.getLastPublishRates = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(PublishNewRatesAction.rejected, (state, { payload }) => {
        state.publishNewRatesLoading = false;
        state.getCurrentPublishRate = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Get All Tenors
      .addCase(getAllTenorsAction.pending, (state) => {
        state.getAllTenorsLoading = true;
      })
      .addCase(getAllTenorsAction.fulfilled, (state, { payload }) => {
        state.getAllTenorsLoading = false;
        state.getAllTenors = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllTenorsAction.rejected, (state, { payload }) => {
        state.getAllTenorsLoading = false;
        state.getAllTenors = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Create Tenor
      .addCase(createTenorAction.pending, (state) => {
        state.createTenorLoading = true;
      })
      .addCase(createTenorAction.fulfilled, (state, { payload }) => {
        state.createTenorLoading = false;
        state.createTenor = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(createTenorAction.rejected, (state, { payload }) => {
        state.createTenorLoading = false;
        state.createTenor = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Get Tenor Wise Forwards
      .addCase(getTenorWiseForwardsAction.pending, (state) => {
        state.getTenorWiseForwardsLoading = true;
      })
      .addCase(getTenorWiseForwardsAction.fulfilled, (state, { payload }) => {
        state.getTenorWiseForwardsLoading = false;
        state.getTenorWiseForwardsRates = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getTenorWiseForwardsAction.rejected, (state, { payload }) => {
        state.getTenorWiseForwardsLoading = false;
        state.getTenorWiseForwardsRates = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Publish Tenor Wise Forwards
      .addCase(PublishTenorWiseForwardsAction.pending, (state) => {
        state.publishTenorWiseForwardsLoading = true;
      })
      .addCase(
        PublishTenorWiseForwardsAction.fulfilled,
        (state, { payload }) => {
          state.publishTenorWiseForwardsLoading = false;
          state.publishTenorwiseForwardRates = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        PublishTenorWiseForwardsAction.rejected,
        (state, { payload }) => {
          state.publishTenorWiseForwardsLoading = false;
          state.publishTenorwiseForwardRates = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      )

      // ✅ Get Discounting Rates
      .addCase(getDiscountingRatesAction.pending, (state) => {
        state.getDiscountingRatesLoading = true;
      })
      .addCase(getDiscountingRatesAction.fulfilled, (state, { payload }) => {
        state.getDiscountingRatesLoading = false;
        state.getDiscountingWiseRates = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getDiscountingRatesAction.rejected, (state, { payload }) => {
        state.getDiscountingRatesLoading = false;
        state.getDiscountingWiseRates = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Publish Discounting Rates
      .addCase(publishDiscountingRatesAction.pending, (state) => {
        state.publishDiscountingRatesLoading = true;
      })
      .addCase(
        publishDiscountingRatesAction.fulfilled,
        (state, { payload }) => {
          state.publishDiscountingRatesLoading = false;
          state.publishDiscountRates = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(publishDiscountingRatesAction.rejected, (state, { payload }) => {
        state.publishDiscountingRatesLoading = false;
        state.publishDiscountRates = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ FE Discounting
      .addCase(GetFEDiscountingTableApi.pending, (state) => {
        state.getFeDiscountingLoading = true;
      })
      .addCase(GetFEDiscountingTableApi.fulfilled, (state, { payload }) => {
        state.getFeDiscountingLoading = false;
        state.getFeDiscounting = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetFEDiscountingTableApi.rejected, (state, { payload }) => {
        state.getFeDiscountingLoading = false;
        state.getFeDiscounting = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      .addCase(PublishFEDiscountingTableApi.pending, (state) => {
        state.publishFeDiscountingLoading = true;
      })
      .addCase(PublishFEDiscountingTableApi.fulfilled, (state, { payload }) => {
        state.publishFeDiscountingLoading = false;
        state.publishFeDiscounting = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(PublishFEDiscountingTableApi.rejected, (state, { payload }) => {
        state.publishFeDiscountingLoading = false;
        state.publishFeDiscounting = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Non-FE Discounting
      .addCase(GetNonFEDiscountingTableApi.pending, (state) => {
        state.getNonFeDiscountingLoading = true;
      })
      .addCase(GetNonFEDiscountingTableApi.fulfilled, (state, { payload }) => {
        state.getNonFeDiscountingLoading = false;
        state.getNonFeDiscounting = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetNonFEDiscountingTableApi.rejected, (state, { payload }) => {
        state.getNonFeDiscountingLoading = false;
        state.getNonFeDiscounting = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      .addCase(PublishNonFEDiscountingTableApi.pending, (state) => {
        state.publishNonFeDiscountingLoading = true;
      })
      .addCase(
        PublishNonFEDiscountingTableApi.fulfilled,
        (state, { payload }) => {
          state.publishNonFeDiscountingLoading = false;
          state.publishNonFeDiscounting = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        PublishNonFEDiscountingTableApi.rejected,
        (state, { payload }) => {
          state.publishNonFeDiscountingLoading = false;
          state.publishNonFeDiscounting = null;
          state.error = payload;
          state.errorSeverity = "error";
        }
      )

      // ✅ Dealer Dashboard
      .addCase(getDealerDashboardApi.pending, (state) => {
        state.getDealerDashboardLoading = true;
      })
      .addCase(getDealerDashboardApi.fulfilled, (state, { payload }) => {
        state.getDealerDashboardLoading = false;
        state.getDealerDashboardData = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getDealerDashboardApi.rejected, (state, { payload }) => {
        state.getDealerDashboardLoading = false;
        state.getDealerDashboardData = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      // ✅ Volt Meter
      .addCase(GetVoltMeterStatusApi.pending, (state) => {
        state.getVoltMeterStatusLoading = true;
      })
      .addCase(GetVoltMeterStatusApi.fulfilled, (state, { payload }) => {
        state.getVoltMeterStatusLoading = false;
        state.GetVoltMeterStatus = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(GetVoltMeterStatusApi.rejected, (state, { payload }) => {
        state.getVoltMeterStatusLoading = false;
        state.GetVoltMeterStatus = null;
        state.error = payload;
        state.errorSeverity = "error";
      })

      .addCase(UpdateVoltMeterStatusApi.pending, (state) => {
        state.updateVoltMeterStatusLoading = true;
      })
      .addCase(UpdateVoltMeterStatusApi.fulfilled, (state, { payload }) => {
        state.updateVoltMeterStatusLoading = false;
        state.UpdateVoltMeterStatus = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(UpdateVoltMeterStatusApi.rejected, (state, { payload }) => {
        state.updateVoltMeterStatusLoading = false;
        state.UpdateVoltMeterStatus = null;
        state.error = payload;
        state.errorSeverity = "error";
      });
  },
});

export const {
  clearDealerResponseMessage,
  setForwardsForTreasuryBranch,
  setCategoryValue,
  updateForwardItem,
  setUpdateVolMeterRealtime,
  updateForwardTenors,
} = dealerReducer.actions;
export default dealerReducer.reducer;
