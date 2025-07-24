import React, { useEffect, useState } from "react";
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
        const { forwardRates = [] } =
          GetCategoryWiseForwardRatesData !== null &&
          GetCategoryWiseForwardRatesData;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: allInstrumentForTreasuryData.forwardInstruments,
        };
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
    allInstrumentForTreasuryData,
  ]);

  useEffect(() => {
    if (!CategoryForwardRates) return;

    const throttledUpdate = throttle((forwardRatesUpdate) => {
      const { instrumentForwardsData } = forwardRatesUpdate;

      setDataSource((prevData) =>
        prevData.map((row) => {
          let updatedRow = { ...row };

          instrumentForwardsData.forEach((d) => {
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
    }, 300);

    throttledUpdate(CategoryForwardRates);

    return () => throttledUpdate.cancel();
  }, [CategoryForwardRates]);

  return (
    <>
      <span className='heading mb-2'> Forward</span>
      <GlobalTable
        columns={columnsData}
        prefixCls='Dealer_Forwards'
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default CategoryForwards;
