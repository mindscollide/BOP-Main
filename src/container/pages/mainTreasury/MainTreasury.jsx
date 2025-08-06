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

// Lazy load the tab components
const LiveRates = React.lazy(() => import("./tabsContent/liveRates/LiveRates"));
const Forwards = React.lazy(() => import("./tabsContent/forwards/Forwards"));
const Discounting = React.lazy(() =>
  import("./tabsContent/discounting/Discounting")
);

const MainTreasury = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isConnected,
    connectToMqtt,
    disconnect,
    subscribeToTopics,
    unsubscribeFromTopics,
  } = useMqttClient({
    onMessageArrivedCallback: (message) => {
      // Handle incoming messages
    },
    onConnectionLostCallback: (error) => {
      // Handle connection loss
    },
    shouldSubscribeToTreasury: true,
  });

  // useEffect(() => {
  //   if (isConnected) {
  //     console.log("first time connected to mqtt");
  //     subscribeToTopics([`BOP_REAL_TIME_FEED_TREASURY`]);
  //   }
  //   return () => {
  //     unsubscribeFromTopics([`BOP_REAL_TIME_FEED_TREASURY`]);
  //   }
  // }, [isConnected]);
  useEffect(() => {
    // Wrap data fetching in startTransition if it triggers component loading
    startTransition(() => {
      dispatch(GetBankSpotForTreasuryApi({ navigate }));
      if (import.meta.env.VITE_APP_INCLUDE_TREASURY === "true") {
        let Data = { sRow: 0, Length: 10 };
        dispatch(GetBlotterOutstandingDealsDataAPI({ navigate, Data }));
        dispatch(setBlotterLoader(true));
        dispatch(BlotterDataAPI({ navigate, Data }));
        dispatch(GetNOPDataAPI({ navigate }));
      }
      dispatch(getAllTreasuryInstrumentsApi({ navigate }));
      dispatch(GetBankForwardForTreasuryApi({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
      dispatch(GetDiscountingRatesForTreasuryApi({ navigate }));
      dispatch(GetVoltMeterStatusApi({ navigate }));
    });
  }, []);

  const tabsData = [
    {
      title: "Live Rates",
      content: (
        <div className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            <LiveRates />
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

  return <GlobalTabs tabClass='mb-4' tabs={tabsData} defaultActiveKey={"0"} />;
};

export default MainTreasury;
