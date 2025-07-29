import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../components/common/IconElement/IconElement";
import "./Mis.css";
import DatePickerCom from "../../../../../../components/common/datePicker/DatePicker";
import CustomButton from "../../../../../../components/common/globalButton/button";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";
import { useNavigate } from "react-router-dom";
import { formatDateToUTC, formatPkAmount } from "@/utils/formatters";
import { GetMisDataByRangeAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { Col, Row } from "react-bootstrap";

const MIS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shouldIncludeComponents =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const GetMisDataByRangeData = useSelector(
    (state) => state.WatchListReducer.GetMisDataByRange
  );
  const GetMisDataByRangeSpinner = useSelector(
    (state) => state.WatchListReducer.GetMisDataByRangeSpinner
  );
  console.log(GetMisDataByRangeData, "Checkerchekcrrrrr");

  const [misTableData, setMisTableData] = useState(null);
  const [MisDate, setMisDate] = useState({
    StartDate: "",
    EndDate: "",
  });

  console.log(MisDate, "misTableDatamisTableDatamisTableData");

  const [totalProfit, setTotalProfit] = useState(0);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    let Data = { StartDate: "", EndDate: "" };
    dispatch(GetMisDataByRangeAPI({ navigate, Data }));
  }, []);

  useEffect(() => {
    if (GetMisDataByRangeData !== null) {
      try {
        const { profiteInPKRWiseMISData, volumeWiseMISData, totalProfit } =
          GetMisDataByRangeData;

        console.log("VOLUME WISE DATA:", volumeWiseMISData?.misData);
        console.log("PROFIT WISE DATA:", profiteInPKRWiseMISData?.misData);
        setMisTableData([
          volumeWiseMISData?.misData,
          profiteInPKRWiseMISData.misData,
        ]);
        setTotalProfit(totalProfit);
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetMisDataByRangeData]);

  const columns = [
    {
      title: "Top Customer",
      dataIndex: "topCustomer",
      key: "topCustomer",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.corporateName);
        return (
          <>
            <span
              className={`${
                isExpanded ? "expanded" : ""
              } mis-volumwise-value bg-none color-black tp-customer-hd roboto-13`}
            >
              {index === 0 ? "Volumewise" : "Profit-wise (PKR)"}
              {shouldIncludeComponents && (
                <span className="view-detail cursor-pointer">
                  <IconElement
                    onClick={() => handleExpandClick(record)}
                    iconClass={`icon-add-circle-fill fs-6 mx-1 ${
                      index === 1 ? "color-green" : "color-blue"
                    }`}
                  ></IconElement>
                </span>
              )}
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
      dataIndex: "corporateName",
      key: "corporateName",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <span
            className={`${
              isExpanded ? "expanded" : ""
            } roboto-13 mis-volumwise-value bg-none color-black`}
          >
            {record?.corporateName}
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
        const isExpanded = expandedRowKeys.includes(record.corporateName);
        return (
          <>
            <span
              className={`${isExpanded ? "expanded" : ""} ${
                index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
              } roboto-13`}
            >
              {formatPkAmount(record?.value)}
            </span>
            {isExpanded ? (
              <div className="d-grid">
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {formatPkAmount(record?.import)}
                </span>
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {formatPkAmount(record?.export)}
                </span>
              </div>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleExpandClick = (record) => {
    console.log(
      expandedRowKeys,
      record,
      "expandedRowKeys expandedRowKeys expandedRowKeys"
    );
    const isExpanded = expandedRowKeys.includes(record.corporateName);
    const newExpandedRowKeys = isExpanded ? [] : [record.corporateName]; // 👈 only one row at a time
    setExpandedRowKeys(newExpandedRowKeys);
  };

  const handleChangeDate = (date, key) => {
    setMisDate((prevState) => ({
      ...prevState,
      [key]: new Date(date),
    }));
  };

  const handleClickSearch = () => {
    if (MisDate.StartDate !== "" && MisDate.EndDate !== "") {
      let startDate = new Date(MisDate.StartDate);
      startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

      let endDate = new Date(MisDate.EndDate);
      endDate.setHours(23, 58, 59, 999); // Set time to 23:58:59

      const Data = {
        StartDate: formatDateToUTC(startDate),
        EndDate: formatDateToUTC(endDate),
      };
      dispatch(GetMisDataByRangeAPI({ navigate, Data }));
      console.log(Data, "Data");
    } else {
      alert("Please select both dates.");
    }
  };
  const handleClickReset = () => {
    console.log("reset clicked");
    setMisDate({
      StartDate: "",
      EndDate: "",
    });
  };

  return (
    <>
      <div className="card-box position-relative mis-style">
        <div className="box-header bg-primary-orange px-3">
          <div className="text-start color-white fw-bold fs-6">MIS</div>
        </div>
        <div className="p-2">
          <Row>
            <Col sm={12} md={8} lg={8}>
              <GlobalTable
                columns={columns}
                dataSource={misTableData}
                // scroll={{ y: 300 }}
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
                  <span className="mis-totalprofit-value">
                    {formatPkAmount(totalProfit)}
                  </span>
                </div>
              </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
              <div className="mis-selectrange-form w-fix-210 bg-lighter p-2">
                <label className="mb-2 fs-6 color-blue">Select Range</label>
                <div className="form-group">
                  <div className="mb-1">From</div>
                  <DatePickerCom
                    placeholder="Select Date"
                    applyClass={"DatePickerField-MIS"}
                    value={MisDate.StartDate}
                    onChange={(date) => handleChangeDate(date, "StartDate")}
                  />
                </div>
                <div className="form-group">
                  <div className="mb-1">To</div>
                  <DatePickerCom
                    placeholder="Select Date"
                    applyClass={"DatePickerField-MIS"}
                    className={"d-block w-100"}
                    value={MisDate.EndDate}
                    minDate={
                      MisDate.StartDate !== ""
                        ? new Date(MisDate.StartDate)
                        : null
                    }
                    onChange={(date) => handleChangeDate(date, "EndDate")}
                  />
                </div>
                <div className="filter-mis-btn mt-3 d-flex gap-1">
                  <CustomButton
                    value="Search"
                    onClick={handleClickSearch}
                    applyClass="searchBtn"
                  />
                  <CustomButton
                    value="Reset"
                    applyClass="resetBtn"
                    onClick={handleClickReset}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {GetMisDataByRangeSpinner && <SectionLoader />}
        </div>
      </div>
    </>
  );
};

export default MIS;
