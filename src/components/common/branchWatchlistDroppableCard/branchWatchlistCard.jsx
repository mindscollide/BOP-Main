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
import { useBidOffer } from "@/context/BidOfferContext";
import { useModal } from "@/context/ModalContext";

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
  cardData,
  isSellDisabled,
  isBuyDisabled,
}) => {
  const dispatch = useDispatch();

  // Local RFQ button state from Redux trade rights
  const [rfqButtonState, setRFqButtonState] = useState(true);
  const { isBid, isOffer } = useBidOffer();
  const { isMarketOn } = useModal();

  const isTradeRights = useSelector(
    (state) => state.RealtimeActionsSlice.tradeRightsStatusUpdated,
  );

  /**
   * Derived disable states based on bidOfferStatus
   */
  const isBuy_Disabled =
    !isBid || !rfqButtonState || !isMarketOn || !isBuyDisabled;
  const isSell_Disabled =
    !isOffer || !rfqButtonState || !isMarketOn || !isSellDisabled;

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
      cardData,
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

  return (
    <>
      {currencyLabel ? (
        <span
          className={
            !isMarketOn || !rfqButtonState
              ? "DroppableBox_disbaled"
              : "DroppableBox"
          }>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className='DroppableBoxCurrencyLabel'>
                {viewInstumentName}
              </span>
              <span className='color-white fs-5 fw-normal'>
                {" "}
                {viewSecondaryInstrumentName}
              </span>
            </Col>
          </Row>

          <Row className='mt-4'>
            {isBranch ? (
              <>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={buyHeading}
                    BidAmountValue={!isBid ? 0 : buyValue}
                    applyClass={
                      !isBid && isBuy_Disabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isBuy_Disabled
                          ? "SellandBuyCardBracnh_disbaled"
                          : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isBuy_Disabled && buyValue > 0 && handleOpenModal("buy")
                    }
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={sellHeading}
                    BidAmountValue={!isOffer ? 0 : sellValue}
                    applyClass={
                      !isOffer && isSell_Disabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isSell_Disabled
                          ? "SellandBuyCardBracnh_disbaled"
                          : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isSell_Disabled &&
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
                    BidAmountValue={!isOffer ? 0 : buyValue}
                    applyClass={
                      !isOffer && isSell_Disabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isSell_Disabled
                          ? "SellandBuyCardBracnh_disbaled"
                          : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isSell_Disabled &&
                      buyValue > 0 &&
                      handleOpenModal("sell")
                    }
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <BidAmountBox
                    spot={true}
                    BidBoxHeading={buyHeading}
                    BidAmountValue={!isBid ? 0 : sellValue}
                    applyClass={
                      !isBid && isBuy_Disabled
                        ? "SellandBuyCardBranch_Stuck_disbaled"
                        : isBuy_Disabled
                          ? "SellandBuyCardBracnh_disbaled"
                          : "SellandBuyCardBracnh"
                    }
                    onClick={() =>
                      !isBuy_Disabled && sellValue > 0 && handleOpenModal("buy")
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
