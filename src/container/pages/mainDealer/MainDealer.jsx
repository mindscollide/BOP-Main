import React, { useEffect } from "react";
import SpotRates from "../../../components/features/spotRates/SpotRates";
import ForwardsForTreasuryAndDealer from "../../../components/features/forwardsForTreasuryAndDealer/ForwardsForTreasuryAndDealer.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTreasuryInstrumentsApi } from "@/components/features/SpotBranch/WatchlistAction";
import { getAllTenorsAction, getDealerDashboardApi, getLastPublishRatesAction } from "./dealerActions";

const MainDealer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllTreasuryInstrumentsApi({ navigate }));
    dispatch(getLastPublishRatesAction({ navigate }));
    dispatch(getAllTenorsAction({ navigate }));
    dispatch(getDealerDashboardApi({ navigate }));
  }, []);
  return (
    <>
      <SpotRates />
      <ForwardsForTreasuryAndDealer />
    </>
  );
};

export default MainDealer;
