import React, { useEffect } from "react";
import { notification } from "antd";

const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

const Notification = ({ setOpen, open, message, type = "error" }) => {
  useEffect(() => {
    if (open && message) {
      notification[type]({
        message: type.toUpperCase(),
        description: message,
        placement: "topRight",
        duration: 4,
        onClose: () =>
          setOpen({
            flag: false,
            message: "",
          }),
      });
    }
  }, [open, message, type, setOpen]);

  return null;
};

export { Notification, Message };
