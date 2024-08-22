import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Tabs.css"

const GlobalTabs = ({ tabs, defaultActiveKey = '0' }) => {
    return (
        <Tabs
            defaultActiveKey={defaultActiveKey}
            id="uncontrolled-tab-example"
            className="mt-2 mb-4"
        >
            {tabs.map((tab, index) => (
                <Tab eventKey={index.toString()} title={tab.title} key={index}>
                    {tab.content}
                </Tab>
            ))}
        </Tabs>
    );
}

export default GlobalTabs;