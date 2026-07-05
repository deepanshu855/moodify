import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { loginUser, registerUser } from "../services/auth.api";

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

  return {
    loading,
    user,
    handleLogin,
    handleRegister,
  };
};
