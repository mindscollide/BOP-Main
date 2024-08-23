import React, { lazy } from "react";
import { Container } from "react-bootstrap";
import ForwardTableBranchComponent from "../../../components/features/ForwardTableBranchComponent/ForwardTableBranchComponent";
// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
// import GlobalTabs from "../../../components/common/tabs/Tabs";

const GlobalTabs = shouldIncludeComponents
  ? lazy(() => import("../../../components/common/tabs/Tabs"))
  : null;

const MainBranch = () => {
  const tabsData = [
    { title: "Spot", content: <div>Tab content for Home</div> },
    { title: "Forwards", content: <ForwardTableBranchComponent /> },
    { title: "Discounting", content: <div>Tab content for Contact</div> },
  ];
  return (
    <>
      {" "}
      <div className="px-3">
        {GlobalTabs && <GlobalTabs tabs={tabsData} defaultActiveKey={"1"} />}
      </div>
    </>
  );
};

export default MainBranch;
