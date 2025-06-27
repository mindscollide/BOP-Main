import React from "react";
import BankForwards from "./bankForwards/BankForwards";
import TresmarkForwards from "./bankForwards/tresmarkForwards/TresmarkForwards";
import TresmarkCrossesPreimums from "./bankForwards/tresmarkCrossessPremiums/TresmarkCrossessPremiums";

const Forwards = () => {
  const isDealerOrIsTreasury = import.meta.env.VITE_APP_INCLUDE_DEALER === "true" || import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  console.log(isDealerOrIsTreasury, "isDealerisDealer")
  return (
    <>
      <BankForwards />
      {isDealerOrIsTreasury === true && <TresmarkForwards />}
      {isDealerOrIsTreasury === true && <TresmarkCrossesPreimums />}
    </>
  );
};

export default Forwards;
