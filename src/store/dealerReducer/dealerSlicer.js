import { GetFEDiscountingTableApi } from "@/components/features/FeDiscountingTable/FeDiscountTableAction";
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
    Loader: false,
    error: null,
    marketOnOff: null,
    clearRates: null,
    getLastPublishRates: null,
    getCurrentPublishRate: null,
    getAllTenors: null,
    createTenor: null,
    getTenorWiseForwardsRates: null,
    publishTenorwiseForwardRates: null,
    getDiscountingWiseRates: null,
    publishDiscountRates: null,
    getFeDiscounting: null,
    publishFeDiscounting: null,
    getNonFeDiscounting: null,
    publishNonFeDiscounting: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(marketOnOffAction.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      .addCase(marketOnOffAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.responseMessage = payload.message;
        state.marketOnOff = payload.response;
        state.error = null;
      })
      .addCase(marketOnOffAction.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.marketOnOff = null;
      })
      .addCase(clearRatesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(clearRatesAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.clearRates = payload.response;
        state.error = null;
      })
      .addCase(clearRatesAction.rejected, (state, action) => {
        state.Loader = false;
        state.clearRates = null;
        state.error = action.payload;
      })
      .addCase(getLastPublishRatesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getLastPublishRatesAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getLastPublishRates = payload.response;
        state.responseMessage = payload.message;
        state.error = null;
      })
      .addCase(getLastPublishRatesAction.rejected, (state, action) => {
        state.Loader = false;
        state.error = action.payload;
        state.getLastPublishRates = null;
      })
      .addCase(PublishNewRatesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(PublishNewRatesAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getCurrentPublishRate = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(PublishNewRatesAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getCurrentPublishRate = null;
        state.responseMessage = payload;
      })
      .addCase(getAllTenorsAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllTenorsAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllTenors = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getAllTenorsAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllTenors = null;
        state.responseMessage = payload;
      })
      .addCase(createTenorAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(createTenorAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.createTenor = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(createTenorAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.createTenor = null;
        state.responseMessage = payload;
      })
      .addCase(getTenorWiseForwardsAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getTenorWiseForwardsAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getTenorWiseForwardsRates = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getTenorWiseForwardsAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getTenorWiseForwardsRates = null;
        state.responseMessage = payload;
      })
      .addCase(PublishTenorWiseForwardsAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        PublishTenorWiseForwardsAction.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.publishTenorwiseForwardRates = payload.response;
          state.responseMessage = payload.message;
        }
      )
      .addCase(
        PublishTenorWiseForwardsAction.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.publishTenorwiseForwardRates = null;
          state.responseMessage = payload;
        }
      )
      .addCase(getDiscountingRatesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getDiscountingRatesAction.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getDiscountingWiseRates = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getDiscountingRatesAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getDiscountingWiseRates = null;
        state.responseMessage = payload;
      })
      .addCase(publishDiscountingRatesAction.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        publishDiscountingRatesAction.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.publishDiscountRates = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(publishDiscountingRatesAction.rejected, (state, { payload }) => {
        state.Loader = false;
        state.publishDiscountRates = null;
        state.responseMessage = payload;
      })
      .addCase(GetFEDiscountingTableApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetFEDiscountingTableApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getFeDiscounting = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(GetFEDiscountingTableApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getFeDiscounting = null;
        state.error = payload;
        state.responseMessage = payload;
      });
  },
});

export default dealerReducer.reducer;
