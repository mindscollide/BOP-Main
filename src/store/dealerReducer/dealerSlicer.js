import {
  PublishNewRatesAction,
  PublishTenorWiseForwardsAction,
  clearRatesAction,
  createTenorAction,
  getAllTenorsAction,
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
    ratesData: null,
    responseMessage: "",
    loading: false,
    error: null,
    marketOnOff: null,
    clearRates: null,
    getLastPublishRates: null,
    getCurrentPublishRate: null,
    getAllTenors: null,
    getTenorWiseForwardsRates: null,
    publishTenorwiseForwardRates: null,
    getDiscountingWiseRates: null,
    publishDiscountRates: null,
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
        state.responseMessage = payload.message;
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
        state.getAllTenors = payload?.response;
        state.responseMessage = payload?.message;
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
      })
      .addCase(getTenorWiseForwardsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTenorWiseForwardsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getTenorWiseForwardsRates = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getTenorWiseForwardsAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.getTenorWiseForwardsRates = null;
        state.responseMessage = payload;
      })
      .addCase(PublishTenorWiseForwardsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        PublishTenorWiseForwardsAction.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.publishTenorwiseForwardRates = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        PublishTenorWiseForwardsAction.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.publishTenorwiseForwardRates = null;
          state.responseMessage = payload;
        }
      )
      .addCase(getDiscountingRatesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscountingRatesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getDiscountingWiseRates = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getDiscountingRatesAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.getDiscountingWiseRates = null;
        state.responseMessage = payload;
      })
      .addCase(publishDiscountingRatesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        publishDiscountingRatesAction.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.publishDiscountRates = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(publishDiscountingRatesAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.publishDiscountRates = null;
        state.responseMessage = payload;
      });
  },
});

export default dealerReducer.reducer;
