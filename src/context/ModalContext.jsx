import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const GloballyModalProvider = ({ children }) => {
  const [createTenorModal, setCreateTenorModal] = useState(false);
  const [iSellAndBuyModal, setISellAndBuyModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [settingsRecord, setSettingRecords] = useState({
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,
  });
  const value = {
    createTenorModal,
    setCreateTenorModal,
    iSellAndBuyModal,
    setISellAndBuyModal,
    settingModal,
    setSettingModal,
    settingsRecord,
    setSettingRecords
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a GloballyModalProvider");
  }
  return context;
};
