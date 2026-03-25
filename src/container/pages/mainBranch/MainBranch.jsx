import React, { Suspense, lazy, useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import BlotterHeader from "@/components/features/blotter/blotterHeader/BlotterHeader";
import TXNSummary from "@/components/features/blotter/txnSummary/TXNSummary";
import { useNavigate } from "react-router-dom";
import {
  GetDashboardDataAPI,
  GetDiscountingRatesForCounterPartyApi,
  GetForwardRatesForCounterPartyApi,
  getAllHolidaysForTransactionApi,
} from "@/components/features/SpotBranch/WatchlistAction";
import {
  BlotterDataAPI,
  GetSpotRatesForCounterPartyAPI,
} from "@/components/features/blotter/BlotterActions";
import { getAllTenorsAction } from "../mainDealer/dealerActions";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";
import { setBlotterLoader } from "@/store/BlotterSlicer/BlotterSlicer";
import TransactionProvider from "@/context/BlotterTransactionContext";

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

  // Initialize tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeBranchTab") || "Spot";
    dispatch(setActiveTab(savedTab));
  }, []);

  // WatchList table Data Api Call
  useEffect(() => {
    try {
      dispatch(getAllHolidaysForTransactionApi({}));
      dispatch(GetSpotRatesForCounterPartyAPI(navigate));

      let Data = { sRow: 0, Length: 10 };

      dispatch(setBlotterLoader(true));
      dispatch(BlotterDataAPI({ navigate, Data }));
      dispatch(GetDashboardDataAPI({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
      dispatch(GetForwardRatesForCounterPartyApi({ navigate }));
      dispatch(GetDiscountingRatesForCounterPartyApi({ navigate }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle)); // immediate UI update
    localStorage.setItem("activeBranchTab", tabTitle); // persist after reload
  };

  const tabsData = [
    {
      title: "Spot",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <SpotBranch />
          <section className='bg-white mt-2 mb-4 p-2'>
            <TransactionProvider>
              <TXNSummary />
            </TransactionProvider>
          </section>
        </Suspense>
      ),
    },
    {
      title: "Forwards",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <ForwardsForBranch />
          <section className='bg-white p-2'>
            <TransactionProvider>
              <TXNSummary />
            </TransactionProvider>
          </section>
        </Suspense>
      ),
    },
    {
      title: "Discounting",
      content: (
        <Suspense fallback={<SectionLoader />}>
          <BranchDiscountingTable />
          <section className='bg-white p-2'>
            <TransactionProvider>
              <TXNSummary />
            </TransactionProvider>
          </section>
        </Suspense>
      ),
    },
  ];

  return (
    <GlobalTabs
      tabs={tabsData}
      onTabChange={handleTabChange}
      activeKey={activeTab}
      tabClass='mb-4 position-relative'
    />
  );
};

export default MainBranch;
