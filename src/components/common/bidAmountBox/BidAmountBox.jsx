import React from "react";
import styles from "./BidAmountBox.module.css";

const BidAmountBox = ({
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
  const decimalPart = divideTheValue[1]?.substring(0, 4) || valueAfterDot;

  return (
    <div className={`${styles[applyClass]} roboto-13`} onClick={onClick}>
      {spot && <><p className="m-0">{BidBoxHeading}</p></>}
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
};

// ✅ Custom comparison function for React.memo
function areEqual(prevProps, nextProps) {
  return (
    prevProps.applyClass === nextProps.applyClass &&
    prevProps.BidBoxHeading === nextProps.BidBoxHeading &&
    prevProps.BidAmountValue === nextProps.BidAmountValue &&
    prevProps.spot === nextProps.spot &&
    prevProps.valueAfterDot === nextProps.valueAfterDot &&
    prevProps.bankSpot === nextProps.bankSpot &&
    prevProps.onClick === nextProps.onClick // functions compared by reference
  );
}

export default React.memo(BidAmountBox, areEqual);
