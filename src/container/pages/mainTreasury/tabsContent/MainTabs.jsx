import React, { useEffect } from "react";
import "./MainTabs.css";
import GlobalTabs from "../../../../components/common/tabs/Tabs";
import Forwards from "./forwards/Forwards";
import Discounting from "./discounting/Discounting";
import LiveRates from "./liveRates/LiveRates";
import { useDispatch } from "react-redux";
import {
  GetAllFowardsAndDiscountsRatesAPI,
  GetFXInstrumentsAPI,
} from "@/components/features/SpotBranch/WatchlistAction";
import { useNavigate } from "react-router-dom";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
} from "./liveRates/blotter/BlotterActions";

const MainTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetFXInstrumentsAPI({ navigate }));
    dispatch(GetAllFowardsAndDiscountsRatesAPI({ navigate }));
    let Data = { sRow: 0, Length: 10 };
    dispatch(BlotterDataAPI({ navigate, Data }));
    dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
  }, []);


  const tabsData = [
    { title: "Live Rates", content: <LiveRates /> },
    { title: "Forwards", content: <Forwards /> },
    { title: "Discounting", content: <Discounting /> },
  ];

  return <GlobalTabs tabClass='mb-4' tabs={tabsData} defaultActiveKey={"0"} />;
};

export default MainTabs;
