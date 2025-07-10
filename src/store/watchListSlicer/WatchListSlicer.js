import { createSlice } from "@reduxjs/toolkit";
import {
  GetDashboardDataAPI,
  SaveUserDashboardAPI,
  getAllTreasuryInstrumentsApi,
} from "../../components/features/SpotBranch/WatchlistAction";
const WatchListSlice = createSlice({
  name: "WatchList",
  initialState: {
    responseMessage: "",
    Loader: false,
    error: null,
    GettheDashboardData: null,
    SaveUserDashboardData: null,
    allInstrumentForTreasury: null,
  },
  reducers: {
    clearWatchListResponseMessage: (state) => {
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Pending state (while the API call is in Pending State GetDashboardData)
      .addCase(GetDashboardDataAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made GetDashboardData)
      .addCase(GetDashboardDataAPI.fulfilled, (state, { payload }) => {
        console.log(payload.response, "globalStateWatchlistCardData");
        state.Loader = false;
        state.GettheDashboardData = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail GetDashboardData)
      .addCase(GetDashboardDataAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.GettheDashboardData = null;
      })

      // Pending state (while the API call is in Pending State SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.pending, (state) => {
        state.Loader = true;
        state.error = null;
      })
      // Fulfilled state (while the API call is being made SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.SaveUserDashboardData = payload?.response;
        state.error = null;
        state.responseMessage = payload?.message;
      })
      // Rejected state (while the API call is fail SaveUserDashboard)
      .addCase(SaveUserDashboardAPI.rejected, (state, action) => {
        console.log(action, "actionaction");
        state.Loader = false;
        state.error = action.payload;
        state.SaveUserDashboardData = null;
      })
      .addCase(getAllTreasuryInstrumentsApi.pending, (state) => {
        state.Loader = true;
      });
  },
});

export const { clearWatchListResponseMessage } = WatchListSlice.actions;
export default WatchListSlice.reducer;
