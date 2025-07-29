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
import { NotificationProvider } from "./context/NotificationProvider.jsx";

// Disable console methods in production for better security and performance
if (import.meta.env.MODE === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationProvider>
      <DealerAndTreasuryProvider>
        <GloballyModalProvider>
          <DragDropContext>
            <App />
            {/* <GlobalNotification /> */}
          </DragDropContext>
        </GloballyModalProvider>
      </DealerAndTreasuryProvider>
    </NotificationProvider>
  </Provider>
);
