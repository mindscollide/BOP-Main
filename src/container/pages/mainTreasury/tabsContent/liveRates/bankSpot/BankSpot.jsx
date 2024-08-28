import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { getBankSpotData } from "./slicer/bankSpotSlicer";

const BankSpot = () => {
  const { bankSpotReducer } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [bankSpotData, setBankSpotData] = useState(null);

  let bankSpotTableDummyData = {
    instruments: [
      {
        worldCurrency: {
          instrumentID: 101,
          instrumentName: "USD/EUR",
          bid: 1.1234,
          offer: 1.1244,
        },
        worldCrosses: {
          instrumentID: 102,
          instrumentName: "GBP/USD",
          bid: 1.2345,
          offer: 1.2355,
        },
        time: "20240828070208",
      },
      {
        worldCurrency: {
          instrumentID: 103,
          instrumentName: "JPY/USD",
          bid: 0.0091,
          offer: 0.0092,
        },
        worldCrosses: {
          instrumentID: 104,
          instrumentName: "AUD/USD",
          bid: 0.715,
          offer: 0.716,
        },
        time: "20240828070208",
      },
    ],
  };

  const columns = [
    {
      key: "1",
      title: "Instrument",
      dataIndex: "instrument",
      className: "color-hd fw-bold title-col text-nowrap roboto-13",
      render: (text, record) => (
        <span>{record?.worldCurrency?.instrumentName}</span>
      ),
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"BidCardBox"}
          spot={false}
          BidAmountValue={record?.worldCurrency?.bid}
        />
      ),
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"OfferCardBox"}
          spot={false}
          BidAmountValue={record?.worldCurrency?.offer}
        />
      ),
    },
    {
      title: "Instrument",
      dataIndex: "currency",
      key: "currency",
      className: "roboto-13",
      render: (text, record) => record?.worldCrosses?.instrumentName,
    },
    {
      title: "Bid",
      dataIndex: "previousBid",
      key: "previousBid",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"BidCardBox"}
          spot={false}
          BidAmountValue={record?.worldCrosses?.bid}
        />
      ),
    },
    {
      title: "Offer",
      dataIndex: "previousOffer",
      key: "previousOffer",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"OfferCardBox"}
          spot={false}
          BidAmountValue={record?.worldCrosses?.offer}
        />
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      className: "roboto-13",
      render: (text, record) => formatDateTimeToUTCTime(text),
    },
  ];

  useEffect(() => {
    dispatch(getBankSpotData(bankSpotTableDummyData));
  }, []);

  useEffect(() => {
    if (
      bankSpotReducer?.bankSpotData !== null &&
      bankSpotReducer?.bankSpotData !== undefined
    ) {
      setBankSpotData(bankSpotReducer?.bankSpotData?.instruments);
    } else {
      setBankSpotData(null);
    }
  }, [bankSpotReducer?.bankSpotData]);

  return (
    <div className='card-box'>
      <div className='box-header bg-primary-orange px-3'>
        <div className='text-start color-white fw-bold fs-6'>Bank Spot</div>
      </div>

      <div className='box-content-wrapper px-2'>
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          prefixCls={"BankSpot_Table"}
          // bordered
          pagination={false}
        />
      </div>
    </div>
  );
};

export default BankSpot;
