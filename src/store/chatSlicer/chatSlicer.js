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
    Loader: false,
    responseMessage: "",
    error: null,
    getAllChatByTransactions: null,
    saveChatResponse: null,
    uploadDocument: null,
    DownloadFile: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatByTransactionId.pending, (state) => {
        state.Loader = false;
      })
      .addCase(getAllChatByTransactionId.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllChatByTransactions = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      .addCase(getAllChatByTransactionId.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
      })
      .addCase(saveChatApi.pending, (state) => {
        state.Loader = false;
      })
      .addCase(saveChatApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.saveChatResponse = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
      })
      .addCase(saveChatApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
      })
      .addCase(uploadDocumentApi.pending, (state) => {
        state.Loader = false;
      })
      .addCase(uploadDocumentApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.uploadDocument = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
      })
      .addCase(uploadDocumentApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
      })
      .addCase(DownloadFileApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(DownloadFileApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.DownloadFile = payload?.response;
        state.responseMessage = payload?.message;
        state.error = null;
      })
      .addCase(DownloadFileApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload?.message;
      });
  },
});

export default chatSlicer.reducer;
