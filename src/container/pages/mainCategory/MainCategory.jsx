import React from 'react'
import GlobalTabs from '../../../components/common/tabs/Tabs';
import SpotDealerAndTreasury from '../../../components/features/spotDealerAndTreasury/SpotDealerAndTreasury';

const MainCategory = () => {
  const tabsData = [
    { title: "Spot", content: <SpotDealerAndTreasury /> },
    { title: "Forwards", content: "Delaer and Tresury Forwards" },
    { title: "Discounting", content: "Discounting" },
  ];
  return (
    <GlobalTabs tabs={tabsData} defaultActiveKey='0' />
    
  )
}

export default MainCategory