import * as React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authHelper";

export const ProtectedRoutes = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
};
