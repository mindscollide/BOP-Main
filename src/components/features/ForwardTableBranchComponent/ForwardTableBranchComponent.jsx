import React, { lazy } from "react";
import { Col } from "react-bootstrap";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

const ForwardsForBranch = shouldIncludeComponents
  ? lazy(() => import("../branchForwardsTable/BranchForwardsTable"))
  : null;

const ForwardTableBranchComponent = () => {
  return (
    <Col lg={12} md={12} sm={12}>
      {shouldIncludeComponents ? <ForwardsForBranch /> : null}
    </Col>
  );
};

export default ForwardTableBranchComponent;
