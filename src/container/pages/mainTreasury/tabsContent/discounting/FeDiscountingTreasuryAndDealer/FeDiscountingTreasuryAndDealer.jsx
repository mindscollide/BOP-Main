import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildDiscountingTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { throttle } from "lodash";

const FeDiscountingTreasuryAndDealer = () => {
  const [feDiscountingData, setFeDiscountingData] = useState([]);
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
  const TreasuryFeDiscounting = useSelector(
    (state) => state.RealtimeActionsSlice.TreasuryFeDiscounting
  );

  useEffect(() => {
    if (GetAllInstrumentForTreasury !== null && getAllTenorsRecords !== null) {
      try {
        const { feDiscountingRates = [] } =
          GetDiscountingRatesForTreasury !== null &&
          GetDiscountingRatesForTreasury;
        let getAllTenorsData = { tenors: getAllTenorsRecords.tenors };
        let getAllInstrument = {
          instruments: GetAllInstrumentForTreasury.discountingInstruments,
        };
        const { columnsData, rowData } = buildDiscountingTable(
          3,
          feDiscountingRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );

        if (rowData.length > 0) {
          setFeDiscountingData(rowData);
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
        const { feDiscountingRates } = discountingUpdate;

        setFeDiscountingData((prevData) =>
          prevData.map((row) => {
            let updatedRow = { ...row };

            feDiscountingRates.forEach((d) => {
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
  );

  useEffect(() => {
    if (TreasuryFeDiscounting) {
      throttledUpdate(TreasuryFeDiscounting);
    }
  }, [TreasuryFeDiscounting, throttledUpdate]);

  // useEffect(() => {
  //   if (TreasuryFeDiscounting !== null) {
  //     try {
  //       const { nonFeDiscountingRates } = TreasuryFeDiscounting;
  //       setFeDiscountingData((prevState) => {
  //         return prevState.map((item) => {});
  //       });
  //     } catch (error) {
  //       console.log("Error while building discounting table", error);
  //     }
  //   }
  // }, [TreasuryFeDiscounting]);
  return (
    <>
      <span className="heading mb-2">FE Discounting</span>
      <GlobalTable
        columns={columnsData}
        dataSource={feDiscountingData}
        prefixCls={"Treasury_Discounting"}
        bordered
        pagination={false}
        rowClassName={"striped-design"}
        rowHoverBg={"#000"}
      />
    </>
  );
};

export default FeDiscountingTreasuryAndDealer;
