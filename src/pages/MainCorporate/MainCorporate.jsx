import React, { useContext, useEffect } from "react";
import Header2 from "../../components/Layout/Header2/Header2";
import MiniHeader from "../../components/Layout/MiniHeader/MiniHeader";
import CorporateAndBranchTab from "../../components/Layout/CorporateAndBranchTab/CorporateAndBranchTab";
import FXTrading from "../../components/FXTrading/FXTrading";
import Watchlist from "../../components/Watchlist/Watchlist";
import TXNSUmmary from "../../components/TXNSummary/TXNSUmmary";
import { BOPContext } from "../../Context";
import Forwarding from "../../components/Forwarding/Forwarding";
import CorporateForwardsTable from "../../components/CorporateFowardsTable/CorporateForwardsTable";
import CorporateDiscountTable from "../../components/CoporateDiscountTable/CorporateDiscountTable";

const MainCorporate = () => {
  const { CorporateTreasuryFun, corporateTreasury } = useContext(BOPContext);
  // Corporate Spot 1
  // Corporate Forward 2
  // Coporate Discounting 3
  useEffect(() => {
    CorporateTreasuryFun(1);
  }, []);
  return (
    <>
      <Header2 />
      <MiniHeader />
      <CorporateAndBranchTab
        handleClickDiscounting={() => CorporateTreasuryFun(3)}
        handleClickForwards={() => CorporateTreasuryFun(2)}
        handleClickSpot={() => CorporateTreasuryFun(1)}
      />
      {corporateTreasury === 1 && (
        <>
          <div className='row px-2'>
            <FXTrading />
            <Watchlist />
          </div>
          <TXNSUmmary />
        </>
      )}
      {corporateTreasury === 2 && <CorporateForwardsTable />}
      {corporateTreasury === 3 && <CorporateDiscountTable />}
    </>
  );
};

export default MainCorporate;
