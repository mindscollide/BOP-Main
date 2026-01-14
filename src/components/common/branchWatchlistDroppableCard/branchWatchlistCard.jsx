import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./branchWatchlistCard.css";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import CardDragger from "../cardDragger/cardDragger";
import { useDispatch, useSelector } from "react-redux";
import {
  setIBuySellData,
  setRfqModalOpen,
} from "@/store/modalSlice/modalSlicer";
import { clearBidOfferStatus } from "@/store/watchListSlicer/WatchListSlicer";

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";

const BranchRateCardsOfWatchList = ({
  currencyLabel,
  buyHeading,
  sellHeading,
  buyValue,
  sellValue,
  instrumentID,
  secondaryInstrumentID,
  instrumentName,
  secondaryInstrumentName,
  viewInstumentName,
  viewSecondaryInstrumentName,
}) => {
  const dispatch = useDispatch();

  // Local RFQ button state from Redux trade rights
  const [rfqButtonState, setRFqButtonState] = useState(true);

  // Bid/Offer status from Redux (controls whether Buy/Sell are enabled)
  const [bidOfferStatus, setBidOfferStatus] = useState({
    isBid: true,
    isOffer: true,
  });

  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated
  );

  const BidOfferStatusData = useSelector(
    (state) => state.WatchListReducer.getBidOfferStatus
  );

  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  /**
   * Derived disable states based on bidOfferStatus
   */
  const isBuyDisabled =
    !bidOfferStatus.isBid || !rfqButtonState || !marketStatus;
  const isSellDisabled =
    !bidOfferStatus.isOffer || !rfqButtonState || !marketStatus;
  console.log(bidOfferStatus, isSellDisabled, "isSellDisabled");
  /**
   * Open modal with buy/sell data
   */
  const handleOpenModal = (type) => {
    const Data = {
      type, // 'buy' or 'sell'
      currencyLabel,
      buyHeading,
      sellHeading,
      buyValue,
      sellValue,
      instrumentID,
      secondaryInstrumentID,
      instrumentName,
      secondaryInstrumentName,
    };
    dispatch(setIBuySellData(Data));
    dispatch(setRfqModalOpen(true));
  };

  /**
   * Update RFQ button state based on trade rights
   */
  useEffect(() => {
    if (isTradeRights !== null) {
      setRFqButtonState(JSON.parse(isTradeRights));
    }
  }, [isTradeRights]);

  /**
   * Sync bid/offer status from backend
   */
  useEffect(() => {
    if (!BidOfferStatusData) return;

    const { isBidOn, isOfferOn } = BidOfferStatusData;

    console.log(isBidOn, isOfferOn, BidOfferStatusData, "BidOfferStatusData");

    setBidOfferStatus({
      isBid: isBidOn,
      isOffer: isOfferOn,
    });
  }, [BidOfferStatusData]);

  return (
    <>
      {currencyLabel ? (
        <span
          className={
            !marketStatus || !rfqButtonState
              ? "DroppableBox_disbaled"
              : "DroppableBox"
          }
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className="DroppableBoxCurrencyLabel">
                {viewInstumentName}
              </span>
              <span className="color-white fs-5 fw-normal">
                {" "}
                {viewSecondaryInstrumentName}
              </span>
            </Col>
          </Row>

          <Row className="mt-4">
            {isBranch ? (
              <>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={buyHeading}
                    BidAmountValue={!bidOfferStatus.isBid ? 0 : buyValue}
                    applyClass={
                      !bidOfferStatus.isBid && isBuyDisabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isBuyDisabled
                        ? "SellandBuyCardBracnh_disbaled"
                        : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isBuyDisabled && buyValue > 0 && handleOpenModal("buy")
                    }
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={sellHeading}
                    BidAmountValue={!bidOfferStatus.isOffer ? 0 : sellValue}
                    applyClass={
                      !bidOfferStatus.isOffer && isSellDisabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isSellDisabled
                        ? "SellandBuyCardBracnh_disbaled"
                        : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isSellDisabled &&
                      sellValue > 0 &&
                      handleOpenModal("sell")
                    }
                  />
                </Col>
              </>
            ) : (
              <>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={sellHeading}
                    BidAmountValue={!bidOfferStatus.isOffer ? 0 : buyValue}
                    applyClass={
                      !bidOfferStatus.isOffer && isSellDisabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isSellDisabled
                        ? "SellandBuyCardBracnh_disbaled"
                        : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isSellDisabled && buyValue > 0 && handleOpenModal("sell")
                    }
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={buyHeading}
                    BidAmountValue={!bidOfferStatus.isBid ? 0 : sellValue}
                    applyClass={
                      !bidOfferStatus.isBid && isBuyDisabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isBuyDisabled
                        ? "SellandBuyCardBracnh_disbaled"
                        : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isBuyDisabled && sellValue > 0 && handleOpenModal("buy")
                    }
                  />
                </Col>
              </>
            )}
          </Row>
        </span>
      ) : (
        <CardDragger />
      )}
    </>
  );
};

export default BranchRateCardsOfWatchList;
