import React, { Suspense, lazy } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import {
  createColumns,
  generateData,
} from "../../../components/utils/generateData";

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
  const { discountRates, forwardsRates } = generateData(2);
  if (forwardsRates.length > 0) {
    const forwardsRatesData = createColumns(forwardsRates);
  }
  console.log(discountRates, forwardsRates, "forwardsRatesforwardsRates");
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
        <Suspense fallback={<>Loading... </>}>
          <ForwardTableBranchComponent />
        </Suspense>
      ),
    },
    {
      title: "Discounting",
      content: BranchDiscountingTable && (
        <Suspense fallback={<>Loading...</>}>
          <BranchDiscountingTable />
        </Suspense>
      ),
    },
  ];
  return (
    <>
      <GlobalTabs tabs={tabsData} defaultActiveKey={"0"} tabClass='mb-4' />
    </>
  );
};

export default MainBranch;
