import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
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

const BranchForwardsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
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
  console.log(
    getAllInstrumentsForCounterPartiesData !== null &&
      getAllTenorsRecords !== null &&
      GetForwardRatesForCounterPartyData !== null,
    getAllInstrumentsForCounterPartiesData,
    getAllTenorsRecords,
    GetForwardRatesForCounterPartyData,
    "GetForwardRatesForCounterPartyDataGetForwardRatesForCounterPartyData"
  );
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
          IndexCell
        );
        // console.log(rowData, columnsData, "columnsDatacolumnsData");
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
        //********************************************** */
        // const { tenors, forwardRates, instruments } =
        //   GetAllFowardsAndDiscountsRatesAPIData;
        // let getAllTenorsData = { tenors };
        // let getAllInstrument = { instruments };
        // const { rowData, columnsData } = buildForwardsTable(
        //   2,
        //   forwardRates,
        //   getAllTenorsData,
        //   getAllInstrument,
        //   IndexCell
        // );
        // console.log(rowData, columnsData, "columnsDatacolumnsData");
        // if (rowData.length > 0) {
        //   setDataSource(rowData);
        //   setColumnsData(columnsData);
        // }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [
    getAllInstrumentsForCounterPartiesData,
    getAllTenorsRecords,
    GetForwardRatesForCounterPartyData,
  ]);
  useEffect(() => {
    if (!CounterPartyForwardRates) return;

    const throttledUpdate = throttle((forwardRatesUpdate) => {
      const { forwardsInstrumentData } = forwardRatesUpdate;

      setDataSource((prevData) =>
        prevData.map((row) => {
          let updatedRow = { ...row };

          forwardsInstrumentData.forEach((d) => {
            // row ke sabhi keys loop karo
            Object.keys(row).forEach((key) => {
              if (
                key.startsWith("InstrumentID_") &&
                row[key] === d.instrumentID
              ) {
                const currency = key.split("_")[1]; // e.g. USD
                // check karo tenorID match karta hai ya nahi
                if (row.tenorID === d.tenorID) {
                  updatedRow[`bid_${currency}`] = d.bidWithSpread;
                  updatedRow[`ask_${currency}`] = d.askWithSpread;
                }
              }
            });
          });

          return updatedRow;
        })
      );
    }, 20);

    throttledUpdate(CounterPartyForwardRates);

    return () => throttledUpdate.cancel();
  }, [CounterPartyForwardRates]);

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
