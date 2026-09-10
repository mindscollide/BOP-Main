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
import ForgotPassword from "@/container/loginScreens/forgetPassword/ForgotPassword";
import ResetPassword from "@/container/loginScreens/ResetPassword/ResetPassword";
import PrivateRoute from "./routes/PrivateRoutes";
import Loader from "./components/common/loader/Loader";
import { ResponseMessage } from "./components/utils/ResponseMessageToast";
import ForgotPasswordEmailSentTo from "./container/loginScreens/forgetPassword/ForgotPasswordEmailSentTo";
import { ErrorBoundary } from "react-error-boundary";
import {
  ErrorFallback,
  logErrors,
} from "./components/common/errorBoundary/ErrorBoundary";
import ResetPasswordLinkExpired from "./container/loginScreens/resetPasswordLinkExpired";
import Redirected from "./container/loginScreens/redirected";

function App() {
  const [routes, setRoutes] = useState([]);
  // Holds the entry-bundle path (e.g. "/assets/index-<hash>.js") last seen in
  // index.html, so a later poll can tell a fresh deployment happened.
  const currentBundlePath = useRef(null);

  // 🔹 Auto-reload when a new deployment is detected.
  // No dedicated version.json/version endpoint: anything under public/ is served
  // with zero access control, so a purpose-named file just advertises itself as
  // an easy target to probe. index.html is already unavoidably public (it boots
  // the SPA) and Vite stamps a fresh content-hash into its entry <script src>
  // on every build — that's reused as the deployment signal instead.
  useEffect(() => {
    const ENTRY_SCRIPT_SRC_REGEX = /<script[^>]+src="([^"]+\.js)"[^>]*>/i;

    const checkForNewDeployment = async () => {
      try {
        const response = await fetch("/index.html", { cache: "no-cache" });
        const html = await response.text();
        const match = html.match(ENTRY_SCRIPT_SRC_REGEX);
        const bundlePath = match?.[1];

        if (!bundlePath) return;

        if (
          currentBundlePath.current &&
          currentBundlePath.current !== bundlePath
        ) {
          // 🔹 Clear browser caches (for service workers / cache API)
          if ("caches" in window) {
            caches.keys().then((names) => {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }
          window.location.reload(true); // force reload
          return;
        }

        currentBundlePath.current = bundlePath;
      } catch (err) {
        console.log("Error checking index.html for a new deployment:", err);
      }
    };

    checkForNewDeployment();
    const interval = setInterval(checkForNewDeployment, 30000); // check every 30 sec
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

    const withErrorBoundary = (component) => (
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={logErrors}>
        {component}
      </ErrorBoundary>
    );

    dashboardRoute.children.push({
      path: "calculator",
      element: withErrorBoundary(<PrivateRoute element={<MainCalculator />} />),
    });

    if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
      const Branch = (await import("./container/pages/mainBranch/MainBranch"))
        .default;
      dashboardRoute.children.push({
        path: "branch",
        element: withErrorBoundary(
          <PrivateRoute element={Branch && <Branch />} />,
        ),
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
        element: withErrorBoundary(
          <PrivateRoute element={Dealer && <Dealer />} />,
        ),
      });
      dashboardRoute.children.push({
        path: "treasury",
        element: withErrorBoundary(
          <PrivateRoute element={Treasury && <Treasury />} />,
        ),
      });
      dashboardRoute.children.push({
        path: "category",
        element: withErrorBoundary(
          <PrivateRoute element={Category && <Category />} />,
        ),
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

      const DailyTrades = (
        await import("./container/pages/mainReports/dailyTrades/index")
      ).default;

      dashboardRoute.children.push({
        path: "reports/dailyTrade",
        element: withErrorBoundary(
          <PrivateRoute element={DailyTrades && <DailyTrades />} />,
        ),
      });
      dashboardRoute.children.push({
        path: "dealer",
        element: withErrorBoundary(
          <PrivateRoute element={Dealer && <Dealer />} />,
        ),
      });
      dashboardRoute.children.push({
        path: "treasury",
        element: withErrorBoundary(
          <PrivateRoute element={Treasury && <Treasury />} />,
        ),
      });
      dashboardRoute.children.push({
        path: "category",
        element: withErrorBoundary(
          <PrivateRoute element={Category && <Category />} />,
        ),
      });
    }

    const shouldIsCorporate =
      import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

    if (shouldIsCorporate) {
      const Corporate = (
        await import("./container/pages/mainCorporate/MainCorporate")
      ).default;
      dashboardRoute.children.push({
        path: "corporate",
        element: withErrorBoundary(
          <PrivateRoute element={Corporate && <Corporate />} />,
        ),
      });
    }

    const tempRoutes = [
      dashboardRoute,
      { path: "/", element: withErrorBoundary(<BopLogin />) },
      {
        path: "/forgotpassword",
        element: withErrorBoundary(<ForgotPassword />),
      },
      {
        path: "/emailsent",
        element: withErrorBoundary(<ForgotPasswordEmailSentTo />),
      },
      { path: "/resetPassword", element: withErrorBoundary(<ResetPassword />) },
      {
        path: "/resetPasswordLinkExpired",
        element: withErrorBoundary(<ResetPasswordLinkExpired />),
      },
      { path: "/redirected", element: withErrorBoundary(<Redirected />) },
    ];

    // Corporate-only auth screens — kept out of the Branch/Dealer/Treasury bundles entirely.
    if (shouldIsCorporate) {
      const ChangePassword = (
        await import("./container/loginScreens/ChangePassword/ChangePassword")
      ).default;
      const CreatePassword = (
        await import("./container/loginScreens/CreatePassword/CreatePassword")
      ).default;
      const TwoFaVerification = (
        await import(
          "./container/loginScreens/2faVerificationScreen/TwoFaVerification"
        )
      ).default;

      tempRoutes.push(
        {
          path: "/changePassword",
          element: withErrorBoundary(<ChangePassword />),
        },
        {
          path: "/createPassword",
          element: withErrorBoundary(<CreatePassword />),
        },
        { path: "/2fa", element: withErrorBoundary(<TwoFaVerification />) },
      );
    }

    tempRoutes.push({ path: "*", element: <Navigate to={"/"} /> });

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
