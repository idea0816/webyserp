import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import context from "./context";

const ProtectedRoutes = () => {
  const { user } = useContext(context);
  const location = useLocation();

  const isAuth = user && user.loggedIn;
  return isAuth ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" replace state={{ from: location }} />
    </>
  );
};

export default ProtectedRoutes;
