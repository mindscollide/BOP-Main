import React, { useEffect, useMemo, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { useSelector } from "react-redux";
import { IndexCell } from "@/components/common/inputField/IndexCell";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import { throttle } from "lodash";

const CategoryForwards = () => {
  const [dataSource, setDataSource] = useState([]);

  const [columnsData, setColumnsData] = useState([]);
  const GetCategoryWiseForwardRatesData = useSelector(
    (state) => state.categoryReducer.GetCategoryWiseForwardRates
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
    (state) => state.RealtimeActionsSlice.ClearRatesData
  );
  const categoryFowardsTenorsChanges = useSelector(
    (state) => state.RealtimeActionsSlice.categoryFowardsTenorsChanges
  );

  console.log(
    categoryFowardsTenorsChanges,
    "categoryFowardsTenorsChangescategoryFowardsTenorsChanges"
  );
  console.log(
    { dataSource, categoryFowardsTenorsChanges },
    "dataSourcedataSourcedataSource"
  );

  console.log(CategoryForwardRates, "CategoryForwardRates");

  console.log(
    {
      GetCategoryWiseForwardRates: GetCategoryWiseForwardRatesData,
      allInstrumentForTreasuryData: allInstrumentForTreasuryData,
      getAllTenorsRecords: getAllTenorsRecords,
    },
    "Data For Category Forwards"
  );

  // Define the columns structure for the Ant Design Table
  // Define the data source for the Ant Design Table
  useEffect(() => {
    if (getAllTenorsRecords && allInstrumentForTreasuryData !== null) {
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
  }, [allInstrumentForTreasuryData, getAllTenorsRecords]);

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
        const newSet = new Set(
          newIsForwardtenorList.map((item) => item.tenorID)
        );

        // Update each tenor's isForwardingApplicable field
        const updatedTenors = allTenors.map((tenor) => ({
          ...tenor,
          isForwardingApplicable: newSet.has(tenor.tenorID)
            ? true
            : removedSet.has(tenor.tenorID)
            ? false
            : tenor.isForwardingApplicable, // leave unchanged if in neither
        }));

        let getAllTenorsData = { tenors: updatedTenors };
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

  // For clear Rates
  useEffect(() => {
    if (ClearRatesData?.areRatesClear) {
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
  }, [ClearRatesData]);

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
      <span className="heading mb-2"> Forward</span>
      <GlobalTable
        columns={columnsData}
        prefixCls="Dealer_Forwards"
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default CategoryForwards;
