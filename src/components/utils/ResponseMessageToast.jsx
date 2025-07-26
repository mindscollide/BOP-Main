import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import NotificationSnackbar from "../common/NotificationSnackbar";
import { clearDealerResponseMessage } from "@/store/dealerReducer/dealerSlicer";
import { clearAuthResponseMessage } from "@/store/authSlicer/authSlicer";
import { clearBlotterResponseMessage } from "@/store/BlotterSlicer/BlotterSlicer";
import { clearCatgeoryResponseMessage } from "@/store/categoryReducer/categoryReducer";
import { clearReportResponseMessage } from "@/store/ReportSlicer/ReportSlicer";
import { clearSettingResponseMessage } from "@/store/settingSlicer/SettingSlicer";
import { clearWatchListResponseMessage } from "@/store/watchListSlicer/WatchListSlicer";

export const ResponseMessage = () => {
  const dispatch = useDispatch();

  const UploadRateResponseMessage = useSelector(
    (state) => state.dealerReducer.responseMessage
  );
  const authResponseMessage = useSelector(
    (state) => state.authReducer.responseMessage
  );
  const WatchListResponseMessage = useSelector(
    (state) => state.WatchListReducer.responseMessage
  );
  const RFQResponseMessage = useSelector(
    (state) => state.RFQReducer.responseMessage
  );
  const dealerResponseMessage = useSelector(
    (state) => state.dealerReducer.responseMessage
  );
  const catgeoryResponseMessage = useSelector(
    (state) => state.categoryReducer.responseMessage
  );
  const ReportResponseMessage = useSelector(
    (state) => state.ReportReducer.responseMessage
  );
  const CalculatorResponseMessage = useSelector(
    (state) => state.CalculatorReducer.responseMessage
  );
  const settingResponseMessage = useSelector(
    (state) => state.settingSlicer.responseMessage
  );
  const BlotterResponseMessage = useSelector(
    (state) => state.BlotterSlicer.responseMessage
  );
  const chatResponseMessage = useSelector(
    (state) => state.chatSlicer.responseMessage
  );

  const [message, setMessage] = useState("");

  // Debug logs
  console.group("🔔 Response Messages State");
  console.log("✅ UploadRateResponseMessage:", UploadRateResponseMessage);
  console.log("✅ authResponseMessage:", authResponseMessage);
  console.log("✅ WatchListResponseMessage:", WatchListResponseMessage);
  console.log("✅ RFQResponseMessage:", RFQResponseMessage);
  console.log("✅ dealerResponseMessage:", dealerResponseMessage);
  console.log("✅ catgeoryResponseMessage:", catgeoryResponseMessage);
  console.log("✅ ReportResponseMessage:", ReportResponseMessage);
  console.log("✅ CalculatorResponseMessage:", CalculatorResponseMessage);
  console.log("✅ settingResponseMessage:", settingResponseMessage);
  console.log("✅ BlotterResponseMessage:", BlotterResponseMessage);
  console.log("✅ chatResponseMessage:", chatResponseMessage);
  console.groupEnd();

  const showMessage = (msg, clearAction) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      if (clearAction) dispatch(clearAction());
    }, 3000);
  };

  useEffect(() => {
    if (
      WatchListResponseMessage !== "" &&
      WatchListResponseMessage !== undefined
    ) {
      showMessage(WatchListResponseMessage, clearWatchListResponseMessage);
    }
  }, [WatchListResponseMessage]);

  useEffect(() => {
    if (RFQResponseMessage !== "" && RFQResponseMessage !== undefined) {
      showMessage(RFQResponseMessage);
    }
  }, [RFQResponseMessage]);

  useEffect(() => {
    if (dealerResponseMessage !== "" && dealerResponseMessage !== undefined) {
      showMessage(dealerResponseMessage, clearDealerResponseMessage);
    }
  }, [dealerResponseMessage]);

  useEffect(() => {
    if (
      catgeoryResponseMessage !== "" &&
      catgeoryResponseMessage !== undefined
    ) {
      showMessage(catgeoryResponseMessage, clearCatgeoryResponseMessage);
    }
  }, [catgeoryResponseMessage]);

  useEffect(() => {
    if (ReportResponseMessage !== "" && ReportResponseMessage !== undefined) {
      showMessage(ReportResponseMessage, clearReportResponseMessage);
    }
  }, [ReportResponseMessage]);

  useEffect(() => {
    if (
      CalculatorResponseMessage !== "" &&
      CalculatorResponseMessage !== undefined
    ) {
      showMessage(CalculatorResponseMessage);
    }
  }, [CalculatorResponseMessage]);

  useEffect(() => {
    if (settingResponseMessage !== "" && settingResponseMessage !== undefined) {
      showMessage(settingResponseMessage, clearSettingResponseMessage);
    }
  }, [settingResponseMessage]);

  useEffect(() => {
    if (BlotterResponseMessage !== "" && BlotterResponseMessage !== undefined) {
      showMessage(BlotterResponseMessage, clearBlotterResponseMessage);
    }
  }, [BlotterResponseMessage]);

  useEffect(() => {
    if (chatResponseMessage !== "" && chatResponseMessage !== undefined) {
      showMessage(chatResponseMessage);
    }
  }, [chatResponseMessage]);

  useEffect(() => {
    if (authResponseMessage !== "" && authResponseMessage !== undefined) {
      showMessage(authResponseMessage, clearAuthResponseMessage);
    }
  }, [authResponseMessage]);

  useEffect(() => {
    if (
      UploadRateResponseMessage !== "" &&
      UploadRateResponseMessage !== undefined
    ) {
      showMessage(UploadRateResponseMessage, clearDealerResponseMessage);
    }
  }, [UploadRateResponseMessage]);

  return <NotificationSnackbar message={message} />;
};
