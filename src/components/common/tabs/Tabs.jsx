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
        </>
    );
}

export default GlobalTabs;