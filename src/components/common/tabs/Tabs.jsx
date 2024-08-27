import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Tabs.css"
import CustomButton from '../globalButton/button';

const GlobalTabs = ({ tabs, defaultActiveKey = '0', tabClass }) => {
    return (
        <>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                id="uncontrolled-tab-example"
                className={`${tabClass}`}
            >
                {tabs.map((tab, index) => (
                    <Tab eventKey={index.toString()} title={tab.title} key={index}>
                        {tab.content}
                    </Tab>
                ))}
            </Tabs>
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
        </>
    );
}

export default GlobalTabs;