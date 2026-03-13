import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModalContext = createContext();

export const GloballyModalProvider = ({ children }) => {
  const [createTenorModal, setCreateTenorModal] = useState(false);
  const [iSellAndBuyModal, setISellAndBuyModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [chatModalTransactionId, setChatModalTransactionId] = useState("");
  const [settingsRecord, setSettingRecords] = useState({
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,

    CU_Enable2FA: false,
    CU_SoundOnEveryMessage: false,
    CU_EmailOnEveryMessage: false,
  });
  const [transactionInfoModal, setTransactionInfoModal] = useState(false);
  const [publishedSpotRates, setPublishedSpotRates] = useState(false);
  const [allForwardApplicableTenors, setAllForwardApplicableTenors] = useState(null);

  const getAllTenorsRecords = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );

  useEffect(() => {
    if(getAllTenorsRecords !== null) {
      try {
        setAllForwardApplicableTenors(getAllTenorsRecords)
      } catch (error) {
        console.log(error, "error in setting tenors in context");
        
      }
    }
  },[getAllTenorsRecords])
  const value = {
    allForwardApplicableTenors,
    createTenorModal,
    setCreateTenorModal,
    iSellAndBuyModal,
    setISellAndBuyModal,
    settingModal,
    setSettingModal,
    settingsRecord,
    setSettingRecords,
    setChatModal,
    chatModal,
    setChatModalTransactionId,
    chatModalTransactionId,
    setTransactionInfoModal,
    transactionInfoModal,
    publishedSpotRates,
    setPublishedSpotRates,
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
