import React, { lazy } from "react";
import ForwardTableBranchComponent from "../../../components/features/ForwardTableBranchComponent/ForwardTableBranchComponent";
import BranchDiscountingTable from "../../../components/features/branchDiscountingTable/BranchDiscountingTable";
import SpotBranch from "../../../components/features/SpotBranch/SpotBranch";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
// import GlobalTabs from "../../../components/common/tabs/Tabs";

const GlobalTabs = shouldIncludeComponents
  ? lazy(() => import("../../../components/common/tabs/Tabs"))
  : null;

const MainBranch = () => {
  const tabsData = [
    { title: "Spot", content: <SpotBranch /> },
    { title: "Forwards", content: <ForwardTableBranchComponent /> },
    { title: "Discounting", content: <BranchDiscountingTable /> },
  ];
  return (
    <>
      {" "}
      <div>
        {GlobalTabs && <GlobalTabs tabs={tabsData} defaultActiveKey={"1"} />}
      </div>
    </>
  );
};

export default MainBranch;
