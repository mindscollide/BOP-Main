import React, { createContext, useContext, useState, useCallback } from "react";
import NotificationSnackbar from "@/components/common/NotificationSnackbar";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <NotificationSnackbar message={message} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
