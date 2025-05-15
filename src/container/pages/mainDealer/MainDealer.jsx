import React, { useEffect } from "react";
import SpotRates from "../../../components/features/spotRates/SpotRates";
import ForwardsForTreasuryAndDealer from "../../../components/features/forwardsForTreasuryAndDealer/ForwardsForTreasuryAndDealer.jsx";
import { getTenorWiseForwardsAction } from "./dealerActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MainDealer = () => {

  return (
    <>
      <SpotRates />
      <ForwardsForTreasuryAndDealer />
    </>
  );
};

export default MainDealer;
