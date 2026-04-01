import React, { useEffect } from "react";
import { useState } from "react";
import { Radio, Space } from "antd";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import Modal from "@/components/common/globalModal/Modal";
import GlobalTable from "@/components/common/table/GlobalTable";
import DatePickerCom from "@/components/common/datePicker/DatePicker";
import "./NopModal.css";
import { useSelector } from "react-redux";
import { DownloadExcelReportNOPCalculationsAPI } from "@/store/ReportSlicer/ReportActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPkAmount } from "@/utils/formatters";

const NopModal = ({ openNopModal, setOpenNopModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState(null);
  const GetNOPData = useSelector((state) => state.BlotterSlicer.GetNOPData);

  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const [openDownloadTab, setOpenDownloadTab] = useState(false);

  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClickDownloadButton = () => {
    setOpenDownloadTab(true);
  };

  const onClickGoBack = () => {
    setOpenDownloadTab(false);
  };

  const onCloseModalNop = () => {
    setOpenNopModal(false);
  };

  useEffect(() => {
    if (
      GetNOPData !== null &&
      GetNOPData?.listOfInstruments &&
      GetAllInstrumentForTreasury !== null
    ) {
  
      const NOPData = GetNOPData.listOfInstruments.map((data, index) => ({
        key: index.toString(),
        name: <p className="fw-bold m-0">{data.instrumentName}</p>,
        InflowData: formatPkAmount(data.inflow),
        OutflowData: formatPkAmount(data.outflow),
        NetData: `${data.net < 0 ? `(${formatPkAmount(Math.abs(data.net))})` : formatPkAmount(data.net)}`,
        ConversionData: (
          <p className="fw-bold m-0">
            {data.conversionToDollar < 0
              ? `(${formatPkAmount(Math.abs(data.conversionToDollar))})`
              : formatPkAmount(data.conversionToDollar)}
          </p>
        ),
      }));

      // Append the NOP summary row
      NOPData.push({
        key: (NOPData.length + 1).toString(),
        name: <p className="fw-bold m-0">NOP</p>,
        InflowData: "",
        OutflowData: "",
        NetData: "",
        ConversionData: (
          <p className="fw-bold m-0">
            {GetNOPData.nop < 0
              ? `(${formatPkAmount(Math.abs(GetNOPData.nop))})`
              : formatPkAmount(GetNOPData.nop)}
          </p>
        ),
      });

      setDataSource(NOPData);
    }
  }, [GetNOPData]);

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Inflow",
      dataIndex: "InflowData",
      key: "InflowData",
      align: "center",
      render: (text, record, index) => {
        if (index === 3) {
          return {
            children: null,
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Outflow",
      dataIndex: "OutflowData",
      key: "OutflowData",
      align: "center",
      render: (text, record, index) => {
        if (index === 3) {
          return {
            children: null,
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Net",
      dataIndex: "NetData",
      key: "NetData",
      align: "center",
      render: (text, record, index) => {
        if (index === 3) {
          return {
            children: null,
            props: {
              colSpan: 3,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Conversion to US$",
      dataIndex: "ConversionData",
      key: "ConversionData",
      align: "center",
    },
  ];

  const handleDownloadNOPExcelReport = () => {
    console.log("hello");
    dispatch(DownloadExcelReportNOPCalculationsAPI({ navigate }));
  };

  return (
    <>
      <Modal
        show={openNopModal}
        onHide={() => setOpenNopModal(false)}
        className="modal-nop-class"
        centered
        size="lg"
        modalBody={
          <>
            {openDownloadTab ? (
              <>
                <div className="bg-none border-0 mb-3">
                  <Row className="align-items-center w-100">
                    <Col lg={3} md={3} sm={3}>
                      <h4 className="heading fw-bold">NOP (US$)</h4>
                    </Col>
                    <Col
                      lg={9}
                      md={9}
                      sm={9}
                      className="d-flex justify-content-end gap-1 px-0"
                    >
                      <CustomButton
                        className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                        value="Back"
                        onClick={onClickGoBack}
                        applyClass={"NopdownloadButton"}
                      />
                    </Col>
                  </Row>
                </div>

                <div>
                  <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={1}>All</Radio>
                          <Radio value={2}>
                            Select Range
                            <span className="ps-3">
                              <DatePickerCom
                                applyClass={"DatePickerField-NOP"}
                                zIndex={9999}
                              />
                              <span className="picker-date-range-To-Span">
                                To
                              </span>
                              <DatePickerCom
                                applyClass={"DatePickerField-NOP"}
                                zIndex={9999}
                              />
                            </span>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-center align-items-center mt-3 mb-3">
                      <CustomButton
                        className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                        applyClass={"NopModalBtn"}
                        value="Download History"
                      />
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <>
                <div className="bg-none border-0 mb-3">
                  <Row className="align-items-center w-100">
                    <Col lg={3} md={3} sm={3}>
                      <h4 className="heading fw-bold">NOP (US$)</h4>
                    </Col>
                    <Col
                      lg={9}
                      md={9}
                      sm={9}
                      className="d-flex justify-content-end gap-1 px-0"
                    >
                      {/* <CustomButton
                        className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                        applyClass={"NopModalBtn"}
                        onClick={onClickDownloadButton}
                        value="Download History"
                      /> */}
                      <CustomButton
                        className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                        applyClass={"NopdownloadButton"}
                        onClick={handleDownloadNOPExcelReport}
                        icon={<i className="icon-download"></i>}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="border-0 pe-2 mb-2">
                  <GlobalTable
                    columns={columns}
                    dataSource={dataSource}
                    prefixCls={"NOP-Modal"}
                    pagination={false}
                  />
                </div>
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default NopModal;
