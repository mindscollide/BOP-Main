import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./container/dashboard/Dashboard";

function App() {
  const [routes, setRoutes] = useState(null); // Initially null to indicate loading state

  const loadRoutes = async () => {
    const tempRoutes = [];

    // Define a parent route with the Dashboard component
    const dashboardRoute = {
      path: "/",
      element: <Dashboard />,
      children: [],
    };

    if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
      const Branch = (await import("./container/pages/mainBranch/MainBranch"))
        .default;
      dashboardRoute.children.push({
        path: "",
        element: <Branch />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_DEALER === "true") {
      const Dealer = (await import("./container/pages/mainDealer/MainDealer"))
        .default;
      dashboardRoute.children.push({
        path: "",
        element: <Dealer />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_TREASURY === "true") {
      const Treasury = (
        await import("./container/pages/mainTreasury/MainTreasury")
      ).default;
      dashboardRoute.children.push({
        path: "",
        element: <Treasury />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true") {
      const Corporate = (
        await import("./container/pages/mainCorporate/MainCorporate")
      ).default;
      dashboardRoute.children.push({
        path: "",
        element: <Corporate />,
      });
    }

    tempRoutes.push(dashboardRoute); // Add the dashboard route with its children
    setRoutes(tempRoutes); // Set the routes state with the loaded routes
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  if (!routes) {
    // Return a loading state while routes are being loaded
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
