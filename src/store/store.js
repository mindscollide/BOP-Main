// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";

const store = configureStore({
  reducer: { bankSpotReducer: bankSpotSlicer, misReducer: misSlicer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
