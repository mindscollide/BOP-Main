import React, { useEffect, useMemo, useRef, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import NonFEDiscountingModal from "../NonFeDiscountingModal/NonFEDiscountingModal";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { throttle } from "lodash";
import { useBidOffer } from "@/context/BidOfferContext";

const BranchAndCorporateNonFeDiscountingTable = () => {

  /**
   * Bid / Offer context
   */
  const { isBid } = useBidOffer();

  /**
   * Local states
   */
  const [rfqButtonState, setRFqButtonState] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  /**
   * Modal state
   */
  const [nonfeDiscountingModalCall, setNonfeDiscountingModalCall] =
    useState(false);

  /**
   * Prevents table rebuild (fix for MQTT reverting issue)
   */
  const isTableInitialized = useRef(false);

  /**
   * ---------------- REDUX SELECTORS ----------------
   */

  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated
  );

  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) =>
      state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
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

  /**
   * ------------------------------------------------
   * Update RFQ button state when trade rights change
   * ------------------------------------------------
   */
  useEffect(() => {
    if (isTradeRights !== null) {
      setRFqButtonState(JSON.parse(isTradeRights));
    }
  }, [isTradeRights]);

  /**
   * ------------------------------------------------
   * BUILD TABLE STRUCTURE (ONLY ONCE)
   *
   * Prevents rebuild that was overwriting MQTT updates
   * ------------------------------------------------
   */
  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      getAllInstrumentsForCounterPartiesData !== null &&
      !isTableInitialized.current
    ) {
      try {

        const { nonFEDiscountingRates = [] } =
          GetDiscountingRatesForCounterParty ?? {};

        const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };

        const getAllInstrument = {
          instruments:
            getAllInstrumentsForCounterPartiesData.nonFEDiscountingApplicableInstruments,
        };

        const { columnsData, rowData } = buildDiscountingTable(
          3,
          nonFEDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell,
          null,
          !isBid
        );

        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);

          /**
           * Mark table initialized
           */
          isTableInitialized.current = true;
        }

      } catch (error) {
        console.error("Error building Non-FE discounting table", error);
      }
    }
  }, [
    getAllTenorsRecords,
    getAllInstrumentsForCounterPartiesData,
    GetDiscountingRatesForCounterParty,
    isBid,
  ]);

  /**
   * ------------------------------------------------
   * REALTIME MQTT UPDATE HANDLER
   *
   * Updates only affected cells
   * throttle prevents excessive re-renders
   * ------------------------------------------------
   */
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
                    d.instrumentID === instrumentID &&
                    d.tenorID === tenorID
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

  /**
   * Trigger MQTT updates
   */
  useEffect(() => {
    if (CounterPartyNonFeDiscounting) {
      throttledUpdate(CounterPartyNonFeDiscounting);
    }
  }, [CounterPartyNonFeDiscounting, throttledUpdate]);

  /**
   * Cleanup throttle on unmount
   */
  useEffect(() => {
    return () => {
      throttledUpdate.cancel();
    };
  }, [throttledUpdate]);

  /**
   * ------------------------------------------------
   * MARKET CLOSED HANDLER
   * ------------------------------------------------
   */
  useEffect(() => {
    if (marketStatus === false) {

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

  /**
   * ------------------------------------------------
   * CLEAR RATES HANDLER
   * ------------------------------------------------
   */
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

  /**
   * Open Non-FE Discounting modal
   */
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
            rowKey="TenorID"
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
              !isBid ||
              marketStatus === false ||
              !rfqButtonState
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