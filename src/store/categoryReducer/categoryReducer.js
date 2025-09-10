import {
  getAllCategoryTableData,
  GetCategoryWiseDiscountingRatesApi,
  GetCategoryWiseForwardRatesApi,
  GetCategoryWiseSpotRatesApi,
} from "@/container/pages/mainCategory/categoryActions";
import { createSlice } from "@reduxjs/toolkit";

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    responseMessage: "",
    Loader: false,
    getAllCategoriesRecords: null,
    GetCategoryWiseSpotRates: null,
    GetCategoryWiseForwardRates: null,
    GetCategoryWiseDiscountingRates: null,
  },
  reducers: {
    UpdateGetCategoryWiseForwardRates: (state) => {
      state.GetCategoryWiseForwardRates = null;
    },
    UpdatetCategoryWiseSpotRates: (state, { payload }) => {
      state.GetCategoryWiseSpotRates = payload;
    },
    UpdateGetCategoryWiseDiscountingRates: (state) => {
      state.GetCategoryWiseDiscountingRates = null;
    },
    clearCatgeoryResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryTableData.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllCategoryTableData.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategoriesRecords = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(getAllCategoryTableData.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategoriesRecords = null;
        state.responseMessage = payload;
      })
      .addCase(GetCategoryWiseSpotRatesApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(GetCategoryWiseSpotRatesApi.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.GetCategoryWiseSpotRates = payload?.response;
        state.responseMessage = payload?.message;
      })
      .addCase(GetCategoryWiseSpotRatesApi.rejected, (state, { payload }) => {
        state.Loader = false;
        state.GetCategoryWiseSpotRates = null;
        state.responseMessage = payload;
      })
      .addCase(GetCategoryWiseForwardRatesApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetCategoryWiseForwardRatesApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetCategoryWiseForwardRates = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        GetCategoryWiseForwardRatesApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetCategoryWiseForwardRates = null;
          state.responseMessage = payload;
        }
      )
      .addCase(GetCategoryWiseDiscountingRatesApi.pending, (state) => {
        state.Loader = true;
      })
      .addCase(
        GetCategoryWiseDiscountingRatesApi.fulfilled,
        (state, { payload }) => {
          state.Loader = false;
          state.GetCategoryWiseDiscountingRates = payload?.response;
          state.responseMessage = payload?.message;
        }
      )
      .addCase(
        GetCategoryWiseDiscountingRatesApi.rejected,
        (state, { payload }) => {
          state.Loader = false;
          state.GetCategoryWiseDiscountingRates = null;
          state.responseMessage = payload;
        }
      );
  },
});

export const {
  clearCatgeoryResponseMessage,
  UpdatetCategoryWiseSpotRates,
  UpdateGetCategoryWiseDiscountingRates,
  UpdateGetCategoryWiseForwardRates,
} = categoryReducer.actions;

export default categoryReducer.reducer;
