import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./assets/globalstyles/height.css";
import Dashboard from "@/container/dashboard/Dashboard";
import "@fontsource/montserrat";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/poppins";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/roboto";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import MainCalculator from "@/container/pages/mainCalculator/MainCalculator";
import BopLogin from "./container/pages/loginScreens/Login/BopLogin";
import ChangePassword from "./container/pages/loginScreens/ChangePassword/ChangePassword";
import ForgotPassword from "./container/pages/loginScreens/forgetPassword/ForgotPassword";
import CreatePassword from "./container/pages/loginScreens/CreatePassword/CreatePassword";
import TwoFaVerification from "./container/pages/loginScreens/2faVerificationScreen/TwoFaVerification";
import ResetPassword from "./container/pages/loginScreens/ResetPassword/ResetPassword";

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
    const calculatorRoute = {
      path: "/calculator",
      element: <MainCalculator />,
    };

    if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
      const Branch = (await import("./container/pages/mainBranch/MainBranch"))
        .default;
      dashboardRoute.children.push({
        path: "/",
        element: <Branch />,
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
        path: "/",
        element: <Dealer />,
      });
      dashboardRoute.children.push({
        path: "/dealer",
        element: <Dealer />,
      });
      dashboardRoute.children.push({
        path: "/treasury",
        element: <Treasury />,
      });
      dashboardRoute.children.push({
        path: "/category",
        element: <Category />,
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
        path: "/dealer",
        element: <Dealer />,
      });
      dashboardRoute.children.push({
        path: "/",
        element: <Dealer />,
      });
      dashboardRoute.children.push({
        path: "/treasury",
        element: <Treasury />,
      });
      dashboardRoute.children.push({
        path: "/category",
        element: <Category />,
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
    const emailLoginRoute = {
      path: "/login",
      element: <BopLogin />,
    };
    const changePasswordRoute = {
      path: "/changePassword",
      element: <ChangePassword />,
    };
    const forgetPasswordRoute = {
      path: "/forgetpassword",
      element: <ForgotPassword />,
    };
    const createPasswordRoute = {
      path: "/createPassword",
      element: <CreatePassword />,
    };
    const twoFaVerifcationRoute = {
      path: "/2fa",
      element: <TwoFaVerification />,
    };
    const passwordResetEmail = {
      path: "/resetPassword",
      element: <ResetPassword />,
    };
    tempRoutes.push(
      dashboardRoute,
      calculatorRoute,
      emailLoginRoute,
      changePasswordRoute,
      forgetPasswordRoute,
      createPasswordRoute,
      twoFaVerifcationRoute,
      passwordResetEmail
    ); // Add the dashboard route with its children
    console.table(tempRoutes, "tempRoutestempRoutes")
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
