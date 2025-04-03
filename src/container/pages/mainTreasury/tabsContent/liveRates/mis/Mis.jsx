import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../components/common/IconElement/IconElement";
import "./Mis.css";
import DatePickerCom from "../../../../../../components/common/datePicker/DatePicker";
import CustomButton from "../../../../../../components/common/globalButton/button";
import { getMisData, loaderInitializeMis } from "./slicer/misSlicer";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";
import { useNavigate } from "react-router-dom";
import { GetMisDataByRangeAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { formatDateToUTC } from "@/utils/formatters";

const MIS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GetMisDataByRangeData = useSelector(
    (state) => state.WatchListReducer.GetMisDataByRange
  );
  console.log(GetMisDataByRangeData);

  const [misTableData, setMisTableData] = useState(null);
  const [MisDate, setMisDate] = useState({
    StartDate: "",
    EndDate: "",
  });

  console.log(MisDate, "misTableDatamisTableDatamisTableData");

  const [totalProfit, setTotalProfit] = useState(0);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    let Data = { StartDate: "20240828070208", EndDate: "20240828070208" };
    dispatch(GetMisDataByRangeAPI({ navigate, Data }));
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "topCustomer",
      key: "topCustomer",
      render: (text, record, index) => {
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <>
            <span
              className={`${
                isExpanded ? "expanded" : ""
              } mis-volumwise-value bg-none color-black tp-customer-hd roboto-13`}>
              {index === 0 ? "Volumewise" : "Profit-wise (PKR)"}
              <span className='view-detail cursor-pointer'>
                <IconElement
                  onClick={() => handleExpandClick(record)}
                  iconClass={`icon-add-circle-fill fs-6 mx-1 ${
                    index === 1 ? "color-green" : "color-blue"
                  }`}></IconElement>
              </span>
            </span>
            {isExpanded ? (
              <div className='d-grid'>
                <span className='mis-volumwise-value bg-none color-black py-0 roboto-13'>
                  Import
                </span>
                <span className='mis-volumwise-value bg-none color-black py-0 roboto-13'>
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
            } roboto-13 mis-volumwise-value bg-none color-black`}>
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
        const isExpanded = expandedRowKeys.includes(record.key);
        return (
          <>
            <span
              className={`${isExpanded ? "expanded" : ""} ${
                index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
              } roboto-13`}>
              {record?.value}
            </span>
            {isExpanded ? (
              <div className='d-grid'>
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}>
                  {record?.import}
                </span>
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}>
                  {record?.export}
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
      console.log(Data , "Data");
      dispatch(GetMisDataByRangeAPI({ navigate, Data }));
    } else {
      alert("Please select both dates.");
    }
  };

  useEffect(() => {
    if (GetMisDataByRangeData !== null) {
      const { profiteInPKRWiseMISData, volumeWiseMISData, totalProfit } =
        GetMisDataByRangeData;
      setMisTableData([
        volumeWiseMISData?.misData,
        profiteInPKRWiseMISData.misData,
      ]);
      setTotalProfit(totalProfit);
    } else {
      setMisTableData(null);
      setTotalProfit(0);
    }
  }, [GetMisDataByRangeData]);

  return (
    <>
      <div className='card-box'>
        <div className='box-header bg-primary-orange px-3'>
          <div className='text-start color-white fw-bold fs-6'>MIS</div>
        </div>
        <div className='box-content-wrapper px-2'>
          <div className='d-flex flex-wrap h-clc-100'>
            <div className='flex-fill px-3'>
              <GlobalTable
                columns={columns}
                dataSource={misTableData}
                prefixCls={"MIS_Table"}
                pagination={false}
              />
              <div className='expanded-row'>
                <div className='expanded-column first-column'>
                  <span className='color-hd border-0 roboto-13'>
                    Total Profit (PKR)
                  </span>
                </div>
                <div className='expanded-column third-column'>
                  <span className='mis-totalprofit-value'>{totalProfit}</span>
                </div>
              </div>
            </div>
            <div className='mis-selectrange-form w-fix-210 bg-lighter p-2'>
              <label className='mb-2 fs-6 color-blue'>Select Range</label>
              <div className='form-group'>
                <label className='mb-1'>From</label>
                <DatePickerCom
                  placeholder='Select Date'
                  applyClass={"DatePickerField"}
                  value={MisDate.StartDate}
                  onChange={(date) => handleChangeDate(date, "StartDate")}
                />
              </div>
              <div className='form-group'>
                <label className='mb-1'>
                  To <span className='invisible'> 123</span>
                </label>
                <DatePickerCom
                  placeholder='Select Date'
                  applyClass={"DatePickerField"}
                  value={MisDate.EndDate}
                  minDate={
                    MisDate.StartDate !== ""
                      ? new Date(MisDate.StartDate)
                      : null
                  }
                  onChange={(date) => handleChangeDate(date, "EndDate")}
                />
              </div>
              <div className='filter-mis-btn mt-3 d-flex gap-1'>
                <CustomButton
                  value='Search'
                  onClick={handleClickSearch}
                  applyClass='searchBtn'
                />
                <CustomButton value='Reset' applyClass='resetBtn' />
              </div>
            </div>
          </div>
          {/* {misReducer?.Loader ? <SectionLoader /> : null} */}
        </div>
      </div>
    </>
  );
};

export default MIS;
