import React from "react";
import styles from "./BidAmountBox.module.css";

const BidAmountBox = ({
  applyClass,
  BidBoxHeading,
  BidAmountValue,
  spot = false,
  valueAfterDot = "00",
  onClick,
}) => {
  let divideTheValue = String(BidAmountValue).split(".");
  return (
    <div className={`${styles[applyClass]} roboto-13`} onClick={onClick}>
      {spot && <p className="m-0">{BidBoxHeading}</p>}
      <p className="m-0">
        {divideTheValue[0]}
        {spot && (
          <span
            className={styles["afterDotValue"]}
          >{`. ${divideTheValue[1]?.substring(0, 2)}`}</span>
        )}
      </p>
    </div>
  );
};

export default BidAmountBox;
