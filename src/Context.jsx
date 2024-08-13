<<<<<<< Updated upstream
import React, { createContext, useState } from "react";

// Create a context
export const BOPContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  // Define your states
  const [roleValue, setRoleValue] = useState(0);
  const [corporateTreasury, setCorporateTreasury] = useState(0);
  const [value2, setValue2] = useState(false);

  // Define the functions to update the states
  const RoleValueFun = (newValue) => setRoleValue(newValue);
  const CorporateTreasuryFun = (newValue) => setCorporateTreasury(newValue);

  return (
    <BOPContext.Provider
      value={{
        roleValue,
        RoleValueFun,
        CorporateTreasuryFun,
        corporateTreasury,
      }}>
      {children}
    </BOPContext.Provider>
=======
import { createContext, useState } from "react";

export const CreateDemoContext = createContext();

export const CreateDemoProvider = ({ children }) => {
  const [isButtonClicked, setButtonClicked] = useState(false);

  return (
    <CreateDemoContext.Provider value={{ isButtonClicked, setButtonClicked }}>
      {children}
    </CreateDemoContext.Provider>
>>>>>>> Stashed changes
  );
};
