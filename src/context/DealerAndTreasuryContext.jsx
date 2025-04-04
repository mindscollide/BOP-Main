import React, { createContext, useState, useContext } from "react";

// Create the context
const DealerAndTreasuryContext = createContext();

// Create a provider component
const DealerAndTreasuryProvider = ({ children }) => {
  // on Dealer Page we have forwards tenor table data
  const [forwardsForTreasuryBranch, setForwardsForTreasuryBranch] = useState(
    []
  );
  const [categoryValue, setCategoryValue] = useState({
    value: 0,
    label: "",
  });

  // Context value
  const contextValue = {
    forwardsForTreasuryBranch,
    setForwardsForTreasuryBranch,
    categoryValue,
    setCategoryValue,
  };

  return (
    <DealerAndTreasuryContext.Provider value={contextValue}>
      {children}
    </DealerAndTreasuryContext.Provider>
  );
};

// Custom hook to access the context
const useDealerAndTreasury = () => {
  return useContext(DealerAndTreasuryContext);
};

export { DealerAndTreasuryProvider, useDealerAndTreasury };
