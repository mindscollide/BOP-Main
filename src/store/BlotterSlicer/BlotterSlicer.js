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
  GetNOPDataAPI,
  calculateNonFeSwapAndDiscountingRateApi,
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
    GetNOPData: null,
    forwardQuoteModalData: null,
    discountingQuoteModalData: null,
    spotQuoteModalData: null,
    calculateNonFeSwapAndDiscountingRate: null,
    tnxTableNewData: [],
    txnCouterPartyData: [],
    OutstandingTableNewData: [],
    totalCountOutstandingData: 0,

    // TXN Treasury Data
    txnTreasuryTableData: [],
    txnTreasuryTableDataCount: 0,

    // TXN CounterParty  Data
    txnCounterPartyTableData: [],
    txnCounterPartyTableDataCount: 0,

    // Outstanding Table Data
    OutstandingTableData: [],
    OutstandingTableDataCount: 0,

    BlotterTransactionRFQExpired: null,
    BlotterTransactionRFQExpiredForTreasury: null,
    BlotterTransactionRFQExpiredForTreasuryDealBox: null,

    BlotterTransactionAdded: null,
    BlotterTransactionAddedForTreasury: null,
    BlotterTransactionAddedForTreasuryDealBox: null,

    BlotterTransactionAssigned: null,
    BlotterTransactionAssignedForTreasury: null,

    BlotterTransactionAccepted: null,
    BlotterTransactionAcceptedForTreasury: null,

    BlotterTransactionRFQQuoted: null,
    BlotterTransactionRFQQuotedForTreasury: null,
    BlotterTransactionRFQQuotedForTreasuryDealBox: null,

    BlotterTransactionCancellationRequestData: null,
    BlotterTransactionCancellationRequestDataForTreasury: null,

    BlotterTranscationCancelled: null,
    BlotterTranscationCancelledForTreasury: null,

    BlotterTransactionRejected: null,
    BlotterTransactionRejectedForTreasury: null,

    TransactionAssignedByTreasury: null,

    // New Status for Blotter Transactions

    transactionCounterPartyAdded: null,
    transactionOutstandingAdded: null,

    transactionCounterPartyAssigned: null,
    transactionOutstandingAssigned: null,

    transactionCounterPartyExpired: null,
    transactionOutstandingExpired: null,

    transactionCounterpartyAccepted: null,
    transactionOutstandingAccepted: null,
    transactionTreasuryAccepted: null,

    transactionCounterPartyQuoted: null,
    transactionOutstandingQuoted: null,

    transactionCounterPartyCancellationRequest: null,
    transactionOutstandingCancellationRequest: null,
    transactionTreasuryCancellationRequest: null,

    transactionCounterPartyCancelled: null,
    transactionOutstandingCancelled: null,
    transactionTreasuryCancelled: null,

    transactionCounterPartyRejected: null,
    transactionOutstandingRejected: null,
    transactionTreasuryRejected: null,

    transactionCounterPartyByTreasuryAssigned: null,
  },
  reducers: {
    setBlotterTransactionRFQExpired(state, { payload }) {
      state.BlotterTransactionRFQExpired = payload;
    },
    setBlotterTransactionRFQExpiredForTreasury(state, { payload }) {
      state.BlotterTransactionRFQExpiredForTreasury = payload;
    },
    setBlotterTransactionRFQExpiredForTreasuryDealBox(state, { payload }) {
      state.BlotterTransactionRFQExpiredForTreasuryDealBox = payload;
    },
    setBlotterTransactionAdded(state, { payload }) {
      state.BlotterTransactionAdded = payload;
    },
    setBlotterTransactionAddedForTreasury(state, { payload }) {
      state.BlotterTransactionAddedForTreasury = payload;
    },
    setBlotterTransactionAddedForTreasuryDealBox(state, { payload }) {
      state.BlotterTransactionAddedForTreasuryDealBox = payload;
    },
    setBlotterTransactionAssigned(state, { payload }) {
      state.BlotterTransactionAssigned = payload;
    },
    setBlotterTransactionAssignedForTreasury(state, { payload }) {
      state.BlotterTransactionAssignedForTreasury = payload;
    },
    setBlotterTransactionAccepted(state, { payload }) {
      state.BlotterTransactionAccepted = payload;
    },
    setBlotterTransactionAcceptedForTreasury(state, { payload }) {
      state.BlotterTransactionAcceptedForTreasury = payload;
    },
    setBlotterTransactionRFQQuoted(state, { payload }) {
      state.BlotterTransactionRFQQuoted = payload;
    },
    setBlotterTransactionRFQQuotedForTreasury(state, { payload }) {
      state.BlotterTransactionRFQQuotedForTreasury = payload;
    },
    setBlotterTransactionRFQQuotedForTreasuryDealBox(state, { payload }) {
      state.BlotterTransactionRFQQuotedForTreasuryDealBox = payload;
    },
    BlotterTransactionCancellationRequest(state, { payload }) {
      state.BlotterTransactionCancellationRequestData = payload;
    },
    BlotterTransactionCancellationRequestForTreasury(state, { payload }) {
      state.BlotterTransactionCancellationRequestDataForTreasury = payload;
    },
    BlotterTranscationCancelled(state, { payload }) {
      state.BlotterTranscationCancelled = payload;
    },
    BlotterTranscationCancelledForTreasury(state, { payload }) {
      state.BlotterTranscationCancelledForTreasury = payload;
    },
    BlotterTransactionRejected(state, { payload }) {
      state.BlotterTransactionRejected = payload;
    },
    BlotterTransactionRejectedForTreasury(state, { payload }) {
      state.BlotterTransactionRejectedForTreasury = payload;
    },

    TransactionAssignedByTreasury(state, { payload }) {
      state.TransactionAssignedByTreasury = payload;
    },
    setSpotQuoteModalData: (state, { payload }) => {
      state.spotQuoteModalData = payload;
    },
    setDiscountingQuoteModalData: (state, { payload }) => {
      state.discountingQuoteModalData = payload;
    },
    setForwardQuoteModalData: (state, { payload }) => {
      state.forwardQuoteModalData = payload;
    },
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

    // New actions

    setBlotterTransactionCounterPartyAdded: (state, action) => {
      // state.txnCounterPartyTableData
      state.transactionCounterPartyAdded = action.payload;
      // state.
    },
    setBlotterTransactionOutstandingAdded: (state, action) => {
      console.log(action, "setBlotterTransactionOutstandingAdded")
      const newTransaction = action.payload.transaction;
      const isAlreadyExist = state.OutstandingTableData.some(
        (item) => item.pK_TransactionID === newTransaction.pK_TransactionID
      );

      if (!isAlreadyExist) {
        state.OutstandingTableData.unshift(newTransaction);
      }
    },
    setBlotterTransactionCounterPartyAssigned: (state, action) => {
      state.transactionCounterPartyAssigned = action.payload;
    },
    setBlotterTransactionOutstandingAssigned: (state, action) => {
      state.transactionOutstandingAssigned = action.payload;
    },
    setBlotterTransactionCounterPartyExpired: (state, action) => {
      state.transactionCounterPartyExpired = action.payload;
    },
    setBlotterTransactionOutstandingExpired: (state, action) => {
      state.transactionOutstandingExpired = action.payload;
    },
    setBlotterTransactionCounterpartyAccepted: (state, action) => {
      state.transactionCounterpartyAccepted = action.payload;
    },
    setBlotterTransactionOutstandingAccepted: (state, action) => {
      state.transactionOutstandingAccepted = action.payload;
    },
    setBlotterTransactionTreasuryAccepted: (state, action) => {
      state.transactionTreasuryAccepted = action.payload;
    },
    setBlotterTransactionCounterPartyQuoted: (state, action) => {
      state.transactionCounterPartyQuoted = action.payload;
    },
    setBlotterTransactionOutstandingQuoted: (state, action) => {
      state.transactionOutstandingQuoted = action.payload;
    },
    setBlotterTransactionCounterPartyCancellationRequest: (state, action) => {
      state.transactionCounterPartyCancellationRequest = action.payload;
    },
    setBlotterTransactionOutstandingCancellationRequest: (state, action) => {
      state.transactionOutstandingCancellationRequest = action.payload;
    },
    setBlotterTransactionTreasuryCancellationRequest: (state, action) => {
      state.transactionTreasuryCancellationRequest = action.payload;
    },
    setBlotterTransactionCounterPartyCancelled: (state, action) => {
      state.transactionCounterPartyCancelled = action.payload;
    },
    setBlotterTransactionOutstandingCancelled: (state, action) => {
      state.transactionOutstandingCancelled = action.payload;
    },
    setBlotterTransactionTreasuryCancelled: (state, action) => {
      state.transactionTreasuryCancelled = action.payload;
    },
    setBlotterTransactionCounterPartyRejected: (state, action) => {
      state.transactionCounterPartyRejected = action.payload;
    },
    setBlotterTransactionOutstandingRejected: (state, action) => {
      state.transactionOutstandingRejected = action.payload;
    },
    setBlotterTransactionTreasuryRejected: (state, action) => {
      state.transactionTreasuryRejected = action.payload;
    },
    setBlotterTransactionCounterPartyByTreasuryAssigned: (state, action) => {
      state.transactionCounterPartyByTreasuryAssigned = action.payload;
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
        let tableData = [
          ...state.txnTreasuryTableData,
          ...payload.response.tnxSummary,
        ];
        console.log(tableData, payload, state, "BlotterDataAPIBlotterDataAPI");
        state.Loader = false;
        state.getBlotterApiData = payload?.response;
        state.txnTreasuryTableData = tableData;
        state.txnTreasuryTableDataCount = payload?.response?.totalCount;
        state.txnCounterPartyTableData = tableData;
        state.txnCounterPartyTableDataCount = payload.response?.totalCount;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterApiData = null;
        state.txnTreasuryTableData = [];
        state.txnTreasuryTableDataCount = 0;
        state.txnCounterPartyTableData = [];
        state.txnCounterPartyTableDataCount = 0;
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
          state.OutstandingTableData = payload?.response?.outstandingDeals;
          state.OutstandingTableDataCount = payload?.response?.totalCount;
        }
      )
      .addCase(GetBlotterOutstandingDealsDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterOutstandingData = null;
        state.OutstandingTableData = [];
        state.OutstandingTableDataCount = 0;
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
      )
      .addCase(GetNOPDataAPI.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetNOPDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetNOPData = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(GetNOPDataAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetNOPData = null;
        state.responseMessage = payload?.message;
      })
      .addCase(
        calculateNonFeSwapAndDiscountingRateApi.pending,
        (state, { payload }) => {
          state.Loader = false;
        }
      )
      .addCase(
        calculateNonFeSwapAndDiscountingRateApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateNonFeSwapAndDiscountingRate = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        calculateNonFeSwapAndDiscountingRateApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateNonFeSwapAndDiscountingRate = null;
          state.responseMessage = payload;
        }
      );
  },
});

export const {
  setDiscountingQuoteModalData,
  setForwardQuoteModalData,
  setActiveTreasuryTab,
  clearBlotterResponseMessage,
  clearCalculateTenorSwapAndForwardRateData,
  clearGetFEDiscountingTransactionDetails,
  clearGetSpotTransactionDetails,
  clearGetNonFEDiscountingTransactionDetails,
  clearGetForwardTransactionDetails,
  setSpotQuoteModalData,
  setBlotterTransactionRFQExpiredForTreasury,
  setBlotterTransactionAddedForTreasury,
  setBlotterTransactionAssignedForTreasury,
  setBlotterTransactionAcceptedForTreasury,
  setBlotterTransactionRFQQuotedForTreasury,
  setBlotterTransactionCancellationRequestForTreasury,
  setBlotterTranscationCancelledForTreasury,
  setBlotterTransactionRejectedForTreasury,
  setTransactionAssignedByTreasury,
  setBlotterTransactionRejected,
  setBlotterTranscationCancelled,
  setBlotterTransactionCancellationRequest,
  setBlotterTransactionAccepted,
  setBlotterTransactionAssigned,
  setBlotterTransactionAdded,
  setBlotterTransactionRFQExpired,
  setBlotterTransactionRFQQuoted,

  // New Actions

  setBlotterTransactionCounterPartyAdded,
  setBlotterTransactionOutstandingAdded,
  setBlotterTransactionCounterPartyAssigned,
  setBlotterTransactionOutstandingAssigned,
  setBlotterTransactionCounterPartyExpired,
  setBlotterTransactionOutstandingExpired,
  setBlotterTransactionCounterpartyAccepted,
  setBlotterTransactionOutstandingAccepted,
  setBlotterTransactionTreasuryAccepted,
  setBlotterTransactionCounterPartyQuoted,
  setBlotterTransactionOutstandingQuoted,
  setBlotterTransactionCounterPartyCancellationRequest,
  setBlotterTransactionOutstandingCancellationRequest,
  setBlotterTransactionTreasuryCancellationRequest,
  setBlotterTransactionCounterPartyCancelled,
  setBlotterTransactionOutstandingCancelled,
  setBlotterTransactionTreasuryCancelled,
  setBlotterTransactionCounterPartyRejected,
  setBlotterTransactionOutstandingRejected,
  setBlotterTransactionTreasuryRejected,
  setBlotterTransactionCounterPartyByTreasuryAssigned,
} = BlotterSlicer.actions;

export default BlotterSlicer.reducer;
