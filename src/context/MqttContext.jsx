// src/context/MqttContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Paho from "paho-mqtt";
import { formatDateToUTC, secureRandomString } from "@/utils/formatters";
import { useDispatch } from "react-redux";
import {
  FeDiscountingPublishedAction,
  NonFeDiscountingPublishedAction,
  currentRatePublishedAction,
  marketStatusUpdated,
  setMarketTimingsUpdated,
  tenorWiseFowardsRatesPublishedActions,
} from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "@/container/loginScreens/authActions/logoutAction";

const MqttContext = createContext();
let externalConnectFn = null; // 👈 This will hold the function reference
let mqttReadyResolve;

export const mqttReady = new Promise((resolve) => {
  mqttReadyResolve = resolve;
});

export const MqttProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
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

  const [isConnected, setIsConnected] = useState(false);
  const [IncomingChat, setIncomingChat] = useState([]);
  const [tenorsCreated, setTenorsCreated] = useState(null);

  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const clientRef = useRef(null);
  const randomString = secureRandomString();

  const subscribeToTopics = (topics) => {
    if (!clientRef.current || !clientRef.current.isConnected()) {
      console.warn("MQTT client not connected. Subscription skipped.");
      return;
    }

    topics.forEach((topic) => {
      if (!subscribedTopics.includes(topic)) {
        clientRef.current.subscribe(topic, {
          qos: 0,
          onSuccess: () => {
            console.log(`Subscribed to topic: ${topic}`);
            setSubscribedTopics((prev) =>
              Array.from(new Set([...prev, topic]))
            );
          },
          onFailure: (error) => {
            console.log(`Failed to subscribe to ${topic}`, error.errorMessage);
          },
        });
      }
    });
  };

  const unsubscribeFromTopics = (topics) => {
    if (!clientRef.current || !isConnected) return;
    topics.forEach((topic) => {
      clientRef.current.unsubscribe(topic, {
        onSuccess: () => {
          console.log(`Unsubscribed from topic: ${topic}`);
          setSubscribedTopics((prev) => prev.filter((t) => t !== topic));
        },
        onFailure: (error) => {
          console.error(
            `Failed to unsubscribe from ${topic}`,
            error.errorMessage
          );
        },
      });
    });
  };

  const connectToMqtt = () => {
    if (!subscribeID || clientRef.current?.isConnected()) {
      console.warn("MQTT: Already connected or missing subscribeID");
      return;
    }

    const newClientID = `${randomString}`;
    clientRef.current = new Paho.Client("192.168.18.241", 8228, newClientID);

    clientRef.current.onConnectionLost = (responseObject) => {
      console.warn("MQTT connection lost:", responseObject?.errorMessage);
      setIsConnected(false);
      setSubscribedTopics([]);
      setTimeout(connectToMqtt, 6000);
    };

    clientRef.current.onMessageArrived = (message) => {
      try {
        const data = JSON.parse(message.payloadString);
        console.log("MQTT message arrived:", data);
        switch (data.payload.message) {
          case "MARKET_TIME_UPDATED":
            dispatch(setMarketTimingsUpdated(data.payload));
            break;
          case "INCOMING_CHAT":
            const chatObj = {
              ...data.payload.chat,
              creationDateTime: formatDateToUTC(new Date()),
            };
            setIncomingChat((prev) => [...prev, chatObj]);
            // dispatch(setIncomingChat(chatObj));
            break;
          case "TENOR_CREATED":
            setTenorsCreated(data.payload);
            // dispatch(setTenorsCreated(data.payload));
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
            dispatch(marketStatusUpdated(data.payload));
            break;
          case "BRANCH_STATUS_INACTIVE":
            console.log(
              "Branch status is inactive, disconnecting MQTT client."
            );
            // dispatch(LogoutApi({ navigate }));
          default:
            console.log("Unhandled MQTT message type:", data.payload.message);
        }
      } catch (error) {
        console.log("Failed to parse MQTT message:", error);
      }
    };

    clientRef.current.onConnected = () => {
      console.log("MQTT successfully connected");
      setIsConnected(true);
      const topics = [subscribeID, `BOP_${userID}`];
      subscribeToTopics(topics);
    };

    const options = {
      onSuccess: () => console.log("MQTT onSuccess: waiting for onConnected"),
      onFailure: (error) => {
        console.log("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);
        setTimeout(connectToMqtt, 6000);
      },
      keepAliveInterval: 300,
      reconnect: true,
      userName: "user1",
      password: "password1",
      cleanSession: true,
      useSSL: false,
    };

    clientRef.current.connect(options);
  };

  // Make connectToMqtt available outside the component
  externalConnectFn = connectToMqtt;

  useEffect(() => {
    if (token) {
      connectToMqtt();
      mqttReadyResolve();
    } // ✅ Now it's safe to call connectToMqttExternally
    return () => {
      if (clientRef.current?.isConnected()) {
        unsubscribeFromTopics([...subscribedTopics]);
        clientRef.current.disconnect();
        console.log("Disconnected from MQTT");
      }
    };
  }, [token]);

  useEffect(() => {
    if (isConnected && userID && !subscribedTopics.includes(`BOP_${userID}`)) {
      subscribeToTopics([subscribeID, `BOP_${userID}`]);
    }
  }, [userID, isConnected]);

  return (
    <MqttContext.Provider
      value={{
        client: clientRef.current,
        isConnected,
        subscribedTopics,
        subscribeToTopics,
        unsubscribeFromTopics,
        setIncomingChat,
        IncomingChat,
        setTenorsCreated,
        connectToMqtt, // Optional: available in children components
      }}>
      {children}
    </MqttContext.Provider>
  );
};

// 👇 This is your single exported connection function
export const connectToMqttExternally = () => {
  if (typeof externalConnectFn === "function") {
    externalConnectFn();
  } else {
    console.warn("MQTT connection function not initialized yet.");
  }
};

export const useMqtt = () => useContext(MqttContext);
