import React from "react";
import BankForwards from "./bankForwards/BankForwards";
import TresmarkForwards from "./bankForwards/tresmarkForwards/TresmarkForwards";
import TresmarkCrossesPreimums from "./bankForwards/tresmarkCrossessPremiums/TresmarkCrossessPremiums";

const Forwards = () => {
  return (
    <>
      <BankForwards />
      <TresmarkForwards />
      <TresmarkCrossesPreimums />
    </>
  );
};

export default Forwards;
