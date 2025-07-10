import React, { Suspense, lazy, useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import { useDispatch } from "react-redux";
import BlotterHeader from "@/components/features/blotter/blotterHeader/BlotterHeader";
import TXNSummary from "@/components/features/blotter/txnSummary/TXNSummary";
import { useNavigate } from "react-router-dom";
import {
  GetDashboardDataAPI,
  GetForwardRatesForCounterPartyApi,
} from "@/components/features/SpotBranch/WatchlistAction";
import {
  BlotterDataAPI,
  GetSpotRatesForCounterPartyAPI,
} from "@/components/features/blotter/BlotterActions";
import { getAllTenorsAction } from "../mainDealer/dealerActions";
// import { getAllTenorsAction } from "@/container/pages/mainDealer/dealerActions";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

const SpotBranch = shouldIncludeComponents
  ? lazy(() => import("../../../components/features/SpotBranch/SpotBranch"))
  : null;

const ForwardsForBranch = shouldIncludeComponents
  ? lazy(() =>
      import(
        "../../../components/features/branchForwardsTable/BranchForwardsTable"
      )
    )
  : null;

const BranchDiscountingTable = shouldIncludeComponents
  ? lazy(() =>
      import(
        "../../../components/features/branchDiscountingTable/BranchDiscountingTable"
      )
    )
  : null;

const MainBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  //WatchList table Data Api Call
  useEffect(() => {
    try {
      dispatch(GetDashboardDataAPI({ navigate }));
      dispatch(GetSpotRatesForCounterPartyAPI(navigate));
      let Data = { sRow: 0, Length: 10 };
      dispatch(BlotterDataAPI({ navigate, Data }));

      // dispatch(GetDashboardDataAPI({navigate})); // Fetching the Dashboard Data
      // dispatch(getAllTenorsAction({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
      dispatch(GetForwardRatesForCounterPartyApi({ navigate }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };
  const tabsData = [
    {
      title: "Spot",
      content:
        SpotBranch && activeTab === "Spot" ? (
          <Suspense fallback={<>Loading Spot...</>}>
            <SpotBranch />
            <section className="bg-white mt-2 p-2">
              <BlotterHeader />
            </section>
          </Suspense>
        ) : null,
    },
    {
      title: "Forwards",
      content:
        ForwardsForBranch && activeTab === "Forwards" ? (
          <Suspense fallback={<>Loading Forwards.... </>}>
            <ForwardsForBranch />
            <section className="bg-white p-2">
              <BlotterHeader />
            </section>
          </Suspense>
        ) : null,
    },
    {
      title: "Discounting",
      content:
        BranchDiscountingTable && activeTab === "Discounting" ? (
          <Suspense fallback={<>Loading Discounting...</>}>
            <BranchDiscountingTable />
            <section className="bg-white p-2">
              <TXNSummary />
            </section>
          </Suspense>
        ) : null,
    },
  ];
  return (
    <>
      <GlobalTabs
        tabs={tabsData}
        onTabChange={handleTabChange}
        activeKey={activeTab}
        defaultActiveKey={"0"}
        tabClass="mb-4"
      />
    </>
  );
};

export default MainBranch;
