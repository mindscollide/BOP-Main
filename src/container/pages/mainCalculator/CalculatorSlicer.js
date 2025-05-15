import { createAction, createSlice } from "@reduxjs/toolkit";
import {
  CalculateForwardsAPI,
  CalculateFxDiscountingAPI,
  CalculateNonFxDiscountingAPI,
  GetAllCalculatorData,
} from "./CalculatorActions";
const CalculatorSlice = createSlice({
  name: "CalculatorSlice",
  initialState: {
    responseMessage: "",
    loading: false,
    error: null,
    calculatorData: null,
    calculateFXDiscountingData: null,
    calculateNonFXDiscountingData: null,
    calculateForwardsData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state (while the API call is being made GetAllCalculatorData)
      .addCase(GetAllCalculatorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds GetAllCalculatorData)
      .addCase(GetAllCalculatorData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculatorData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails GetAllCalculatorData)
      .addCase(GetAllCalculatorData.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.calculatorData = null;
      })

      // Pending state (while the API call is being made CalculateFxDiscountingAPI)
      .addCase(CalculateFxDiscountingAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CalculateFxDiscountingAPI)
      .addCase(CalculateFxDiscountingAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculateFXDiscountingData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails CalculateFxDiscountingAPI)
      .addCase(CalculateFxDiscountingAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.calculateFXDiscountingData = null;
      })

      // Pending state (while the API call is being made CalculateNonFxDiscountingAPI)
      .addCase(CalculateNonFxDiscountingAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CalculateNonFxDiscountingAPI)
      .addCase(CalculateNonFxDiscountingAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculateNonFXDiscountingData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails CalculateNonFxDiscountingAPI)
      .addCase(CalculateNonFxDiscountingAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.calculateNonFXDiscountingData = null;
      })

      // Pending state (while the API call is being made CalculateForwardsAPI)
      .addCase(CalculateForwardsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state (when the API call succeeds CalculateForwardsAPI)
      .addCase(CalculateForwardsAPI.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.calculateForwardsData = payload.response;
        state.error = null;
        state.responseMessage = payload.message;
      })
      // Rejected state (when the API call fails CalculateForwardsAPI)
      .addCase(CalculateForwardsAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.loading = false;
        state.error = action.payload;
        state.calculateForwardsData = null;
      });
  },
});

export default CalculatorSlice.reducer;
