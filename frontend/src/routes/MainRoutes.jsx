import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import FaceExpression from "../features/expression/components/FaceExpression";
import Protected from "../features/shared/components/Protected";
import History from "../features/history/pages/History";
import Home from "../features/shared/Pages/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Landing Page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/history"
        element={
          <Protected>
            <History />
          </Protected>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
