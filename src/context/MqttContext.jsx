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

const MqttContext = createContext();

export const MqttProvider = ({ dispatch, children }) => {
  const token = localStorage.getItem("token");
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
  const [marketTimingsUpdated, setMarketTimingsUpdated] = useState(null);
  const [IncomingChat, setIncomingChat] = useState([]);
  const [tenorsCreated, setTenorsCreated] = useState([]);
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const clientRef = useRef(null);
  const randomString = secureRandomString();
  console.log(IncomingChat, "IncomingChatIncomingChatIncomingChat");
  const subscribeToTopics = (topics) => {
    console.log(`Subscribing to topics: ${topics}`);

    if (!clientRef.current || !isConnected) return;
    console.log(`Subscribing to topics: ${topics}`);

    topics.forEach((topic) => {
      console.log(`Subscribed to topic: ${topic}`);

      // if (!subscribedTopics.includes(topic)) {
      clientRef.current.subscribe(topic, {
        qos: 0,
        onSuccess: () => {
          console.log(`Subscribed to topic: ${topic}`);
          setSubscribedTopics((prev) => Array.from(new Set([...prev, topic])));
        },
        onFailure: (error) => {
          console.error(`Failed to subscribe to ${topic}`, error.errorMessage);
        },
      });
      // }
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
        console.log(`MQTT Message on `, data);

        switch (data.payload.message) {
          case "MARKET_TIME_UPDATED":
            setMarketTimingsUpdated(data.payload);
            break;
          case "INCOMING_CHAT":
            let chatObj = {
              ...data.payload.chat,
              creationDateTime: formatDateToUTC(new Date()),
            };
            console.log(chatObj, "chatObjchatObjchatObj");
            setIncomingChat((prev) => [...prev, chatObj]);
          case "TENOR_CREATED":
            setTenorsCreated(data.payload);
            break;
          default:
            console.log("Unhandled MQTT message type:", data.payload.message);
        }
      } catch (error) {
        console.error("Failed to parse MQTT message:", error);
      }
    };

    clientRef.current.onConnected = () => {
      console.log("MQTT successfully connected");
      setIsConnected(true);

      const topics = [subscribeID, `BOP_${userID}`];
      console.log("topicsList", topics);

      subscribeToTopics(topics);
    };

    const options = {
      onSuccess: () => console.log("MQTT onSuccess: waiting for onConnected"),
      onFailure: (error) => {
        console.error("MQTT connection failed:", error.errorMessage);
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

  useEffect(() => {
    if (token) {
      connectToMqtt();
    }

    return () => {
      if (clientRef.current?.isConnected()) {
        unsubscribeFromTopics([...subscribedTopics]);
        clientRef.current.disconnect();
        console.log("Disconnected from MQTT");
      }
    };
  }, [token]);

  console.group("===== MQTT DEBUG STATUS =====");
  console.log("Client Connected:", clientRef.current?.isConnected());
  console.log("Client ID:", clientRef.current?.clientId);
  console.log("Subscribed Topics:", subscribedTopics);
  console.log("Total Topics Subscribed:", subscribedTopics.length);
  console.groupEnd("================================");

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
        marketTimingsUpdated,
        setMarketTimingsUpdated,
        setIncomingChat,
        IncomingChat,
        tenorsCreated,
        setTenorsCreated,
      }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
