import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./font.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import store from "./store/store.js";
import { GloballyModalProvider } from "./context/ModalContext.jsx";
import { DealerAndTreasuryProvider } from "./context/DealerAndTreasuryContext.jsx";
import { NotificationProvider } from "./context/NotificationProvider.jsx";
import { BidOfferProvider } from "./context/BidOfferContext.jsx";
import GlobalErrorBoundary from "./ErorBoundary";

// Disable console methods in production for better security and performance
if (import.meta.env.MODE === "production") {
  console.log = () => {};
  // console.error = () => {};
  console.debug = () => {};
  // console.warn = () => {};
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalErrorBoundary>
    <Provider store={store}>
      <NotificationProvider>
        <BidOfferProvider>
          <DealerAndTreasuryProvider>
            <GloballyModalProvider>
              <DragDropContext>
                <App />
              </DragDropContext>
            </GloballyModalProvider>
          </DealerAndTreasuryProvider>
        </BidOfferProvider>
      </NotificationProvider>
    </Provider>
  </GlobalErrorBoundary>,
);
