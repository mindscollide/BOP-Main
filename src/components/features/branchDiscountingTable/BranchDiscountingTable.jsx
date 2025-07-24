import React from "react";

import BranchAndCorporateFeDiscountingTable from "./BranchAndCorproateFeDiscountingTable/BranchAndCorproateFeDiscountingTable";
import BranchAndCorporateNonFeDiscountingTable from "./BranchAndCorproateNonFeDiscountingTable/BranchAndCorproateNonFeDiscountingTable";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
const BranchDiscountingTable = () => {
  let isFeDiscountingEnabled =
    localStorage.getItem("isFEEnabled") !== null
      ? JSON.parse(localStorage.getItem("isFEEnabled"))
      : false;
  let isNonFeDiscountingEnabled =
    localStorage.getItem("isNonFEEnabled") !== null
      ? JSON.parse(localStorage.getItem("isNonFEEnabled"))
      : false;

  return (
    <>
      {isCorporate ? (
        <>
          {isFeDiscountingEnabled && <BranchAndCorporateFeDiscountingTable />}
          {isNonFeDiscountingEnabled && (
            <BranchAndCorporateNonFeDiscountingTable />
          )}
        </>
      ) : (
        <>
          <BranchAndCorporateFeDiscountingTable />
          <BranchAndCorporateNonFeDiscountingTable />
        </>
      )}
    </>
  );
};

export default BranchDiscountingTable;
