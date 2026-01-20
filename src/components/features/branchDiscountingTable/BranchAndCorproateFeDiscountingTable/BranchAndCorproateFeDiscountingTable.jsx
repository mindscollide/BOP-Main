import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import FEDiscountingModal from "../FEDiscountingModal/FEDiscountingModal";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { throttle } from "lodash";
import { useBidOffer } from "@/context/BidOfferContext";

const BranchAndCorporateFeDiscountingTable = () => {
  //local states
  const { isBid, isOffer } = useBidOffer();

  console.log(isBid, "isBidisBid");
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [feDiscountingModalCall, setFeDiscountingModalCall] = useState(false);

  const [rfqButtonState, setRFqButtonState] = useState(null);

  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated,
  );
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) =>
      state.WatchListReducer?.getAllInstrumentForCounterParties ?? null,
  );
  const CounterPartyFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartyFeDiscounting,
  );
  const GetDiscountingRatesForCounterParty = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForCounterParty,
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors,
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus,
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.ClearRatesData,
  );

  useEffect(() => {
    if (isTradeRights !== null) {
      setRFqButtonState(JSON.parse(isTradeRights));
      console.log(isTradeRights, "isTradeRightsisTradeRights");
    }
  }, [isTradeRights]);

  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      getAllInstrumentsForCounterPartiesData != null
    ) {
      try {
        const { feDiscountingRates = [] } =
          GetDiscountingRatesForCounterParty !== null &&
          GetDiscountingRatesForCounterParty;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments:
            getAllInstrumentsForCounterPartiesData.discountingApplicableInstruments,
        };

        const { columnsData, rowData } = buildDiscountingTable(
          3,
          feDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell,
          null,
          !isBid,
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
    isBid,
  ]);

  const throttledUpdate = useMemo(
    () =>
      throttle((discountingUpdate) => {
        const { feDiscountingInstrumentData } = discountingUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            const updatedRow = { ...row };

            Object.keys(row).forEach((key) => {
              if (key.startsWith("InstrumentID_")) {
                const currency = key.split("_")[1];
                const instrumentID = row[key];
                const tenorID = row.TenorID;

                const match = feDiscountingInstrumentData.find(
                  (d) =>
                    d.instrumentID === instrumentID && d.tenorID === tenorID,
                );

                if (match) {
                  updatedRow[`rate_${currency}`] = match.bidWithSpread;
                }
              }
            });

            return updatedRow;
          }),
        );
      }, 20),
    [],
  );

  useEffect(() => {
    if (CounterPartyFeDiscounting) {
      throttledUpdate(CounterPartyFeDiscounting);
    }
  }, [CounterPartyFeDiscounting, throttledUpdate]);

  useEffect(() => {
    if (marketStatus !== null && marketStatus === false) {
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };

          Object.keys(row).forEach((key) => {
            if (key.startsWith("InstrumentID_")) {
              const currency = key.split("_")[1];
              updatedRow[`rate_${currency}`] = 0;
            }
          });

          return updatedRow;
        }),
      );
    }
  }, [marketStatus]);

  // For clear Rates
  useEffect(() => {
    if (ClearRatesData?.areRatesClear) {
      console.log("Cgcecececec");
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };

          Object.keys(row).forEach((key) => {
            if (key.startsWith("InstrumentID_")) {
              const currency = key.split("_")[1];
              updatedRow[`rate_${currency}`] = 0;
            }
          });

          return updatedRow;
        }),
      );
    }
  }, [ClearRatesData]);

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
            disabled={
              !isBid
                ? true
                : (marketStatus !== null && marketStatus === false) ||
                    !isTradeRights
                  ? true
                  : false
            }
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
