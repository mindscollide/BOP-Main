import React, { useEffect, useState } from "react";
import GlobalTable from "../../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../../components/common/IconElement/IconElement";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CorporateBlotterDataAPI } from "./CorporateBlotterActions";
import { useSelector } from "react-redux";
import { Button, Checkbox, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomButton from "@/components/common/globalButton/button";
const TXNSummary = () => {
  const dispatch = useDispatch();

  //Global State For Blotter Data
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.CorporateBlotterReducer.getBlotterApiData
  );

  //local states
  const [blotterdata, setBlotterdata] = useState([]);
  const [open, setOpen] = useState(false);

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

  //Pop Over for antd Col

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const columns = [
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">TXN ID</span>
          <Popover
            content={<a onClick={hide}>Close</a>}
            title="TXN ID Filter"
            trigger="click"
            arrow={false}
            placement="bottom"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <DownOutlined style={{ cursor: "pointer" }} />
          </Popover>
        </div>
      ),
      key: "txnid",
      dataIndex: "txnid",
      align: "center",
      className: "ff-poppins fw-bold",
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
