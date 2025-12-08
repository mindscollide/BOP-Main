import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildTresmarkCrossPremiumTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import { setTreasuryFowardsTenorsChanges } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GetTresmarkCrossesPremiumsAPI } from "./TresmarkCrossesActions";

const TresmarkCrosses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataSource, setDataSource] = useState([]);

  const [columnsData, setColumnsData] = useState([]);

  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  const tresmarkCrossPremiumRates = useSelector(
    (state) => state.RealtimeActionsSlice.tresmarkCrossPremiumRates
  );

  const GetTresmarkCrossesPremiums = useSelector(
    (state) => state.TresmarkCrossesSlicer.GetTresmarkCrossesPremiums
  );
  const treasuryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.treasuryFowardsTenorsChanges
  );

  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  useEffect(() => {
    dispatch(GetTresmarkCrossesPremiumsAPI({ navigate }));
  }, []);

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table
  useEffect(() => {
    if (getAllTenorsRecords !== null && allInstrumentForTreasuryData !== null) {
      try {
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.forwardInstruments,
        };

        const { crossesPremiumsRates = [] } =
          GetTresmarkCrossesPremiums !== null && GetTresmarkCrossesPremiums;
        const { rowData, columnsData } = buildTresmarkCrossPremiumTable(
          3,
          crossesPremiumsRates,
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
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
    GetTresmarkCrossesPremiums,
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

        const { crossesPremiumsRates = [] } =
          GetTresmarkCrossesPremiums !== null && GetTresmarkCrossesPremiums;
        // const { forwardInstruments } = GetAllInstrumentForTreasury;
        const { rowData, columnsData } = buildTresmarkCrossPremiumTable(
          3,
          crossesPremiumsRates,
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

  const throttledTresmarkPremiumRatesUpdate = useMemo(
    () =>
      throttle((tresmarkPremiumRatesUpdate) => {
        const { crossesPremiumsRates } = tresmarkPremiumRatesUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            crossesPremiumsRates.forEach((d) => {
              Object.keys(row).forEach((key) => {
                if (
                  key.startsWith("InstrumentID_") &&
                  row[key] === d.instrumentID &&
                  row.tenorID === d.tenorID
                ) {
                  const currency = key.split("_")[1]; // e.g., USD
                  updatedRow[`bid_${currency}`] = d.bidPremium;
                  updatedRow[`ask_${currency}`] = d.askPremium;
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
    if (tresmarkCrossPremiumRates) {
      throttledTresmarkPremiumRatesUpdate(tresmarkCrossPremiumRates);
    }
  }, [tresmarkCrossPremiumRates, throttledTresmarkPremiumRatesUpdate]);

  return (
    <>
      <h6
        className={
          location.pathname.toLowerCase().includes("treasury".toLowerCase())
            ? "flex-fill fs-4 fw-bold color-black mb-1 ff-roboto"
            : "fs-4 fw-bold color-primary"
        }
      >
        Tresmark Crosses Premium
      </h6>

      <div className="mt-4">
        <GlobalTable
          columns={columnsData}
          prefixCls="Dealer_Forwards"
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </>
  );
};

export default TresmarkCrosses;
