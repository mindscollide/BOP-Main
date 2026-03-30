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
  const topicsToSubscribeRef = useRef([]); // ✅ persist topics for reconnect
  const randomString = useRef(secureRandomString());

  const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

  // ✅ Subscribe
  const subscribeToTopics = useCallback((topics = []) => {
    if (!clientRef.current?.isConnected()) return;

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
    if (!clientRef.current?.isConnected()) return;

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

  // ✅ Message handler
  const onMessageArrived = useCallback(
    (message) => {
      try {
        const parsed = JSON.parse(message.payloadString);
        onMessageArrivedCallback?.(parsed);
      } catch (err) {
        console.error("Message parse error:", err);
      }
    },
    [onMessageArrivedCallback]
  );

  // ✅ Connection lost — DO NOT manually reconnect here,
  //    Paho handles it automatically via reconnect: true
  const onConnectionLost = useCallback(
    (resObj) => {
      console.warn("MQTT connection lost:", resObj?.errorMessage);
      setIsConnected(false);
      setSubscribedTopics([]);

      // ✅ Notify consumer for UI purposes only — NOT for reconnecting
      onConnectionLostCallback?.(resObj);
    },
    [onConnectionLostCallback]
  );

  // ✅ Main connect function
  const connectToMqtt = useCallback(
    ({ subscribeID, userID }) => {
      if (!subscribeID) return;

      // ✅ Already connected — do nothing, Paho handles reconnects
      if (clientRef.current?.isConnected()) {
        console.warn("MQTT already connected, skipping.");
        return;
      }

      // ✅ Create client only once
      if (!clientRef.current) {
        clientRef.current = new Paho.Client(
          import.meta.env.VITE_MQTT_HOST,
          Number(import.meta.env.VITE_MQTT_PORT),
          randomString.current
        );

        clientRef.current.onConnectionLost = onConnectionLost;
        clientRef.current.onMessageArrived = onMessageArrived;
      }

      // ✅ Build topics once and store in ref for reconnect reuse
      const userData = isBranch
        ? JSON.parse(localStorage.getItem("branch"))
        : JSON.parse(localStorage.getItem("corporate"));

      const subscribeIDNew = userData?.branchID || userData?.corporateID;

      const newTopic = isBranch
        ? `BOP_BRANCH_${subscribeIDNew}`
        : `BOP_CORPORATE_${subscribeIDNew}`;

      topicsToSubscribeRef.current =
        isCorporate || isBranch
          ? [subscribeID, `BOP_${userID}`, newTopic]
          : [subscribeID, `BOP_${userID}`];

      // ✅ Set ONCE on client — fires on both initial + auto-reconnect
      clientRef.current.onConnected = () => {
        console.log("MQTT connected / reconnected");
        setIsConnected(true);
        subscribeToTopics(topicsToSubscribeRef.current); // ✅ always uses latest topics
      };

      try {
        clientRef.current.connect({
          onSuccess: () => {
            console.log("MQTT initial connect success");
            // ✅ No need to subscribe here — onConnected handles it
          },
          onFailure: (err) => {
            console.error("MQTT connect failed:", err?.errorMessage);
            setIsConnected(false);
          },
          keepAliveInterval: 30,
          reconnect: true,       // ✅ Paho auto-reconnects — don't call connect() again manually
          cleanSession: false,
          timeout: 10,
          userName: import.meta.env.VITE_MQTT_USERNAME,
          password: import.meta.env.VITE_MQTT_PASSWORD,
          useSSL:
            import.meta.env.VITE_MQTT_PORT === "8883" &&
            import.meta.env.VITE_MQTT_HOST === "boptrade.tresmark.com",
        });
      } catch (e) {
        console.error("MQTT connect exception:", e.message);
      }
    },
    [onMessageArrived, onConnectionLost, subscribeToTopics, isBranch, isCorporate]
  );

  // ✅ Clean disconnect
  const disconnectMqtt = useCallback(() => {
    if (clientRef.current?.isConnected()) {
      clientRef.current.disconnect();
      setIsConnected(false);
      setSubscribedTopics([]);
      console.log("MQTT manually disconnected");
    }
  }, []);

  return {
    isConnected,
    connectToMqtt,
    disconnectMqtt,
    subscribeToTopics,
    unsubscribeFromTopics,
    subscribedTopics,
  };
};