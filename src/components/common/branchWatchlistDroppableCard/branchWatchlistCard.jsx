// BranchRateCardsOfWatchList.js

import React from "react";
import { Row, Col } from "react-bootstrap";
import "./branchWatchlistCard.css";
import BitAmountBox from "../../common/bitAmountBox/bitAmountBox";
const BranchRateCardsOfWatchList = ({
  currencyLabel,
  buyHeading,
  sellHeading,
  buyValue,
  sellValue,
}) => {
  return (
    <span className="DroppableBox">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="DroppableBoxCurrencyLabel">{currencyLabel}</span>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={6} md={6} sm={6}>
          <BitAmountBox
            spot={true}
            BitBoxHeading={sellHeading}
            BitAmountValue={sellValue}
            applyClass={"SellandBuyCardBracnh"}
          />
        </Col>
        <Col lg={6} md={6} sm={6}>
          <BitAmountBox
            spot={true}
            BitBoxHeading={buyHeading}
            BitAmountValue={buyValue}
            applyClass={"SellandBuyCardBracnh"}
          />
        </Col>
      </Row>
    </span>
  );
};

export default BranchRateCardsOfWatchList;
