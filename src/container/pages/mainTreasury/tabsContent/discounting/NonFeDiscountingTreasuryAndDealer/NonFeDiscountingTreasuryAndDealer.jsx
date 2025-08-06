import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState, useMemo } from "react";
import { throttle } from "lodash";
import { useSelector } from "react-redux";

const NonFeDiscountingTreasuryAndDealer = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const GetDiscountingRatesForTreasury = useSelector(
    (state) => state.WatchListReducer.GetDiscountingRatesForTreasury
  );
  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const TreasuryNonFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryNonFeDiscounting
  );

  useEffect(() => {
    if (GetAllInstrumentForTreasury !== null && getAllTenorsRecords !== null) {
      try {
        const { nonFEDiscountingRates = [] } =
          GetDiscountingRatesForTreasury !== null &&
          GetDiscountingRatesForTreasury;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: GetAllInstrumentForTreasury.nonFEDiscountingInstruments,
        };
        const { columnsData, rowData } = buildDiscountingTable(
          3,
          nonFEDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {}
    }
  }, [
    getAllTenorsRecords,
    GetAllInstrumentForTreasury,
    GetDiscountingRatesForTreasury,
  ]);

  const throttledUpdate = useMemo(
    () =>
      throttle((discountingUpdate) => {
        const nonFeDiscountingRates =
          discountingUpdate?.nonFeDiscountingRates || [];

        if (nonFeDiscountingRates.length === 0) return;

        setDataSource((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            nonFeDiscountingRates.forEach((d) => {
              Object.keys(row).forEach((key) => {
                if (
                  key.startsWith("InstrumentID_") &&
                  row[key] === d.instrumentID &&
                  row.TenorID === d.tenorID
                ) {
                  const currency = key.split("_")[1];
                  updatedRow[`rate_${currency}`] = d.bidWithSpread;
                }
              });
            });

            return updatedRow;
          })
        );
      }, 20),
    []
  ); // 300ms throttle

  useEffect(() => {
    if (TreasuryNonFeDiscounting) {
      throttledUpdate(TreasuryNonFeDiscounting);
    }
  }, [TreasuryNonFeDiscounting, throttledUpdate]);

  return (
    <>
      <span className="heading mb-2">Non FE Discounting</span>

      <GlobalTable
        columns={columnsData}
        dataSource={dataSource}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default NonFeDiscountingTreasuryAndDealer;
