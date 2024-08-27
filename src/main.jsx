import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import store from "./store/store.js";
import { GloballyModalProvider } from "./context/ModalContext.jsx";
GloballyModalProvider;
// import { CreateDemoProvider } from "./Context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GloballyModalProvider>
      <DragDropContext>
        <App />
      </DragDropContext>
    </GloballyModalProvider>
  </Provider>
);
