import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CreateDemoProvider } from "./Context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <CreateDemoProvider>
    <App />
  </CreateDemoProvider>
);
