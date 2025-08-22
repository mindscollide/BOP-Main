import React from "react";
import styles from "./BidAmountBox.module.css";

const BidAmountBox = React.memo(({
  applyClass,
  BidBoxHeading,
  BidAmountValue,
  spot = false,
  valueAfterDot = "00",
  onClick,
  bankSpot = false,
}) => {
  const divideTheValue = String(BidAmountValue || "0").split(".");
  const integerPart = divideTheValue[0] ?? "0";
  const decimalPart = divideTheValue[1]?.substring(0, 5) || valueAfterDot;

  // Debug (optional – comment out in production)
  // console.log("Rendering BidAmountBox:", integerPart, decimalPart);

  return (
    <div className={`${styles[applyClass]} roboto-13`} onClick={onClick}>
      {spot && <p className="m-0">{BidBoxHeading}</p>}
      <p className="m-0">
        {integerPart}
        {(spot || bankSpot) && (
          <span className={spot ? styles["afterDotValue"] : ""}>
            {`. ${decimalPart}`}
          </span>
        )}
      </p>
    </div>
  );
});

export default BidAmountBox;


