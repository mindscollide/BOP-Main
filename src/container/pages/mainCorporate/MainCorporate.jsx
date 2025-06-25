import React, { Suspense, lazy } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { setActiveTab } from "./rfqModal/RFQSlicer";
import { useDispatch } from "react-redux";
import BlotterHeader from "../mainTreasury/tabsContent/liveRates/blotter/blotterHeader/BlotterHeader";
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
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);

  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };

  const tabsData = [
    {
      title: "Spot",
      content: SpotBranch && (
        <Suspense fallback={<>Loading Spot...</>}>
          <SpotBranch />
        </Suspense>
      ),
    },
    {
      title: "Forwards",
      content: ForwardTableBranchComponent && (
        <Suspense fallback={<>Loading Forwards...</>}>
          <ForwardTableBranchComponent />
          <section className='bg-white p-2'>
            <BlotterHeader />
          </section>
        </Suspense>
      ),
    },
    {
      title: "Discounting",
      content: BranchDiscountingTable && (
        <Suspense fallback={<>Loading Discounting...</>}>
          <BranchDiscountingTable />
          <section className='bg-white p-2'>
            <BlotterHeader />
          </section>
        </Suspense>
      ),
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
