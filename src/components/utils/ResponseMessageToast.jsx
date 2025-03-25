import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationSnackbar from "../common/NotificationSnackbar";
// import  { NotificationSnackBar } from "../common/NotificationSnackbar";

export const ResponseMessage = () => {
  const UploadRateResponseMessage = useSelector(
    (state) => state.dealerReducer.responseMessage
  );
  const authResponseMessage = useSelector(
    (state) => state.authReducer.responseMessage
  );
  const [message, setMessage] = useState("");
  // const [open, setOpen] = useState({  message: "" });

  useEffect(() => {
    if (UploadRateResponseMessage) {
      setMessage(UploadRateResponseMessage);
    }
  }, [UploadRateResponseMessage]);
  useEffect(() => {
    if (authResponseMessage) {
      setMessage(authResponseMessage);
    }
  }, [authResponseMessage]);
  // return null
  return <NotificationSnackbar message={message} />;
};
