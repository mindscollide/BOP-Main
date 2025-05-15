import React from "react";
import BankForwards from "./bankForwards/BankForwards";
import TresmarkForwards from "./bankForwards/tresmarkForwards/TresmarkForwards";
import TresmarkCrossesPreimums from "./bankForwards/tresmarkCrossessPremiums/TresmarkCrossessPremiums";

const Forwards = () => {
  const isDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  console.log(isDealer, "isDealerisDealer")
  return (
    <>
      <BankForwards />
      {isDealer === true && <TresmarkForwards />}
      {isDealer === true && <TresmarkCrossesPreimums />}
    </>
  );
};

export default Forwards;
