import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";
import {
  clearCategoryForwardClearRates,
  setCategoryFowardsTenorsChanges,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useDispatch } from "react-redux";
import { UpdateGetCategoryWiseForwardRates } from "@/store/categoryReducer/categoryReducer";

const CategoryForwards = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);

  const [columnsData, setColumnsData] = useState([]);
  const GetCategoryWiseForwardRatesData = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseForwardRates
  );
  console.log(
    GetCategoryWiseForwardRatesData,
    "GetCategoryWiseForwardRatesDataGetCategoryWiseForwardRatesData"
  );

  const allInstrumentForTreasuryData = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  const CategoryForwardRates = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryForwardRates
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.CategoryForwardClearRates
  );
  const categoryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.categoryFowardsTenorsChanges
  );

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table
  useEffect(() => {
    if (getAllTenorsRecords !== null && allInstrumentForTreasuryData !== null) {
      try {
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.forwardInstruments,
        };

        const { forwardRates = [] } =
          GetCategoryWiseForwardRatesData !== null &&
          GetCategoryWiseForwardRatesData;
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
    allInstrumentForTreasuryData,
    getAllTenorsRecords,
    GetCategoryWiseForwardRatesData,
  ]);

  useEffect(() => {
    if (
      categoryFowardsTenorsChanges !== null &&
      getAllTenorsRecords !== null &&
      allInstrumentForTreasuryData !== null
    ) {
      try {
        const { newIsForwardtenorList = [], removedtenorList = [] } =
          categoryFowardsTenorsChanges;
        const allTenors = [...(getAllTenorsRecords.tenors || [])];

        // Convert arrays of objects to Set of IDs
        const removedSet = new Set(
          removedtenorList.map((item) => item.tenorID)
        );

        // Update each tenor's isForwardingApplicable field
        const updatedTenors = allTenors.map((tenor) => ({
          ...tenor,
          isForwardingApplicable: removedSet.has(tenor.tenorID) ? false : true, // leave unchanged if in neither
        }));

        let getAllTenorsData = { tenors: updatedTenors };
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.forwardInstruments,
        };

        const { forwardRates = [] } =
          GetCategoryWiseForwardRatesData !== null &&
          GetCategoryWiseForwardRatesData;
        const { rowData, columnsData } = buildForwardsTable(
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
        dispatch(setCategoryFowardsTenorsChanges(null));
        console.log(updatedTenors, "updatedTenorsupdatedTenors");
      } catch (error) {
        console.log(error);
      }
    }
  }, [
    categoryFowardsTenorsChanges,
    getAllTenorsRecords,
    allInstrumentForTreasuryData,
  ]);

  const throttledCategoryForwardUpdate = useMemo(
    () =>
      throttle((forwardRatesUpdate) => {
        const { instrumentForwardsData } = forwardRatesUpdate;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            instrumentForwardsData.forEach((d) => {
              Object.keys(row).forEach((key) => {
                if (
                  key.startsWith("InstrumentID_") &&
                  row[key] === d.instrumentID &&
                  row.tenorID === d.tenorID
                ) {
                  const currency = key.split("_")[1]; // e.g., USD
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
    if (CategoryForwardRates) {
      throttledCategoryForwardUpdate(CategoryForwardRates);
    }
  }, [CategoryForwardRates, throttledCategoryForwardUpdate]);

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

  // For clear Forward Rates
  useEffect(() => {
    if (!ClearRatesData?.areRatesClear) return;

    if (GetCategoryWiseForwardRatesData?.forwardRates) {
      // ✅ Clear bid/ask values
      const clearedForwardRates =
        GetCategoryWiseForwardRatesData.forwardRates.map((item) => ({
          ...item,
          bid: 0,
          ask: 0,
        }));

      const newGetCategoryWiseForwardRatesData = {
        ...GetCategoryWiseForwardRatesData,
        forwardRates: clearedForwardRates,
      };

      dispatch(
        UpdateGetCategoryWiseForwardRates(newGetCategoryWiseForwardRatesData)
      );
    } else {
      // ✅ Fallback: clear current local dataSource if Redux data missing
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

    // ✅ Reset ClearRatesData flag in Redux
    dispatch(clearCategoryForwardClearRates());
  }, [ClearRatesData, GetCategoryWiseForwardRatesData, dispatch]);

  console.log(
    { dataSource, GetCategoryWiseForwardRatesData },
    "dataSourcedataSourcedataSource for Clear Rates"
  );

  // useEffect(() => {
  //   try {
  //     if (categoryFowardsTenorsChanges !== null) {
  //       const forwardRates =
  //         categoryFowardsTenorsChanges.tenorWiseForwardRates
  //           .currentTenorWiseForwardRates;
  //       let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
  //       let getAllInstrument = {
  //         instruments: allInstrumentForTreasuryData.forwardInstruments,
  //       };

  //       const { rowData, columnsData } = buildForwardsTable(
  //         3,
  //         forwardRates,
  //         getAllTenorsData,
  //         getAllInstrument,
  //         IndexCell
  //       );
  //       if (rowData.length > 0) {
  //         setDataSource(rowData);
  //         setColumnsData(columnsData);
  //       }
  //     }
  //   } catch (error) {}
  // }, [categoryFowardsTenorsChanges]);

  return (
    <>
      <span className="heading mb-2">Forward</span>
      <GlobalTable
        columns={columnsData}
        prefixCls="Dealer_Forwards"
        dataSource={dataSource}
        pagination={false}
      />
      {/* 
      <div className="mt-4">
        <span className="heading mb-2">Tresmark Crosses Premiums</span>
        <GlobalTable
          columns={columnsData}
          prefixCls="Dealer_Forwards"
          dataSource={dataSource}
          pagination={false}
        />
      </div> */}
    </>
  );
};

export default CategoryForwards;
