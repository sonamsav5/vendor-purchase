import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserType } from "../service/helper";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  var token = localStorage.getItem("token");
  var user = getUserType();

  if (token === undefined || user === "NA") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
