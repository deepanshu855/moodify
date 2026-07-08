import React, { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
