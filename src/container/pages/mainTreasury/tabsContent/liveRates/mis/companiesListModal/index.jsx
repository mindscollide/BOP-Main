import React, { useState } from "react";
import Modal from "@/components/common/globalModal/Modal";
import "./companiesListModal.css";
import { Col, Row } from "react-bootstrap";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import { useTableScrollBottom } from "@/utils/useTableScrollBottom";
import GlobalTable from "@/components/common/table/GlobalTable";
import { formatPkAmount } from "@/utils/formatters";

const CompaniesListModal = ({ isCompanyListModal, setIsCompanyListModal }) => {
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const [dropdownvalue, setDropdownvalue] = useState(10);

  const [selectPageSize, setSelectPageSize] = useState({
    value: 10,
    label: "10",
  });

  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    // if (recordsLength !== tableData.length) {
    //   // setHasReachedBottom(true);
    //   const FromDate = new Date(tradeCount.dateFrom.value);
    //   FromDate.setHours(0, 0, 0);
    //   const ToDate = new Date(tradeCount.dateTo.value);
    //   ToDate.setHours(23, 59, 59);
    //   let Data = {
    //     TxnID: tradeCount.TxnID.value,
    //     CorporateName: tradeCount.clientName.value,
    //     AccountNumber: tradeCount.AccountNumber.value,
    //     FromDate: formatDateToUTC(FromDate),
    //     ToDate: formatDateToUTC(ToDate),
    //     LCNumber: tradeCount.LC.value,
    //     Side: side.value,
    //     NatureOfTransactionID: tradeCount.natureOfClient.value,
    //     Amount: Number(tradeCount.Amount.value),
    //     sRow: sRow,
    //     Length: dropdownvalue,
    //   };
    //   // dispatch(GetAllTradesAPI(navigate, Data));
    //   dispatch(GetAllTradesAPI({ Data, navigate }));
    // }
  });

  const handlePageSizeChange = (newSize) => {
    console.log(newSize, "newSizenewSize");
    setSelectPageSize(newSize);
    setDropdownvalue(newSize.value);
    setSRow(0);
    setHasReachedBottom(false);
    // setTableData([]);
    setRecordLength(0);
    // try {
    //   const FromDate = new Date(tradeCount.dateFrom.value);
    //   FromDate.setHours(0, 0, 0);
    //   const ToDate = new Date(tradeCount.dateTo.value);
    //   ToDate.setHours(23, 59, 59);
    //   let Data = {
    //     TxnID: tradeCount.TxnID.value,
    //     CorporateName: tradeCount.clientName.value,
    //     AccountNumber: tradeCount.AccountNumber.value,
    //     FromDate: formatDateToUTC(FromDate),
    //     ToDate: formatDateToUTC(ToDate),
    //     LCNumber: tradeCount.LC.value,
    //     Side: side.value,
    //     NatureOfTransactionID: tradeCount.natureOfClient.value,
    //     Amount: Number(tradeCount.Amount.value),
    //     sRow: 0,
    //     Length: newSize.value,
    //   };
    //   dispatch(GetAllTradesAPI({ Data, navigate }));
    // } catch (error) {
    //   console.log("Error:, ", error);
    // }
  };
  const companyListColumns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: "350px",
      align: "left",
      ellipsis: true,
    },

    {
      title: "Volume",
      dataIndex: "amount",
      key: "amount",
      width: "100px",
      align: "start",
      ellipsis: true,
      render: (amount) => formatPkAmount(amount, { decimals: 2 }),
    },
  ];
  //TEMP
  const TableData = [
    { companyName: "Unilever Pakistan", amount: 500000 },
    { companyName: "Pakistan Petroleum", amount: 500000 },
    { companyName: "Nestle Pakistan", amount: 500000 },
    { companyName: "Lucky Cement", amount: 500000 },
    { companyName: "Gul Ahmed", amount: 500000 },
    { companyName: "Engro Corporation", amount: 500000 },
    { companyName: "Attock Cement", amount: 500000 },
    { companyName: "Arif Habib Limited", amount: 500000 },
    { companyName: "Abbott Laboratories (Pakistan) Limited", amount: 500000 },
    { companyName: "Unilever Pakistan", amount: 500000 },
    { companyName: "Pakistan Petroleum", amount: 500000 },
    { companyName: "Nestle Pakistan", amount: 500000 },
    { companyName: "Lucky Cement", amount: 500000 },
    { companyName: "Gul Ahmed", amount: 500000 },
    { companyName: "Engro Corporation", amount: 500000 },
    { companyName: "Attock Cement", amount: 500000 },
    { companyName: "Arif Habib Limited", amount: 500000 },
    { companyName: "Abbott Laboratories (Pakistan) Limited", amount: 500000 },
  ];
  return (
    <>
      <Modal
        show={isCompanyListModal}
        onHide={() => setIsCompanyListModal(false)}
        bodyClassName="CompanyListModalBox"
        headerClassName={"border-0"}
        centered
        // size="sm"
        closeButton={true}
        modalHeader={
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className="modal-title text-uppercase flex-fill"
              >
                <h5>Companies List</h5>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex align-items-center"
              >
                <SelectDropdown
                  value={selectPageSize}
                  onChange={handlePageSizeChange}
                  options={[
                    { label: "10", value: 10 },
                    { label: "25", value: 25 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                  ]}
                  classNamePrefix={"companyListPageSizeDropdown"}
                ></SelectDropdown>
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <GlobalTable
                  columns={companyListColumns}
                  pagination={false}
                  // rows={tableData}
                  dataSource={TableData}
                  scroll={{ x: "max-content", y: "50vh" }}
                  className={"CompanyList-table"}
                  // loading={GetAllTradesLoader}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default CompaniesListModal;
