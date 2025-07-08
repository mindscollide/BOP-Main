import React, { Suspense, lazy, useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { setActiveTab } from "./rfqModal/RFQSlicer";
import { useDispatch } from "react-redux";
import BlotterHeader from "../mainTreasury/tabsContent/liveRates/blotter/blotterHeader/BlotterHeader";
import { useNavigate } from "react-router-dom";
import { BlotterDataAPI } from "../mainTreasury/tabsContent/liveRates/blotter/BlotterActions";
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
  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };
  useEffect(() => {
    let Data = { sRow: 0, Length: 10 };
    dispatch(BlotterDataAPI({ navigate, Data }));
  }, [])

  const tabsData = [
    {
      title: "Spot",
      content:
        SpotBranch && activeTab === "Spot" ? (
          <Suspense fallback={<>Loading Spot...</>}>
            <SpotBranch />
            <section className='bg-white mt-2 p-2'>
              <BlotterHeader />
            </section>
          </Suspense>
        ) : null,
    },
    {
      title: "Forwards",
      content:
        ForwardTableBranchComponent && activeTab === "Forwards" ? (
          <Suspense fallback={<>Loading Forwards...</>}>
            <ForwardTableBranchComponent />
            <section className='bg-white p-2'>
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
            <section className='bg-white p-2'>
              <BlotterHeader />
            </section>
          </Suspense>
        ) : null,
    },
  ];

  return (
    <GlobalTabs
      tabs={tabsData}
      activeKey={activeTab}
      onTabChange={handleTabChange}
      tabClass='mb-4'
    />
  );
};

export default MainCorporate;
