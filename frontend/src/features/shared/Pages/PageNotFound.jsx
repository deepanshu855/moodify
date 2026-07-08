import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import "../../auth/styles/login.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="auth-layout">
      {/* Decorative background glows */}
      <div className="auth-glow auth-glow-purple"></div>
      <div className="auth-glow auth-glow-indigo"></div>

      <div
        className="auth-card"
        style={{
          alignItems: "center",
          textAlign: "center",
          padding: "64px 40px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <AlertCircle size={56} className="icon-purple" />
        </div>

        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "1.1rem",
            color: "#B8C1D1",
            fontWeight: "500",
            marginBottom: "32px",
          }}
        >
          Oops! You seem to have wandered off-beat.
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#8B5CF6",
            fontWeight: "500",
            background: "rgba(139, 92, 246, 0.1)",
            padding: "10px 20px",
            borderRadius: "30px",
          }}
        >
          <Loader2 size={18} className="spinner-icon" />
          <span>Redirecting to home...</span>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
