import React from "react";
import "./MainTabs.css"
import GlobalTabs from "../../../../components/common/tabs/Tabs";
import Forwards from "./forwards/Forwards";
import Discounting from "./discounting/Discounting";
import LiveRates from "./liveRates/LiveRates";

const MainTabs = () => {
  const tabsData = [
    { title: "Live Rates", content: <LiveRates /> },
    { title: "Forwards", content: <Forwards /> },
    { title: "Discounting", content: <Discounting /> },
  ];

  return <GlobalTabs tabClass='mb-4' tabs={tabsData} defaultActiveKey={"0"}  />;
};

export default MainTabs;
