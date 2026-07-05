import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import FaceExpression from "../features/expression/components/FaceExpression";
import Home from "../features/shared/Pages/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/expression" element={<FaceExpression />} />
    </Routes>
  );
};

export default MainRoutes;
