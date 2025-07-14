import React, { useEffect, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import FEDiscountingModal from "../FEDiscountingModal/FEDiscountingModal";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";

const BranchAndCorporateFeDiscountingTable = () => {
  //local states
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [feDiscountingModalCall, setFeDiscountingModalCall] = useState(false);

  const globalStateWatchlistCardData = useSelector(
    (state) => state.WatchListReducer?.GettheDashboardData ?? null
  );

  const GetDiscountingRatesForCounterParty = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForCounterParty
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      globalStateWatchlistCardData != null &&
      GetDiscountingRatesForCounterParty
    ) {
      try {
        const { feDiscountingRates } = GetDiscountingRatesForCounterParty;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments:
            globalStateWatchlistCardData.discountingApplicableInstruments,
        };

        const { columnsData, rowData } = buildDiscountingTable(
          3,
          feDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {}
    }
  }, [
    getAllTenorsRecords,
    globalStateWatchlistCardData,
    GetDiscountingRatesForCounterParty,
  ]);

  const handleFEDiscountingModal = () => {
    setFeDiscountingModalCall(true);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} className="heading mb-2">
          FE Discounting
        </Col>
        <Col lg={12} md={12} sm={12}>
          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls={"branch_forwardsTable"}
            pagination={false}
            bordered
            rowClassName={(record, index) =>
              index % 2 === 0
                ? "branch_forwardsTable-odd"
                : "branch_forwardsTable-even"
            }
          />
        </Col>
      </Row>

      <Row className="my-2">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center align-items-center gap-2"
        >
          <CustomButton
            value="FE Discounting"
            applyClass={"FEDiscounting"}
            onClick={handleFEDiscountingModal}
          />
        </Col>
      </Row>
      {feDiscountingModalCall && (
        <FEDiscountingModal
          feDiscountingModalCall={feDiscountingModalCall}
          setFeDiscountingModalCall={setFeDiscountingModalCall}
        />
      )}
    </>
  );
};

export default BranchAndCorporateFeDiscountingTable;
