import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBidOfferStatusAPI } from "@/components/features/SpotBranch/WatchlistAction";

const BidOfferContext = createContext();

const BidOfferProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [bidOfferStatus, setBidOfferStatus] = useState({
    isBid: true,
    isOffer: true,
  });

  const BidOfferStatusData = useSelector(
    (state) => state.WatchListReducer.getBidOfferStatus
  );

  useEffect(() => {
    if (!BidOfferStatusData) return;

    const { isBidOn, isOfferOn } = BidOfferStatusData;

    setBidOfferStatus({
      isBid: isBidOn,
      isOffer: isOfferOn,
    });
  }, [BidOfferStatusData]);

  const toggleStatus = (type) => {
    setBidOfferStatus((prev) => {
      const next = {
        ...prev,
        [type]: !prev[type],
      };

      // ❌ Block BOTH false
      const bothFalse = !next.isBid && !next.isOffer;

      if (bothFalse) {
        return prev;
      }

      // ✅ Payload (OFF = 1, ON = 0)
      const payload = {
        IsBidOn: next.isBid ? true : false,
        IsOfferOn: next.isOffer ? true : false,
      };

      console.log("Context State:", next);
      console.log("Context Payload:", payload);
      dispatch(UpdateBidOfferStatusAPI({ Data: payload }));

      return next;
    });
  };
  const defaultOn = () => {
    setBidOfferStatus({
      isBid: true,
      isOffer: true,
    });
  };

  return (
    <BidOfferContext.Provider
      value={{ ...bidOfferStatus, toggleStatus, bidOfferStatus,defaultOn }}>
      {children}
    </BidOfferContext.Provider>
  );
};

const useBidOffer = () => {
  const context = useContext(BidOfferContext);
  if (!context) {
    throw new Error("useBidOffer must be used within a BidOfferProvider");
  }
  return context;
};

export { BidOfferProvider, useBidOffer };
