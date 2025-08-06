import React, { useEffect, useMemo, useState } from "react";
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
import { throttle } from "lodash";

const BranchAndCorporateNonFeDiscountingTable = () => {
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const GetDiscountingRatesForCounterParty = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForCounterParty
  );
  const CounterPartyNonFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartyNonFeDiscounting
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.ClearRatesData
  );

  console.log(ClearRatesData, "ClearRatesData");

  console.log(
    typeof marketStatus,
    typeof JSON.parse(marketStatus),
    "marketStatusmarketStatus"
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
      getAllInstrumentsForCounterPartiesData != null
    ) {
      try {
        const { nonFEDiscountingRates = [] } =
          GetDiscountingRatesForCounterParty !== null &&
          GetDiscountingRatesForCounterParty;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments:
            getAllInstrumentsForCounterPartiesData.nonFEDiscountingApplicableInstruments,
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
    getAllInstrumentsForCounterPartiesData,
    GetDiscountingRatesForCounterParty,
  ]);

  const throttledUpdate = useMemo(
    () =>
      throttle((discountingUpdate) => {
        const { nonFEDiscountingInstrumentData } = discountingUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            const updatedRow = { ...row };

            Object.keys(row).forEach((key) => {
              if (key.startsWith("InstrumentID_")) {
                const currency = key.split("_")[1];
                const instrumentID = row[key];
                const tenorID = row.TenorID;

                const match = nonFEDiscountingInstrumentData.find(
                  (d) =>
                    d.instrumentID === instrumentID && d.tenorID === tenorID
                );

                if (match) {
                  updatedRow[`rate_${currency}`] = match.bidWithSpread;
                }
              }
            });

            return updatedRow;
          })
        );
      }, 20),
    []
  );

  useEffect(() => {
    if (CounterPartyNonFeDiscounting) {
      throttledUpdate(CounterPartyNonFeDiscounting);
    }
  }, [CounterPartyNonFeDiscounting, throttledUpdate]);

  useEffect(() => {
    if (marketStatus !== null && marketStatus === false) {
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };
          Object.keys(updatedRow).forEach((key) => {
            if (key.startsWith("rate_")) {
              updatedRow[key] = 0;
            }
          });
          return updatedRow;
        })
      );
    }
  }, [marketStatus]);

  // For clear Rates
  useEffect(() => {
    if (ClearRatesData?.areRatesClear) {
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };
          Object.keys(updatedRow).forEach((key) => {
            if (key.startsWith("rate_")) {
              updatedRow[key] = 0;
            }
          });
          return updatedRow;
        })
      );
    }
  }, [ClearRatesData]);

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
            disabled={
              marketStatus !== null && marketStatus === false ? true : false
            }
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
