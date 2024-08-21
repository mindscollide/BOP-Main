import React from "react";
import styles from "./bitAmountBox.module.css";

const BitAmountBox = ({
  applyClass,
  BitBoxHeading,
  BitAmountValue,
  spot,
}) => {
  return (
    <div className={styles[applyClass]}>
      {spot && <p className='m-0'>{BitBoxHeading}</p>}

      <p className='m-0'>{BitAmountValue}</p>
    </div>
  );
};

export default BitAmountBox;
