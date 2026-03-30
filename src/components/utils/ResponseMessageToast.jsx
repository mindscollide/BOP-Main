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
      clear: clearDealerResponseMessage,
    },
    {
      key: "auth",
      msg: useSelector((s) => s.authReducer.responseMessage),
      clear: clearAuthResponseMessage,
    },
    {
      key: "watchlist",
      msg: useSelector((s) => s.WatchListReducer.responseMessage),
      clear: clearWatchListResponseMessage,
    },
    {
      key: "rfq",
      msg: useSelector((s) => s.RFQReducer.responseMessage),
      clear: null,
    },
    {
      key: "category",
      msg: useSelector((s) => s.categoryReducer.responseMessage),
      clear: clearCatgeoryResponseMessage,
    },
    {
      key: "report",
      msg: useSelector((s) => s.ReportReducer.responseMessage),
      clear: clearReportResponseMessage,
    },
    {
      key: "calculator",
      msg: useSelector((s) => s.CalculatorReducer.responseMessage),
      clear: null,
    },
    {
      key: "setting",
      msg: useSelector((s) => s.settingSlicer.responseMessage),
      clear: clearSettingResponseMessage,
    },
    {
      key: "blotter",
      msg: useSelector((s) => s.BlotterSlicer.responseMessage),
      clear: clearBlotterResponseMessage,
    },
    {
      key: "chat",
      msg: useSelector((s) => s.chatSlicer.responseMessage),
      clear: null,
    },
    {
      key: "globalMessage",
      msg: useSelector((s) => s.authReducer.globalSnackBarMessage),
      clear: setGlobalSnackBarMessage,
    },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      sources.forEach(({ key, msg, clear }) => {
        if (msg && msg !== "") {
          const newItem = {
            id: `${key}-${Date.now()}-${Math.random()}`,
            message: msg,
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
