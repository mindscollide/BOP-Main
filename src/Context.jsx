import { createContext, useState } from "react";

export const CreateDemoContext = createContext();

export const CreateDemoProvider = ({ children }) => {
  const [isButtonClicked, setButtonClicked] = useState(false);

  return (
    <CreateDemoContext.Provider value={{ isButtonClicked, setButtonClicked }}>
      {children}
    </CreateDemoContext.Provider>
  );
};
