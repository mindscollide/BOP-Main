import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { getBankSpotData, loaderInitialize } from "./slicer/bankSpotSlicer";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";
import { GetFXInstrumentsAPI } from "@/components/features/SpotBranch/WatchlistAction";

const BankSpot = () => {
  const { bankSpotReducer } = useSelector((state) => state);
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
    if (TresuaryBankSpotData !== null && TresuaryBankSpotData !== undefined) {
      setBankSpotData(TresuaryBankSpotData?.instruments);
    } else {
      setBankSpotData([]);
    }
  }, [TresuaryBankSpotData]);

  return (
    <div className='card-box'>
      <div className='box-header bg-primary-orange px-3'>
        <div className='text-start color-white fw-bold fs-6'>Bank Spot</div>
      </div>

      <div className='box-content-wrapper position-relative px-2'>
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          prefixCls={"BankSpot_Table"}
          pagination={false}
        />
        {bankSpotReducer?.Loader ? <SectionLoader /> : null}
      </div>
    </div>
  );
};

export default BankSpot;
