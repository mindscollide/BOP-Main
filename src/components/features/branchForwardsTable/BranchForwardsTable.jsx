import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllFowardsAndDiscountsRatesAPI } from "../SpotBranch/WatchlistAction";
import { useSelector } from "react-redux";

const BranchForwardsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //local states
  const [instrumentForwards, setInstrumentForwards] = useState([]);
  const [forwardRates, setForwardRates] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  //Global State for Extracting Forward and discount rate data
  const GetAllFowardsAndDiscountsRatesAPIData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  //Excecuting forward and Discounting Api
  useEffect(() => {
    try {
      dispatch(GetAllFowardsAndDiscountsRatesAPI({}));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  //Extracting forward and Discounting Api Data
  useEffect(() => {
    try {
      if (
        GetAllFowardsAndDiscountsRatesAPIData &&
        GetAllFowardsAndDiscountsRatesAPIData !== null
      ) {
        setInstrumentForwards(
          GetAllFowardsAndDiscountsRatesAPIData.instruments
        );
        setForwardRates(GetAllFowardsAndDiscountsRatesAPIData.forwardRates);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GetAllFowardsAndDiscountsRatesAPIData]);

  console.log(instrumentForwards, "instrumentForwards");
  console.log(forwardRates, "instrumentForwards");

  useEffect(() => {
    const { forwardsRates } = generateData(2);

    if (forwardsRates.length > 0) {
      setDataSource(forwardsRates);
      const forwardsColumns = createColumns(forwardsRates, 2);
      setColumnsData(forwardsColumns);
    }
  }, []);

  console.log(dataSource, "instrumentForwards");
  console.log(columnsData, "instrumentForwards");

  return (
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
  );
};

export default BranchForwardsTable;
