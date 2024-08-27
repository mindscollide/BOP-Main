import React from 'react'
import GlobalTabs from '../../../components/common/tabs/Tabs';
import SpotDealerAndTreasury from '../../../components/features/spotDealerAndTreasury/SpotDealerAndTreasury';
import CategoryForwards from '../../../components/features/categoryForwards/CategoryForwards';
import CategoryDiscounting from '../../../components/features/categoryDiscount/CategoryDiscounting';

const MainCategory = () => {
  const tabsData = [
    { title: "Spot", content: <SpotDealerAndTreasury /> },
    { title: "Forwards", content: <CategoryForwards /> },
    { title: "Discounting", content: <CategoryDiscounting />},
  ];
  return (
    <GlobalTabs tabs={tabsData} defaultActiveKey='0' />
    
  )
}

export default MainCategory