import React, { startTransition, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./branchWatchlistCard.css";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import CardDragger from "../cardDragger/cardDragger";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setIBuySellData,
  setISellAndBuyModal,
  setRfqModalOpen,
} from "@/store/modalSlice/modalSlicer";

const BranchRateCardsOfWatchList = ({
  currencyLabel,
  buyHeading,
  sellHeading,
  buyValue,
  sellValue,
  isSellDisabled,
  isBuyDisabled,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    let Data = {
      type: type, // 'buy' or 'sell'
      currencyLabel: currencyLabel,
      buyHeading: buyHeading,
      sellHeading: sellHeading,
      buyValue: buyValue,
      sellValue: sellValue,
    };
    dispatch(setIBuySellData(Data)); // Dispatch the action to set the data in the Redux store
    dispatch(setRfqModalOpen(true));
  };

  // const

  return (
    <>
      {currencyLabel && buyValue && sellValue ? (
        <>
          <span className='DroppableBox'>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='DroppableBoxCurrencyLabel'>
                  {currencyLabel}
                </span>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col lg={6} md={6} sm={6}>
                <BidAmountBox
                  spot={true}
                  BidBoxHeading={sellHeading}
                  BidAmountValue={sellValue}
                  applyClass={
                    isBuyDisabled
                      ? "SellandBuyCardBracnh_disbaled"
                      : "SellandBuyCardBracnh"
                  }
                  onClick={() => handleOpenModal("sell")}
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <BidAmountBox
                  spot={true}
                  BidBoxHeading={buyHeading}
                  BidAmountValue={buyValue}
                  applyClass={
                    isSellDisabled
                      ? "SellandBuyCardBracnh_disbaled"
                      : "SellandBuyCardBracnh"
                  }
                  onClick={() => handleOpenModal("buy")}
                />
              </Col>
            </Row>
          </span>
        </>
      ) : (
        <>
          <CardDragger />
        </>
      )}
    </>
  );
};

export default BranchRateCardsOfWatchList;
