import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../common/NotificationSnackbar";

const ResponseMessage = () => {
  const UploadRateResponseMessage = useSelector(
    (state) => state.uploadRatesSlicer.responseMessage
  );

  const [open, setOpen] = useState({ flag: false, message: "", type: "info" });

  useEffect(() => {
    if (UploadRateResponseMessage) {
      setOpen({ flag: true, message: UploadRateResponseMessage, type: "success" });

      // Automatically close the notification after 5 seconds
      const timer = setTimeout(() => {
        setOpen({ flag: false, message: "", type: "info" });
      }, 5000);

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [UploadRateResponseMessage]);

  return ( null
    // <Notification setOpen={setOpen} open={open.flag} message={open.message} type={open.type} />
  );
};

export default ResponseMessage;
