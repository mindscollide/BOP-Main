import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import NotificationSnackbar from "../common/NotificationSnackbar";
import { clearDealerResponseMessage } from "@/store/dealerReducer/dealerSlicer";
import {
  clearAuthResponseMessage,
  setGlobalSnackBarMessage,
} from "@/store/authSlicer/authSlicer";
import { clearBlotterResponseMessage } from "@/store/BlotterSlicer/BlotterSlicer";
import { clearCatgeoryResponseMessage } from "@/store/categoryReducer/categoryReducer";
import { clearReportResponseMessage } from "@/store/ReportSlicer/ReportSlicer";
import { clearSettingResponseMessage } from "@/store/settingSlicer/SettingSlicer";
import { clearWatchListResponseMessage } from "@/store/watchListSlicer/WatchListSlicer";
export const ResponseMessage = () => {
  const dispatch = useDispatch();

  const sources = [
    {
      key: "dealer",
      msg: useSelector((s) => s.dealerReducer.responseMessage),
      severity: useSelector((s) => s.dealerReducer.errorSeverity),
      clear: clearDealerResponseMessage,
    },
    {
      key: "auth",
      msg: useSelector((s) => s.authReducer.responseMessage),
      severity: useSelector((s) => s.authReducer.errorSeverity),
      clear: clearAuthResponseMessage,
    },
    {
      key: "watchlist",
      msg: useSelector((s) => s.WatchListReducer.responseMessage),
      severity: useSelector((s) => s.WatchListReducer.errorSeverity),
      clear: clearWatchListResponseMessage,
    },
    {
      key: "rfq",
      msg: useSelector((s) => s.RFQReducer.responseMessage),
      severity: useSelector((s) => s.RFQReducer.errorSeverity),
      clear: null,
    },
    {
      key: "category",
      msg: useSelector((s) => s.categoryReducer.responseMessage),
      severity: useSelector((s) => s.categoryReducer.errorSeverity),
      clear: clearCatgeoryResponseMessage,
    },
    {
      key: "report",
      msg: useSelector((s) => s.ReportReducer.responseMessage),
      severity: useSelector((s) => s.ReportReducer.errorSeverity),
      clear: clearReportResponseMessage,
    },
    {
      key: "calculator",
      msg: useSelector((s) => s.CalculatorReducer.responseMessage),
      severity: useSelector((s) => s.CalculatorReducer.errorSeverity),
      clear: null,
    },
    {
      key: "setting",
      msg: useSelector((s) => s.settingSlicer.responseMessage),
      severity: useSelector((s) => s.settingSlicer.errorSeverity),
      clear: clearSettingResponseMessage,
    },
    {
      key: "blotter",
      msg: useSelector((s) => s.BlotterSlicer.responseMessage),
      severity: useSelector((s) => s.BlotterSlicer.errorSeverity),
      clear: clearBlotterResponseMessage,
    },
    {
      key: "chat",
      msg: useSelector((s) => s.chatSlicer.responseMessage),
      severity: useSelector((s) => s.chatSlicer.errorSeverity),
      clear: null,
    },
    {
      key: "globalMessage",
      msg: useSelector((s) => s.authReducer.globalSnackBarMessage),
      severity: "error",
      clear: setGlobalSnackBarMessage,
    },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      sources.forEach(({ key, msg, severity, clear }) => {
        if (msg && msg !== "") {
          const newItem = {
            id: `${key}-${Date.now()}-${Math.random()}`,
            message: msg,
            severity,
            source: key,
          };

          setMessages((prev) => {
            const exists = prev.some(
              (m) => m.source === key && m.message === msg
            );
            if (exists) return prev;
            return [...prev, newItem];
          });

          // After 2 seconds, clear slice + remove from local list
          setTimeout(() => {
            if (clear) dispatch(clear());
            setMessages((prev) => prev.filter((m) => m.source !== key));
          }, 3000);
        }
      });
    },
    sources.map((s) => s.msg)
  ); // re-run when any slice msg changes

  return <NotificationSnackbar messages={messages} />;
};
