// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";
import WatchListSlice from "./watchListSlicer/WatchListSlicer";
import RFQSlice from "../container/pages/mainCorporate/rfqModal/RFQSlicer";
import CorporateBlotterSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/blotter/txnSummary/CorporateBlotterSlicer";
import authSlicer from "@/store/authSlicer/authSlicer";
import DealerReducer from "./dealerReducer/dealerSlicer";
import CategoryReducer from "./categoryReducer/categoryReducer";
import ReportSlicer from "./ReportSlicer/ReportSlicer";
import CalculatorSlice from "../container/pages/mainCalculator/CalculatorSlicer";
import SettingSlicer from "./settingSlicer/SettingSlicer";
const store = configureStore({
  reducer: {
    bankSpotReducer: bankSpotSlicer,
    misReducer: misSlicer,
    authReducer: authSlicer,
    WatchListReducer: WatchListSlice,
    RFQReducer: RFQSlice,
    CorporateBlotterReducer: CorporateBlotterSlicer,
    dealerReducer: DealerReducer,
    categoryReducer: CategoryReducer,
    ReportReducer: ReportSlicer,
    CalculatorReducer: CalculatorSlice,
    settingSlicer: SettingSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
