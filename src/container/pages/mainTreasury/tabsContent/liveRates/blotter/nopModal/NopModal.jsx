import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomButton from "../../../../../../../components/common/globalButton/button";
import Modal from "../../../../../../../components/common/globalModal/Modal";
import GlobalTable from "../../../../../../../components/common/table/GlobalTable";

const NopModal = ({ openNopModal, setOpenNopModal }) => {
  const onCloseModalNop = () => {
    setOpenNopModal(false);
  };

  const dataSource = [
    {
      key: "1",
      name: "USD",
      InflowData: "55,000",
      OutflowData: "-",
      NetData: "55,000",
      ConversionData: "55,000",
    },
    {
      key: "2",
      name: "EUR",
      InflowData: "-",
      OutflowData: "55,000",
      NetData: "(5,000)",
      ConversionData: "(5,234)",
    },
    {
      key: "3",
      name: "GBP",
      InflowData: "-",
      OutflowData: "52,000",
      NetData: "(2,000)",
      ConversionData: "(2,472)",
    },
    { key: "4", name: "NOP" },
  ];

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
    },
    {
      title: "Outflow",
      dataIndex: "OutflowData",
      key: "OutflowData",
      align: "center",
    },
    {
      title: "Net",
      dataIndex: "NetData",
      key: "NetData",
      align: "center",
    },
    {
      title: "Conversion to US$",
      dataIndex: "ConversionData",
      key: "ConversionData",
      align: "center",
    },
  ];

  return (
    <>
      <Modal
        show={openNopModal}
        onHide={onCloseModalNop}
        setShow={setOpenNopModal}
        className="modal-nop-class"
        centered
        size="lg"
        modalBody={
          <>
            <div className="modal-header bg-none border-0">
              <Row className="align-items-center w-100">
                <Col lg={3} md={3} sm={3}>
                  <h4 className="heading fw-bold">NOP (US$)</h4>
                </Col>
                <Col
                  lg={9}
                  md={9}
                  sm={9}
                  className="d-flex justify-content-end gap-1"
                >
                  <CustomButton
                    className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                    applyClass={"NopModalBtn"}
                    value="Download History"
                  />
                  <CustomButton
                    className="btn-sm btn-primary ms-2 download-history-btn-trigger"
                    applyClass={"NopdownloadButton"}
                    icon={<i className="icon-download"></i>}
                  />
                </Col>
              </Row>
            </div>

            <GlobalTable
              columns={columns}
              dataSource={dataSource}
              prefixCls={"NOP-Modal-thead"}
              pagination={false}
            />
          </>
        }
      />
      <div>NopModal</div>
    </>
  );
};

export default NopModal;
