import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";
import { setTreasuryFowardsTenorsChanges } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { Col, Row } from "react-bootstrap";

const BankForwards = () => {
  const dispatch = useDispatch();

  /**
   * Table state used by UI
   */
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  /**
   * IMPORTANT:
   * dataSourceRef stores the latest snapshot of the table.
   *
   * Why we use it?
   * Because MQTT updates arrive very frequently and React
   * state can be overridden when API or other effects rebuild the table.
   *
   * This ref ensures we always update the latest version of the data.
   */
  const dataSourceRef = useRef([]);

  /**
   * Redux selectors
   */
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  const GetBankForwardForTreasury = useSelector(
    (state) => state.WatchListReducer.GetBankForwardForTreasury
  );

  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const TreasuryForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryForwardRates
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  const treasuryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.treasuryFowardsTenorsChanges
  );

  /**
   * BUILD TABLE FROM API DATA
   *
   * This runs when:
   * - Tenors change
   * - Instruments change
   * - Initial forward rates arrive
   */
  useEffect(() => {
    if (getAllTenorsRecords && GetAllInstrumentForTreasury) {
      try {
        const { forwardRates = [] } = GetBankForwardForTreasury || {};

        const { forwardInstruments = [] } = GetAllInstrumentForTreasury;

        const getAllTenorsData = {
          tenors: getAllTenorsRecords.tenors,
        };

        const getAllInstrument = {
          instruments: forwardInstruments,
        };

        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData?.length) {
          /**
           * Save snapshot inside ref
           */
          dataSourceRef.current = rowData;

          /**
           * Update UI
           */
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.error("Error building forwards table:", error);
      }
    }
  }, [
    GetBankForwardForTreasury,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);

  /**
   * HANDLE TENOR CHANGES (MQTT EVENT)
   *
   * Sometimes server sends updated tenor applicability.
   * We rebuild the table with new tenor rules.
   */
  useEffect(() => {
    if (
      treasuryFowardsTenorsChanges &&
      getAllTenorsRecords &&
      GetAllInstrumentForTreasury
    ) {
      try {
        const { newIsForwardtenorList = [], removedtenorList = [] } =
          treasuryFowardsTenorsChanges;

        const allTenors = [...(getAllTenorsRecords.tenors || [])];

        const { forwardInstruments = [] } = GetAllInstrumentForTreasury;

        /**
         * Convert removed tenors into a fast lookup set
         */
        const removedSet = new Set(
          removedtenorList.map((item) => item.tenorID)
        );

        /**
         * Update tenor applicability
         */
        const updatedTenors = allTenors.map((tenor) => ({
          ...tenor,
          isForwardingApplicable: !removedSet.has(tenor.tenorID),
        }));

        const { forwardRates = [] } = GetBankForwardForTreasury || {};

        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          { tenors: updatedTenors },
          { instruments: forwardInstruments },
          IndexCell
        );

        if (rowData?.length) {
          dataSourceRef.current = rowData;

          setDataSource(rowData);
          setColumnsData(columnsData);
        }

        /**
         * Clear redux flag after applying update
         */
        dispatch(setTreasuryFowardsTenorsChanges(null));
      } catch (error) {
        console.error("Tenor update error:", error);
      }
    }
  }, [
    treasuryFowardsTenorsChanges,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);

  /**
   * MQTT RATE UPDATE HANDLER
   *
   * Updates bid / ask rates in realtime.
   *
   * Using throttle to prevent UI flooding
   * when many updates arrive per second.
   */
  const updateForwardRatesRef = useRef(
    throttle((treasuryForwardRates) => {
      const { forwardRates = [] } = treasuryForwardRates;
      if (!forwardRates.length) return;

      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        forwardRates.forEach((d) => {
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

      dataSourceRef.current = updated;
      setDataSource(updated);
    }, 20)
  );

  /**
   * Listen to MQTT forward rate updates
   */
  useEffect(() => {
    if (TreasuryForwardRates) {
      updateForwardRatesRef.current(TreasuryForwardRates);
    }
  }, [TreasuryForwardRates]);

  /**
   * MARKET CLOSED HANDLER
   *
   * Reset all bid/ask values to zero
   */
  useEffect(() => {
    if (marketStatus === false) {
      const updated = dataSourceRef.current.map((row) => {
        const updatedRow = { ...row };

        Object.keys(updatedRow).forEach((key) => {
          if (key.startsWith("bid_") || key.startsWith("ask_")) {
            updatedRow[key] = 0;
          }
        });

        return updatedRow;
      });

      dataSourceRef.current = updated;
      setDataSource(updated);
    }
  }, [marketStatus]);

  return (
    <>
      <Row className='my-3'>
        <Col sm={12} md={12} lg={12}>
          <div className='flex-fill fs-4 fw-bold color-black mb-1 ff-roboto'>
            Bank Forwards
          </div>

          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls={"Treasury_Forwards"}
            bordered
            pagination={false}
            rowClassName={"striped-design"}
            rowHoverBg={"#000"}
          />
        </Col>
      </Row>
    </>
  );
};

export default BankForwards;
