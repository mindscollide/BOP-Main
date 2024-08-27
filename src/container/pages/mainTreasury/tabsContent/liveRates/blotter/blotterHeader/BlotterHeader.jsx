import React from 'react'
import "./BlotterHeader.css"
import GlobalTabs from '../../../../../../../components/common/tabs/Tabs';
import TXNSummary from '../txnSummary/TXNSummary';
import OutstandingDeals from '../outstandingDeals/OutstandingDeals';
import CustomButton from '../../../../../../../components/common/globalButton/button';
import NopModal from '../nopModal/NopModal';

const BlotterHeader = () => {
    const tabsData = [
        { title: "TXN Summary", content: <TXNSummary /> },
        { title: "Outstanding Deals", content: <OutstandingDeals /> },
    ];

    return (
        <div className="box-header">
            <GlobalTabs tabClass="buttonClassTab" tabs={tabsData} defaultActiveKey={"0"} />
        </div>
    );
}

export default BlotterHeader