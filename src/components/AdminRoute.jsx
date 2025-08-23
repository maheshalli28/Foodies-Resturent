import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ user, children }) => {
  // If no user → treat as logged out → send to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If admin is logged in → allow access
  return children;
};

export default AdminRoute;
