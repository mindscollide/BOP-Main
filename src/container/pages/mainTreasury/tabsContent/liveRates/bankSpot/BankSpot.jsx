import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { useDispatch } from "react-redux";
import { setTreasurySpotRatesFeed } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { isEqual } from "lodash";
import { debounce } from "lodash";

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

  const [bankSpotData, setBankSpotData] = useState([]);

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

  const prevFeedRef = useRef();
  useEffect(() => {
    if (!TreasurySpotRatesFeed) return;
    const update = () => {
      if (isEqual(prevFeedRef.current, TreasurySpotRatesFeed)) {
        return;
      }

      prevFeedRef.current = TreasurySpotRatesFeed;

      const { instrumentParitySpot, instrumentCrossRate } =
        TreasurySpotRatesFeed;

      setBankSpotData((prevData) => {
        let isUpdated = false;

        const updatedData = prevData.map((data2) => {
          let newData = { ...data2 };

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
              newData.time = instrumentCrossRate.updateDateTime;
              isUpdated = true;
            }
          }

          if (
            instrumentParitySpot &&
            data2.instrumentID === instrumentParitySpot.instrumentID &&
            data2.secondaryInstrumentID ===
              instrumentParitySpot.secondaryInstrumentID
          ) {
            if (
              data2.worldCurBid !== instrumentParitySpot.bid ||
              data2.worldCurOffer !== instrumentParitySpot.ask
            ) {
              newData.worldCurBid = instrumentParitySpot.bid;
              newData.worldCurOffer = instrumentParitySpot.ask;
              isUpdated = true;
            }
          }

          return newData;
        });

        return isUpdated ? updatedData : prevData;
      });
    };

    update();

    // return () => update.cancel();
  }, [TreasurySpotRatesFeed]);

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
          bankSpot={true}
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
          bankSpot={true}
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

  return (
    <div>
      <div className="box-header bg-primary-orange px-3">
        <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
      </div>

      <div className="mb-2 px-2">
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          rowKey={(record) => record.instrumentID}
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "hidden", y: 275 }}
        />
      </div>
    </div>
  );
};

export default BankSpot;
