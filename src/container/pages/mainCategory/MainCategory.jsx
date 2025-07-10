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
import Forwards from "../mainTreasury/tabsContent/forwards/Forwards";
import { setCategoryValue } from "@/store/dealerReducer/dealerSlicer";

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllCategories = useSelector(
    (state) => state.authReducer.getAllCategories
  );
  const getAllCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetAllCounterPartyData
  );

  useEffect(() => {
    dispatch(getAllCategoriesAction({ navigate }));
  }, []);

  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };



  const tabsData = [
    { title: "Spot", content: <SpotDealerAndTreasury /> },
    { title: "Forwards", content: <CategoryForwards /> },
    { title: "Discounting", content: <CategoryDiscounting /> },
  ];
  return (
    <GlobalTabs
      tabs={tabsData}
      activeKey={activeTab}
      onTabChange={handleTabChange}
      defaultActiveKey='0'
      tabClass='mb-4'
    />
  );
};

export default MainCategory;
