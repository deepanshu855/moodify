import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.api";
import { toast } from "react-toastify";

export const useAuth = () => {
  const { loading, setLoading, user, setUser } = useContext(AuthContext);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      setUser(response.user);
      toast.success("Logged in successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await registerUser(username, email, password);
      toast.success("Registered successfully!", {
        autoClose: 1000,
      });
      setUser(response.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logoutUser();
      setUser(null);
      toast.success("Logged out successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    user,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
