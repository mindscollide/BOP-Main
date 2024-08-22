import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Tabs.css"

const GlobalTabs = ({ tabs, defaultActiveKey = '0' }) => {

    // This component will be passed as
    // <GlobalTabs tabs={tabsData} defaultActiveKey={index of the tab} />

    // const tabsData = [
    //     { title: 'Live Rates', content: <div>Tab content for Home</div> },
    //     { title: 'Forwards', content: <div>Tab content for Profile</div> },
    //     { title: 'Discounting', content: <div>Tab content for Contact</div> }
    // ];



    return (
        <Tabs
            defaultActiveKey={defaultActiveKey}
            id="uncontrolled-tab-example"
            className="mb-3"
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