import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../components/common/IconElement/IconElement";
import "./Mis.css";
import DatePickerCom from "../../../../../../components/common/datePicker/DatePicker";
import CustomButton from "../../../../../../components/common/globalButton/button";
import { getMisData, loaderInitializeMis } from "./slicer/misSlicer";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";

const MIS = () => {

  const dispatch = useDispatch();

  const { misReducer } = useSelector((state) => state)

  const [misTableData, setMisTableData] = useState(null)

  const [totalProfit, setTotalProfit] = useState(0)

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const misResponseData = {
    "volumeWiseMISData": {
      "misData": {
        "corporateID": 1,
        "corporateName": "Example Corp",
        "value": 1000.5,
        "import": 1000.5,
        "export": 1000.5
      }
    },
    "profiteInPKRWiseMISData": {
      "misData": {
        "corporateID": 2,
        "corporateName": "Another Corp",
        "value": 2500.75,
        "import": 1000.5,
        "export": 1000.5
      }
    },
    "totalProfit": 3500.25,
    "responseMessage": "Data retrieval successful",
    "isExecuted": true
  };

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
              className={`${isExpanded ? "expanded" : ""
                } mis-volumwise-value bg-none color-black tp-customer-hd roboto-13`}
            >
              {index === 0 ? "Volumewise" : "Profit-wise (PKR)"}
              <span className="view-detail cursor-pointer">
                <IconElement
                  onClick={() => handleExpandClick(record)}
                  iconClass={`icon-add-circle-fill fs-6 mx-1 ${index === 1 ? "color-green" : "color-blue"
                    }`}
                ></IconElement>
              </span>
            </span>
            {isExpanded ? (
              <div className="d-grid">
                <span className="mis-volumwise-value bg-none color-black py-0 roboto-13">
                  Import
                </span>
                <span className="mis-volumwise-value bg-none color-black py-0 roboto-13">
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
            className={`${isExpanded ? "expanded" : ""
              } roboto-13 mis-volumwise-value bg-none color-black`}
          >
            {record?.misData?.corporateName}
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
              className={`${isExpanded ? "expanded" : ""} ${index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                } roboto-13`}
            >
              {record?.misData?.value}
            </span>
            {isExpanded ? (
              <div className="d-grid">
                <span
                  className={`${index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                    } bg-none py-0 roboto-13`}
                >
                  {record?.misData?.import}
                </span>
                <span
                  className={`${index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                    } bg-none py-0 roboto-13`}
                >
                  {record?.misData?.export}
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

  useEffect(() => {
    dispatch(loaderInitializeMis(true));
    setTimeout(() => {
      dispatch(getMisData(misResponseData));
    }, 3000);
  }, []);

  useEffect(() => {
    if (
      misReducer?.misData !== null &&
      misReducer?.misData !== undefined
    ) {
      setMisTableData([misReducer?.misData?.volumeWiseMISData, misReducer?.misData?.profiteInPKRWiseMISData]);
      setTotalProfit(misReducer?.misData?.totalProfit)
    } else {
      setMisTableData(null);
      setTotalProfit(0)
    }
  }, [misReducer?.misData]);


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
                dataSource={misTableData}
                prefixCls={"MIS_Table"}
                pagination={false}
              />
              <div className="expanded-row">
                <div className="expanded-column first-column">
                  <span className="color-hd border-0 roboto-13">
                    Total Profit (PKR)
                  </span>
                </div>
                <div className="expanded-column third-column">
                  <span className="mis-totalprofit-value">{totalProfit}</span>
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
                <CustomButton onClick={
                  () => {
                    dispatch(loaderInitializeMis(true));
                    setTimeout(() => {
                      dispatch(getMisData(misResponseData));
                    }, 1000);
                  }
                } value="Search" applyClass="searchBtn" />
                <CustomButton
                  onClick={
                    () => {
                      dispatch(loaderInitializeMis(true));
                      setTimeout(() => {
                        dispatch(getMisData(misResponseData));
                      }, 1500);
                    }}
                  value="Reset" applyClass="resetBtn" />
              </div>
            </div>
          </div>
          {misReducer?.Loader ? <SectionLoader /> : null}
        </div>
      </div>
    </>
  );
};

export default MIS;
