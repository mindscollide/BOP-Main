import React, { lazy } from "react";
import { Col } from "react-bootstrap";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

const DiscountingForBranch = shouldIncludeComponents
  ? lazy(() => import("../branchDiscountingTable/BranchDiscountingTable"))
  : null;

const DiscountingBranchTableComponent = () => {
  return (
    <Col lg={12} md={12} sm={12}>
      {DiscountingForBranch ? <DiscountingForBranch /> : null}
    </Col>
  );
};

export default DiscountingBranchTableComponent;
