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

  const sources = [
    {
      msg: useSelector((s) => s.dealerReducer.responseMessage),
      clear: clearDealerResponseMessage,
    },
    {
      msg: useSelector((s) => s.authReducer.responseMessage),
      clear: clearAuthResponseMessage,
    },
    {
      msg: useSelector((s) => s.WatchListReducer.responseMessage),
      clear: clearWatchListResponseMessage,
    },
    { msg: useSelector((s) => s.RFQReducer.responseMessage), clear: null },
    {
      msg: useSelector((s) => s.categoryReducer.responseMessage),
      clear: clearCatgeoryResponseMessage,
    },
    {
      msg: useSelector((s) => s.ReportReducer.responseMessage),
      clear: clearReportResponseMessage,
    },
    {
      msg: useSelector((s) => s.CalculatorReducer.responseMessage),
      clear: null,
    },
    {
      msg: useSelector((s) => s.settingSlicer.responseMessage),
      clear: clearSettingResponseMessage,
    },
    {
      msg: useSelector((s) => s.BlotterSlicer.responseMessage),
      clear: clearBlotterResponseMessage,
    },
    { msg: useSelector((s) => s.chatSlicer.responseMessage), clear: null },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      sources.forEach(({ msg, clear }) => {
        if (msg && msg !== "") {
          const newItem = {
            id: `${Date.now()}-${Math.random()}`,
            message: msg,
          };

          setMessages((prev) => {
            // Avoid adding duplicates
            const exists = prev.some((m) => m.message === msg);
            if (exists) return prev;
            return [...prev, newItem];
          });

          // clear after display
          setTimeout(() => {
            if (clear) dispatch(clear());
          }, 2000);
        }
      });
    },
    sources.map((s) => s.msg)
  ); // triggers when any msg changes

  return <NotificationSnackbar messages={messages} />;
};
