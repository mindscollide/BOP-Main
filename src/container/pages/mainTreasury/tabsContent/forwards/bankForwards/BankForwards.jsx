import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import { setTreasuryFowardsTenorsChanges } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";

const BankForwards = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

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

  useEffect(() => {
    if (getAllTenorsRecords !== null && GetAllInstrumentForTreasury !== null) {
      try {
        const { forwardRates = [] } =
          GetBankForwardForTreasury !== null && GetBankForwardForTreasury;
        const { forwardInstruments } = GetAllInstrumentForTreasury;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = { instruments: forwardInstruments };

        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [
    GetBankForwardForTreasury,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);

  useEffect(() => {
    if (
      treasuryFowardsTenorsChanges !== null &&
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { newIsForwardtenorList = [], removedtenorList = [] } =
          treasuryFowardsTenorsChanges;
        const allTenors = [...(getAllTenorsRecords.tenors || [])];

        const { forwardInstruments } = GetAllInstrumentForTreasury;
        // Convert arrays of objects to Set of IDs
        const removedSet = new Set(
          removedtenorList.map((item) => item.tenorID)
        );
        const newSet = new Set(
          newIsForwardtenorList.map((item) => item.tenorID)
        );

        // Update each tenor's isForwardingApplicable field
        const updatedTenors = allTenors.map((tenor) => ({
          ...tenor,
          isForwardingApplicable: removedSet.has(tenor.tenorID) ? false : true, // leave unchanged if in neither
        }));
        // const filteredTenors = updatedTenors.filter(
        //   (t) => t.isForwardingApplicable
        // );
        // console.log(updatedTenors, "updatedTenorsupdatedTenors");
        let getAllTenorsData = { tenors: updatedTenors };
        let getAllInstrument = {
          instruments: forwardInstruments,
        };

        const { forwardRates = [] } =
          GetBankForwardForTreasury !== null &&
          GetBankForwardForTreasury !== undefined &&
          GetBankForwardForTreasury;
        // const { forwardInstruments } = GetAllInstrumentForTreasury;
        const { rowData, columnsData } = buildForwardsTable(
          3,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
        dispatch(setTreasuryFowardsTenorsChanges(null));
        // console.log(updatedTenors, "updatedTenorsupdatedTenors");
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    treasuryFowardsTenorsChanges,
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
  ]);

  const updateForwardRates = useMemo(
    () =>
      throttle(
        (treasuryForwardRates, setDataSource) => {
          const { forwardRates = [] } = treasuryForwardRates;
          if (forwardRates.length === 0) return;

          setDataSource((prevData) =>
            prevData.map((row) => {
              let updatedRow = { ...row };

              forwardRates.forEach((d) => {
                Object.keys(row).forEach((key) => {
                  if (
                    key.startsWith("InstrumentID_") &&
                    row[key] === d.instrumentID &&
                    row.tenorID === d.tenorID // fallback
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
        },
        50,
        { leading: true, trailing: true }
      ),
    [] // sirf ek baar banega
  );

  useEffect(() => {
    if (TreasuryForwardRates) {
      updateForwardRates(TreasuryForwardRates, setDataSource);
    }
  }, [TreasuryForwardRates, updateForwardRates, marketStatus]);

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

  return (
    <>
      <Row className="my-3">
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
