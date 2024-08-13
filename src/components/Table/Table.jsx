import { Table, Input, Button } from "antd";
import { CreateDemoContext } from "../../Context";
import { useCallback, useContext, useEffect, useState } from "react";
// import 'antd/dist/antd.css';

const columns = [
  {
    title: "Tenor",
    dataIndex: "tenor",
    key: "tenor",
    fixed: "left",
    ecllipse: true,
    width: 100,
    render: (text) => {
      return (
        <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{text}</span>
      );
    },
  },
  {
    title: "USD",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "usdBid",
        key: "usdBid",
        width: 100,
        ecllipse: true,

        render: (text) => <Input width={80} value={text} />,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "usdAsk",
        key: "usdAsk",
        width: 100,

        render: (text) => <Input width={80} value={text} />,
      },
    ],
  },
  {
    title: "EUR",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "eurBid",
        key: "eurBid",
        width: 100,

        render: (text) => <Input width={80} value={text} />,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "eurAsk",
        key: "eurAsk",
        width: 100,

        render: (text) => <Input width={80} value={text} />,
      },
    ],
  },
  {
    title: "GBP",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "gbpBid",
        key: "gbpBid",
        width: 100,
        render: (text) => <Input width={80} value={text} />,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "gbpAsk",
        key: "gbpAsk",
        width: 100,

        render: (text) => <Input width={80} value={text} />,
      },
    ],
  },
  {
    title: "HKD",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "hkdBid",
        key: "hkdBid",
        width: 100,
        render: (text) => <Input width={80} value={text} />,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "hkdAsk",
        width: 100,
        key: "hkdAsk",
        render: (text) => <Input width={80} value={text} />,
      },
    ],
  },
  {
    title: "JPY",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "jpyBid",
        key: "jpyBid",
        width: 100,
        render: (text) => <Input width={80} value={text} />,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "jpyAsk",
        key: "jpyAsk",
        width: 100,
        ecllipse: true,
        render: (text) => <Input width={80} value={text} />,
      },
    ],
  },
];

const initialState = [
  {
    key: "1",
    tenor: "1 WEEK",
    usdBid: "10.10",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "2",
    tenor: "3 WEEK",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "3",
    tenor: "1 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "4",
    tenor: "3 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "5",
    tenor: "6 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "6",
    tenor: "9 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
];
const footerButtons = (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}>
      <Button>Reset</Button>
      <Button>Save</Button>
    </div>
  </>
);

const GroupingColumnTable = () => {
  const { isButtonClicked } = useContext(CreateDemoContext);
  const [data, setData] = useState(initialState);
  const updateData = useCallback(() => {
    setData((prevData) => {
      const newData = prevData.map((item) => {
        const keys = [
          "usdBid",
          "usdAsk",
          "eurBid",
          "eurAsk",
          "gbpBid",
          "gbpAsk",
          "hkdBid",
          "hkdAsk",
          "jpyBid",
          "jpyAsk",
        ];
        keys.forEach((key) => {
          const currentValue = parseFloat(item[key]);
          const changeValue = Math.random() < 0.5 ? -0.02 : 0.02;
          item[key] = (currentValue + changeValue).toFixed(2);
        });
        return { ...item };
      });
      return newData;
    });
  }, []);
  useEffect(() => {
    let interval;
    if (isButtonClicked) {
      interval = setInterval(updateData, 1000);
    } else {
      clearInterval(interval);
      // Cleanup interval on unmount or when isButtonClicked changes to false
    }
    return () => clearInterval(interval);
  }, [isButtonClicked, updateData]);

  return (
    <Table
      columns={columns}
      prefixCls='groupTable'
      dataSource={data}
      bordered
      pagination={false}
      footer={() => footerButtons}
      style={{ overflowX: "auto" }}
    />
  );
};

export default GroupingColumnTable;
