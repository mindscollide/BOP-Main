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
            <div className="d-flex align-items-center">
                <GlobalTabs tabClass="buttonClassTab" tabs={tabsData} defaultActiveKey={"0"} />
                <div className="filter-export-wrapper ms-auto">
                    <div className="d-flex align-items-center">
                        <div className="nop-hd-container">
                            <div className="d-flex align-items-center">
                                <span className="hd-txt me-3">NOP (US$)</span>
                                <span className="hd-cr me-2">46,999</span>
                                <CustomButton applyClass={"NOP-button"} value="+" />
                                <CustomButton applyClass={"Export-button"} value="Export" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlotterHeader