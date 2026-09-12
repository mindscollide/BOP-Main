import {
  DownloadFileApi,
  getAllChatByTransactionId,
  saveChatApi,
  uploadDocumentApi,
} from "@/components/features/chatBox/ChatActions";
import { createSlice } from "@reduxjs/toolkit";

const chatSlicer = createSlice({
  name: "chatSlicer",
  initialState: {
    errorSeverity: null,
    Loader: false,
    responseMessage: "",
    error: null,
    getAllChatByTransactions: null,
    saveChatResponse: null,
    uploadDocument: null,
    DownloadFile: null,

    getAllChatByTransactionIdLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatByTransactionId.pending, (state) => {
        state.Loader = true;
        state.getAllChatByTransactionIdLoading = true;
      })
      .addCase(getAllChatByTransactionId.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllChatByTransactionIdLoading = false;
        state.getAllChatByTransactions = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
        state.errorSeverity = "success";
      })
      .addCase(getAllChatByTransactionId.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllChatByTransactionIdLoading = false;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      })

      .addCase(saveChatApi.pending, (state) => {
        state.Loader = false;
      })
      .addCase(saveChatApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveChatResponse = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
        state.errorSeverity = "success";
      })
      .addCase(saveChatApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      })
      .addCase(uploadDocumentApi.pending, (state) => {
        state.Loader = false;
      })
      .addCase(uploadDocumentApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.uploadDocument = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
        state.errorSeverity = "success";
      })
      .addCase(uploadDocumentApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      })
      .addCase(DownloadFileApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(DownloadFileApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.DownloadFile = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
        state.errorSeverity = "success";
      })
      .addCase(DownloadFileApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
        state.errorSeverity = "error";
      });
  },
});

export default chatSlicer.reducer;
