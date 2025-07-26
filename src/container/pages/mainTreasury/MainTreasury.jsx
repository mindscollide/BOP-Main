import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
  GetNOPDataAPI,
} from "@/components/features/blotter/BlotterActions";
import LiveRates from "./tabsContent/liveRates/LiveRates";
import Forwards from "./tabsContent/forwards/Forwards";
import Discounting from "./tabsContent/discounting/Discounting";
import GlobalTabs from "@/components/common/tabs/Tabs";
import {
  getAllTreasuryInstrumentsApi,
  GetBankForwardForTreasuryApi,
  GetBankSpotForTreasuryApi,
  GetDiscountingRatesForTreasuryApi,
} from "@/components/features/SpotBranch/WatchlistAction";
import {
  getAllTenorsAction,
  GetVoltMeterStatusApi,
} from "../mainDealer/dealerActions";
import { setBlotterLoader } from "@/store/BlotterSlicer/BlotterSlicer";

const MainTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetBankSpotForTreasuryApi({ navigate }));
    if (import.meta.env.VITE_APP_INCLUDE_TREASURY === "true") {
      let Data = { sRow: 0, Length: 10 };
      dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
      dispatch(setBlotterLoader(true)); // Set the blotter loader to true

      dispatch(BlotterDataAPI({ navigate, Data }));
      dispatch(GetNOPDataAPI({ navigate }));
    }
    dispatch(getAllTreasuryInstrumentsApi({ navigate }));
    dispatch(GetBankForwardForTreasuryApi({ navigate }));
    dispatch(getAllTenorsAction({ navigate }));
    dispatch(GetDiscountingRatesForTreasuryApi({ navigate }));
    dispatch(GetVoltMeterStatusApi({ navigate }));
  }, []);

  const tabsData = [
    { title: "Live Rates", content: <LiveRates /> },
    { title: "Forwards", content: <Forwards /> },
    { title: "Discounting", content: <Discounting /> },
  ];

  return <GlobalTabs tabClass="mb-4" tabs={tabsData} defaultActiveKey={"0"} />;
};

export default MainTreasury;
