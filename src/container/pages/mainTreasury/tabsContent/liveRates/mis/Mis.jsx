import React, { useState, useEffect, useMemo } from "react";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../components/common/IconElement/IconElement";
import "./Mis.css";
import DatePickerCom from "../../../../../../components/common/datePicker/DatePicker";
import CustomButton from "../../../../../../components/common/globalButton/button";

const MIS = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const tableData = [
    {
      key: "1",
      topCustomer: "Volumewise",
      company: "Gulahmed",
      value: "500,000",
      import: "10,000",
      export: "5,000",
    },
    {
      key: "2",
      topCustomer: "Profit-wise (PKR)",
      company: "HBL",
      value: "300,000",
      import: "10,000",
      export: "5,000",
    },
  ];

  const columns = [
    {
      title: "Top Customer",
      dataIndex: "topCustomer",
      key: "topCustomer",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <>
            <span
              className={`${
                isExpanded ? "expanded" : ""
              } mis-volumwise-value bg-none color-black tp-customer-hd roboto-13`}
            >
              {text}
              <span className="view-detail cursor-pointer">
                <IconElement
                  onClick={() => handleExpandClick(record)}
                  iconClass={`icon-add-circle-fill fs-6 mx-1 ${
                    index === 1 ? "color-green" : "color-blue"
                  }`}
                ></IconElement>
              </span>
            </span>
            {isExpanded ? (
              <div className="d-grid">
                <span class="mis-volumwise-value bg-none color-black py-0 roboto-13">
                  Import
                </span>
                <span class="mis-volumwise-value bg-none color-black py-0 roboto-13">
                  Export
                </span>
              </div>
            ) : null}
          </>
        );
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <span
            className={`${
              isExpanded ? "expanded" : ""
            } roboto-13 mis-volumwise-value bg-none color-black`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      className: "value",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <>
            <span
              className={`${isExpanded ? "expanded" : ""} ${
                index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
              } roboto-13`}
            >
              {text}
            </span>
            {isExpanded ? (
              <div className="d-grid">
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {record.import}
                </span>
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {record.export}
                </span>
              </div>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleExpandClick = (record) => {
    const isExpanded = expandedRowKeys.includes(record.key);
    const newExpandedRowKeys = isExpanded
      ? expandedRowKeys.filter((key) => key !== record.key)
      : [...expandedRowKeys, record.key];

    setExpandedRowKeys(newExpandedRowKeys);
  };

  return (
    <>
      <div className="card-box">
        <div className="box-header bg-primary-orange px-3">
          <div className="text-start color-white fw-bold fs-6">MIS</div>
        </div>
        <div className="box-content-wrapper px-2">
          <div className="d-flex flex-wrap h-clc-100">
            <div className="flex-fill px-3">
              <GlobalTable
                columns={columns}
                dataSource={tableData}
                prefixCls={"MIS_Table"}
                pagination={false}
              />
              <div className="expanded-row">
                <div className="expanded-column first-column">
                  <span class="color-hd border-0 roboto-13">
                    Total Profit (PKR)
                  </span>
                </div>
                <div className="expanded-column third-column">
                  <span class="mis-totalprofit-value">10,000,000</span>
                </div>
              </div>
            </div>
            <div className="mis-selectrange-form w-fix-210 bg-lighter p-2">
              <label className="mb-2 fs-6 color-blue">Select Range</label>
              <div className="form-group">
                <label className="mb-1">From</label>
                <DatePickerCom
                  placeholder="Select Date"
                  applyClass={"DatePickerField"}
                />
              </div>
              <div className="form-group">
                <label className="mb-1">
                  To <span className="invisible"> 123</span>
                </label>
                <DatePickerCom
                  placeholder="Select Date"
                  applyClass={"DatePickerField"}
                />
              </div>
              <div className="filter-mis-btn mt-3 d-flex gap-1">
                <CustomButton value="Search" applyClass="searchBtn" />
                <CustomButton value="Reset" applyClass="resetBtn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MIS;
