import { createSlice } from "@reduxjs/toolkit";
import {
  DownloadExcelReportBlotterTrasactionBranchAPI,
  DownloadExcelReportBlotterTrasactionCorporateAPI,
  DownloadExcelReportBlotterTrasactionTreasuryAPI,
  DownloadExcelReportNOPCalculationsAPI,
  DownloadFileAPI,
  DownloadPDFReportBlotterTrasactionBranchAPI,
  DownloadPDFReportBlotterTrasactionCorporateAPI,
  DownloadPDFReportBlotterTrasactionTreasuryAPI,
  EmailBlotterTransactionDetailsForBranchAPI,
  EmailBlotterTransactionDetailsForCorporateAPI,
  EmailBlotterTransactionDetailsForTreasuryAPI,
} from "./ReportActions";

const ReportSlicer = createSlice({
  name: "ReportSlicer",
  initialState: {
    errorSeverity: null,
    Loader: false,
    error: null,
    responseMessage: "",
    downloadPDFReportBlotterTransactionTreasury: null,

    //loading State
    EmailBlotterTransactionDetailsForBranchAPILoading: false,
    EmailBlotterTransactionDetailsForTreasuryAPILoading: false,
    EmailBlotterTransactionDetailsForCorporateAPILoading: false,
  },
  reducers: {
    clearReportResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(DownloadFileAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.responseMessage = "";
      })
      // Fulfilled state
      .addCase(DownloadFileAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.error = null;
        state.responseMessage = payload?.message || "Download successful";
        state.errorSeverity = "success";
      })
      // Rejected state
      .addCase(DownloadFileAPI.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload || "Download failed";
        state.responseMessage = "";
        state.errorSeverity = "error";
      })

      // Pending state
      .addCase(
        DownloadExcelReportBlotterTrasactionBranchAPI.pending,
        (state) => {
          state.Loader = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        DownloadExcelReportBlotterTrasactionBranchAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadExcelReportBlotterTrasactionBranchAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        DownloadExcelReportBlotterTrasactionCorporateAPI.pending,
        (state) => {
          state.Loader = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        DownloadExcelReportBlotterTrasactionCorporateAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadExcelReportBlotterTrasactionCorporateAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        DownloadExcelReportBlotterTrasactionTreasuryAPI.pending,
        (state) => {
          state.Loader = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        DownloadExcelReportBlotterTrasactionTreasuryAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadExcelReportBlotterTrasactionTreasuryAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(DownloadPDFReportBlotterTrasactionBranchAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.responseMessage = "Request Initiated";
      })
      // Fulfilled state
      .addCase(
        DownloadPDFReportBlotterTrasactionBranchAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadPDFReportBlotterTrasactionBranchAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        DownloadPDFReportBlotterTrasactionCorporateAPI.pending,
        (state) => {
          state.Loader = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        DownloadPDFReportBlotterTrasactionCorporateAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadPDFReportBlotterTrasactionCorporateAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        DownloadPDFReportBlotterTrasactionTreasuryAPI.pending,
        (state) => {
          state.Loader = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        DownloadPDFReportBlotterTrasactionTreasuryAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.downloadPDFReportBlotterTransactionTreasury = payload.response;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadPDFReportBlotterTrasactionTreasuryAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.downloadPDFReportBlotterTransactionTreasury = null;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(DownloadExcelReportNOPCalculationsAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
        state.responseMessage = "Request Initiated";
      })
      // Fulfilled state
      .addCase(
        DownloadExcelReportNOPCalculationsAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.error = null;
          state.responseMessage = payload?.message || "Download successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        DownloadExcelReportNOPCalculationsAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(EmailBlotterTransactionDetailsForBranchAPI.pending, (state) => {
        state.Loader = true;
        state.EmailBlotterTransactionDetailsForBranchAPILoading = true;
        state.error = null;
        state.responseMessage = "Request Initiated";
      })
      // Fulfilled state
      .addCase(
        EmailBlotterTransactionDetailsForBranchAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForBranchAPILoading = false;
          state.error = null;
          state.responseMessage = payload.message || "Email Sent successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        EmailBlotterTransactionDetailsForBranchAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForBranchAPILoading = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        EmailBlotterTransactionDetailsForCorporateAPI.pending,
        (state) => {
          state.Loader = true;
          state.EmailBlotterTransactionDetailsForCorporateAPILoading = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        EmailBlotterTransactionDetailsForCorporateAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForCorporateAPILoading = false;

          state.error = null;
          state.responseMessage = payload.message || "Email Sent successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        EmailBlotterTransactionDetailsForCorporateAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForCorporateAPILoading = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      )

      // Pending state
      .addCase(
        EmailBlotterTransactionDetailsForTreasuryAPI.pending,
        (state) => {
          state.Loader = true;
          state.EmailBlotterTransactionDetailsForTreasuryAPILoading = true;
          state.error = null;
          state.responseMessage = "Request Initiated";
        }
      )
      // Fulfilled state
      .addCase(
        EmailBlotterTransactionDetailsForTreasuryAPI.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForTreasuryAPILoading = false;
          state.error = null;
          state.responseMessage = payload.message || "Email Sent successful";
          state.errorSeverity = "success";
        }
      )
      // Rejected state
      .addCase(
        EmailBlotterTransactionDetailsForTreasuryAPI.rejected,
        (state, action) => {
          state.Loader = false;
          state.EmailBlotterTransactionDetailsForTreasuryAPILoading = false;
          state.error = action.payload || "Download failed";
          state.responseMessage = "";
          state.errorSeverity = "error";
        }
      );
  },
});

export const { clearReportResponseMessage } = ReportSlicer.actions;
export default ReportSlicer.reducer;
