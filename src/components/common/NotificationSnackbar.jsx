import React, { useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
const NotificationSnackBar = ({ message, description }) => {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (message !== "") {
      api.open({
        message: message,
        description: description,
        // duration: 200,
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    }
  }, [message, Math.random()]);

  return <>{contextHolder}</>;
};

export default NotificationSnackBar;
