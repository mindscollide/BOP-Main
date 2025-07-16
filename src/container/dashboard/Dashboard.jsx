import { Layout } from "antd";
import React, { useEffect } from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatBox from "@/components/features/chatBox/ChatBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllActiveCorporatesApi,
  getAllInstrumentsApi,
} from "@/components/utils/globalApis";
import { useMqttClient } from "@/components/utils/mqttConnection";

import {
  BlotterTransactionAccepted,
  BlotterTransactionAcceptedForTreasury,
  BlotterTransactionAdded,
  BlotterTransactionAddedForTreasury,
  BlotterTransactionAssigned,
  BlotterTransactionAssignedForTreasury,
  BlotterTransactionCancellationRequest,
  BlotterTransactionCancellationRequestForTreasury,
  BlotterTransactionRFQExpired,
  BlotterTransactionRFQQuoted,
  BlotterTransactionRFQQuotedForTreasury,
  BlotterTransactionRejected,
  BlotterTransactionRejectedForTreasury,
  BlotterTranscationCancelled,
  BlotterTranscationCancelledForTreasury,
  FeDiscountingPublishedAction,
  NonFeDiscountingPublishedAction,
  TransactionAssignedByTreasury,
  categoryisAdded,
  categoryisDeleted,
  categoryisUpdated,
  currentRatePublishedAction,
  marketStatusUpdated,
  setBlotterTransactionAddedForTreasuryDealBox,
  setBlotterTransactionRFQExpiredForTreasuryDealBox,
  setBlotterTransactionRFQQuotedForTreasuryDealBox,
  setIncomingChat,
  setMarketTimingsUpdated,
  setTenorsCreated,
  tenorWiseFowardsRatesPublishedActions,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { formatDateToUTC } from "@/utils/formatters";
import { LogoutApi } from "../loginScreens/authActions/logoutAction";
import DealBox from "@/components/features/dealbox/DealBox";
import DealViewModal from "../pages/mainCorporate/rfqModal/DealViewModal/DealViewModal";
import {
  setChatModal,
  setDealModalRequest,
} from "@/store/modalSlice/modalSlicer";
import { AnimatePresence } from "framer-motion";
import { GetAllNatureOfTransactionsApi } from "../pages/mainCorporate/rfqModal/RFQActions";
import InfoTransaction from "@/components/features/blotter/infoTransaction/InfoTransaction";
const Dashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const chatModal = useSelector((state) => state.modalReducer.chatModal);
  const blotterTransactionAdded = useSelector(
    (state) =>
      state.RealtimeActionsSlice.BlotterTransactionAddedForTreasuryDealBox
  );
  const chatModalTransactionId = useSelector(
    (state) => state.modalReducer.chatModalTransactionId
  );
  const dealMoalRequest = useSelector(
    (state) => state.modalReducer.dealModalRequest
  );
  const transactionInfoModal = useSelector(
    (state) => state.modalReducer.transactionInfoModal
  );
  const IsBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const IsCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  const isDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  const subscribeID = IsBranch
    ? "BOP_BRANCH"
    : IsCorporate
    ? "BOP_CORPORATE"
    : isTreasury
    ? "BOP_TREASURY"
    : isDealer
    ? "BOP_DEALER"
    : null;
  const userID = localStorage.getItem("userID");
  const { connectToMqtt, isConnected } = useMqttClient({
    onMessageArrivedCallback: (data) => {
      switch (data.payload.message) {
        case "INCOMING_CHAT":
          try {
            const chatObj = {
              ...data.payload.chat,
              creationDateTime: formatDateToUTC(new Date()),
            };
            dispatch(setIncomingChat(chatObj));
          } catch (error) {
            console.log(error);
          }
          break;
        case "TENOR_CREATED":
          dispatch(setTenorsCreated(data.payload));
          break;
        case "MARKET_TIME_UPDATED":
          dispatch(setMarketTimingsUpdated(data.payload));
          break;
        case "CURRENT_USD_RATES_PUBLISHED":
          dispatch(currentRatePublishedAction(data.payload));
          break;
        case "FE_DISCOUNTING_RATES_PUBLISHED":
          dispatch(FeDiscountingPublishedAction(data.payload));
          break;
        case "TENOR_WISE_FORWARD_RATES_PUBLISHED":
          dispatch(tenorWiseFowardsRatesPublishedActions(data.payload));
          break;
        case "NONFE_DISCOUNTING_RATES_PUBLISHED":
          dispatch(NonFeDiscountingPublishedAction(data.payload));
          break;
        case "MARKET_STATUS_UPDATED":
          dispatch(marketStatusUpdated(data.payload.marketStatus.isMarketOn));
          break;
        case "BRANCH_STATUS_INACTIVE":
        case "CORPORATE_STATUS_INACTIVE":
          dispatch(LogoutApi({ navigate }));
          break;
        case "CATEGORY_ADDED":
          dispatch(categoryisAdded(data.payload));
          break;
        case "CATEGORY_UPDATED":
          dispatch(categoryisUpdated(data.payload));
          break;
        case "CATEGORY_DELETED":
          dispatch(categoryisDeleted(data.payload));
          break;
        case "BLOTTER_RFQ_TRANSACTION_EXPIRED":
          dispatch(BlotterTransactionRFQExpired(data.payload));
          dispatch(
            setBlotterTransactionRFQExpiredForTreasuryDealBox(data.payload)
          );

          if (
            chatModal &&
            chatModalTransactionId ===
              data.payload?.transaction?.pK_TransactionID
          ) {
            console.log(first);
            dispatch(setChatModal(false));
          }
          break;
        case "BLOTTER_TRANSACTION_ADDED":
          dispatch(BlotterTransactionAdded(data.payload));
          dispatch(BlotterTransactionAddedForTreasury(data.payload));
          dispatch(setBlotterTransactionAddedForTreasuryDealBox(data.payload));
          break;
        case "BLOTTER_TRANSACTION_ASSIGNED":
          dispatch(BlotterTransactionAssigned(data.payload));
          dispatch(BlotterTransactionAssignedForTreasury(data.payload));
          break;
        case "BLOTTER_TRANSACTION_ACCEPTED":
          dispatch(BlotterTransactionAccepted(data.payload));
          dispatch(BlotterTransactionAcceptedForTreasury(data.payload));
          break;
        case "BLOTTER_TRANSACTION_RFQ_QUOTED":
          dispatch(BlotterTransactionRFQQuoted(data.payload));
          dispatch(BlotterTransactionRFQQuotedForTreasury(data.payload));
          dispatch(
            setBlotterTransactionRFQQuotedForTreasuryDealBox(data.payload)
          );
          break;
        case "BLOTTER_TRANSACTION_CANCELLATION_REQUEST":
          dispatch(BlotterTransactionCancellationRequest(data.payload));
          dispatch(
            BlotterTransactionCancellationRequestForTreasury(data.payload)
          );
          break;
        case "BLOTTER_TRANSACTION_CANCELLED":
          dispatch(BlotterTranscationCancelled(data.payload));
          dispatch(BlotterTranscationCancelledForTreasury(data.payload));
          break;
        case "BLOTTER_TRANSACTION_REJECTED":
          dispatch(BlotterTransactionRejected(data.payload));
          dispatch(BlotterTransactionRejectedForTreasury(data.payload));
          break;
        case "BLOTTER_TRANSACTION_ASSIGNED_TO_TREASURY":
          dispatch(TransactionAssignedByTreasury(data.payload));
          break;
        default:
          console.warn("No specific handler for this message type");
          break;
      }
    },
    onConnectionLostCallback: () => {
      console.warn("MQTT disconnected inside feature");
    },
  });

  console.log(isConnected, "clientRef in dashboard");

  useEffect(() => {
    connectToMqtt({ subscribeID, userID });

    if (isTreasury === "true") {
      setTimeout(() => {
        dispatch(setDealModalRequest(true));
      }, 5000);
    }
    if (IsCorporate || IsBranch) {
      dispatch(GetAllNatureOfTransactionsApi({ navigate }));
      if (IsBranch) {
        dispatch(getAllActiveCorporatesApi({ navigate }));
      }
    }
    if (isTreasury === "false") {
      dispatch(getAllInstrumentsApi({ navigate }));
    }
  }, []);
  return (
    <Layout className="roboto-13">
      {!location.pathname.includes("calculator") && <Header />}

      <GlobalNavbar />
      <Content>
        <main className="px-3">
          <Outlet />
          <AnimatePresence>
            {blotterTransactionAdded && isTreasury && dealMoalRequest && (
              <DealBox />
            )}
          </AnimatePresence>
          {transactionInfoModal && <InfoTransaction />}

          {chatModal && <ChatBox />}
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
