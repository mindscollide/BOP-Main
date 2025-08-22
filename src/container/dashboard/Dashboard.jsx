import { Layout } from "antd";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
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
  setBlotterTransactionRFQExpiredForTreasury,
  setBlotterTransactionRFQExpiredForTreasuryDealBox,
  setBlotterTransactionRFQQuotedForTreasuryDealBox,
  setCategoryFeDiscounting,
  setCategoryForwardRates,
  setCategoryFowardsTenorsChanges,
  setCategoryNonFeDiscounting,
  setCategorySpotRates,
  setClearRates,
  setCounterPartyFeDiscounting,
  setCounterPartyForwardRates,
  setCounterPartyNonFeDiscounting,
  setCounterPartySpotRates,
  setFxTradingCards,
  setIncomingChat,
  setMarketTimingsUpdated,
  setTenorsCreated,
  setTreasuryFeDiscounting,
  setTreasuryForwardRates,
  setTreasuryFowardsTenorsChanges,
  setTreasuryNonFeDiscounting,
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
import {
  getMarketStatusApi,
  GetMisDataByRangeAPI,
} from "@/components/features/SpotBranch/WatchlistAction";
import { setMarketStatus } from "@/store/watchListSlicer/WatchListSlicer";
import { setUpdateVolMeterRealtime } from "@/store/dealerReducer/dealerSlicer";
import { GetNOPDataAPI } from "@/components/features/blotter/BlotterActions";
const Dashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const prevTopicRef = useRef(null);
  const prevPathRef = useRef(null);
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
    const type = data?.payload?.message;
    const payload = data?.payload;

    switch (type) {
      // ✅ Chat (real-time but low frequency)
      case "INCOMING_CHAT":
        try {
          const chatObj = {
            ...payload.chat,
            creationDateTime: formatDateToUTC(new Date()),
          };
          dispatch(setIncomingChat(chatObj));
        } catch (error) {
          console.log(error);
        }
        break;

      // ✅ Market & Tenor
      case "TENOR_CREATED":
        dispatch(setTenorsCreated(payload));
        break;
      case "MARKET_TIME_UPDATED":
        dispatch(setMarketTimingsUpdated(payload));
        break;
      case "MARKET_STATUS_UPDATED":
        dispatch(marketStatusUpdated(payload.marketStatus.isMarketOn));
        dispatch(setMarketStatus(payload.marketStatus.isMarketOn));
        break;

      // ✅ USD, FE, NONFE (wrap in startTransition for smoothness)
      case "CURRENT_USD_RATES_PUBLISHED":
        startTransition(() => {
          dispatch(currentRatePublishedAction(payload));
        });
        break;
      case "FE_DISCOUNTING_RATES_PUBLISHED":
        startTransition(() => {
          dispatch(FeDiscountingPublishedAction(payload));
        });
        break;
      case "NONFE_DISCOUNTING_RATES_PUBLISHED":
        startTransition(() => {
          dispatch(NonFeDiscountingPublishedAction(payload));
        });
        break;

      case "TENOR_WISE_FORWARD_RATES_PUBLISHED":
        startTransition(() => {
          dispatch(tenorWiseFowardsRatesPublishedActions(payload));

          let tenorsData = {
            newIsForwardtenorList:
              payload.tenorWiseForwardRates.newIsForwardtenorList,
            removedtenorList: payload.tenorWiseForwardRates.removedtenorList,
          };

          dispatch(setCategoryFowardsTenorsChanges(tenorsData));
          dispatch(setTreasuryFowardsTenorsChanges(tenorsData));
        });
        break;

      // ✅ Logout events
      case "BRANCH_STATUS_INACTIVE":
      case "CORPORATE_STATUS_INACTIVE":
        dispatch(LogoutApi({ navigate }));
        break;

      // ✅ Blotter Transaction Events (heavy updates → use startTransition)
      case "BLOTTER_TRANSACTION_ADDED":
        startTransition(() => {
          dispatch(BlotterTransactionAdded(payload));
          dispatch(BlotterTransactionAddedForTreasury(payload));
          dispatch(setBlotterTransactionAddedForTreasuryDealBox(payload));
        });
        break;

      case "BLOTTER_RFQ_TRANSACTION_EXPIRED":
        startTransition(() => {
          dispatch(BlotterTransactionRFQExpired(payload));
          dispatch(setBlotterTransactionRFQExpiredForTreasuryDealBox(payload));
          dispatch(setBlotterTransactionRFQExpiredForTreasury(payload));

          if (
            chatModal &&
            chatModalTransactionId === payload?.transaction?.pK_TransactionID
          ) {
            dispatch(setChatModal(false));
          }
        });
        break;

      case "BLOTTER_TRANSACTION_RFQ_QUOTED":
        console.log(payload, "BLOTTER_TRANSACTION_RFQ_QUOTED");
        startTransition(() => {
          dispatch(BlotterTransactionRFQQuoted(payload));
          dispatch(BlotterTransactionRFQQuotedForTreasury(payload));
          dispatch(setBlotterTransactionRFQQuotedForTreasuryDealBox(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_ASSIGNED":
        startTransition(() => {
          dispatch(BlotterTransactionAssigned(payload));
          dispatch(BlotterTransactionAssignedForTreasury(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_ACCEPTED":
        startTransition(() => {
          dispatch(BlotterTransactionAccepted(payload));
          dispatch(BlotterTransactionAcceptedForTreasury(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_CANCELLATION_REQUEST":
        startTransition(() => {
          dispatch(BlotterTransactionCancellationRequest(payload));
          dispatch(BlotterTransactionCancellationRequestForTreasury(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_CANCELLED":
        startTransition(() => {
          dispatch(BlotterTranscationCancelled(payload));
          dispatch(BlotterTranscationCancelledForTreasury(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_REJECTED":
        startTransition(() => {
          dispatch(BlotterTransactionRejected(payload));
          dispatch(BlotterTransactionRejectedForTreasury(payload));
        });
        break;

      case "BLOTTER_TRANSACTION_ASSIGNED_TO_TREASURY":
        dispatch(TransactionAssignedByTreasury(payload));
        break;

      // ✅ Spot/Forward rates — wrap in transition
      case "TREASURY_SPOT_RATES_FEED":
        startTransition(() => {
          dispatch(setTreasurySpotRatesFeed(payload));
        });
        break;
      case "DISPATCHER_SPOT_RATES":
        startTransition(() => {
          dispatch(setCounterPartySpotRates(payload));
        });
        break;
      case "DISPATCHER_CATEGORY_SPOT_RATES_FOR_TREASURY":
        startTransition(() => {
          dispatch(setCategorySpotRates(payload));
        });
        break;
      case "TREASURY_FORWARD_RATES_FEED":
        startTransition(() => {
          dispatch(setTreasuryForwardRates(payload));
        });
        break;
      case "TREASURY_FEDISCOUNTING_RATES_FEED":
        startTransition(() => {
          dispatch(setTreasuryFeDiscounting(payload));
        });
        break;
      case "TREASURY_NONFEDISCOUNTING_RATES_FEED":
        startTransition(() => {
          dispatch(setTreasuryNonFeDiscounting(payload));
        });
        break;
      case "DISPATCHER_CATEGORY_FORWARD_RATES_FOR_TREASURY":
        startTransition(() => {
          dispatch(setCategoryForwardRates(payload));
        });
        break;
      case "DISPATCHER_CATEGORY_FEDISCOUNTING_RATES_FOR_TREASURY":
        startTransition(() => {
          dispatch(setCategoryFeDiscounting(payload));
        });
        break;
      case "DISPATCHER_CATEGORY_NONFEDISCOUNTING_RATES_FOR_TREASURY":
        startTransition(() => {
          dispatch(setCategoryNonFeDiscounting(payload));
        });
        break;
      case "DISPATCHER_FORWARD_RATES":
        startTransition(() => {
          dispatch(setCounterPartyForwardRates(payload));
        });
        break;
      case "DISPATCHER_FEDISCOUNTING_RATES":
        startTransition(() => {
          dispatch(setCounterPartyFeDiscounting(payload));
        });
        break;
      case "DISPATCHER_NONFEDISCOUNTING_RATES":
        startTransition(() => {
          dispatch(setCounterPartyNonFeDiscounting(payload));
        });
        break;

      // ✅ Dashboard and Volt Meter
      case "SAVE_DASHBOARD":
        dispatch(setFxTradingCards(payload));
        break;
      case "UPDATED_VOLTMETER_STATUS":
        dispatch(setUpdateVolMeterRealtime(payload));
        break;
      case "RATES_CLEAR":
        dispatch(setClearRates(payload));
        break;

      // ✅ Role or Access Control
      case "BANK_USER_ROLE_STATUS_CHANGE":
      case "CORP_USER_ROLE_STATUS_CHANGE":
        if (Number(payload.updatedUser?.userID) === Number(userID)) {
          dispatch(LogoutApi({ navigate }));
        }
        break;

      case "TREASURY_NOP_UPDATED":
        console.log(data.payload, "TREASURY_NOP_UPDATED");
        dispatch(GetNOPDataAPI({ navigate }));

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 58, 59, 99);

        const Data = {
          StartDate: formatDateToUTC(startDate, 1),
          EndDate: formatDateToUTC(endDate, 1),
        };
        dispatch(GetMisDataByRangeAPI({ navigate, Data }));

        break;

      // ✅ Categories
      case "CATEGORY_ADDED":
        dispatch(categoryisAdded(payload));
        break;
      case "CATEGORY_UPDATED":
        dispatch(categoryisUpdated(payload));
        break;
      case "CATEGORY_DELETED":
        dispatch(categoryisDeleted(payload));
        break;

      default:
        console.warn("No specific handler for this message type", payload);
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
  const {
    connectToMqtt,
    subscribeToTopics,
    unsubscribeFromTopics,
    isConnected,
  } = useMqttClient(mqttConfig);

  useEffect(() => {
    if (IsBranch || IsCorporate) {
      if (!categoryValue) return;

      const newTopic = `BOP_TREASURY_CATEGORY_RATES_${categoryValue.value}`;

      // Subscribe to the new topic
      subscribeToTopics([newTopic]);
      console.log("Subscribed to:", newTopic);

      // Store this topic as previous for next run
      if (prevTopicRef.current !== newTopic) {
        prevTopicRef.current = newTopic;
      }
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
    if (!isConnected) return;

    const isTreasuryPath = location.pathname.includes("treasury");
    if (isTreasury || isDealer) {
      // Subscribe if entering treasury path
      if (isTreasuryPath) {
        subscribeToTopics(["BOP_REAL_TIME_FEED_TREASURY"]);
        console.log("Subscribed to BOP_REAL_TIME_FEED_TREASURY");
      } else {
        unsubscribeFromTopics([`BOP_REAL_TIME_FEED_TREASURY`]);
      }
    }

    // No cleanup here - we'll handle unsubscription in the next effect
  }, [location.pathname, isConnected]);

  // Handle unsubscription only when leaving treasury path
  useEffect(() => {
    const handlePathChange = () => {
      const wasTreasury = prevPathRef.current?.includes("treasury");
      const isNowTreasury = location.pathname.includes("treasury");

      // Unsubscribe only if we're leaving treasury path
      if (wasTreasury && !isNowTreasury) {
        unsubscribeFromTopics(["BOP_REAL_TIME_FEED_TREASURY"]);
        console.log("Unsubscribed from BOP_REAL_TIME_FEED_TREASURY");
      }

      prevPathRef.current = location.pathname;
    };

    handlePathChange();
  }, [location.pathname]);

  useEffect(() => {
    connectToMqtt({ subscribeID, userID });
    dispatch(getMarketStatusApi({ navigate }));

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
          {/* <AnimatePresence>
            {blotterTransactionAdded && isTreasury && <DealBox />}
          </AnimatePresence> */}
          {transactionInfoModal && <InfoTransaction />}

          {chatModal && <ChatBox />}
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
