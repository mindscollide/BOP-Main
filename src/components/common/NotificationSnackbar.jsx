import React, { useEffect } from "react";
import { notification } from "antd";
import IconElement from "./IconElement/IconElement";
const NotificationSnackBar = ({ message, description }) => {
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    if (message !== "") {
      api.open({
        key: "notification-snackbar",
        message: message,
        description: description,
        closeIcon: <IconElement iconClass={"icon-close"} />,
        className: "custom-notification-snackbar",
      });
    }
  }, [message]);

  return <>{contextHolder}</>;
};

export default NotificationSnackBar;
