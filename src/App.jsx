import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import "./assets/globalstyles/height.css";
import Dashboard from "@/container/dashboard/Dashboard";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/roboto";
import MainCalculator from "@/container/pages/mainCalculator/MainCalculator";
import BopLogin from "@/container/loginScreens/Login/BopLogin";
import ChangePassword from "@/container/loginScreens/ChangePassword/ChangePassword";
import ForgotPassword from "@/container/loginScreens/forgetPassword/ForgotPassword";
import CreatePassword from "@/container/loginScreens/CreatePassword/CreatePassword";
import TwoFaVerification from "@/container/loginScreens/2faVerificationScreen/TwoFaVerification";
import ResetPassword from "@/container/loginScreens/ResetPassword/ResetPassword";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  const [routes, setRoutes] = useState([]); // Initially an empty array

  const loadRoutes = async () => {
    const dashboardRoute = {
      path: "/BOP",
      element: <Dashboard />,
      children: [],
    };
    const calculatorRoute = {
      path: "/calculator",
      element: <PrivateRoute element={<MainCalculator />} />,
    };
    if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
      const Branch = (await import("./container/pages/mainBranch/MainBranch"))
        .default;
      dashboardRoute.children.push({
        path: "branch", // Use relative path
        element: <PrivateRoute element={<Branch />} />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_DEALER === "true") {
      const Dealer = (await import("./container/pages/mainDealer/MainDealer"))
        .default;
      const Treasury = (
        await import("./container/pages/mainTreasury/MainTreasury")
      ).default;
      const Category = (
        await import("./container/pages/mainCategory/MainCategory")
      ).default;

      dashboardRoute.children.push({
        path: "dealer", // Use relative path
        element: <PrivateRoute element={<Dealer />} />,
      });
      dashboardRoute.children.push({
        path: "treasury", // Use relative path
        element: <PrivateRoute element={<Treasury />} />,
      });
      dashboardRoute.children.push({
        path: "category", // Use relative path
        element: <PrivateRoute element={<Category />} />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_TREASURY === "true") {
      const Treasury = (
        await import("./container/pages/mainTreasury/MainTreasury")
      ).default;
      const Dealer = (await import("./container/pages/mainDealer/MainDealer"))
        .default;
      const Category = (
        await import("./container/pages/mainCategory/MainCategory")
      ).default;

      dashboardRoute.children.push({
        path: "dealer", // Use relative path
        element: <PrivateRoute element={<Dealer />} />,
      });
      dashboardRoute.children.push({
        path: "treasury", // Use relative path
        element: <PrivateRoute element={<Treasury />} />,
      });
      dashboardRoute.children.push({
        path: "category", // Use relative path
        element: <PrivateRoute element={<Category />} />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true") {
      const Corporate = (
        await import("./container/pages/mainCorporate/MainCorporate")
      ).default;
      dashboardRoute.children.push({
        path: "corporate", // Use relative path
        element: <PrivateRoute element={<Corporate />} />,
      });
    }

    const tempRoutes = [
      dashboardRoute,
      calculatorRoute,
      { path: "/", element: <BopLogin /> },
      { path: "/changePassword", element: <ChangePassword /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/createPassword", element: <CreatePassword /> },
      { path: "/2fa", element: <TwoFaVerification /> },
      { path: "/resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Navigate to={"/"} /> },
    ];

    setRoutes(tempRoutes); // Set the routes after loading
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  if (!routes.length) {
    return <div>Loading...</div>; // Better check for array length than null
  }

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
