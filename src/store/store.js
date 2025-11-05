// store.js
import { configureStore } from "@reduxjs/toolkit";
import bankSpotSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/bankSpot/slicer/bankSpotSlicer";
import misSlicer from "../container/pages/mainTreasury/tabsContent/liveRates/mis/slicer/misSlicer";
import WatchListSlice from "./watchListSlicer/WatchListSlicer";
import RFQSlice from "../container/pages/mainCorporate/rfqModal/RFQSlicer";
import authSlicer from "@/store/authSlicer/authSlicer";
import DealerReducer from "./dealerReducer/dealerSlicer";
import CategoryReducer from "./categoryReducer/categoryReducer";
import ReportSlicer from "./ReportSlicer/ReportSlicer";
import CalculatorSlice from "../container/pages/mainCalculator/CalculatorSlicer";
import SettingSlicer from "./settingSlicer/SettingSlicer";
import chatSlicer from "./chatSlicer/chatSlicer";
import RealtimeActionsSlice from "./realtimeActionsSlicer/realtimeActionSlice";
import modalSlicer from "./modalSlice/modalSlicer";
import BlotterSlicer from "@/store/BlotterSlicer/BlotterSlicer";
import DailyTradeSlicer from "../container/pages/mainReports/dailyTrades/DailyTradeSlicer";
// import DailyTradeSlicer from "@/container/pages/mainReports/dailyTrades/DailyTradeSlicer/DailyTradeSlicer";
const store = configureStore({
  reducer: {
    bankSpotReducer: bankSpotSlicer,
    misReducer: misSlicer,
    authReducer: authSlicer,
    WatchListReducer: WatchListSlice,
    RFQReducer: RFQSlice,
    dealerReducer: DealerReducer,
    categoryReducer: CategoryReducer,
    ReportReducer: ReportSlicer,
    CalculatorReducer: CalculatorSlice,
    settingSlicer: SettingSlicer,
    chatSlicer: chatSlicer,
    RealtimeActionsSlice: RealtimeActionsSlice,
    modalReducer: modalSlicer,
    BlotterSlicer: BlotterSlicer,
    DailyTradeSlicer: DailyTradeSlicer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
