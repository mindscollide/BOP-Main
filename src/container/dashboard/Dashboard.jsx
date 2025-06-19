import { Layout } from "antd";
import React, { useEffect } from "react";
import Header from "@/components/layout/header/header";
import GlobalNavbar from "@/components/layout/nav/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatBox from "@/components/features/chatBox/ChatBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllInstrumentsApi } from "@/components/utils/globalApis";
import { useMqttClient } from "@/components/utils/mqttConnection";
import {
  FeDiscountingPublishedAction,
  NonFeDiscountingPublishedAction,
  categoryisAdded,
  categoryisDeleted,
  categoryisUpdated,
  currentRatePublishedAction,
  marketStatusUpdated,
  setIncomingChat,
  setMarketTimingsUpdated,
  setTenorsCreated,
  tenorWiseFowardsRatesPublishedActions,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { formatDateToUTC } from "@/utils/formatters";
import { LogoutApi } from "../loginScreens/authActions/logoutAction";
import DealBox from "@/components/features/dealbox/DealBox";
import DealViewModal from "../pages/mainCorporate/rfqModal/DealViewModal/DealViewModal";
import { setDealModalRequest } from "@/store/modalSlice/modalSlicer";
import { AnimatePresence } from "framer-motion";
const Dashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const chatModal = useSelector((state) => state.modalReducer.chatModal);
  const dealMoalRequest = useSelector(
    (state) => state.modalReducer.dealModalRequest
  );
  console.log(dealMoalRequest, "dealMoalRequestdealMoalRequest");
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
      console.log("Handle feature-specific data", data.payload.message);
      switch (data.payload.message) {
        case "INCOMING_CHAT":
          console.log("Handle feature-specific data", data.payload.message);
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

    dispatch(getAllInstrumentsApi({ navigate }));
  }, []);
  return (
    <Layout className='roboto-13'>
      {!location.pathname.includes("calculator") && <Header />}

      <GlobalNavbar />
      <Content>
        <main className='px-3'>
          <Outlet />
          <AnimatePresence>{dealMoalRequest && <DealBox />}</AnimatePresence>

          <DealViewModal />
          {chatModal && <ChatBox />}
        </main>
      </Content>
    </Layout>
  );
};

export default Dashboard;
