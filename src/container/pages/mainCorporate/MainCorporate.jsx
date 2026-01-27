import React, { Suspense, lazy, useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { setActiveTab } from "./rfqModal/RFQSlicer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlotterHeader from "@/components/features/blotter/blotterHeader/BlotterHeader";
import {
  BlotterDataAPI,
  GetSpotRatesForCounterPartyAPI,
} from "@/components/features/blotter/BlotterActions";
import { getAllTenorsAction } from "../mainDealer/dealerActions";
import {
  GetDashboardDataAPI,
  GetDiscountingRatesForCounterPartyApi,
  GetForwardRatesForCounterPartyApi,
} from "@/components/features/SpotBranch/WatchlistAction";
import { setBlotterLoader } from "@/store/BlotterSlicer/BlotterSlicer";
import SectionLoader from "@/components/common/loader/SectionLoader";
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const SpotBranch = shouldIncludeComponents
  ? lazy(() => import("../../../components/features/SpotBranch/SpotBranch"))
  : null;

const ForwardTableBranchComponent = shouldIncludeComponents
  ? lazy(() =>
    import(
      "../../../components/features/ForwardTableBranchComponent/ForwardTableBranchComponent"
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
const MainCorporate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  let isFeDiscountingEnabled =
    localStorage.getItem("isFEEnabled") !== null
      ? localStorage.getItem("isFEEnabled")
      : false;
  let isNonFeDiscountingEnabled =
    localStorage.getItem("isNonFEEnabled") !== null
      ? localStorage.getItem("isNonFEEnabled")
      : false;
  console.log(
    isFeDiscountingEnabled,
    isNonFeDiscountingEnabled,
    "isNonFeDiscountingEnabledisNonFeDiscountingEnabled"
  );

  console.log(typeof isFeDiscountingEnabled, "CheckerCheckerChecrk");
  const handleTabChange = (tabTitle) => {
    localStorage.setItem("MainCorporateActiveTab", tabTitle);
    dispatch(setActiveTab(tabTitle));
  };
  useEffect(() => {
    try {
      dispatch(GetSpotRatesForCounterPartyAPI({ navigate }));
      dispatch(GetDashboardDataAPI({ navigate })); // Fetching the Dashboard Data

      let Data = { sRow: 0, Length: 10 };
      dispatch(setBlotterLoader(true)); // Set the blotter loader to true

      dispatch(BlotterDataAPI({ navigate, Data }));
      dispatch(getAllTenorsAction({ navigate }));
      dispatch(GetForwardRatesForCounterPartyApi({ navigate }));
      dispatch(GetDiscountingRatesForCounterPartyApi({ navigate }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
  const tabsData = [
    {
      title: "Spot",
      content: SpotBranch ? (
        <section className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <SpotBranch />
            <section className='bg-white mt-2 p-2'>
              <BlotterHeader />
            </section>
          </Suspense>
        </section>
      ) : null,
    },
    {
      title: "Forwards",
      content: ForwardTableBranchComponent ? (
        <section className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            <ForwardTableBranchComponent />
            <section className='bg-white p-2'>
              <BlotterHeader />
            </section>
          </Suspense>
        </section>
      ) : null,
    },
    {
      title: "Discounting",
      content: BranchDiscountingTable ? (
        <section className="position-relative">

          <Suspense fallback={<SectionLoader />}>
            <BranchDiscountingTable />
            <section className='bg-white p-2'>
              <BlotterHeader />
            </section>
          </Suspense>
        </section>
      ) : null,
    },
  ];
  let filterTabs = tabsData;

  if (
    JSON.parse(isFeDiscountingEnabled) === false &&
    JSON.parse(isNonFeDiscountingEnabled) === false
  ) {
    filterTabs = tabsData.filter((tab) => tab.title !== "Discounting");
  }

  console.log(filterTabs, "filterTabs");

  return (
    <GlobalTabs
      tabs={filterTabs}
      activeKey={localStorage.getItem("MainCorporateActiveTab") || "Spot"}
      onTabChange={handleTabChange}
      tabClass='mb-4'
    />
  );
};

export default MainCorporate;
