import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
<<<<<<< Updated upstream
import { MyProvider } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MyProvider>
    <App />
  </MyProvider>
  // </React.StrictMode>,
=======
import { CreateDemoProvider } from "./Context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <CreateDemoProvider>
    <App />
  </CreateDemoProvider>
>>>>>>> Stashed changes
);
