import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { getBankSpotData, loaderInitialize } from "./slicer/bankSpotSlicer";
import SectionLoader from "../../../../../../components/common/sectionLoader/SectionLoader";
import { GetBankSpotForTreasuryApi } from "@/components/features/SpotBranch/WatchlistAction";
import { useNavigate } from "react-router-dom";

const BankSpot = () => {
  const navigate = useNavigate();
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );

  const TresuaryBankSpotData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );
  console.log("Data For Bank Spot for Treasury: ", {
    instruments: GetAllInstrumentForTreasury,
    SPOT_Live_rates: TresuaryBankSpotData,
  });
  // const bankSportLoader = useSelector((state) => state.bankSpotReducer.Loader);

  console.log(TresuaryBankSpotData, "watchListReducerwatchListReducer");

  const [bankSpotData, setBankSpotData] = useState([]);
  console.log(bankSpotData, "bankSpotData");

  const columns = [
    {
      key: "1",
      title: "Instrument",
      dataIndex: "instrumentName",
      width: 80,
      className: "color-hd fw-bold title-col text-nowrap roboto-13",
      render: (text, record) => (
        <span>{`${record?.instrumentName}${record?.secondaryInstrumentName}`}</span>
      ),
    },
    {
      title: "Bid",
      dataIndex: "worldCrossBid",
      width: 80,
      key: "bid",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"BidCardBox"}
          spot={false}
          BidAmountValue={record?.worldCrossBid}
        />
      ),
    },
    {
      title: "Offer",
      dataIndex: "worldCrossOffer",
      key: "offer",
      width: 80,

      render: (text, record) => (
        <BidAmountBox
          applyClass={"OfferCardBox"}
          spot={false}
          BidAmountValue={record?.worldCrossOffer}
        />
      ),
    },
    {
      title: "Instrument",
      dataIndex: "instrumentName",
      key: "currency",
      width: 80,
      className: "roboto-13",
      // render: (text, record) => record?.worldCrosses?.instrumentName,
    },
    {
      title: "Bid",
      dataIndex: "worldCurBid",
      width: 80,

      key: "previousBid",
      render: (text, record) => (
        <BidAmountBox
          applyClass={"BidCardBox"}
          bankSpot={true}
          BidAmountValue={record?.worldCurBid}
        />
      ),
    },
    {
      title: "Offer",
      dataIndex: "worldCurOffer",
      key: "previousOffer",
      width: 80,

      render: (text, record) => (
        <BidAmountBox
          applyClass={"OfferCardBox"}
          bankSpot={true}
          BidAmountValue={record?.worldCurOffer}
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
    if (TresuaryBankSpotData && GetAllInstrumentForTreasury) {
      const { worldCrosses, worldCurrencies } = TresuaryBankSpotData;
      const { crossInstruments } = GetAllInstrumentForTreasury;

      const enrichedData = worldCrosses
        .map((worldCross) => {
          const matchedCurrency = worldCurrencies.find(
            (worldCur) => worldCur.instrumentID === worldCross.instrumentID
          );

          let baseData = {
            worldCrossBid: worldCross.bid,
            worldCrossOffer: worldCross.offer,
            worldCurBid: matchedCurrency?.bid ?? 0,
            worldCurOffer: matchedCurrency?.offer ?? 0,
            instrumentID: worldCross.instrumentID,
            secondaryInstrumentID: worldCross.secondaryInstrumentID,
            time: worldCross.time,
          };

          // Match instrumentName from crossInstruments
          const matchedInstrument = crossInstruments.find(
            (inst) =>
              inst.instrumentID === worldCross.instrumentID &&
              inst.secondaryInstrumentID === worldCross.secondaryInstrumentID
          );

          if (matchedInstrument) {
            return {
              ...baseData,
              instrumentName: matchedInstrument.instrumentName,
              secondaryInstrumentName:
                matchedInstrument.secondaryInstrumentName,
            };
          }

          return baseData;
        })
        .filter(Boolean); // Clean nulls (though unlikely with above logic)

      console.log(enrichedData, "Final Enriched Treasury Bank Spot Data");
      setBankSpotData(enrichedData);
    } else {
      setBankSpotData([]);
    }
  }, [TresuaryBankSpotData, GetAllInstrumentForTreasury]);

  return (
    <div className="">
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      <div className="  mb-2 px-2">
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "max-content", y: 400 }}
        />
        {/* {bankSportLoader ? <SectionLoader /> : null} */}
      </div>
    </div>
  );
};

export default BankSpot;
