import React, { useEffect, useState } from "react";
import GlobalTable from "../../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../../components/common/IconElement/IconElement";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CorporateBlotterDataAPI } from "./CorporateBlotterActions";
import { useSelector } from "react-redux";
import { Dropdown, Menu, Checkbox, Button } from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
const TXNSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global State For Blotter Data
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.CorporateBlotterReducer.getBlotterApiData
  );

  //local states
  const [blotterdata, setBlotterdata] = useState([]);

  //Calling Corporate Blotter Data API
  useEffect(() => {
    try {
      dispatch(CorporateBlotterDataAPI({}));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  //Extracting Out the Blotter Data API
  useEffect(() => {
    try {
      if (GlobalStateGetBlotterData && GlobalStateGetBlotterData !== null) {
        console.log(GlobalStateGetBlotterData, "GlobalStateGetBlotterData");
        // Now will be requiring some Clarification on it
        setBlotterdata([GlobalStateGetBlotterData.tnxSummary]);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GlobalStateGetBlotterData]);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };

  const handleApplyFilter = () => {
    // Apply your filter logic
    console.log("Applied filters:", selectedFilters);
  };

  const handleResetFilter = () => {
    setSelectedFilters([]);
  };

  const columns = [
    {
      title: "TXN ID",
      key: "txnid",
      dataIndex: "txnid",
      className: "ff-poppins fw-bold",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: 250 }}>
          <div className="d-flex justify-content-between mb-2">
            <Button type="primary" size="small" onClick={handleApplyFilter}>
              Apply
            </Button>
            <Button size="small" onClick={handleResetFilter}>
              Reset
            </Button>
          </div>
          <Checkbox.Group
            style={{ display: "flex", flexDirection: "column" }}
            options={["Option 1", "Option 2", "Option 3"]}
            value={selectedFilters}
            onChange={handleFilterChange}
          />
        </div>
      ),
      filterIcon: (filtered) => (
        <DownOutlined style={{ color: "white", fontSize: "12px" }} />
      ),
    },
    {
      title: "Name",
      key: "counterPartyName",
      dataIndex: "counterPartyName",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Side",
      key: "side",
      dataIndex: "side",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Nature",
      key: "nature",
      dataIndex: "nature",
      className: "ff-poppins fw-bold",
    },
    {
      title: "ccY1",
      key: "ccY1",
      dataIndex: "ccY1",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Amount",
      key: "amount1",
      dataIndex: "amount1",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Rate",
      key: "rate1",
      dataIndex: "rate1",
      className: "ff-poppins fw-bold",
    },
    {
      title: "ccY2",
      key: "ccY2",
      dataIndex: "ccY2",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Amount",
      key: "amount2",
      dataIndex: "amount2",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      className: "ff-poppins fw-bold",
    },
    {
      title: "lC No",
      key: "lC_No",
      dataIndex: "lC_No",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Account No.",
      key: "accountNumber",
      dataIndex: "accountNumber",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Comment",
      key: "comment",
      dataIndex: "comment",
      className: "comment-class ",
      render: (text, record) => (
        <>
          {text !== "" ? (
            <span className="d-inline-block cursor-pointer">
              <IconElement iconClass="icon-view-comment fs-5 color-blue" />
            </span>
          ) : null}
        </>
      ),
    },
    {
      key: "14",
      title: "Status",
      dataIndex: "status",
      className: "ff-poppins fw-bold",
      render: (text, record) => (
        <>
          <span className={text === "Accepted" ? "color-green" : "color-red"}>
            {text}
          </span>
        </>
      ),
    },
    {
      key: "15",
      title: "Chat",
      dataIndex: "chat",
      className: "comment-class ",
    },
  ];

  return (
    <>
      <div className="box-content-wrapper">
        <GlobalTable
          pagination={false}
          dataSource={blotterdata}
          bordered={false}
          prefixCls="TXNSummary_Table"
          columns={columns}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
};

export default TXNSummary;
