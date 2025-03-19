import {
  PublishNewRatesAction,
  clearRatesAction,
  createTenorAction,
  getAllTenorsAction,
  getLastPublishRatesAction,
  marketOnOffAction,
} from "@/container/pages/mainDealer/dealerActions";
import { createSlice } from "@reduxjs/toolkit";

const uploadRatesSlicer = createSlice({
  name: "uploadRates",
  initialState: {
    ratesData: null,
    responseMessage: "",
    loading: false,
    error: null,
    marketOnOff: null,
    clearRates: null,
    getLastPublishRates: null,
    getCurrentPublishRate: null,
    getAllTenors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(marketOnOffAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(marketOnOffAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.responseMessage = payload.message;
        state.marketOnOff = payload.response;
        state.error = null;
      })
      .addCase(marketOnOffAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.marketOnOff = null;
      })
      .addCase(clearRatesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearRatesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clearRates = payload.response;
        state.error = null;
      })
      .addCase(clearRatesAction.rejected, (state, action) => {
        state.loading = false;
        state.clearRates = null;
        state.error = action.payload;
      })
      .addCase(getLastPublishRatesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastPublishRatesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getLastPublishRates = payload.response;
        state.error = null;
      })
      .addCase(getLastPublishRatesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.getLastPublishRates = null;
      })
      .addCase(PublishNewRatesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(PublishNewRatesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getCurrentPublishRate = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(PublishNewRatesAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.getCurrentPublishRate = null;
        state.responseMessage = payload;
      })
      .addCase(getAllTenorsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTenorsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getAllTenors = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getAllTenorsAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.getAllTenors = null;
        state.responseMessage = payload;
      })
      .addCase(createTenorAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTenorAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getAllTenors = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(createTenorAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.responseMessage = payload;
      });
  },
});

export default uploadRatesSlicer.reducer;
