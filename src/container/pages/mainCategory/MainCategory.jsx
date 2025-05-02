import React, { useEffect } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import SpotDealerAndTreasury from "../../../components/features/spotDealerAndTreasury/SpotDealerAndTreasury";
import CategoryForwards from "../../../components/features/categoryForwards/CategoryForwards";
import CategoryDiscounting from "../../../components/features/categoryDiscount/CategoryDiscounting";
import { useSelector } from "react-redux";
import { getAllCategoriesAction } from "@/components/utils/globalApis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetAllCounterPartyDataAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { useDealerAndTreasury } from "@/context/DealerAndTreasuryContext";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import Forwards from "../mainTreasury/tabsContent/forwards/Forwards";

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCategoryValue } = useDealerAndTreasury();
  const getAllCategories = useSelector(
    (state) => state.authReducer.getAllCategories
  );
  const getAllCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetAllCounterPartyData
  );
  console.log(getAllCounterPartyData, "getAllCategoriesgetAllCategories");

  useEffect(() => {
    dispatch(getAllCategoriesAction({ navigate }));
  }, []);

  const activeTab = useSelector((state) => state.RFQReducer.activeTab);
  const handleTabChange = (tabTitle) => {
    dispatch(setActiveTab(tabTitle));
  };

  // GetAllCounterPartyDataAPI
  useEffect(() => {
    if (getAllCategories !== null) {
      const { categories } = getAllCategories;
      if (categories.length > 0) {
        let Data = {
          CategoryID: categories[0].categoryID,
        };
        setCategoryValue({
          value: categories[0].categoryID,
          label: categories[0].categoryName,
        });
        dispatch(GetAllCounterPartyDataAPI({ Data, navigate }));
        console.log(categories[0], "categoriescategories");
      }
    }
  }, [getAllCategories]);
  const tabsData = [
    { title: "Spot", content: <SpotDealerAndTreasury /> },
    { title: "Forwards", content: <Forwards /> },
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
