import React, { useEffect, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { createColumns, generateData } from "@/components/utils/generateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import NonFEDiscountingModal from "../NonFeDiscountingModal/NonFEDiscountingModal";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";

const BranchAndCorporateNonFeDiscountingTable = () => {
  const globalStateWatchlistCardData = useSelector(
    (state) => state.WatchListReducer?.GettheDashboardData ?? null
  );

  const GetDiscountingRatesForCounterParty = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForCounterParty
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //local states
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  //NON-FE Dsicounting Modal Modal State
  const [nonfeDiscountingModalCall, setNonfeDiscountingModalCall] =
    useState(false);

  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      globalStateWatchlistCardData != null &&
      GetDiscountingRatesForCounterParty
    ) {
      try {
        const { nonFEDiscountingRates } = GetDiscountingRatesForCounterParty;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments:
            globalStateWatchlistCardData.discountingApplicableInstruments,
        };

        const { columnsData, rowData } = buildDiscountingTable(
          3,
          nonFEDiscountingRates,
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

  const handleNonFEDiscountingModal = () => {
    setNonfeDiscountingModalCall(true);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} className="heading mb-2">
          Non-FE Discounting
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
            value="Non-FE Discounting"
            applyClass={"FowwardBranchBookaForwardBtn"}
            onClick={handleNonFEDiscountingModal}
          />
        </Col>
      </Row>

      {nonfeDiscountingModalCall && (
        <NonFEDiscountingModal
          nonfeDiscountingModalCall={nonfeDiscountingModalCall}
          setNonfeDiscountingModalCall={setNonfeDiscountingModalCall}
        />
      )}
    </>
  );
};

export default BranchAndCorporateNonFeDiscountingTable;
