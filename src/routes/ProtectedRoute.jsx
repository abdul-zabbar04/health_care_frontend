import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("authToken");
  console.log(isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
