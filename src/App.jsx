import React, { useEffect, useState, useRef } from "react";
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
import Loader from "./components/common/loader/Loader";
import { ResponseMessage } from "./components/utils/ResponseMessageToast";
import ForgotPasswordEmailSentTo from "./container/loginScreens/forgetPassword/ForgotPasswordEmailSentTo";

function App() {
  const [routes, setRoutes] = useState([]);
  const currentVersion = useRef(null);

  // 🔹 Auto-update page when version.json changes
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("../public/version.json");

        const data = await response.json();

        if (currentVersion.current && currentVersion.current !== data.version) {
          // 🔹 Clear browser caches (for service workers / cache API)
          if ("caches" in window) {
            caches.keys().then((names) => {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }
          window.location.reload(true); // force reload
        }

        currentVersion.current = data.version;
      } catch (err) {
        console.error("Error checking version.json:", err);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30000); // check every 30 sec
    return () => clearInterval(interval);
  }, []);

  // 🔹 Set document title based on env flags
  useEffect(() => {
    document.title =
      import.meta.env.VITE_APP_INCLUDE_BRANCH === "true"
        ? "BOP - Branch"
        : import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true"
        ? "BOP - Corporate"
        : import.meta.env.VITE_APP_INCLUDE_TREASURY === "true"
        ? "BOP - Treasury"
        : import.meta.env.VITE_APP_INCLUDE_DEALER === "true"
        ? "BOP - Dealer"
        : "BOP";
  }, []);

  // 🔹 Load routes dynamically
  const loadRoutes = async () => {
    const dashboardRoute = {
      path: "/BOP",
      element: <Dashboard />,
      children: [],
    };

    dashboardRoute.children.push({
      path: "calculator",
      element: <PrivateRoute element={<MainCalculator />} />,
    });

    if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
      const Branch = (await import("./container/pages/mainBranch/MainBranch"))
        .default;
      dashboardRoute.children.push({
        path: "branch",
        element: <PrivateRoute element={Branch && <Branch />} />,
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
        path: "dealer",
        element: <PrivateRoute element={Dealer && <Dealer />} />,
      });
      dashboardRoute.children.push({
        path: "treasury",
        element: <PrivateRoute element={Treasury && <Treasury />} />,
      });
      dashboardRoute.children.push({
        path: "category",
        element: <PrivateRoute element={Category && <Category />} />,
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
        path: "dealer",
        element: <PrivateRoute element={Dealer && <Dealer />} />,
      });
      dashboardRoute.children.push({
        path: "treasury",
        element: <PrivateRoute element={Treasury && <Treasury />} />,
      });
      dashboardRoute.children.push({
        path: "category",
        element: <PrivateRoute element={Category && <Category />} />,
      });
    }

    if (import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true") {
      const Corporate = (
        await import("./container/pages/mainCorporate/MainCorporate")
      ).default;
      dashboardRoute.children.push({
        path: "corporate",
        element: <PrivateRoute element={Corporate && <Corporate />} />,
      });
    }

    const tempRoutes = [
      dashboardRoute,
      { path: "/", element: <BopLogin /> },
      { path: "/changePassword", element: <ChangePassword /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/emailsent", element: <ForgotPasswordEmailSentTo /> },
      { path: "/createPassword", element: <CreatePassword /> },
      { path: "/2fa", element: <TwoFaVerification /> },
      { path: "/resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Navigate to={"/"} /> },
    ];

    setRoutes(tempRoutes);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  if (!routes.length) {
    return null; // prevent blank screen flash
  }

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Loader />
      <ResponseMessage />
    </>
  );
}

export default App;
