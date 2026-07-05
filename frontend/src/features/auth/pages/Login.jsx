import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const submitHandler = async (data) => {
    const { username, password } = data;
    await handleLogin(username, password);

    navigate("/");
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          {...register("username")}
          placeholder="Enter username"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
        />
        <button>Login</button>
      </form>
      <p>
        Don't have an account ? <Link to={"/register"}>Create one</Link>
      </p>
    </main>
  );
};

export default Login;
