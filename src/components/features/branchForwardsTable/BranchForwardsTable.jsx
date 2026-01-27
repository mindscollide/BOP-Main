import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { GetAllFowardsAndDiscountsRatesAPI } from "../SpotBranch/WatchlistAction";
import { useSelector } from "react-redux";
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

  const [dataSource, setDataSource] = useState([]);

  console.log(dataSource, "bidOfferStatusbidOfferStatus");

  const [columnsData, setColumnsData] = useState([]);
  const [rfqButtonState, setRFqButtonState] = useState(null);

  //Book a Forward Modal State
  const [bookaForwardModalCall, setBookaForwardModalCall] = useState(false);

  //Global State for Watchlist Card Data
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const CounterPartyForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartyForwardRates
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
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

  // const isTradeRights =
  //   localStorage.getItem("isTradeRights") !== null &&
  //   JSON.parse(localStorage.getItem("isTradeRights"));

  // console.log(ClearRatesData, "ClearRatesData");

  // console.log(
  //   getAllInstrumentsForCounterPartiesData !== null &&
  //     getAllTenorsRecords !== null &&
  //     GetForwardRatesForCounterPartyData !== null,
  //   getAllInstrumentsForCounterPartiesData,
  //   getAllTenorsRecords,
  //   GetForwardRatesForCounterPartyData,
  //   "GetForwardRatesForCounterPartyDataGetForwardRatesForCounterPartyData"
  // );

  useEffect(() => {
    if (isTradeRights !== null) {
      setRFqButtonState(JSON.parse(isTradeRights));
      console.log(isTradeRights, "isTradeRightsisTradeRights");
    }
  }, [isTradeRights]);

  useEffect(() => {
    if (
      getAllInstrumentsForCounterPartiesData !== null &&
      getAllTenorsRecords !== null
      // GetForwardRatesForCounterPartyData !== null
    ) {
      try {
        const { forwardApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;
        console.log(
          forwardApplicableInstruments,
          "forwardApplicableInstrumentsforwardApplicableInstruments"
        );

        //********************************************** */
        // const { tenors, forwardRates, instruments } =
        //   GetAllFowardsAndDiscountsRatesAPIData;
        const { forwardRates = [] } =
          GetForwardRatesForCounterPartyData !== null &&
          GetForwardRatesForCounterPartyData;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = { instruments: forwardApplicableInstruments };

        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell,
          null,
          bidOfferStatus
        );
        // console.log(rowData, columnsData, "columnsDatacolumnsData");
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [
    getAllInstrumentsForCounterPartiesData,
    getAllTenorsRecords,
    GetForwardRatesForCounterPartyData,
    bidOfferStatus,
  ]);

  const throttledForwardUpdate = useMemo(
    () =>
      throttle((forwardRatesUpdate) => {
        const { forwardsInstrumentData } = forwardRatesUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

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
          })
        );
      }, 20),
    []
  );

  useEffect(() => {
    if (CounterPartyForwardRates) {
      throttledForwardUpdate(CounterPartyForwardRates);
    }
  }, [CounterPartyForwardRates, throttledForwardUpdate]);

  useEffect(() => {
    if (marketStatus !== null && marketStatus === false) {
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };
          Object.keys(row).forEach((key) => {
            if (key.startsWith("bid_") || key.startsWith("ask_")) {
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
      console.log("Cgcecececec");
      setDataSource((prevData) =>
        prevData.map((row) => {
          const updatedRow = { ...row };
          Object.keys(updatedRow).forEach((key) => {
            if (key.startsWith("bid_") || key.startsWith("ask_")) {
              updatedRow[key] = 0;
            }
          });
          return updatedRow;
        })
      );
    }
  }, [ClearRatesData]);

  const handleBookaForwardCorporate = () => {
    setBookaForwardModalCall(true);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls={"branch_forwardsTable"}
            pagination={false}
            bordered
            rowKey={(record, index) => record.tenorID}
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
        <Col
          lg={12}
          md={12}
          sm={12}
          className='d-flex justify-content-center align-items-center'>
          <CustomButton
            value='Book a Forward'
            applyClass={"FowwardBranchBookaForwardBtn"}
            onClick={handleBookaForwardCorporate}
            disabled={
              (marketStatus !== null && marketStatus === false) ||
              !isTradeRights
                ? true
                : false
            }
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
