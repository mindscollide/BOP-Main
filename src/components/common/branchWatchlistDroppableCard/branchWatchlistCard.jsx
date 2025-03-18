import React, { startTransition } from "react";
import { Row, Col } from "react-bootstrap";
import "./branchWatchlistCard.css";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import CardDragger from "../cardDragger/cardDragger";
import { useModal } from "../../../context/ModalContext";

const BranchRateCardsOfWatchList = ({
  currencyLabel,
  buyHeading,
  sellHeading,
  buyValue,
  sellValue,
}) => {
  const { setISellAndBuyModal } = useModal();

  const handleOpenModal = () => {
    // Wrap the state update in startTransition
    startTransition(() => {
      setISellAndBuyModal(true);
    });
  };

  return (
    <>
      {currencyLabel && buyValue && sellValue ? (
        <>
          <span className="DroppableBox">
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="DroppableBoxCurrencyLabel">
                  {currencyLabel}
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6} md={6} sm={6}>
                <BidAmountBox
                  spot={true}
                  BidBoxHeading={sellHeading}
                  BidAmountValue={sellValue}
                  applyClass={"SellandBuyCardBracnh"}
                  onClick={handleOpenModal}
                />
              </Col>
              <Col lg={6} md={6} sm={6}>
                <BidAmountBox
                  spot={true}
                  BidBoxHeading={buyHeading}
                  BidAmountValue={buyValue}
                  applyClass={"SellandBuyCardBracnh"}
                  onClick={handleOpenModal}
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
