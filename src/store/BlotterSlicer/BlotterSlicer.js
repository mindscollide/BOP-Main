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
  CalculateFEDiscountingAPI,
  CalculateFESwapAndDiscountingApi,
  SaveSpotTransactionRFQ,
  RFQForwardTransactionQuotation,
  RFQFEDiscountingTransactionQuotation,
} from "@/components/features/blotter/BlotterActions";
import { createSlice } from "@reduxjs/toolkit";

const BlotterSlicer = createSlice({
  name: "CorporateBlotterSlicer",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    txnSummaryData: [],
    txnSummaryDataTotalRecords: 0,
    txnSummarysRow: 0,
    totalOutStandingCounter: 0,
    outStandingDealData: [],
    outStandingDealDataTotalRecords: 0,
    outStandingDealsRow: 0,
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
    OutstandingTableNewData: [],
    totalCountOutstandingData: 0,
    CalculateFEDiscountingData: null,
    CalculateFESwapAndDiscountingRate: null,
    forwardRfqQuotation: null,
  },
  reducers: {
    setOutStandingTotalCount: (state, { payload }) => {
      state.totalOutStandingCounter = payload;
    },
    setTxnSummaryData: (state, { payload }) => {
      state.txnSummaryData = payload;
    },
    setTxnSummaryDataTotalRecords: (state, { payload }) => {
      state.txnSummaryDataTotalRecords = payload;
    },
    setTxnSummarysRow: (state, { payload }) => {
      state.txnSummarysRow = payload;
    },
    setOutstandingDealData: (state, { payload }) => {
      state.outStandingDealData = payload;
    },
    setOutstandingDealTotalRecords: (state, { payload }) => {
      state.outStandingDealDataTotalRecords = payload;
    },
    setOutstandingDealsRow: (state, { payload }) => {
      state.outStandingDealsRow = payload;
    },
    setCalculateNonFeSwapAndDiscountingRate: (state, { payload }) => {
      state.calculateNonFeSwapAndDiscountingRate = payload;
    },
    setCalculateFESwapAndDiscountingRate: (state, { payload }) => {
      state.CalculateFESwapAndDiscountingRate = payload;
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
    setBlotterLoader: (state, { payload }) => {
      state.Loader = payload; // Set the loader state for Blotter operations
    },
    // Replace txn if exists, else prepend it
    updateTreasuryTxnSummary: (state, { payload }) => {
      const existingIndex = state.txnSummaryData.findIndex(
        (item) => item.pK_TransactionID === payload.pK_TransactionID
      );

      if (existingIndex !== -1) {
        state.txnSummaryData[existingIndex] = payload;
      } else {
        state.txnSummaryData.unshift(payload);
        state.txnSummaryDataTotalRecords += 1;
      }

      state.txnSummarysRow = state.txnSummaryData.length;
    },

    // Remove txn by ID
    removeTreasuryTxnFromSummary: (state, { payload: transactionId }) => {
      state.txnSummaryData = state.txnSummaryData.filter(
        (item) => item.pK_TransactionID !== transactionId
      );
      state.txnSummaryDataTotalRecords -= 1;
      state.txnSummarysRow = state.txnSummaryData.length;
    },
    updateOutstandingDeals: (state, { payload }) => {
      const { transaction, type } = payload;
      let updated = [...state.outStandingDealData];

      switch (type) {
        case "added": {
          const index = updated.findIndex(
            (item) => item.pK_TransactionID === transaction.pK_TransactionID
          );

          if (index !== -1) {
            updated[index] = transaction;
          } else {
            updated.unshift(transaction);
            state.outStandingDealDataTotalRecords += 1;
          }
          break;
        }

        case "quoted": {
          updated = updated.map((item) =>
            item.pK_TransactionID === transaction.pK_TransactionID
              ? {
                  ...item,
                  bid: transaction.bid,
                  offer: transaction.offer,
                  amount: transaction.amount,
                  statusID: transaction.statusID,
                  rfqTimerDetails:
                    transaction.rfqTimerDetails ?? item.rfqTimerDetails,
                }
              : item
          );
          break;
        }

        case "expired":
        case "accepted":
        case "cancelled":
        case "rejected": {
          updated = updated.filter(
            (item) => item.pK_TransactionID !== transaction.pK_TransactionID
          );
          state.outStandingDealDataTotalRecords -= 1;
          break;
        }

        case "assigned": {
          updated = updated.map((item) =>
            item.pK_TransactionID === transaction.transactionID
              ? {
                  ...item,
                  status:
                    Number(localStorage.getItem("userID")) ===
                    Number(transaction.treasuryPersonID)
                      ? transaction.statusForAssignedUser
                      : transaction.statusForOtherTreasury,
                  statusID: transaction.statusID,
                  treasuryPersonID: transaction.treasuryPersonID,
                }
              : item
          );
          break;
        }

        case "cancellationRequest": {
          const exists = updated.find(
            (item) => item.pK_TransactionID === transaction.pK_TransactionID
          );

          if (!exists) {
            updated.unshift(transaction);
            state.outStandingDealDataTotalRecords += 1;
          }
          break;
        }

        default:
          break;
      }

      state.outStandingDealData = updated;
      state.outStandingDealsRow = updated.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CalculateFESwapAndDiscountingApi.pending, (state) => {
        state.Loader = false;
      })
      .addCase(
        CalculateFESwapAndDiscountingApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.CalculateFESwapAndDiscountingRate = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        CalculateFESwapAndDiscountingApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.CalculateFESwapAndDiscountingRate = null;
          state.responseMessage = payload;
        }
      )
      // Pending state (while the API call is being made CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.pending, (state) => {
        state.Loader = false;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getBlotterApiData = payload?.response ?? null;

        state.txnSummaryData.push(...(payload?.response?.tnxSummary ?? []));

        state.txnSummaryDataTotalRecords = payload?.response?.totalCount ?? 0;
        state.txnSummarysRow = state.txnSummaryData.length;

        state.error = null;
        state.responseMessage = payload?.message ?? "";
      })

      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.txnSummarysRow = 0;
        state.txnSummaryDataTotalRecords = 0;
        state.txnSummaryData = [];
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
          state.getBlotterOutstandingData = payload?.response ?? null;
          state.outStandingDealData.push(
            ...(payload?.response?.outstandingDeals ?? [])
          );
          state.outStandingDealDataTotalRecords = payload?.response?.totalCount;
          state.outStandingDealsRow = state.outStandingDealData.length;
          state.error = null;
          state.responseMessage = payload?.message ?? "";
        }
      )
      .addCase(GetBlotterOutstandingDealsDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.getBlotterOutstandingData = null;
        state.outStandingDealDataTotalRecords = 0;
        state.outStandingDealsRow = 0;
        state.outStandingDealData = [];
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
      .addCase(SaveSpotTransactionAPI.rejected, (state, { payload }) => {
        console.log(payload, "actionaction");
        state.Loader = false;
        state.responseMessage = payload;

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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
          state.responseMessage = action?.payload;
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
        state.responseMessage = action?.payload;
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
        state.responseMessage = payload;
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
          state.responseMessage = payload;
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
          state.responseMessage = payload;
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
        state.responseMessage = payload;
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
      )
      .addCase(CalculateFEDiscountingAPI.pending, (state, { payload }) => {
        state.Loader = false;
      })
      .addCase(CalculateFEDiscountingAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.CalculateFEDiscountingData = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(CalculateFEDiscountingAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.CalculateFEDiscountingData = null;
        state.responseMessage = payload;
      })

      .addCase(SaveSpotTransactionRFQ.pending, (state) => {
        state.Loader = false;
      })
      .addCase(SaveSpotTransactionRFQ.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
      })
      .addCase(SaveSpotTransactionRFQ.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload;
      })
      .addCase(RFQForwardTransactionQuotation.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        RFQForwardTransactionQuotation.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.rfqSaveQuotation = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(RFQForwardTransactionQuotation.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.rfqSaveQuotation = null;
      })
      .addCase(RFQFEDiscountingTransactionQuotation.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        RFQFEDiscountingTransactionQuotation.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.forwardRfqQuotation = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        RFQFEDiscountingTransactionQuotation.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.error = payload;
          state.responseMessage = payload;
          state.forwardRfqQuotation = null;
        }
      );
  },
});

export const {
  setOutStandingTotalCount,
  updateOutstandingDeals,
  setTxnSummaryData,
  setOutstandingDealData,
  setOutstandingDealTotalRecords,
  setOutstandingDealsRow,
  setTxnSummaryDataTotalRecords,
  setTxnSummarysRow,
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
  setBlotterLoader,
  setCalculateFESwapAndDiscountingRate,
  setCalculateNonFeSwapAndDiscountingRate,
  updateTreasuryTxnSummary,
  removeTreasuryTxnFromSummary,
} = BlotterSlicer.actions;

export default BlotterSlicer.reducer;
