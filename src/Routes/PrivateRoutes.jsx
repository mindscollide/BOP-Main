// PrivateRoute.js
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"; // or any state management hook/context you use
import { BOPContext } from "../Context";

export const PrivateRouteCorporate = () => {
  const { roleValue } = useContext(BOPContext); // Assuming user object is provided by context

  // Check if the user has the required role
  if (roleValue === 1) {
    return <Outlet />;
  } else {
    return <Navigate to='*' />;
  }

  // Render child routes
};

export const PrivateRouteBranch = () => {
  const { roleValue } = useContext(BOPContext); // Assuming user object is provided by context

  // Check if the user has the required role
  if (roleValue === 2) {
    return <Outlet />;
  } else {
    return <Navigate to='*' />;
  }

  // Render child routes
};

export const PrivateRouteDealer = () => {
  const { roleValue } = useContext(BOPContext); // Assuming user object is provided by context

  // Check if the user has the required role
  if (roleValue === 3) {
    return <Outlet />;
  } else {
    return <Navigate to='*' />;
  }

  // Render child routes
};

export const PrivateRouteTreasury = () => {
  const { roleValue } = useContext(BOPContext); // Assuming user object is provided by context

  // Check if the user has the required role
  if (roleValue === 4) {
    return <Outlet />;
  } else {
    return <Navigate to='*' />;
  }

  // Render child routes
};
