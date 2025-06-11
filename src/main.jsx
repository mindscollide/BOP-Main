import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import store from "./store/store.js";
import { GloballyModalProvider } from "./context/ModalContext.jsx";
import { DealerAndTreasuryProvider } from "./context/DealerAndTreasuryContext.jsx";
import { MqttProvider } from "./context/MqttContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MqttProvider>
      <DealerAndTreasuryProvider>
        <GloballyModalProvider>
          <DragDropContext>
            <App />
          </DragDropContext>
        </GloballyModalProvider>
      </DealerAndTreasuryProvider>
    </MqttProvider>
  </Provider>
);
