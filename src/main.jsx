import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
ReactDOM.createRoot(document.getElementById("root")).render(
  <DragDropContext>
    <App />
  </DragDropContext>
);
