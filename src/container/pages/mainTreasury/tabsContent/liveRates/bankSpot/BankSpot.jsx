import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { useDispatch } from "react-redux";
import { setTreasurySpotRatesFeed } from "@/store/realtimeActionsSlicer/realtimeActionSlice";

const BankSpot = () => {
  const dispatch = useDispatch();
  const GetAllInstrumentForTreasury = useSelector(
    (state) => state.WatchListReducer.GetAllInstrumentForTreasury
  );
  const TreasurySpotRatesFeed = useSelector(
    (state) => state.RealtimeActionsSlice.TreasurySpotRatesFeed
  );
  const TresuaryBankSpotData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );
  console.log("Data For Bank Spot for Treasury: ", {
    instruments: GetAllInstrumentForTreasury,
    SPOT_Live_rates: TresuaryBankSpotData,
  });

  const [bankSpotData, setBankSpotData] = useState([]);

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

  useEffect(() => {
    if (!TreasurySpotRatesFeed) return;

    const { instrumentParitySpot, instrumentCrossRate } = TreasurySpotRatesFeed;

    setBankSpotData((prevData) => {
      let isUpdated = false;

      const updatedData = prevData.map((data2) => {
        let newData = { ...data2 };

        if (
          instrumentParitySpot &&
          data2.instrumentID === instrumentParitySpot.instrumentID &&
          data2.secondaryInstrumentID ===
            instrumentParitySpot.secondaryInstrumentID
        ) {
          if (
            data2.worldCrossBid !== instrumentParitySpot.bid ||
            data2.worldCrossOffer !== instrumentParitySpot.ask
          ) {
            newData.worldCrossBid = instrumentParitySpot.bid;
            newData.worldCrossOffer = instrumentParitySpot.ask;
            isUpdated = true;
          }
        }

        if (
          instrumentCrossRate &&
          data2.instrumentID === instrumentCrossRate.instrumentID &&
          data2.secondaryInstrumentID ===
            instrumentCrossRate.secondaryInstrumentID
        ) {
          if (
            data2.worldCrossBid !== instrumentCrossRate.bid ||
            data2.worldCrossOffer !== instrumentCrossRate.ask
          ) {
            newData.worldCrossBid = instrumentCrossRate.bid;
            newData.worldCrossOffer = instrumentCrossRate.ask;
            isUpdated = true;
          }
        }

        return newData;
      });

      return isUpdated ? updatedData : prevData;
    });
  }, [TreasurySpotRatesFeed]);

  return (
    <div>
      <div className='box-header bg-primary-orange px-3'>
        <div className='text-start color-white fw-bold fs-6'>Bank Spot</div>
      </div>

      <div className='mb-2 px-2'>
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "hidden", y: 275 }}
        />
      </div>
    </div>
  );
};

export default BankSpot;
