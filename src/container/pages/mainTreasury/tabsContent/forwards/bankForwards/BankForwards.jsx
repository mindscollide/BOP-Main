import { IndexCell } from "@/components/common/inputField/IndexCell";
import GlobalTable from "@/components/common/table/GlobalTable";
import { buildForwardsTable } from "@/components/utils/generateColumnsData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BankForwards = () => {
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

  useEffect(() => {
    if (
      getAllTenorsRecords !== null &&
      GetAllInstrumentForTreasury !== null
    ) {
      try {
        const { forwardRates = [] } = GetBankForwardForTreasury !== null && GetBankForwardForTreasury
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
  return (
    <>
      <div className='flex-fill mt-3 fs-4 fw-bold color-black mb-1 ff-roboto'>
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
    </>
  );
};

export default BankForwards;
