import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { getBankSpotData, loaderInitialize } from "./slicer/bankSpotSlicer";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";

const BankSpot = () => {
  const bankSportLoader = useSelector((state) => state.bankSpotReducer.Loader);
  const TresuaryBankSpotData = useSelector(
    (state) => state.WatchListReducer.WatchListData
  );
  console.log(TresuaryBankSpotData, "watchListReducerwatchListReducer");

  const dispatch = useDispatch();

  const [bankSpotData, setBankSpotData] = useState([]);
  console.log(bankSpotData, "bankSpotData");

  const columns = [
    {
      key: "1",
      title: "Instrument",
      dataIndex: "instrument",
      width: 80,
      className: "color-hd fw-bold title-col text-nowrap roboto-13",
      render: (text, record) => (
        <span>{record?.worldCurrency?.instrumentName}</span>
      ),
    },
    {
      title: "Bid",
      dataIndex: "bid",
      width: 80,

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
      width: 80,

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
      width: 80,
      className: "roboto-13",
      render: (text, record) => record?.worldCrosses?.instrumentName,
    },
    {
      title: "Bid",
      dataIndex: "previousBid",
      width: 80,

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
      width: 80,

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
      width: 80,

      className: "roboto-13",
      render: (text, record) => formatDateTimeToUTCTime(text),
    },
  ];

  useEffect(() => {
    if (TresuaryBankSpotData !== null && TresuaryBankSpotData !== undefined) {
      setBankSpotData(TresuaryBankSpotData?.instruments);
    } else {
      setBankSpotData([]);
    }
  }, [TresuaryBankSpotData]);

  return (
    <div className=''>
      <div className='box-header bg-primary-orange px-3'>
        <div className='text-start color-white fw-bold fs-6'>Bank Spot</div>
      </div>

      <div className='  mb-2 px-2'>
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "max-content", y: 500 }}
        />
        {/* {bankSportLoader ? <SectionLoader /> : null} */}
      </div>
    </div>
  );
};

export default BankSpot;
