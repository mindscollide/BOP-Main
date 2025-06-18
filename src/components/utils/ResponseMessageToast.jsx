import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationSnackbar from "../common/NotificationSnackbar";
import { useDispatch } from "react-redux";
import { clearDealerResponseMessage } from "@/store/dealerReducer/dealerSlicer";
import { clearAuthResponseMessage } from "@/store/authSlicer/authSlicer";
// import  { NotificationSnackBar } from "../common/NotificationSnackbar";

export const ResponseMessage = () => {
  const disaptch = useDispatch();
  const UploadRateResponseMessage = useSelector(
    (state) => state.dealerReducer.responseMessage
  );
  const authResponseMessage = useSelector(
    (state) => state.authReducer.responseMessage
  );
  const [message, setMessage] = useState("");

  console.log(authResponseMessage, "authResponseMessageauthResponseMessage");
  // const [open, setOpen] = useState({  message: "" });

  useEffect(() => {
    if (UploadRateResponseMessage !== "") {
      setMessage(UploadRateResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [UploadRateResponseMessage]);
  useEffect(() => {
    if (authResponseMessage) {
      setMessage(authResponseMessage);

      disaptch(clearAuthResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [authResponseMessage]);
  // return null
  return <NotificationSnackbar message={message} />;
};
