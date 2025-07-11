import React, { useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import SpotDealerAndTreasury from "../../../components/features/spotDealerAndTreasury/SpotDealerAndTreasury";
import CategoryForwards from "../../../components/features/categoryForwards/CategoryForwards";
import CategoryDiscounting from "../../../components/features/categoryDiscount/CategoryDiscounting";
import { useSelector } from "react-redux";
import { getAllCategoriesAction } from "@/components/utils/globalApis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import { getAllTreasuryInstrumentsApi } from "@/components/features/SpotBranch/WatchlistAction";
import {
  GetCategoryWiseDiscountingRatesApi,
  GetCategoryWiseForwardRatesApi,
  GetCategoryWiseSpotRatesApi,
} from "./categoryActions";
import { getAllTenorsAction } from "../mainDealer/dealerActions";

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllCategories = useSelector(
    (state) => state.authReducer.getAllCategories
  );

  // const allInstrumentForTreasuryData = useSelector(
  //   (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  // );

  console.log("getAllCategoriesgetAllCategories:", getAllCategories);

  useEffect(() => {
    dispatch(getAllCategoriesAction({ navigate }));
    dispatch(getAllTreasuryInstrumentsApi({ navigate }));
    dispatch(getAllTenorsAction({ navigate }));
    // let Data = {
    //   Category: 1,
    // };
  }, []);

  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };

  const tabsData = [
    {
      title: "Spot",
      content: activeTab === "Spot" ? <SpotDealerAndTreasury /> : null,
    },
    {
      title: "Forwards",
      content: activeTab === "Forwards" ? <CategoryForwards /> : null,
    },
    {
      title: "Discounting",
      content: activeTab === "Discounting" ? <CategoryDiscounting /> : null,
    },
  ];
  return (
    <GlobalTabs
      tabs={tabsData}
      activeKey={activeTab}
      onTabChange={handleTabChange}
      defaultActiveKey="0"
      tabClass="mb-4"
    />
  );
};

export default MainCategory;
