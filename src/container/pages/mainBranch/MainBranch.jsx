import React, { Suspense, lazy } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import { useDispatch } from "react-redux";
import BlotterHeader from "../mainTreasury/tabsContent/liveRates/blotter/blotterHeader/BlotterHeader";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

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

const MainBranch = () => {
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
        <Suspense fallback={<>Loading Forwards.... </>}>
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
    <>
      <GlobalTabs
        tabs={tabsData}
        onTabChange={handleTabChange}
        activeKey={activeTab}
        defaultActiveKey={"0"}
        tabClass='mb-4'
      />
    </>
  );
};

export default MainBranch;
