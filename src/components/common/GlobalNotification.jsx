import React, { useEffect, useState } from "react";
import NotificationSnackbar from "./NotificationSnackbar"; // Already used in your project
import { subscribeToGlobalMessage } from "@/components/utils/GlobalNotifier";

const GlobalNotification = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToGlobalMessage((msg) => {
      setMessage(msg);
      setTimeout(() => setMessage(""), 3000);
    });

    return unsubscribe;
  }, []);

  return <NotificationSnackbar message={message} />;
};

export default GlobalNotification;
