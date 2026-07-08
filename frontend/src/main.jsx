import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth/AuthProvider.jsx";
import SongProvider from "./features/song/SongProvider.jsx";
import HistoryContextProvider from "./features/history/HistoryContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SongProvider>
        <HistoryContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HistoryContextProvider>
      </SongProvider>
    </AuthProvider>
  </StrictMode>,
);
