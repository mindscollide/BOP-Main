import React from "react";
import SpotRates from "../../../components/features/spotRates/SpotRates";
import ForwardsForTreasuryAndBranch from "../../../components/features/forwardsForTreasuryAndBranch/ForwardsForTreasuryAndBranch.jsx";

const MainDealer = () => {
  return (
    <div className='px-3'>
      <SpotRates />
      <ForwardsForTreasuryAndBranch />
    </div>
  );
};

export default MainDealer;
