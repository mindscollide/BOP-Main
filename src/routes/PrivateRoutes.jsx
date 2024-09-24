// src/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

// isAuthenticated is passed as a prop to check if the user is logged in
const PrivateRoute = ({ element }) => {
  // If the user is not authenticated, navigate them to the login page
  let isAuthenticated = true;

  // If authenticated, render the protected route's component
  return isAuthenticated ? element : <Navigate to={"/"} />;
};

export default PrivateRoute;
