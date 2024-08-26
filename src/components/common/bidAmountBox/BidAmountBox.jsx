import React from "react";
import styles from "./BidAmountBox.module.css";

const BidAmountBox = ({
  applyClass,
  BidBoxHeading,
  BidAmountValue,
  spot,
}) => {
  return (
    <div className={`${styles[applyClass]} roboto-13`}>
      {spot && <p className='m-0'>{BidBoxHeading}</p>}

      <p className='m-0'>{BidAmountValue}</p>
    </div>
  );
};

export default BidAmountBox;
