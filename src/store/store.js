// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";
import authSlicer from "@/container/loginScreens/authSlicer";
import UploadRatesSlicer from "./uploadRates/UploadRatesSlicer";
import WatchListSlice from "../components/features/SpotBranch/WatchListSlicer";
import RFQSlice from "../container/pages/mainCorporate/rfqModal/RFQSlicer";
import CorporateBlotterSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/blotter/txnSummary/CorporateBlotterSlicer";
import authSlicer from "@/store/authSlicer/authSlicer";
import DealerReducer from "./dealerReducer/dealerSlicer";
import CategoryReducer from "./categoryReducer/categoryReducer";

const store = configureStore({
  reducer: {
    bankSpotReducer: bankSpotSlicer,
    misReducer: misSlicer,
    authReducer: authSlicer,
    uploadRatesSlicer: UploadRatesSlicer,
    WatchListReducer: WatchListSlice,
    RFQReducer: RFQSlice,
    CorporateBlotterReducer: CorporateBlotterSlicer,
    dealerReducer: DealerReducer,
    categoryReducer: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
