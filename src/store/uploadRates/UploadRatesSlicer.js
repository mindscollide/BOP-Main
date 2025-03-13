import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




// Define other APIs similarly...

const uploadRatesSlicer = createSlice({
  name: "uploadRates",
  initialState: {
    ratesData: null,
    responseMessage: "",
    loading: false,
    error: null,
    marketOnOff: null,
    clearRates: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(marketOnOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(marketOnOff.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.responseMessage = payload.message;
        state.error = null;
      })
      .addCase(marketOnOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearRates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clearRates = payload.message;
        state.error = null;
      })
      .addCase(clearRates.rejected, (state, action) => {
        state.loading = false;
        state.clearRates = null;
        state.error = action.payload;
      })
      .addCase(getLastAndCurrentUSDRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastAndCurrentUSDRates.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ratesData = payload.response;
        state.error = null;
      })
      .addCase(getLastAndCurrentUSDRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add other cases similarly...
  },
});

export default uploadRatesSlicer.reducer;
