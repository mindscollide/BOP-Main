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
  const activeTab = useSelector((state) => state.RFQReducer.activeTab);

  useEffect(() => {
    startTransition(() => {
      dispatch(getAllCategoriesAction({ navigate }));
      dispatch(getAllTreasuryInstrumentsApi({ navigate }));
      dispatch(getAllTenorsAction({ navigate }));
    });
  }, [dispatch, navigate]);

  const handleTabChange = (tabTitle) => {
    startTransition(() => {
      dispatch(setActiveTab(tabTitle));
    });
  };

  const tabsData = [
    {
      title: "Spot",
      content: (
        <span className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Spot" && <SpotDealerAndTreasury />}
          </Suspense>
        </span>
      ),
    },
    {
      title: "Forwards",
      content: (
        <span className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Forwards" && <CategoryForwards />}
          </Suspense>
        </span>
      ),
    },
    {
      title: "Discounting",
      content: (
        <span className='position-relative'>
          <Suspense fallback={<SectionLoader />}>
            {activeTab === "Discounting" && <CategoryDiscounting />}
          </Suspense>
        </span>
      ),
    },
  ];

  return (
    <GlobalTabs
      tabs={tabsData}
      activeKey={activeTab}
      onTabChange={handleTabChange}
      defaultActiveKey='Spot' // Changed from "0" to match your tab titles
      tabClass='mb-4'
    />
  );
};

export default MainCategory;
