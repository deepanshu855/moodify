import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import FaceExpression from "../features/expression/components/FaceExpression";
import Protected from "../features/shared/components/Protected";
import Home from "../features/home/Pages/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route path="/expression" element={<FaceExpression />} />
    </Routes>
  );
};

export default MainRoutes;
