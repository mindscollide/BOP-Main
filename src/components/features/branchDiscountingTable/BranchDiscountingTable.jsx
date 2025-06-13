import React from "react";

import BranchAndCorporateFeDiscountingTable from "./BranchAndCorproateFeDiscountingTable/BranchAndCorproateFeDiscountingTable";
import BranchAndCorporateNonFeDiscountingTable from "./BranchAndCorproateNonFeDiscountingTable/BranchAndCorproateNonFeDiscountingTable";

const BranchDiscountingTable = () => {
  return (
    <>
      <BranchAndCorporateFeDiscountingTable />
      <BranchAndCorporateNonFeDiscountingTable />
    </>
  );
};

export default BranchDiscountingTable;
