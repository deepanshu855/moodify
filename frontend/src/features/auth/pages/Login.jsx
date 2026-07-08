import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Activity, Loader2 } from "lucide-react";
import "../styles/login.css"
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();

  const submitHandler = async (data) => {
    const { username, password } = data;
    await handleLogin(username, password);
    navigate("/home");
  };

  // Styled Loading State
  if (loading) {
    return (
      <main className="auth-layout">
        <div className="auth-loading">
          <Loader2 size={48} className="spinner-icon" />
          <h2>Authenticating...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-layout">
      {/* Decorative background glows */}
      <div className="auth-glow auth-glow-purple"></div>
      <div className="auth-glow auth-glow-indigo"></div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Activity size={28} className="icon-purple" />
            <h2>Moodify</h2>
          </div>
          <h1>Welcome back</h1>
          <p>Enter your details to get back to the music.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
          <div className="input-wrapper">
            <label>Username</label>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="Enter username"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter password"
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
