// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";
import authSlicer from "@/store/authSlicer/authSlicer";
import DealerReducer from "./dealerReducer/dealerSlicer";
import CategoryReducer from "./categoryReducer/categoryReducer";

const store = configureStore({
  reducer: {
    bankSpotReducer: bankSpotSlicer,
    misReducer: misSlicer,
    authReducer: authSlicer,
    dealerReducer: DealerReducer,
    categoryReducer: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
