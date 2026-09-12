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
  RFQNonFEDiscountingTransactionQuotation,
  SaveNonFEDiscountingTransactionRFQ,
  SaveFEDiscountingTransactionRFQ,
  AcceptTransactionCancellationRequest,
  RejectTransactionCancellationRequest,
  AcceptRFQTransaction,
  CancelTransaction,
  RejectRFQTransaction,
  RequestCancellation,
} from "@/components/features/blotter/BlotterActions";
import { createSlice } from "@reduxjs/toolkit";

const BlotterSlicer = createSlice({
  name: "CorporateBlotterSlicer",
  initialState: {
    errorSeverity: null,
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
    saveNonFEDiscountingTransactionRFQ: null,
    saveFEDiscountingTransactionRFQ: null,

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
    feDiscountingQuotation: null,
    nonFeDiscountingQuotation: null,

    // Individual loading states for each action
    BlotterDataAPILoading: false,
    GetBlotterOutstandingDealsDataAPILoading: false,
    SaveSpotTransactionAPILoading: false, //done
    SaveForwardTransactionAPILoading: false, //done
    SaveFEDiscountingTransactionAPILoading: false, //done
    SaveNonFEDiscountingTransactionAPILoading: false, //done
    AssignTransactionAPILoading: false,
    AcceptTransactionAPILoading: false,
    RejectTransactionAPILoading: false,
    RFQTransactionQuotationLoading: false,
    CancelPendingTransactionApiLoading: false,
    calculateTenorSwapAndForwardRateApiLoading: false,
    GetSpotRatesForCounterPartyAPILoading: false,
    SaveForwardTransactionRFQApiLoading: false,
    GetFEDiscountingTransactionDetailsApiLoading: false,
    GetSpotTransactionDetailsApiLoading: false,
    GetForwardTransactionDetailsApiLoading: false,
    GetNonFEDiscountingTransactionDetailsApiLoading: false,
    GetNOPDataAPILoading: false,
    calculateNonFeSwapAndDiscountingRateApiLoading: false,
    CalculateFEDiscountingAPILoading: false,
    CalculateFESwapAndDiscountingApiLoading: false,
    SaveSpotTransactionRFQLoading: false,
    RFQForwardTransactionQuotationLoading: false,
    RFQFEDiscountingTransactionQuotationLoading: false,
    RFQNonFEDiscountingTransactionQuotationLoading: false,
    SaveNonFEDiscountingTransactionRFQLoading: false,
    SaveFEDiscountingTransactionRFQLoading: false,
    AcceptTransactionCancellationRequestLoading: false,
    RejectTransactionCancellationRequestLoading: false,
    AcceptRFQTransactionLoading: false,
    CancelTransactionLoading: false,
    RejectRFQTransactionLoading: false,
    RequestCancellationLoading: false,
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

    // New reducer to clear specific action loading state
    clearActionLoading: (state, { payload: actionName }) => {
      const loadingStateName = `${actionName}Loading`;
      if (state.hasOwnProperty(loadingStateName)) {
        state[loadingStateName] = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CalculateFESwapAndDiscountingApi.pending, (state) => {
        state.Loader = false;
        state.CalculateFESwapAndDiscountingApiLoading = true;
      })
      .addCase(
        CalculateFESwapAndDiscountingApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.CalculateFESwapAndDiscountingApiLoading = false;
          state.CalculateFESwapAndDiscountingRate = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        CalculateFESwapAndDiscountingApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.CalculateFESwapAndDiscountingApiLoading = false;
          state.CalculateFESwapAndDiscountingRate = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      // Pending state (while the API call is being made CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.pending, (state) => {
        state.Loader = false;
        state.error = null;
        state.BlotterDataAPILoading = true;
      })
      // Fulfilled state (when the API call succeeds CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.BlotterDataAPILoading = false;
        state.getBlotterApiData = payload?.response ?? null;

        state.txnSummaryData.push(...(payload?.response?.tnxSummary ?? []));

        state.txnSummaryDataTotalRecords = payload?.response?.totalCount ?? 0;
        state.txnSummarysRow = state.txnSummaryData.length;

        state.error = null;
        state.responseMessage = payload?.message ?? "";
        state.errorSeverity = "success";
      })

      // Rejected state (when the API call fails CorporateBlotterDataAPI)
      .addCase(BlotterDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.BlotterDataAPILoading = false;
        state.error = action.payload;
        state.txnSummarysRow = 0;
        state.txnSummaryDataTotalRecords = 0;
        state.txnSummaryData = [];
        state.getBlotterApiData = null;
        state.errorSeverity = "error";
      })
      .addCase(GetBlotterOutstandingDealsDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.GetBlotterOutstandingDealsDataAPILoading = true;
      })
      .addCase(
        GetBlotterOutstandingDealsDataAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetBlotterOutstandingDealsDataAPILoading = false;
          state.getBlotterOutstandingData = payload?.response ?? null;
          state.outStandingDealData.push(
            ...(payload?.response?.outstandingDeals ?? [])
          );
          state.outStandingDealDataTotalRecords = payload?.response?.totalCount;
          state.outStandingDealsRow = state.outStandingDealData.length;
          state.error = null;
          state.responseMessage = payload?.message ?? "";
          state.errorSeverity = "success";
        }
      )
      .addCase(GetBlotterOutstandingDealsDataAPI.rejected, (state, action) => {
        state.Loader = false;
        state.GetBlotterOutstandingDealsDataAPILoading = false;
        state.error = action.payload;
        state.getBlotterOutstandingData = null;
        state.outStandingDealDataTotalRecords = 0;
        state.outStandingDealsRow = 0;
        state.outStandingDealData = [];
        state.errorSeverity = "error";
      })
      .addCase(SaveSpotTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.SaveSpotTransactionAPILoading = true;
      })
      .addCase(SaveSpotTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveSpotTransactionAPILoading = false;
        state.saveSpotTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(SaveSpotTransactionAPI.rejected, (state, { payload }) => {
        console.log(payload, "actionaction");
        state.Loader = false;
        state.SaveSpotTransactionAPILoading = false;
        state.responseMessage = payload;
        state.saveSpotTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(SaveForwardTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.SaveForwardTransactionAPILoading = true;
      })
      .addCase(SaveForwardTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveForwardTransactionAPILoading = false;
        state.saveForwardsTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(SaveForwardTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.SaveForwardTransactionAPILoading = false;
        state.error = action.payload;
        state.saveForwardsTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(SaveFEDiscountingTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.SaveFEDiscountingTransactionAPILoading = true;
      })
      .addCase(
        SaveFEDiscountingTransactionAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.SaveFEDiscountingTransactionAPILoading = false;
          state.saveFedDiscountTransaction = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(SaveFEDiscountingTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.SaveFEDiscountingTransactionAPILoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.saveFedDiscountTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(SaveNonFEDiscountingTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.SaveNonFEDiscountingTransactionAPILoading = true;
      })
      .addCase(
        SaveNonFEDiscountingTransactionAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.SaveNonFEDiscountingTransactionAPILoading = false;
          state.saveNonFeDiscountTransaction = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(SaveNonFEDiscountingTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.SaveNonFEDiscountingTransactionAPILoading = false;
        state.error = action.payload;
        state.saveNonFeDiscountTransaction = null;
        state.responseMessage = action?.payload;
        state.errorSeverity = "error";
      })
      .addCase(AssignTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.AssignTransactionAPILoading = true;
      })
      .addCase(AssignTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.AssignTransactionAPILoading = false;
        state.assignTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(AssignTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.AssignTransactionAPILoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.assignTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(AcceptTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.AcceptTransactionAPILoading = true;
      })
      .addCase(AcceptTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.AcceptTransactionAPILoading = false;
        state.acceptTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(AcceptTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.AcceptTransactionAPILoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.acceptTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(RejectTransactionAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.RejectTransactionAPILoading = true;
      })
      .addCase(RejectTransactionAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.RejectTransactionAPILoading = false;
        state.rejectedTransaction = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(RejectTransactionAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.RejectTransactionAPILoading = false;
        state.responseMessage = action?.payload;
        state.error = action.payload;
        state.rejectedTransaction = null;
        state.errorSeverity = "error";
      })
      .addCase(RFQTransactionQuotation.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.RFQTransactionQuotationLoading = true;
      })
      .addCase(RFQTransactionQuotation.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.RFQTransactionQuotationLoading = false;
        state.rfqSaveQuotation = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(RFQTransactionQuotation.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.RFQTransactionQuotationLoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.rfqSaveQuotation = null;
        state.errorSeverity = "error";
      })
      .addCase(CancelPendingTransactionApi.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.CancelPendingTransactionApiLoading = true;
      })
      .addCase(CancelPendingTransactionApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.CancelPendingTransactionApiLoading = false;
        state.responseMessage = payload?.message;
        state.cancelPendingTransaction = payload?.response;
        state.error = null;
        state.errorSeverity = "success";
      })
      .addCase(CancelPendingTransactionApi.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.CancelPendingTransactionApiLoading = false;
        state.cancelPendingTransaction = null;
        state.responseMessage = action?.payload;
        state.error = action.payload;
        state.errorSeverity = "error";
      })
      .addCase(calculateTenorSwapAndForwardRateApi.pending, (state) => {
        state.Loader = false;
        state.error = null;
        state.calculateTenorSwapAndForwardRateApiLoading = true;
      })
      .addCase(
        calculateTenorSwapAndForwardRateApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateTenorSwapAndForwardRateApiLoading = false;
          state.calculateTenorSwapAndForwardRateData = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        calculateTenorSwapAndForwardRateApi.rejected,
        (state, action) => {
          console.log(action, "actionaction");
          state.Loader = false;
          state.calculateTenorSwapAndForwardRateApiLoading = false;
          state.error = action.payload;
          state.responseMessage = action?.payload;
          state.calculateTenorSwapAndForwardRateData = null;
          state.errorSeverity = "error";
        }
      )

      //*************************** */
      .addCase(GetSpotRatesForCounterPartyAPI.pending, (state) => {
        state.Loader = false;
        state.error = null;
        state.GetSpotRatesForCounterPartyAPILoading = true;
      })
      .addCase(
        GetSpotRatesForCounterPartyAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetSpotRatesForCounterPartyAPILoading = false;
          state.GetSpotRatesForCounterParty = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(GetSpotRatesForCounterPartyAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.GetSpotRatesForCounterPartyAPILoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.GetSpotRatesForCounterParty = null;
        state.errorSeverity = "error";
      })
      .addCase(SaveForwardTransactionRFQApi.pending, (state) => {
        state.Loader = true;
        state.SaveForwardTransactionRFQApiLoading = true;
      })
      .addCase(SaveForwardTransactionRFQApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveForwardTransactionRFQApiLoading = false;
        state.saveForwardRFQTransaction = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(SaveForwardTransactionRFQApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.SaveForwardTransactionRFQApiLoading = false;
        state.saveForwardRFQTransaction = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(GetFEDiscountingTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
        state.GetFEDiscountingTransactionDetailsApiLoading = true;
      })
      .addCase(
        GetFEDiscountingTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetFEDiscountingTransactionDetailsApiLoading = false;
          state.GetFEDiscountingTransactionDetails = payload.response;
          state.responseMessage = payload.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetFEDiscountingTransactionDetailsApi.rejected,
        (state, action) => {
          state.Loader = false;
          state.GetFEDiscountingTransactionDetailsApiLoading = false;
          state.error = action.payload;
          state.GetFEDiscountingTransactionDetails = null;
          state.responseMessage = action.payload?.message || action.payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(GetSpotTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
        state.GetSpotTransactionDetailsApiLoading = true;
      })
      .addCase(GetSpotTransactionDetailsApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetSpotTransactionDetailsApiLoading = false;
        state.GetSpotTransactionDetails = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(GetSpotTransactionDetailsApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetSpotTransactionDetailsApiLoading = false;
        state.GetSpotTransactionDetails = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(GetForwardTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
        state.GetForwardTransactionDetailsApiLoading = true;
      })
      .addCase(
        GetForwardTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetForwardTransactionDetailsApiLoading = false;
          state.GetForwardTransactionDetails = payload.response;
          state.responseMessage = payload.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetForwardTransactionDetailsApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetForwardTransactionDetailsApiLoading = false;
          state.GetForwardTransactionDetails = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(GetNonFEDiscountingTransactionDetailsApi.pending, (state) => {
        state.Loader = true;
        state.GetNonFEDiscountingTransactionDetailsApiLoading = true;
      })
      .addCase(
        GetNonFEDiscountingTransactionDetailsApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetNonFEDiscountingTransactionDetailsApiLoading = false;
          state.GetNonFEDiscountingTransactionDetails = payload.response;
          state.responseMessage = payload.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        GetNonFEDiscountingTransactionDetailsApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetNonFEDiscountingTransactionDetailsApiLoading = false;
          state.GetNonFEDiscountingTransactionDetails = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(GetNOPDataAPI.pending, (state) => {
        state.Loader = true;
        state.GetNOPDataAPILoading = true;
      })
      .addCase(GetNOPDataAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetNOPDataAPILoading = false;
        state.GetNOPData = payload.response;
        state.responseMessage = payload.message;
        state.errorSeverity = "success";
      })
      .addCase(GetNOPDataAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetNOPDataAPILoading = false;
        state.GetNOPData = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(calculateNonFeSwapAndDiscountingRateApi.pending, (state) => {
        state.Loader = false;
        state.calculateNonFeSwapAndDiscountingRateApiLoading = true;
      })
      .addCase(
        calculateNonFeSwapAndDiscountingRateApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateNonFeSwapAndDiscountingRateApiLoading = false;
          state.calculateNonFeSwapAndDiscountingRate = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        calculateNonFeSwapAndDiscountingRateApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.calculateNonFeSwapAndDiscountingRateApiLoading = false;
          state.calculateNonFeSwapAndDiscountingRate = null;
          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(CalculateFEDiscountingAPI.pending, (state) => {
        state.Loader = false;
        state.CalculateFEDiscountingAPILoading = true;
      })
      .addCase(CalculateFEDiscountingAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.CalculateFEDiscountingAPILoading = false;
        state.CalculateFEDiscountingData = payload?.response;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(CalculateFEDiscountingAPI.rejected, (state, { payload }) => {
        state.Loader = false;
        state.CalculateFEDiscountingAPILoading = false;
        state.CalculateFEDiscountingData = null;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })

      .addCase(SaveSpotTransactionRFQ.pending, (state) => {
        state.Loader = false;
        state.SaveSpotTransactionRFQLoading = true;
      })
      .addCase(SaveSpotTransactionRFQ.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveSpotTransactionRFQLoading = false;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(SaveSpotTransactionRFQ.rejected, (state, { payload }) => {
        state.Loader = false;
        state.SaveSpotTransactionRFQLoading = false;
        state.responseMessage = payload;
        state.errorSeverity = "error";
      })
      .addCase(RFQForwardTransactionQuotation.pending, (state) => {
        state.Loader = true;
        state.RFQForwardTransactionQuotationLoading = true;
      })
      .addCase(
        RFQForwardTransactionQuotation.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.RFQForwardTransactionQuotationLoading = false;
          state.forwardRfqQuotation = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(RFQForwardTransactionQuotation.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.RFQForwardTransactionQuotationLoading = false;
        state.error = action.payload;
        state.responseMessage = action?.payload;
        state.forwardRfqQuotation = null;
        state.errorSeverity = "error";
      })
      .addCase(RFQFEDiscountingTransactionQuotation.pending, (state) => {
        state.Loader = true;
        state.RFQFEDiscountingTransactionQuotationLoading = true;
      })
      .addCase(
        RFQFEDiscountingTransactionQuotation.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.RFQFEDiscountingTransactionQuotationLoading = false;
          state.feDiscountingQuotation = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        RFQFEDiscountingTransactionQuotation.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.RFQFEDiscountingTransactionQuotationLoading = false;
          state.error = payload;
          state.responseMessage = payload;
          state.feDiscountingQuotation = null;
          state.errorSeverity = "error";
        }
      )
      .addCase(RFQNonFEDiscountingTransactionQuotation.pending, (state) => {
        state.Loader = true;
        state.RFQNonFEDiscountingTransactionQuotationLoading = true;
      })
      .addCase(
        RFQNonFEDiscountingTransactionQuotation.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.RFQNonFEDiscountingTransactionQuotationLoading = false;
          state.nonFeDiscountingQuotation = payload?.response;
          state.error = null;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        RFQNonFEDiscountingTransactionQuotation.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.RFQNonFEDiscountingTransactionQuotationLoading = false;
          state.error = payload;
          state.responseMessage = payload;
          state.nonFeDiscountingQuotation = null;
          state.errorSeverity = "error";
        }
      )
      .addCase(SaveNonFEDiscountingTransactionRFQ.pending, (state) => {
        state.SaveNonFEDiscountingTransactionRFQLoading = true;
      })
      .addCase(
        SaveNonFEDiscountingTransactionRFQ.fulfilled,
        (state, { payload }) => {
          state.SaveNonFEDiscountingTransactionRFQLoading = false;
          state.saveFEDiscountingTransactionRFQ = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        SaveNonFEDiscountingTransactionRFQ.rejected,
        (state, { payload }) => {
          state.SaveNonFEDiscountingTransactionRFQLoading = false;
          state.saveFEDiscountingTransactionRFQ = null;

          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(SaveFEDiscountingTransactionRFQ.pending, (state) => {
        state.SaveFEDiscountingTransactionRFQLoading = true;
      })
      .addCase(
        SaveFEDiscountingTransactionRFQ.fulfilled,
        (state, { payload }) => {
          state.SaveFEDiscountingTransactionRFQLoading = false;
          state.saveFEDiscountingTransactionRFQ = payload?.response;
          state.responseMessage = payload?.message;
          state.errorSeverity = "success";
        }
      )
      .addCase(
        SaveFEDiscountingTransactionRFQ.rejected,
        (state, { payload }) => {
          state.SaveFEDiscountingTransactionRFQLoading = false;
          state.saveFEDiscountingTransactionRFQ = null;

          state.responseMessage = payload;
          state.errorSeverity = "error";
        }
      )
      .addCase(AcceptTransactionCancellationRequest.pending, (state) => {
        state.AcceptTransactionCancellationRequestLoading = true;
      })
      .addCase(AcceptTransactionCancellationRequest.fulfilled, (state) => {
        state.AcceptTransactionCancellationRequestLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(AcceptTransactionCancellationRequest.rejected, (state) => {
        state.AcceptTransactionCancellationRequestLoading = false;
        state.errorSeverity = "error";
      })
      .addCase(RejectTransactionCancellationRequest.pending, (state) => {
        state.RejectTransactionCancellationRequestLoading = true;
      })
      .addCase(RejectTransactionCancellationRequest.fulfilled, (state) => {
        state.RejectTransactionCancellationRequestLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(RejectTransactionCancellationRequest.rejected, (state) => {
        state.RejectTransactionCancellationRequestLoading = false;
        state.errorSeverity = "error";
      })
      .addCase(AcceptRFQTransaction.pending, (state) => {
        state.AcceptRFQTransactionLoading = true;
      })
      .addCase(AcceptRFQTransaction.fulfilled, (state) => {
        state.AcceptRFQTransactionLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(AcceptRFQTransaction.rejected, (state) => {
        state.AcceptRFQTransactionLoading = false;
        state.errorSeverity = "error";
      })
      .addCase(CancelTransaction.pending, (state) => {
        state.CancelTransactionLoading = true;
      })
      .addCase(CancelTransaction.fulfilled, (state) => {
        state.CancelTransactionLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(CancelTransaction.rejected, (state) => {
        state.CancelTransactionLoading = false;
        state.errorSeverity = "error";
      })
      .addCase(RejectRFQTransaction.pending, (state) => {
        state.RejectRFQTransactionLoading = true;
      })
      .addCase(RejectRFQTransaction.fulfilled, (state) => {
        state.RejectRFQTransactionLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(RejectRFQTransaction.rejected, (state) => {
        state.RejectRFQTransactionLoading = false;
        state.errorSeverity = "error";
      })
      .addCase(RequestCancellation.pending, (state) => {
        state.RequestCancellationLoading = true;
      })
      .addCase(RequestCancellation.fulfilled, (state) => {
        state.RequestCancellationLoading = false;
        state.errorSeverity = "success";
      })
      .addCase(RequestCancellation.rejected, (state) => {
        state.RequestCancellationLoading = false;
        state.errorSeverity = "error";
      });
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
  clearActionLoading, // Export the new action
} = BlotterSlicer.actions;

export default BlotterSlicer.reducer;
