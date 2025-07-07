import React from "react";

import NonFeDiscountingTreasuryAndDealer from "./NonFeDiscountingTreasuryAndDealer/NonFeDiscountingTreasuryAndDealer";
import FeDiscountingTreasuryAndDealer from "./FeDiscountingTreasuryAndDealer/FeDiscountingTreasuryAndDealer";

const Discounting = () => {
  return (
    <>
      <section>
        <FeDiscountingTreasuryAndDealer />
      </section>
      <section className='my-4'>
        <NonFeDiscountingTreasuryAndDealer />
      </section>
    </>
  );
};

export default Discounting;
