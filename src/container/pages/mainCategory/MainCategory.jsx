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

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  // GetAllCounterPartyDataAPI
  useEffect(() => {
    if (getAllCategories !== null) {
      const { categories } = getAllCategories;
      if (categories.length > 0) {
        let Data = {
          CategoryID: categories[0].categoryID,
        };
        dispatch(GetAllCounterPartyDataAPI({ Data, navigate }));
        console.log(categories[0], "categoriescategories");
      }
    }
  }, [getAllCategories]);
  const tabsData = [
    { title: "Spot", content: <SpotDealerAndTreasury /> },
    { title: "Forwards", content: <CategoryForwards /> },
    { title: "Discounting", content: <CategoryDiscounting /> },
  ];
  return <GlobalTabs tabs={tabsData} defaultActiveKey='0' tabClass='mb-4' />;
};

export default MainCategory;
