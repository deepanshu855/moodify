import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import "../styles/home.css";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <h1>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </h1>
  );
};

export default Home;
