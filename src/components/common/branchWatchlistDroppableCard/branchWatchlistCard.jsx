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

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const BranchRateCardsOfWatchList = ({
  currencyLabel,
  buyHeading,
  sellHeading,
  buyValue,
  sellValue,
  isSellDisabled,
  isBuyDisabled,
  instrumentID,
  secondaryInstrumentID,
  instrumentName,
  secondaryInstrumentName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = (type) => {
    console.log(
      {
        currencyLabel,
        buyHeading,
        sellHeading,
        buyValue,
        sellValue,
        isSellDisabled,
        isBuyDisabled,
        instrumentID,
        secondaryInstrumentID,
        instrumentName,
        secondaryInstrumentName,
      },
      "handleOpenModalhandleOpenModal "
    );
    let Data = {
      type: type, // 'buy' or 'sell'
      currencyLabel: currencyLabel,
      buyHeading: buyHeading,
      sellHeading: sellHeading,
      buyValue: buyValue,
      sellValue: sellValue,
      instrumentID,
      secondaryInstrumentID,
      instrumentName,
      secondaryInstrumentName,
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
                  {currencyLabel.slice(0, 3)}
                </span>
                <span className='color-white fs-5 fw-normal'>
                  {" "}
                  {currencyLabel.slice(3, 6)}
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
                      BidAmountValue={buyValue}
                      applyClass={
                        isBuyDisabled
                          ? "SellandBuyCardBracnh"
                          : "SellandBuyCardBracnh_disbaled"
                      }
                      onClick={() => handleOpenModal("buy")}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <BidAmountBox
                      spot={true}
                      BidBoxHeading={sellHeading}
                      BidAmountValue={sellValue}
                      applyClass={
                        isSellDisabled
                          ? "SellandBuyCardBracnh"
                          : "SellandBuyCardBracnh_disbaled"
                      }
                      onClick={() => handleOpenModal("sell")}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={6} md={6} sm={6}>
                    <BidAmountBox
                      spot={true}
                      BidBoxHeading={sellHeading}
                      BidAmountValue={buyValue}
                      applyClass={
                        isSellDisabled
                          ? "SellandBuyCardBracnh"
                          : "SellandBuyCardBracnh_disbaled"
                      }
                      onClick={() => handleOpenModal("sell")}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <BidAmountBox
                      spot={true}
                      BidBoxHeading={buyHeading}
                      BidAmountValue={sellValue}
                      applyClass={
                        isBuyDisabled
                          ? "SellandBuyCardBracnh"
                          : "SellandBuyCardBracnh_disbaled"
                      }
                      onClick={() => handleOpenModal("buy")}
                    />
                  </Col>
                </>
              )}
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
