import React, { useEffect, useMemo, useRef, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/common/globalButton/button";
import { Col, Row } from "react-bootstrap";
import CorporateBookaForwardModal from "./CorporateBookaForwardModal/CorporateBookaForwardModal";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { throttle } from "lodash";
import { useBidOffer } from "@/context/BidOfferContext";

const BranchForwardsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bidOfferStatus } = useBidOffer();

  // ---------------- TABLE STATE ----------------
  const [dataSource, setDataSource] = useState([]);
  const dataSourceRef = useRef([]); // snapshot for MQTT updates
  const [columnsData, setColumnsData] = useState([]);
  const [rfqButtonState, setRFqButtonState] = useState(null);

  // ---------------- MODAL STATE ----------------
  const [bookaForwardModalCall, setBookaForwardModalCall] = useState(false);

  // ---------------- TABLE INIT FLAG ----------------
  const isTableInitialized = useRef(false);

  // ---------------- REDUX SELECTORS ----------------
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );
  const CounterPartyForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartyForwardRates
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const treasuryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.treasuryFowardsTenorsChanges
  );
  const GetForwardRatesForCounterPartyData = useSelector(
    (state) => state.WatchListReducer.GetForwardRatesForCounterParty
  );
  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );
  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.ClearRatesData
  );
  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated
  );

  // ---------------- RFQ BUTTON STATE ----------------
  useEffect(() => {
    if (isTradeRights !== null) setRFqButtonState(JSON.parse(isTradeRights));
  }, [isTradeRights]);

  // ---------------- INITIAL TABLE BUILD ----------------
  useEffect(() => {
    if (
      getAllInstrumentsForCounterPartiesData &&
      getAllTenorsRecords &&
      !isTableInitialized.current
    ) {
      console.log;
      try {
        const { forwardApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;
        const { forwardRates = [] } = GetForwardRatesForCounterPartyData ?? {};
        const getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        const getAllInstrument = { instruments: forwardApplicableInstruments };

        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell,
          null,
          bidOfferStatus
        );

        if (rowData.length > 0) {
          setDataSource(rowData);
          dataSourceRef.current = rowData; // snapshot
          setColumnsData(columnsData);
          isTableInitialized.current = true;
        }
      } catch (error) {
        console.error("Error building forwards table:", error);
      }
    }
  }, [
    getAllInstrumentsForCounterPartiesData,
    getAllTenorsRecords,
    GetForwardRatesForCounterPartyData,
    bidOfferStatus,
  ]);

  // ---------------- THROTTLED MQTT RATE UPDATE ----------------
  const throttledForwardUpdate = useMemo(
    () =>
      throttle((forwardRatesUpdate) => {
        const { forwardsInstrumentData } = forwardRatesUpdate;

        const updated = dataSourceRef.current.map((row) => {
          const updatedRow = { ...row };

          forwardsInstrumentData.forEach((d) => {
            Object.keys(row).forEach((key) => {
              if (
                key.startsWith("InstrumentID_") &&
                row[key] === d.instrumentID &&
                row.tenorID === d.tenorID
              ) {
                const currency = key.split("_")[1];
                updatedRow[`bid_${currency}`] = d.bidWithSpread;
                updatedRow[`ask_${currency}`] = d.askWithSpread;
              }
            });
          });

          return updatedRow;
        });

        dataSourceRef.current = updated; // update snapshot
        setDataSource(updated); // update UI
      }, 20),
    []
  );

  useEffect(() => {
    if (CounterPartyForwardRates)
      throttledForwardUpdate(CounterPartyForwardRates);
    return () => throttledForwardUpdate.cancel();
  }, [CounterPartyForwardRates, throttledForwardUpdate]);

  // ---------------- MARKET CLOSED / CLEAR RATES ----------------
  const resetRates = () => {
    const cleared = dataSourceRef.current.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedRow).forEach((key) => {
        if (key.startsWith("bid_") || key.startsWith("ask_"))
          updatedRow[key] = 0;
      });
      return updatedRow;
    });
    dataSourceRef.current = cleared;
    setDataSource(cleared);
  };

  useEffect(() => {
    if (marketStatus === false || ClearRatesData?.areRatesClear) resetRates();
  }, [marketStatus, ClearRatesData]);

  // ---------------- OPEN BOOK FORWARD MODAL ----------------
  const handleBookaForwardCorporate = () => setBookaForwardModalCall(true);

  // ---------------- RENDER ----------------
  return (
    <>
      <Row>
        <Col lg={12}>
          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls='branch_forwardsTable'
            pagination={false}
            bordered
            rowKey='tenorID'
            scroll={{ x: "max-content" }}
            rowClassName={(record, index) =>
              index % 2 === 0
                ? "branch_forwardsTable-odd"
                : "branch_forwardsTable-even"
            }
          />
        </Col>
      </Row>

      <Row className='my-2'>
        <Col lg={12} className='d-flex justify-content-center'>
          <CustomButton
            value='Book a Forward'
            applyClass='FowwardBranchBookaForwardBtn'
            onClick={handleBookaForwardCorporate}
            disabled={marketStatus === false || !rfqButtonState}
          />
        </Col>
      </Row>

      {bookaForwardModalCall && (
        <CorporateBookaForwardModal
          bookaForwardModalCall={bookaForwardModalCall}
          setBookaForwardModalCall={setBookaForwardModalCall}
        />
      )}
    </>
  );
};

export default BranchForwardsTable;
