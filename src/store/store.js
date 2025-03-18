// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";
import authSlicer from "@/container/loginScreens/authSlicer";
import UploadRatesSlicer from "./uploadRates/UploadRatesSlicer";
import WatchListSlice from "../components/features/SpotBranch/WatchListSlicer";

const store = configureStore({
  reducer: {
    bankSpotReducer: bankSpotSlicer,
    misReducer: misSlicer,
    authReducer: authSlicer,
    uploadRatesSlicer: UploadRatesSlicer,
    WatchListReducer: WatchListSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
