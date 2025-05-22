import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Paho from "paho-mqtt";
import { secureRandomString } from "@/utils/formatters";

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
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const clientRef = useRef(null);
  const randomString = secureRandomString();

  const subscribeToTopics = (topics) => {
    if (!clientRef.current || !isConnected) return;

    const newSubscriptions = [];

    topics.forEach((topic) => {
      if (!subscribedTopics.includes(topic)) {
        clientRef.current.subscribe(topic, {
          qos: 0,
          onSuccess: () => {
            console.log(`Successfully subscribed to ${topic}`);
            newSubscriptions.push(topic);
          },
          onFailure: (error) => {
            console.error(
              `Failed to subscribe to ${topic}:`,
              error.errorMessage
            );
          },
        });
      }
    });

    setSubscribedTopics((prev) => [...prev, ...newSubscriptions]);
  };

  const unsubscribeFromTopics = (topics) => {
    if (!clientRef.current || !isConnected) return;

    topics.forEach((topic) => {
      clientRef.current.unsubscribe(topic, {
        onSuccess: () => {
          console.log(`Successfully unsubscribed from ${topic}`);
          setSubscribedTopics((prev) => prev.filter((t) => t !== topic));
        },
        onFailure: (error) => {
          console.error(
            `Failed to unsubscribe from ${topic}:`,
            error.errorMessage
          );
        },
      });
    });
  };

  const connectToMqtt = () => {
    if (subscribeID === null) {
      console.error("No subscribeID provided for MQTT connection.");
      return;
    }

    const newClientID = `${randomString}`;
    clientRef.current = new Paho.Client("192.168.18.241", 8228, newClientID);

    clientRef.current.onConnectionLost = (responseObject) => {
      console.error("MQTT Connection lost:", responseObject.errorMessage);
      setIsConnected(false);
      setSubscribedTopics([]);
      setTimeout(connectToMqtt, 6000);
    };

    clientRef.current.onMessageArrived = (message) => {
      try {
        const data = JSON.parse(message.payloadString);
        console.log(`Message arrived on ${message.destinationName}:`, data);

        switch (data.payload.message) {
          case "MARKET_TIME_UPDATED":
            setMarketTimingsUpdated(data.payload);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error parsing MQTT message:", error);
      }
    };

    const options = {
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        setIsConnected(true);

        // Subscribe to both required topics
        const topicsToSubscribe = [subscribeID, `BOP_${userID}`].filter(
          Boolean
        );

        console.log(topicsToSubscribe, "topicsToSubscribetopicsToSubscribe");
        subscribeToTopics(topicsToSubscribe);
      },
      onFailure: (error) => {
        console.error("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);
        setTimeout(connectToMqtt, 6000);
      },
      keepAliveInterval: 30,
      reconnect: true,
      userName: "user1",
      password: "password1",
    };

    clientRef.current.connect(options);
  };

  useEffect(() => {
    if (token) {
      connectToMqtt();
    }

    return () => {
      if (clientRef.current?.isConnected()) {
        // Unsubscribe from all topics before disconnecting
        unsubscribeFromTopics([...subscribedTopics]);
        clientRef.current.disconnect();
      }
    };
  }, [token]);

  // Resubscribe if userID changes
  useEffect(() => {
    if (isConnected && userID && !subscribedTopics.includes(userID)) {
      subscribeToTopics([userID]);
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
      }}>
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
