import React, {
  useState,
  useEffect,
  lazy,
  startTransition,
  Suspense,
} from "react";
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
import { Popover } from "antd";
import excelImage from "@/assets/icons/excel.png";
import pdfImage from "@/assets/icons/pdf.png";
const MIS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompanyListModal, setIsCompanyListModal] = useState(false);
  const CompaniesListModal = lazy(() => import("../mis/companiesListModal"));
  const shouldIncludeComponents =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const GetMisDataByRangeData = useSelector(
    (state) => state.WatchListReducer.GetMisDataByRange
  );
  const GetMisDataByRangeSpinner = useSelector(
    (state) => state.WatchListReducer.GetMisDataByRangeSpinner
  );
  console.log(GetMisDataByRangeData, "Checkerchekcrrrrr");

  const [misTableData, setMisTableData] = useState([]);

  console.log(misTableData, "misTableDatamisTableData");
  const [MisDate, setMisDate] = useState({
    StartDate: new Date(),
    EndDate: new Date(),
  });
  const [exportButton, setExportButton] = useState(false);
  console.log(MisDate, "misTableDatamisTableDatamisTableData");

  const [totalProfit, setTotalProfit] = useState(0);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // useEffect(() => {
  //   let Data = { StartDate: "", EndDate: "" };
  //   dispatch(GetMisDataByRangeAPI({ navigate, Data }));
  // }, []);

  useEffect(() => {
    // Format dates for initial API call
    const startDate = new Date(MisDate.StartDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(MisDate.EndDate);
    endDate.setHours(23, 58, 59, 99);

    const Data = {
      StartDate: formatDateToUTC(startDate, 1),
      EndDate: formatDateToUTC(endDate, 1),
    };

    dispatch(GetMisDataByRangeAPI({ navigate, Data }));
  }, []); //

  useEffect(() => {
    if (GetMisDataByRangeData && GetMisDataByRangeData !== null) {
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
    } else {
      setMisTableData([]);
      setTotalProfit(0);
    }
  }, [GetMisDataByRangeData]);

  const columns = [
    {
      title: "Top Customer",
      dataIndex: "topCustomer",
      key: "topCustomer",
      render: (text, record, index) => {
        console.log(index, "topCustomertopCustomer index");
        const isExpanded = expandedRowKeys.includes(index);
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
                    onClick={() => handleExpandClick(index)}
                    iconClass={`icon-add-circle-fill fs-6 mx-1 ${
                      index === 1 ? "color-green" : "color-blue"
                    }`}
                  ></IconElement>
                </span>
              )}
            </span>
            {isExpanded && expandedRowKeys.includes(index) ? (
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
      className: "corporateName",

      // render: (text, record, index) => {
      //   const isExpanded = expandedRowKeys.includes(record.key);
      //   return (
      //     <span
      //       className={`${
      //         isExpanded ? "expanded" : ""
      //       } roboto-13 mis-volumwise-value bg-none color-black`}
      //     >
      //       {record?.corporateName}
      //     </span>
      //   );
      // },
      render: (text, record, index) => {
        console.log(index, "topCustomertopCustomer index");

        const isExpanded = expandedRowKeys.includes(index);
        return (
          <>
            <span
              className={`${
                isExpanded ? "expanded" : ""
              } roboto-13 mis-volumwise-value bg-none color-black`}
            >
              {record?.corporateName}
              {shouldIncludeComponents && (
                <span className="view-detail cursor-pointer">
                  {index === 0 ? (
                    <IconElement
                      onClick={() => handleOpenMISModal(index)}
                      iconClass={`icon-open color-gray mx-1`}
                    ></IconElement>
                  ) : (
                    ""
                  )}
                </span>
              )}
            </span>

            {isExpanded && expandedRowKeys.includes(index) ? (
              <div className="d-grid">
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {index === 1 ? (
                    <span className="color-hd border-0">{"Import 2"}</span>
                  ) : (
                    <span className="color-hd border-0">{"Import 1"}</span>
                  )}
                </span>

                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {index === 1 ? (
                    <span className="color-hd border-0 roboto-13">
                      {"Export 2"}
                    </span>
                  ) : (
                    <span className="color-hd border-0 roboto-13">
                      {"Export 1"}
                    </span>
                  )}
                </span>
              </div>
            ) : null}
          </>
        );
      },
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      className: "value",
      render: (text, record, index) => {
        console.log(index, "topCustomertopCustomer index");

        const isExpanded = expandedRowKeys.includes(index);
        return (
          <>
            <span
              className={`${isExpanded ? "expanded" : ""} ${
                index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
              } roboto-13`}
            >
              {index === 1 ? (
                record?.value === 0 ? (
                  <span className="color-black">
                    {formatPkAmount(record?.value)}
                  </span>
                ) : record?.value > 0 ? (
                  <span className="color-green">
                    {formatPkAmount(record?.value)}
                  </span>
                ) : (
                  <span className="color-red">
                    ({formatPkAmount(Math.abs(record?.value))})
                  </span>
                )
              ) : (
                formatPkAmount(record?.value)
              )}
            </span>

            {isExpanded && expandedRowKeys.includes(index) ? (
              <div className="d-grid">
                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {index === 1 ? (
                    record?.import === 0 ? (
                      <span className="color-black">
                        {formatPkAmount(record?.import)}
                      </span>
                    ) : record?.import > 0 ? (
                      <span className="color-green">
                        {formatPkAmount(record?.import)}
                      </span>
                    ) : (
                      <span className="color-red">
                        ({formatPkAmount(Math.abs(record?.import))})
                      </span>
                    )
                  ) : (
                    formatPkAmount(record?.import)
                  )}
                </span>

                <span
                  className={`${
                    index === 1 ? "mis-profitwise-value" : "mis-volumwise-value"
                  } bg-none py-0 roboto-13`}
                >
                  {index === 1 ? (
                    record?.export === 0 ? (
                      <span className="color-black">
                        {formatPkAmount(record?.export)}
                      </span>
                    ) : record?.export > 0 ? (
                      <span className="color-green">
                        {formatPkAmount(record?.export)}
                      </span>
                    ) : (
                      <span className="color-red">
                        ({formatPkAmount(Math.abs(record?.export))})
                      </span>
                    )
                  ) : (
                    formatPkAmount(record?.export)
                  )}
                </span>
              </div>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleExpandClick = (index) => {
    setExpandedRowKeys((prevKeys) => {
      if (prevKeys.includes(index)) {
        // If already expanded, collapse it
        return prevKeys.filter((key) => key !== index);
      } else {
        // Otherwise, expand along with existing ones
        return [...prevKeys, index];
      }
    });
  };

  const handleOpenMISModal = () => {
    startTransition(() => {
      setIsCompanyListModal(true);
    });
  };

  const handleChangeDate = (date, key) => {
    console.log(date, "datedate");
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
      endDate.setHours(23, 58, 59, 99); // Set time to 23:58:59

      const Data = {
        StartDate: formatDateToUTC(startDate, 1),
        EndDate: formatDateToUTC(endDate, 1),
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
      StartDate: new Date(),
      EndDate: new Date(),
    });
  };
  const onClickOpenExport = () => {};

  return (
    <>
      <div className="card-box position-relative mis-style">
        <div className="box-header bg-primary-orange px-3">
          {/* <div className="text-start color-white fw-bold fs-6">MIS</div> */}
          <Row>
            <Col
              sm={6}
              md={6}
              lg={6}
              className="text-start color-white fw-bold fs-6"
            >
              MIS
            </Col>
            {/* <Col
              sm={6}
              md={6}
              lg={6}
              className="d-flex align-item-center justify-content-end  color-white fw-bold fs-6"
            >
              <Popover
                content={
                  <div className={"export-options"}>
                    <CustomButton
                      // value={"Excel"}
                      icon={<img src={excelImage} alt="Excel Icon" />}
                      className={"bg-none"}
                      // onClick={() => handleExport("excel")}
                      // className={styles["export-button"]}
                    />
                    <CustomButton
                      icon={<img src={pdfImage} alt="PDF Icon" />}
                      // onClick={() => handleExport("pdf")}
                      className={"bg-none"}
                    />
                  </div>
                }
                trigger="click"
                open={exportButton}
                onOpenChange={() => setExportButton(!exportButton)}
                placement="bottom"
                arrow={false}
              >
                <CustomButton
                  applyClass={"Export-button_MIS"}
                  value="Export"
                  onClick={onClickOpenExport}
                />
              </Popover>
            </Col> */}
          </Row>
        </div>
        <div className="p-2 position-relative">
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
                    {totalProfit === 0 ? (
                      <span className="color-black">
                        {formatPkAmount(totalProfit)}
                      </span>
                    ) : totalProfit > 0 ? (
                      <span className="color-green">
                        {formatPkAmount(totalProfit)}
                      </span>
                    ) : (
                      <span className="color-red">
                        ({formatPkAmount(Math.abs(totalProfit))})
                      </span>
                    )}
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
                    className={"d-block w-100"}
                    format="MM-DD-YYYY"
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
                    format="MM-DD-YYYY"
                    value={MisDate.EndDate}
                    minDate={
                      MisDate.StartDate !== ""
                        ? new Date(MisDate.StartDate)
                        : null
                    }
                    onChange={(date) => handleChangeDate(date, "EndDate")}
                    // inputReadOnly={true}
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

      {isCompanyListModal && (
        <Suspense fallback={"...Loading"}>
          <CompaniesListModal
            isCompanyListModal={isCompanyListModal}
            setIsCompanyListModal={setIsCompanyListModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default MIS;
