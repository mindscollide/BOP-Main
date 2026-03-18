// src/hooks/useMqttClient.js
import { useRef, useState, useCallback } from "react";
import Paho from "paho-mqtt";
import { secureRandomString } from "@/utils/formatters";

export const useMqttClient = ({
  onMessageArrivedCallback,
  onConnectionLostCallback,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const clientRef = useRef(null);

  const randomString = useRef(secureRandomString()); // ✅ stable clientId

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  // ✅ Subscribe
  const subscribeToTopics = useCallback((topics = []) => {
    if (!clientRef.current || !clientRef.current.isConnected()) return;

    topics.forEach((topic) => {
      clientRef.current.subscribe(topic, {
        qos: 0,
        onSuccess: () => {
          console.log(`Subscribed: ${topic}`);
          setSubscribedTopics((prev) =>
            prev.includes(topic) ? prev : [...prev, topic]
          );
        },
        onFailure: (err) => {
          console.error(`Subscribe failed: ${topic}`, err?.errorMessage);
        },
      });
    });
  }, []);

  // ✅ Unsubscribe
  const unsubscribeFromTopics = useCallback((topics = []) => {
    if (!clientRef.current || !clientRef.current.isConnected()) return;

    topics.forEach((topic) => {
      clientRef.current.unsubscribe(topic, {
        onSuccess: () => {
          console.log(`Unsubscribed: ${topic}`);
          setSubscribedTopics((prev) => prev.filter((t) => t !== topic));
        },
        onFailure: (err) => {
          console.error(`Unsubscribe failed: ${topic}`, err?.errorMessage);
        },
      });
    });
  }, []);

  // ✅ Message handler (optimized)
  const onMessageArrived = useCallback(
    (message) => {
      try {
        const parsed = JSON.parse(message.payloadString);
        if (onMessageArrivedCallback) {
          onMessageArrivedCallback(parsed);
        }
      } catch (err) {
        console.error("Message parse error:", err);
      }
    },
    [onMessageArrivedCallback]
  );

  // ✅ Connection lost
  const onConnectionLost = useCallback(
    (resObj) => {
      console.warn("MQTT connection lost:", resObj?.errorMessage);
      setIsConnected(false);

      if (onConnectionLostCallback) {
        onConnectionLostCallback(resObj);
      }
    },
    [onConnectionLostCallback]
  );

  // ✅ Main connect function
  const connectToMqtt = useCallback(
    ({ subscribeID, userID }) => {
      if (!subscribeID) return;

      // 🔥 prevent duplicate clients
      if (clientRef.current?.isConnected()) {
        console.warn("Already connected");
        return;
      }

      // 🔥 reuse existing client if exists
      if (!clientRef.current) {
        clientRef.current = new Paho.Client(
          import.meta.env.VITE_MQTT_HOST,
          Number(import.meta.env.VITE_MQTT_PORT),
          randomString.current
        );

        clientRef.current.onConnectionLost = onConnectionLost;
        clientRef.current.onMessageArrived = onMessageArrived;
      }

      // ✅ reconnect + subscribe
      clientRef.current.onConnected = () => {
        console.log("MQTT connected / reconnected");
        setIsConnected(true);

        let userData = isBranch
          ? JSON.parse(localStorage.getItem("branch"))
          : JSON.parse(localStorage.getItem("corporate"));

        let subscribeIDNew =
          userData?.branchID || userData?.corporateID;

        let newTopic = isBranch
          ? `BOP_BRANCH_${subscribeIDNew}`
          : `BOP_CORPORATE_${subscribeIDNew}`;

        const topics =
          isCorporate || isBranch
            ? [subscribeID, `BOP_${userID}`, newTopic]
            : [subscribeID, `BOP_${userID}`];

        subscribeToTopics(topics);
      };

      clientRef.current.connect({
        onSuccess: () => {
          console.log("MQTT initial connect success");
        },

        onFailure: (err) => {
          console.error("MQTT connect failed:", err?.errorMessage);
          setIsConnected(false);
        },

        keepAliveInterval: 30, // 🔥 FIXED
        reconnect: true,       // 🔥 auto reconnect
        cleanSession: false,   // 🔥 session persistence
        timeout: 10,           // 🔥 important for slow net

        userName: import.meta.env.VITE_MQTT_USERNAME,
        password: import.meta.env.VITE_MQTT_PASSWORD,

        useSSL:
          import.meta.env.VITE_MQTT_PORT === "8883" &&
          import.meta.env.VITE_MQTT_HOST === "boptrade.tresmark.com",
      });
    },
    [onMessageArrived, onConnectionLost, subscribeToTopics]
  );

  // ✅ Optional disconnect (very useful)
  const disconnectMqtt = useCallback(() => {
    if (clientRef.current?.isConnected()) {
      clientRef.current.disconnect();
      setIsConnected(false);
      setSubscribedTopics([]);
      console.log("MQTT disconnected");
    }
  }, []);

  return {
    client: clientRef.current,
    isConnected,
    connectToMqtt,
    disconnectMqtt, // ✅ added
    subscribeToTopics,
    unsubscribeFromTopics,
  };
};