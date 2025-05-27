export const connectToMqtt = () => {
    if (!subscribeID || clientRef.current?.isConnected()) return;
  
    const newClientID = `${randomString}`;
    clientRef.current = new Paho.Client("192.168.18.241", 8228, newClientID);
  
    clientRef.current.onConnectionLost = (responseObject) => {
      console.warn("MQTT connection lost:", responseObject?.errorMessage);
      setIsConnected(false);
      setSubscribedTopics([]);
      setTimeout(connectToMqtt, 6000);
    };

    const subscribeToTopics = (topics) => {
        if (!clientRef.current || !isConnected) return;
      
        topics.forEach((topic) => {
          if (!subscribedTopics.includes(topic)) {
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
          }
        });
      };
  
    clientRef.current.onMessageArrived = (message) => {
      try {
        const data = JSON.parse(message.payloadString);
        console.log(`MQTT Message on ${message.destinationName}:`, data);
  
        switch (data.payload.message) {
          case "MARKET_TIME_UPDATED":
            setMarketTimingsUpdated(data.payload);
            break;
          default:
            console.log("Unhandled message type:", data.payload.message);
        }
      } catch (error) {
        console.error("Failed to parse MQTT message:", error);
      }
    };
  
    clientRef.current.onConnected = () => {
      console.log("MQTT onConnected callback triggered");
      setIsConnected(true);
  
      const topics = [subscribeID, `BOP_${userID}`].filter(Boolean);
      subscribeToTopics(topics);
    };
  
    const options = {
      onSuccess: () => console.log("MQTT onSuccess - waiting for onConnected"),
      onFailure: (error) => {
        console.error("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);
        setTimeout(connectToMqtt, 6000);
      },
      keepAliveInterval: 30,
      reconnect: true,
      userName: "user1",
      password: "password1",
      cleanSession: true,
      useSSL: false,
    };
  
    clientRef.current.connect(options);
  };
  


  