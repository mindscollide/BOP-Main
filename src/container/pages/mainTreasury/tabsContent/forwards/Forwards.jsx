import React from "react";
import BankForwards from "./bankForwards/BankForwards";

const Forwards = () => {
  const isDealerOrIsTreasury =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  return (
    <>
      <BankForwards />
    </>
  );
};

export default Forwards;
