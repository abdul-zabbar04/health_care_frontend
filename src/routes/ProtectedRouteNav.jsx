import React from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const ProtectedRouteNav = () => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? (
    <>
      <Navbar /> {/* Show Navbar */}
      <main className="justify-center pt-20 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRouteNav;
