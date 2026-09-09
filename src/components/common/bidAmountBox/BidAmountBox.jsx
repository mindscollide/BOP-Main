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


   const formatNumber = (num) => {
    if (
      num === null ||
      num === undefined ||
      num === "" ||
      num === "-" ||
      Number(num) === 0
    )
      return "-";

    return new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    }).format(num);
  };


  return (
    <div className={`${styles[applyClass]} roboto-13`} onClick={onClick}>
      {spot && <p className="m-0">{BidBoxHeading}</p>}
      <p className="m-0">
        {/* {integerPart} */}
        {(spot || bankSpot) && (
          <span className={spot ? styles["afterDotValue"] : ""}>
            {`${formatNumber(BidAmountValue)}`}
          </span>
        )}
      </p>
    </div>
  );
});

export default BidAmountBox;


