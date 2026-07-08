import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const submitHandler = async (data) => {
    const { username, email, password } = data;
    await handleRegister(username, email, password);

    navigate("/home");
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          {...register("username")}
          placeholder="Enter username"
        />
        <input type="text" {...register("email")} placeholder="Enter email" />
        <input
          type="password"
          {...register("password")}
          placeholder="Enter password"
        />
        <button>Register</button>
      </form>
      <p>
        Already have an account ? <Link to={"/login"}>LogIn</Link>
      </p>
    </main>
  );
};

export default Register;
