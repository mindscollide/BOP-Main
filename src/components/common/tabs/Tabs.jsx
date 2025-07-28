import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Tabs.css";
import { useSelector } from "react-redux";
const GlobalTabs = ({
  tabs,
  activeKey,
  onTabChange,
  tabClass,
  counterValue,
}) => {
  const OutstandingTableNewData = useSelector(
    (state) => state.BlotterSlicer.OutstandingTableNewData
  );
  return (
    <Tabs
      activeKey={activeKey}
      onSelect={onTabChange}
      children={<> </>}
      id="uncontrolled-tab-example"
      className={`${tabClass} ${"position-relative"}`}
    >
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.title} title={tab.title} key={index}>
          {(activeKey === "Outstanding Deals" || activeKey === "TXN Summary") &&
          OutstandingTableNewData.length > 0 ? (
            <span
              style={{
                background: "red",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "25px",
                height: "25px",
                marginLeft: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                position: "absolute",
                top: "-8px",
                left: "315px",
              }}
            >
              {OutstandingTableNewData?.length}
            </span>
          ) : null}

          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};
export default GlobalTabs;
