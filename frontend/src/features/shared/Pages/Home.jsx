import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return <h1>Hello {user.username}</h1>;
};

export default Home;
