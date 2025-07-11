import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
} from "@/components/features/blotter/BlotterActions";
import LiveRates from "./tabsContent/liveRates/LiveRates";
import Forwards from "./tabsContent/forwards/Forwards";
import Discounting from "./tabsContent/discounting/Discounting";
import GlobalTabs from "@/components/common/tabs/Tabs";
import {
  getAllTreasuryInstrumentsApi,
  GetBankForwardForTreasuryApi,
} from "@/components/features/SpotBranch/WatchlistAction";
import { getAllTenorsAction } from "../mainDealer/dealerActions";

const MainTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let Data = { sRow: 0, Length: 10 };
    dispatch(BlotterDataAPI({ navigate, Data }));
    dispatch(getAllTreasuryInstrumentsApi({ navigate }));
    dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
    dispatch(GetBankForwardForTreasuryApi({ navigate }));
    dispatch(getAllTenorsAction({ navigate }));
  }, []);

  const tabsData = [
    { title: "Live Rates", content: <LiveRates /> },
    { title: "Forwards", content: <Forwards /> },
    { title: "Discounting", content: <Discounting /> },
  ];

  return <GlobalTabs tabClass="mb-4" tabs={tabsData} defaultActiveKey={"0"} />;
};

export default MainTreasury;
