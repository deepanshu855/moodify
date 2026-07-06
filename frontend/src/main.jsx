import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth/AuthProvider.jsx";
import SongProvider from "./features/home/SongProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SongProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SongProvider>
    </AuthProvider>
  </StrictMode>,
);
