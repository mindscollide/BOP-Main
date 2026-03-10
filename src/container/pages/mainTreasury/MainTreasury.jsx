import React, { useEffect, startTransition, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BlotterDataAPI,
  GetBlotterOutstandingDealsDataAPI,
  GetNOPDataAPI,
} from "@/components/features/blotter/BlotterActions";
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
import GlobalTabs from "@/components/common/tabs/Tabs";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";
import { useMqttClient } from "@/components/utils/mqttConnection";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import { useSelector } from "react-redux";

// Lazy load the tab components
const LiveRates = React.lazy(() => import("./tabsContent/liveRates/LiveRates"));
const Forwards = React.lazy(() => import("./tabsContent/forwards/Forwards"));
const Discounting = React.lazy(() =>
  import("./tabsContent/discounting/Discounting")
);

const MainTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  const tresuryTabsLocation = localStorage.getItem("activeTreasuryTab");

  useEffect(() => {
    // Wrap data fetching in startTransition if it triggers component loading
    startTransition(() => {
      if (tresuryTabsLocation === null) {
        localStorage.setItem("activeTreasuryTab", "Live Rates");
      }

      dispatch(GetBankSpotForTreasuryApi({ navigate }));
      if (import.meta.env.VITE_APP_INCLUDE_TREASURY === "true") {
        let Data = { sRow: 0, Length: 10 };
        dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
        dispatch(setBlotterLoader(true));
        dispatch(BlotterDataAPI({ navigate, Data }));
        dispatch(GetNOPDataAPI({ navigate }));
        dispatch(GetVoltMeterStatusApi({ navigate }));
      }
      dispatch(getAllTreasuryInstrumentsApi({ navigate }));
      dispatch(GetBankForwardForTreasuryApi({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
      dispatch(GetDiscountingRatesForTreasuryApi({ navigate }));
    });
    return () => {
      localStorage.removeItem("activeTreasuryTab")
      // Clean up if necessary when the component unmounts
    };
  }, []);

  const handleTabChange = (tabTitle) => {
    localStorage.setItem("activeTreasuryTab", tabTitle);
    dispatch(setActiveTab(tabTitle));
  };

  const tabsData = [
    {
      title: "Live Rates",
      content: (
        <div className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
          {  <LiveRates />}
          </Suspense>
        </div>
      ),
    },
    {
      title: "Forwards",
      content: (
        <div className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            <Forwards />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Discounting",
      content: (
        <div className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            <Discounting />
          </Suspense>
        </div>
      ),
    },
  ];

  return (
    <GlobalTabs
      tabClass='mb-4'
      activeKey={tresuryTabsLocation || "Live Rates"}
      onTabChange={handleTabChange}
      tabs={tabsData}
      defaultActiveKey={"0"}
    />
  );
};

export default MainTreasury;
