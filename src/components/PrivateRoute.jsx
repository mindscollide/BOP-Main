import React from "react";
import { Route, Navigate } from "react-router-dom";
import { fakeAuth } from "../auth";

const PrivateRoute = ({ element: Component, ...rest }) => (
  <Route
    {...rest}
    element={fakeAuth.isAuthenticated ? Component : <Navigate to="/login" />}
  />
);

export default PrivateRoute;
