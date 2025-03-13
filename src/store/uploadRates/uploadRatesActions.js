import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadRatesApi } from "@/common/apiend_points";
import {
  clearRatesRM,
  marketOnOffRM,
  getLastAndCurrentUSDRatesRM,
  publishCurrentUSDRatesRM,
  createTenorRM,
  getAllTenorsRM,
  getTenorWiseForwardRatesRM,
  publishTenorWiseForwardRatesRM,
  getDiscountingRatesRM,
  publishDiscountingRatesRM,
} from "@/common/api_config";

// Define async thunks for each API
export const marketOnOff = createAsyncThunk(
    "uploadRates/marketOnOff",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await marketOnOffApi(payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const clearRates = createAsyncThunk(
    "uploadRates/clearRates",
    async (_, { rejectWithValue }) => {
      try {
        const response = await clearRatesApi();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const getLastAndCurrentUSDRates = createAsyncThunk(
    "uploadRates/getLastAndCurrentUSDRates",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getLastAndCurrentUSDRatesApi();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );