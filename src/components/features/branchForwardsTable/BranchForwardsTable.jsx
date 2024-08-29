import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
const dummyData = [
  {
    tenorID: 1,
    tenorName: "1 Month",
    instrumentID: 1,
    instrumentName: "Instrument A",
    bid: 1.25,
    ask: 1.3,
  },
  {
    tenorID: 2,
    tenorName: "2 Months",
    instrumentID: 2,
    instrumentName: "Instrument B",
    bid: 1.35,
    ask: 1.4,
  },
  {
    tenorID: 3,
    tenorName: "3 Months",
    instrumentID: 3,
    instrumentName: "Instrument C",
    bid: 1.45,
    ask: 1.5,
  },
  {
    tenorID: 4,
    tenorName: "4 Months",
    instrumentID: 4,
    instrumentName: "Instrument D",
    bid: 1.55,
    ask: 1.6,
  },
  {
    tenorID: 5,
    tenorName: "5 Months",
    instrumentID: 5,
    instrumentName: "Instrument E",
    bid: 1.65,
    ask: 1.7,
  },
  {
    tenorID: 6,
    tenorName: "6 Months",
    instrumentID: 6,
    instrumentName: "Instrument F",
    bid: 1.75,
    ask: 1.8,
  },
  {
    tenorID: 7,
    tenorName: "7 Months",
    instrumentID: 7,
    instrumentName: "Instrument G",
    bid: 1.85,
    ask: 1.9,
  },
  {
    tenorID: 8,
    tenorName: "8 Months",
    instrumentID: 8,
    instrumentName: "Instrument H",
    bid: 1.95,
    ask: 2.0,
  },
  {
    tenorID: 9,
    tenorName: "9 Months",
    instrumentID: 9,
    instrumentName: "Instrument I",
    bid: 2.05,
    ask: 2.1,
  },
  {
    tenorID: 10,
    tenorName: "10 Months",
    instrumentID: 10,
    instrumentName: "Instrument J",
    bid: 2.15,
    ask: 2.2,
  },
  {
    tenorID: 11,
    tenorName: "11 Months",
    instrumentID: 11,
    instrumentName: "Instrument K",
    bid: 2.25,
    ask: 2.3,
  },
  {
    tenorID: 12,
    tenorName: "12 Months",
    instrumentID: 12,
    instrumentName: "Instrument L",
    bid: 2.35,
    ask: 2.4,
  },
  {
    tenorID: 13,
    tenorName: "13 Months",
    instrumentID: 13,
    instrumentName: "Instrument M",
    bid: 2.45,
    ask: 2.5,
  },
  {
    tenorID: 14,
    tenorName: "14 Months",
    instrumentID: 14,
    instrumentName: "Instrument N",
    bid: 2.55,
    ask: 2.6,
  },
  {
    tenorID: 15,
    tenorName: "15 Months",
    instrumentID: 15,
    instrumentName: "Instrument O",
    bid: 2.65,
    ask: 2.7,
  },
];

const BranchForwardsTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  useEffect(() => {
    const { forwardsRates } = generateData(2);

    if (forwardsRates.length > 0) {
      setDataSource(forwardsRates);
      const forwardsColumns = createColumns(forwardsRates, 2);
      setColumnsData(forwardsColumns);
    }
  }, []);

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
