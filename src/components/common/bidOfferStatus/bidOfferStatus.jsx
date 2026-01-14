import React, { useEffect, useRef, useState } from "react";
import styles from "./bidOfferStatus.module.css";
import { useDispatch } from "react-redux";
import { UpdateBidOfferStatusAPI } from "@/components/features/SpotBranch/WatchlistAction";
import { useSelector } from "react-redux";
import { clearBidOfferStatus } from "@/store/watchListSlicer/WatchListSlicer";

const BidOfferStatus = ({ activeValue }) => {
  // both ON by default
  const dispatch = useDispatch();
  const [bidOfferStatus, setBidOfferStatus] = useState({
    isBid: true,
    isOffer: true,
  });

  const BidOfferStatusData = useSelector(
    (state) => state.WatchListReducer.getBidOfferStatus
  );

  const handleClickActive = (type) => {
    setBidOfferStatus((prev) => {
      const next = {
        ...prev,
        [type]: !prev[type],
      };

      // ❌ Block BOTH true OR BOTH false
      const bothTrue = next.isBid && next.isOffer;
      const bothFalse = !next.isBid && !next.isOffer;

      if (bothTrue || bothFalse) {
        return prev;
      }

      // ✅ Payload (OFF = 1, ON = 0)
      const payload = {
        IsBidOn: next.isBid ? true : false,
        IsOfferOn: next.isOffer ? true : false,
      };

      console.log("State:", next);
      console.log("Payload:", payload);
      dispatch(UpdateBidOfferStatusAPI({ Data: payload }));

      return next;
    });
  };

  useEffect(() => {
    if (!BidOfferStatusData) return;

    const { isBidOn, isOfferOn } = BidOfferStatusData;

    setBidOfferStatus({
      isBid: isBidOn,
      isOffer: isOfferOn,
    });
  }, [BidOfferStatusData]);

  return (
    <div className="d-flex align-items-center ms-1 gap-1">
      <button
        className={
          activeValue === 0
            ? styles.BidOfferButton_Disabled
            : bidOfferStatus.isBid
            ? styles.BidOfferButton_Active
            : styles.BidOfferButton__Inactive
        }
        onClick={() => handleClickActive("isBid")}
      >
        Bid
      </button>

      <button
        className={
          activeValue === 0
            ? styles.BidOfferButton_Disabled
            : bidOfferStatus.isOffer
            ? styles.BidOfferButton_Active
            : styles.BidOfferButton__Inactive
        }
        onClick={() => handleClickActive("isOffer")}
      >
        Offer
      </button>
    </div>
  );
};

export default BidOfferStatus;
