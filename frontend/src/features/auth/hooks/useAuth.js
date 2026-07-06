import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.api";

export const useAuth = () => {
  const { loading, setLoading, user, setUser } = useContext(AuthContext);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      setUser(response.user);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await registerUser(username, email, password);
      setUser(response.user);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logoutUser();
      setUser(null);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleGetMe = async () => {
  //   // setLoading(true);
  //   try {
  //     const response = await getMe();
  //     setUser(response.user);
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleGetMe();
  // }, []);

  return {
    loading,
    user,
    handleLogin,
    handleRegister,
  };
};
