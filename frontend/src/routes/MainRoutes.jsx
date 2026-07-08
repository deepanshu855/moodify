import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import FaceExpression from "../features/expression/components/FaceExpression";
import Protected from "../features/shared/components/Protected";
import History from "../features/history/pages/History";
import Home from "../features/shared/Pages/Home";
import Landing from "../features/shared/Pages/Landing";
import PageNotFound from "../features/shared/Pages/PageNotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
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

      <Route
        path="*"
        element={
          <PageNotFound/>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
