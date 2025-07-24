import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationSnackbar from "../common/NotificationSnackbar";
import { useDispatch } from "react-redux";
import { clearDealerResponseMessage } from "@/store/dealerReducer/dealerSlicer";
import { clearAuthResponseMessage } from "@/store/authSlicer/authSlicer";
import { clearBlotterResponseMessage } from "@/store/BlotterSlicer/BlotterSlicer";
import { clearCatgeoryResponseMessage } from "@/store/categoryReducer/categoryReducer";
import { clearReportResponseMessage } from "@/store/ReportSlicer/ReportSlicer";
import { clearSettingResponseMessage } from "@/store/settingSlicer/SettingSlicer";

export const ResponseMessage = () => {
  const disaptch = useDispatch();
  const UploadRateResponseMessage = useSelector(
    (state) => state.dealerReducer.responseMessage
  );
  console.log(UploadRateResponseMessage, "UploadRateResponseMessage");
  const authResponseMessage = useSelector(
    (state) => state.authReducer.responseMessage
  );
  console.log(authResponseMessage, "UploadRateResponseMessage");

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

  console.log(BlotterResponseMessage, "BlotterResponseMessage");
  const chatResponseMessage = useSelector(
    (state) => state.chatSlicer.responseMessage
  );
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (WatchListResponseMessage !== "") {
      setMessage(WatchListResponseMessage);

      setTimeout(() => {
        setMessage("");
        // disaptch(clearDealerResponseMessage());
      }, 3000);
    }
  }, [WatchListResponseMessage]);
  useEffect(() => {
    if (RFQResponseMessage !== "") {
      setMessage(RFQResponseMessage);

      setTimeout(() => {
        setMessage("");
        // disaptch(clearDealerResponseMessage());
      }, 3000);
    }
  }, [RFQResponseMessage]);
  useEffect(() => {
    if (dealerResponseMessage !== "") {
      setMessage(dealerResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearDealerResponseMessage());
      }, 3000);
    }
  }, [dealerResponseMessage]);
  useEffect(() => {
    if (catgeoryResponseMessage !== "") {
      setMessage(catgeoryResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearCatgeoryResponseMessage());
      }, 3000);
    }
  }, [catgeoryResponseMessage]);
  useEffect(() => {
    if (ReportResponseMessage !== "") {
      setMessage(ReportResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearReportResponseMessage());
      }, 3000);
    }
  }, [ReportResponseMessage]);
  useEffect(() => {
    if (CalculatorResponseMessage !== "") {
      setMessage(CalculatorResponseMessage);

      setTimeout(() => {
        setMessage("");
        // disaptch(clearDealerResponseMessage());
      }, 3000);
    }
  }, [CalculatorResponseMessage]);
  useEffect(() => {
    if (settingResponseMessage !== "") {
      setMessage(settingResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearSettingResponseMessage());
      }, 3000);
    }
  }, [settingResponseMessage]);
  useEffect(() => {
    if (BlotterResponseMessage !== "") {
      setMessage(BlotterResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearBlotterResponseMessage());
      }, 3000);
    }
  }, [BlotterResponseMessage]);
  useEffect(() => {
    if (chatResponseMessage !== "") {
      setMessage(chatResponseMessage);

      setTimeout(() => {
        setMessage("");
        // disaptch(clearDealerResponseMessage());
      }, 3000);
    }
  }, [chatResponseMessage]);

  useEffect(() => {
    if (authResponseMessage) {
      setMessage(authResponseMessage);

      setTimeout(() => {
        setMessage("");
        disaptch(clearAuthResponseMessage());
      }, 3000);
    }
  }, [authResponseMessage]);
  // UploadRateResponseMessage
  useEffect(() => {
    if (UploadRateResponseMessage) {
      setMessage(UploadRateResponseMessage);

      setTimeout(() => {
        setMessage("");
        // disaptch(clearAuthResponseMessage());
      }, 3000);
    }
  }, [UploadRateResponseMessage]);
  // return null
  return <NotificationSnackbar message={message} />;
};
