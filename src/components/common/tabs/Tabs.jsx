import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Tabs.css";
const GlobalTabs = ({ tabs, activeKey, onTabChange, tabClass, counterValue }) => {
  console.log(activeKey, "activeKeyactiveKeyactiveKey");
  return (
    <Tabs
      activeKey={activeKey}
      onSelect={onTabChange}
      id='uncontrolled-tab-example'
      
      className={`${tabClass} ${"position-relative"}`}>
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.title}  title={tab.title} key={index}  >
          <span>2</span>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};
export default GlobalTabs;
