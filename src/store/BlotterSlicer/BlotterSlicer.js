// import {
//   AcceptTransactionAPI,
//   AssignTransactionAPI,
//   BlotterDataAPI,
//   CancelPendingTransactionApi,
//   GetBlotterOutstandingDealsDataAPI,
//   RFQTransactionQuotation,
//   RejectTransactionAPI,
//   SaveFEDiscountingTransactionAPI,
//   SaveForwardTransactionAPI,
//   SaveNonFEDiscountingTransactionAPI,
//   SaveSpotTransactionAPI,
//   calculateTenorSwapAndForwardRateApi,
//   GetSpotRatesForCounterPartyAPI,
// } from "@/container/pages/mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
import {
  AcceptTransactionAPI,
  AssignTransactionAPI,
  BlotterDataAPI,
  CancelPendingTransactionApi,
  GetBlotterOutstandingDealsDataAPI,
  RFQTransactionQuotation,
  RejectTransactionAPI,
  SaveFEDiscountingTransactionAPI,
  SaveForwardTransactionAPI,
  SaveNonFEDiscountingTransactionAPI,
  SaveSpotTransactionAPI,
  calculateTenorSwapAndForwardRateApi,
  GetSpotRatesForCounterPartyAPI,
  SaveForwardTransactionRFQApi,
  GetFEDiscountingTransactionDetailsApi,
  GetSpotTransactionDetailsApi,
  GetForwardTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
} from "@/components/features/blotter/BlotterActions";
import { createSlice } from "@reduxjs/toolkit";

const BlotterSlicer = createSlice({
  name: "CorporateBlotterSlicer",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    getBlotterApiData: null,
    getBlotterOutstandingData: null,
    saveSpotTransaction: null,
    saveForwardsTransaction: null,
    saveFedDiscountTransaction: null,
    saveNonFeDiscountTransaction: null,
    assignTransaction: null,
    acceptTransaction: null,
    rejectedTransaction: null,
    rfqSaveQuotation: null,
    cancelPendingTransaction: null,
    calculateTenorSwapAndForwardRateData: null,
    activeTabBlotter: "TXN Summary",
    GetSpotRatesForCounterParty: null,
    saveForwardRFQTransaction: null,
    GetFEDiscountingTransactionDetails: null,
    GetSpotTransactionDetails: null,
    GetForwardTransactionDetails: null,
    GetNonFEDiscountingTransactionDetails: null,
  },
  reducers: {
    setActiveTreasuryTab: (state, { payload }) => {
      console.log(payload, "setActiveTreasuryTabsetActiveTreasuryTab");
      state.activeTabBlotter = payload;
    },
    clearBlotterResponseMessage: (state) => {
      state.responseMessage = "";
    },
    clearCalculateTenorSwapAndForwardRateData: (state) => {
      state.calculateTenorSwapAndForwardRateData = null;
    },

    clearGetSpotTransactionDetails: (state) => {
      state.GetSpotTransactionDetails = null;
    },
    clearGetFEDiscountingTransactionDetails: (state) => {
      state.GetFEDiscountingTransactionDetails = null;
    },
    clearGetNonFEDiscountingTransactionDetails: (state) => {
      state.GetNonFEDiscountingTransactionDetails = null;
    },
    clearGetForwardTransactionDetails: (state) => {
      state.GetForwardTransactionDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getBlotterApiData = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterApiData = null;
      })
      .addCase(GetBlotterOutstandingDealsDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(
        GetBlotterOutstandingDealsDataAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.getBlotterOutstandingData = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(GetBlotterOutstandingDealsDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterOutstandingData = null;
      })
      .addCase(SaveSpotTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(SaveSpotTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveSpotTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(SaveSpotTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.saveSpotTransaction = null;
      })
      .addCase(SaveForwardTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(SaveForwardTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveForwardsTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(SaveForwardTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.saveForwardsTransaction = null;
      })
      .addCase(SaveFEDiscountingTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(
        SaveFEDiscountingTransactionAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.saveFedDiscountTransaction = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(SaveFEDiscountingTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.saveFedDiscountTransaction = null;
      })
      .addCase(SaveNonFEDiscountingTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(
        SaveNonFEDiscountingTransactionAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.saveNonFeDiscountTransaction = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(SaveNonFEDiscountingTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.saveNonFeDiscountTransaction = null;
      })
      .addCase(AssignTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(AssignTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.assignTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(AssignTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.assignTransaction = null;
      })
      .addCase(AcceptTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(AcceptTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.acceptTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(AcceptTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.acceptTransaction = null;
      })
      .addCase(RejectTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(RejectTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.rejectedTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(RejectTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.rejectedTransaction = null;
      })
      .addCase(RFQTransactionQuotation.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(RFQTransactionQuotation.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.rfqSaveQuotation = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(RFQTransactionQuotation.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.rfqSaveQuotation = null;
      })
      .addCase(CancelPendingTransactionApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(CancelPendingTransactionApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
        state.cancelPendingTransaction = payload?.response;
        state.error = null;
      })
      .addCase(CancelPendingTransactionApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.cancelPendingTransaction = null;
        state.error = action.payload;
      })
      .addCase(calculateTenorSwapAndForwardRateApi.pending, (state) => {
        state.Loader = false;
        state.error = null;
      })
      .addCase(
        calculateTenorSwapAndForwardRateApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateTenorSwapAndForwardRateData = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        calculateTenorSwapAndForwardRateApi.rejected,
        (state, action) => {
          console.log(action, "actionaction");
          state.Loader = false;
          state.error = action.payload;
          state.calculateTenorSwapAndForwardRateData = null;
        }
      )

      //*************************** */
      .addCase(GetSpotRatesForCounterPartyAPI.pending, (state) => {
        state.Loader = false;
        state.error = null;
      })
      .addCase(
        GetSpotRatesForCounterPartyAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetSpotRatesForCounterParty = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(GetSpotRatesForCounterPartyAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.GetSpotRatesForCounterParty = null;
      })
      .addCase(SaveForwardTransactionRFQApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(SaveForwardTransactionRFQApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveForwardRFQTransaction = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(SaveForwardTransactionRFQApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.saveForwardRFQTransaction = null;
        state.responseMessage = payload;
      })
      .addCase(GetFEDiscountingTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
        // state.error = null;
      })
      .addCase(
        GetFEDiscountingTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetFEDiscountingTransactionDetails = payload.response;
          // state.error = null;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetFEDiscountingTransactionDetailsApi.rejected,
        (state, action) => {
          // console.log(action, "actionaction");
          state.Loader = false;
          state.error = action.payload;
          state.GetFEDiscountingTransactionDetails = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(GetSpotTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetSpotTransactionDetailsApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetSpotTransactionDetails = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(GetSpotTransactionDetailsApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetSpotTransactionDetails = null;
        state.responseMessage = payload?.message;
      })
      .addCase(GetForwardTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetForwardTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetForwardTransactionDetails = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetForwardTransactionDetailsApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetForwardTransactionDetails = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(GetNonFEDiscountingTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetNonFEDiscountingTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetNonFEDiscountingTransactionDetails = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        GetNonFEDiscountingTransactionDetailsApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetNonFEDiscountingTransactionDetails = null;
          state.responseMessage = payload?.message;
        }
      );
  },
});

export const {
  setActiveTreasuryTab,
  clearBlotterResponseMessage,
  clearCalculateTenorSwapAndForwardRateData,
  clearGetFEDiscountingTransactionDetails,
  clearGetSpotTransactionDetails,
  clearGetNonFEDiscountingTransactionDetails,
  clearGetForwardTransactionDetails,
} = BlotterSlicer.actions;

export default BlotterSlicer.reducer;
