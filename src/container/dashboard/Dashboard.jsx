import { Layout } from "antd";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
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
  setCategorySpotRates,
  setCounterPartySpotRates,
  setIncomingChat,
  setMarketTimingsUpdated,
  setTenorsCreated,
  setTreasurySpotRatesFeed,
  tenorWiseFowardsRatesPublishedActions,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { formatDateToUTC } from "@/utils/formatters";
import { LogoutApi } from "../loginScreens/authActions/logoutAction";
import DealBox from "@/components/features/dealbox/DealBox";
import DealViewModal from "../pages/mainCorporate/rfqModal/SpotQuoteModal/SpotQuoteModal";
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
  const prevTopicRef = useRef(null);
  const chatModal = useSelector((state) => state.modalReducer.chatModal);
  const categoryValue = useSelector(
    (state) => state.dealerReducer.categoryValue
  );
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

  // Memoized MQTT message handler
  const handleMqttMessage = useCallback((data) => {
    // console.log(data, "datadatadatadata");
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
          chatModalTransactionId === data.payload?.transaction?.pK_TransactionID
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
      case "TREASURY_SPOT_RATES_FEED":
        dispatch(setTreasurySpotRatesFeed(data.payload));
        break;
      case "DISPATCHER_SPOT_RATES":
        console.log(data.payload, "DISPATCHER_SPOT_RATES");
        dispatch(setCounterPartySpotRates(data.payload));
        break;
      case "DISPATCHER_CATEGORY_SPOT_RATES_FOR_TREASURY":
        dispatch(setCategorySpotRates(data.payload));
        console.log(
          "DISPATCHER_CATEGORY_SPOT_RATES_FOR_TREASURY",
          data.payload
        );
      default:
        console.warn("No specific handler for this message type");
        break;
    }
  }, []);

  // MQTT configuration
  const mqttConfig = useMemo(
    () => ({
      onMessageArrivedCallback: handleMqttMessage,
      onConnectionLostCallback: () => {
        console.warn("MQTT disconnected inside feature");
      },
    }),
    [handleMqttMessage]
  );
  const { connectToMqtt, subscribeToTopics, unsubscribeFromTopics } =
    useMqttClient(mqttConfig);

  useEffect(() => {
    if (!categoryValue) return;

    const newTopic = `BOP_TREASURY_CATEGORY_RATES_${categoryValue.value}`;

    // Subscribe to the new topic
    subscribeToTopics([newTopic]);
    console.log("Subscribed to:", newTopic);

    // Store this topic as previous for next run
    if (prevTopicRef.current !== newTopic) {
      prevTopicRef.current = newTopic;
    }

    // Cleanup to unsubscribe the previous topic
    return () => {
      if (prevTopicRef.current) {
        unsubscribeFromTopics([prevTopicRef.current]);
        console.log("Unsubscribed from:", prevTopicRef.current);
      }
    };
  }, [categoryValue]);

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
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}

      <GlobalNavbar />
      <Content>
        <main className='px-3'>
          <Outlet />
          <AnimatePresence>
            {blotterTransactionAdded && isTreasury && <DealBox />}
          </AnimatePresence>
          {transactionInfoModal && <InfoTransaction />}

          {chatModal && <ChatBox />}
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
