import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import GlobalTable from "../../../../../../components/common/table/GlobalTable";
import BidAmountBox from "../../../../../../components/common/bidAmountBox/BidAmountBox";
import { formatDateTimeToUTCTime } from "../../../../../../components/utils/timeFunction";
import { useDispatch } from "react-redux";
import { setTreasurySpotRatesFeed } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { isEqual } from "lodash";
import SectionLoader from "@/components/common/sectionLoader/SectionLoader";

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
  const TreasuryBankSpotSpinner = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasurySpinner
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

    const { instrumentParitySpot, instrumentCrossRate } = TreasurySpotRatesFeed;

    // Avoid updating if feed is identical to previous
    if (isEqual(prevFeedRef.current, TreasurySpotRatesFeed)) return;
    prevFeedRef.current = TreasurySpotRatesFeed;

    setBankSpotData((prevData) => {
      let isUpdated = false;

      const updatedData = prevData.map((data) => {
        const updated = { ...data };

        // Check and update instrumentCrossRate
        if (
          instrumentCrossRate &&
          data.instrumentID === instrumentCrossRate.instrumentID &&
          data.secondaryInstrumentID ===
            instrumentCrossRate.secondaryInstrumentID
        ) {
          if (
            data.worldCrossBid !== instrumentCrossRate.bid ||
            data.worldCrossOffer !== instrumentCrossRate.ask
          ) {
            updated.worldCrossBid = instrumentCrossRate.bid;
            updated.worldCrossOffer = instrumentCrossRate.ask;
            updated.time = instrumentCrossRate.updateDateTime;
            isUpdated = true;
          }
        }

        // Check and update instrumentParitySpot
        if (
          instrumentParitySpot &&
          data.instrumentID === instrumentParitySpot.instrumentID &&
          data.secondaryInstrumentID ===
            instrumentParitySpot.secondaryInstrumentID
        ) {
          if (
            data.worldCurBid !== instrumentParitySpot.bid ||
            data.worldCurOffer !== instrumentParitySpot.ask
          ) {
            updated.worldCurBid = instrumentParitySpot.bid;
            updated.worldCurOffer = instrumentParitySpot.ask;
            isUpdated = true;
          }
        }

        return updated;
      });

      // Only return new array if updated
      return isUpdated ? updatedData : prevData;
    });
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
      align: "center",

      render: (text, record) => (
        <span className='d-flex justify-content-center'>
          <BidAmountBox
            applyClass={"BidCardBox"}
            bankSpot={true}
            BidAmountValue={record?.worldCrossBid}
          />
        </span>
      ),
    },
    {
      title: "Offer",
      dataIndex: "worldCrossOffer",
      key: "offer",
      width: 80,
      align: "center",

      render: (text, record) => (
        <span className='d-flex justify-content-center'>
          <BidAmountBox
            applyClass={"OfferCardBox"}
            bankSpot={true}
            BidAmountValue={record?.worldCrossOffer}
          />
        </span>
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
      align: "center",

      key: "previousBid",
      render: (text, record) => (
        <span className='d-flex justify-content-center'>
          <BidAmountBox
            applyClass={"BidCardBox"}
            bankSpot={true}
            BidAmountValue={record?.worldCurBid}
          />
        </span>
      ),
    },
    {
      title: "Offer",
      dataIndex: "worldCurOffer",
      key: "previousOffer",
      width: 80,
      align: "center",

      render: (text, record) => (
        <span className='d-flex justify-content-center'>
          <BidAmountBox
            applyClass={"OfferCardBox"}
            bankSpot={true}
            BidAmountValue={record?.worldCurOffer}
          />
        </span>
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
    <div className='position-relative'>
      <div className='box-header bg-primary-orange px-3'>
        <div className='text-start color-white fw-bold fs-6'>Bank Spot</div>
      </div>

      <div className='mb-2 px-2'>
        <GlobalTable
          columns={columns}
          dataSource={bankSpotData}
          rowKey={(record) =>
            `${record.instrumentID}-${record.secondaryInstrumentID}`
          }
          prefixCls={"BankSpot_Table"}
          pagination={false}
          scroll={{ x: "hidden", y: 275 }}
        />
      </div>
      {TreasuryBankSpotSpinner && <SectionLoader />}
    </div>
  );
};

export default BankSpot;
