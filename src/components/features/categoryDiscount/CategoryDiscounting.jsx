import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoryFeDiscountingTable from "./categoryFeDiscountingTable/CategoryFeDiscountingTable";
import CategoryNonFeDiscountingTable from "./categoryNonFeDiscoutingTable/CategoryNonFeDiscountingTable";

const CategoryDiscounting = () => {
  return (
    <>
      <div className="my-2">
        <CategoryFeDiscountingTable />
      </div>
      <div className="my-2">
        <CategoryNonFeDiscountingTable />
      </div>
    </>
  );
};

export default CategoryDiscounting;
