import React, { useEffect, Suspense, lazy, startTransition } from "react";
import GlobalTabs from "../../../components/common/tabs/Tabs";
import { useSelector } from "react-redux";
import { getAllCategoriesAction } from "@/components/utils/globalApis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../mainCorporate/rfqModal/RFQSlicer";
import { getAllTreasuryInstrumentsApi } from "@/components/features/SpotBranch/WatchlistAction";
import { getAllTenorsAction } from "../mainDealer/dealerActions";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";
import { setCurrentCategoryActiveTab } from "@/store/categoryReducer/categoryReducer";

// Lazy load the tab components
const SpotDealerAndTreasury = lazy(() =>
  import(
    "../../../components/features/spotDealerAndTreasury/SpotDealerAndTreasury"
  )
);
const CategoryForwards = lazy(() =>
  import("../../../components/features/categoryForwards/CategoryForwards")
);
const CategoryDiscounting = lazy(() =>
  import("../../../components/features/categoryDiscount/CategoryDiscounting")
);

const MainCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCategoryTab = useSelector((state) => state.categoryReducer.currentCategoryActiveTab);
  console.log({ activeCategoryTab }, "activeTabactiveTabactiveTab");
  useEffect(() => {
    startTransition(() => {
      let storedActiveTab = localStorage.getItem("MainCategoryActiveTab");
      if (!storedActiveTab) {
        storedActiveTab = "Spot"; // Default to "Spot" if no value is stored
        startTransition(() => {
          dispatch(setCurrentCategoryActiveTab(storedActiveTab));
        });
        localStorage.setItem("MainCategoryActiveTab", storedActiveTab);
      } else {
        startTransition(() => {
          dispatch(setCurrentCategoryActiveTab(storedActiveTab));
        });
      }
      dispatch(getAllCategoriesAction({ navigate }));
      dispatch(getAllTreasuryInstrumentsApi({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
    });
  }, []);

  const handleTabChange = (tabTitle) => {
    localStorage.setItem("MainCategoryActiveTab", tabTitle);
    startTransition(() => {
      dispatch(setCurrentCategoryActiveTab(tabTitle));
    });
  };

  const tabsData = [
    {
      title: "Spot",
      content: (
        <span className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeCategoryTab === "Spot" && <SpotDealerAndTreasury />}
          </Suspense>
        </span>
      ),
    },
    {
      title: "Forwards",
      content: (
        <span className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeCategoryTab === "Forwards" && (
              <>
                <CategoryForwards />
              </>
            )}
          </Suspense>
        </span>
      ),
    },
    {
      title: "Discounting",
      content: (
        <span className="position-relative">
          <Suspense fallback={<SectionLoader />}>
            {activeCategoryTab === "Discounting" && <CategoryDiscounting />}
          </Suspense>
        </span>
      ),
    },
  ];

  return (
    <GlobalTabs
      tabs={tabsData}
      activeKey={activeCategoryTab}
      onTabChange={handleTabChange}
      tabClass="mb-4"
    />
  );
};

export default MainCategory;
