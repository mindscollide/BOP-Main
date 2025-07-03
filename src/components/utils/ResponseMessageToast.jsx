import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationSnackbar from "../common/NotificationSnackbar";
import { useDispatch } from "react-redux";
import { clearDealerResponseMessage } from "@/store/dealerReducer/dealerSlicer";
import { clearAuthResponseMessage } from "@/store/authSlicer/authSlicer";

export const ResponseMessage = () => {
  const disaptch = useDispatch();
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
  useEffect(() => {
    if (WatchListResponseMessage !== "") {
      setMessage(WatchListResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [WatchListResponseMessage]);
  useEffect(() => {
    if (RFQResponseMessage !== "") {
      setMessage(RFQResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [RFQResponseMessage]);
  useEffect(() => {
    if (dealerResponseMessage !== "") {
      setMessage(dealerResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [dealerResponseMessage]);
  useEffect(() => {
    if (catgeoryResponseMessage !== "") {
      setMessage(catgeoryResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [catgeoryResponseMessage]);
  useEffect(() => {
    if (ReportResponseMessage !== "") {
      setMessage(ReportResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [ReportResponseMessage]);
  useEffect(() => {
    if (CalculatorResponseMessage !== "") {
      setMessage(CalculatorResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [CalculatorResponseMessage]);
  useEffect(() => {
    if (settingResponseMessage !== "") {
      setMessage(settingResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [settingResponseMessage]);
  useEffect(() => {
    if (BlotterResponseMessage !== "") {
      setMessage(BlotterResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [BlotterResponseMessage]);
  useEffect(() => {
    if (chatResponseMessage !== "") {
      setMessage(chatResponseMessage);

      disaptch(clearDealerResponseMessage());
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [chatResponseMessage]);

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
