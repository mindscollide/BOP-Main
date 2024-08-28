// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";

const store = configureStore({
  reducer: { bankSpotReducer: bankSpotSlicer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
