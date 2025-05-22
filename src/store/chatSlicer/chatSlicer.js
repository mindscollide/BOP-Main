import { getAllChatByTransactionId } from "@/components/features/chatBox/ChatActions";
import { createSlice } from "@reduxjs/toolkit";

const chatSlicer = createSlice({
  name: "chatSlicer",
  initialState: {
    loading: false,
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
        state.loading = true;
      })
      .addCase(getAllChatByTransactionId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getAllChatByTransactions = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      .addCase(getAllChatByTransactionId.rejected, (state, { payload }) => {
        state.loading = false;
        state.responseMessage = payload.message;
      });
  },
});

export default chatSlicer.reducer;
