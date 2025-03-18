// src/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

// isAuthenticated is passed as a prop to check if the user is logged in
const PrivateRoute = ({ element }) => {
  // If the user is not authenticated, navigate them to the login page
  let isUser = localStorage.getItem("user");
  let isRole = localStorage.getItem("roleID");

  // If authenticated, render the protected route's component
  return isUser && isRole ? element : <Navigate to={"/"} />;
};

export default PrivateRoute;
