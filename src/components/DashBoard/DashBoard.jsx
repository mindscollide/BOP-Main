import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { BOPContext } from "../../Context";
// import CorporateAndBranchTab from "../Layout/CorporateAndBranchTab/CorporateAndBranchTab";
import MainCorporate from "../../pages/MainCorporate/MainCorporate";
import MainBranch from "../../pages/MainBranch/MainBranch";
import MainDealer from "../../pages/MainDealer/MainDealer";
import MainTreasury from "../../pages/MainTreasury/MainTreasury";
// import Category from "../Category/Category";
const DashBoard = () => {
  const { roleValue, RoleValueFun, CorporateTreasuryFun } =
    useContext(BOPContext);

  return (
    <div>
      {/* {roleValue === 1 || roleValue === 2 ? <Header2 /> : <Header />} */}
      {roleValue === 1 ? (
        <MainCorporate />
      ) : roleValue === 2 ? (
        <MainBranch />
      ) : roleValue === 3 ? (
        <MainDealer />
      ) : roleValue === 4 ? (
        <MainTreasury />
      ) : null}
      {/* <MiniHeader /> */}
      {/* <CorporateAndBranchTab
        handleClickDiscounting={() => CorporateTreasuryFun(7)}
        handleClickForwards={() => CorporateTreasuryFun(6)}
        handleClickSpot={() => CorporateTreasuryFun(5)}
      /> */}
      {/* {roleValue === 1 || roleValue === 2 ? <Spot /> : null} */}

      {/* <Category /> */}
      {/* This will render the nested routes */}
      {/* <Outlet /> */}
    </div>
  );
};

export default DashBoard;
