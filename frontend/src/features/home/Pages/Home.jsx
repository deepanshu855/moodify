import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import "../styles/home.css";
import { useSong } from "../hooks/useSong";
import Playlist from "../components/Playlist";
import Navbar from "../../shared/components/Navbar";
import { useHistory } from "../../history/hooks/useHistory";

const Home = () => {
  const { handleGetSong, handleGetPlaylist } = useSong();
  const { handleCreateHistory } = useHistory();

  return (
    <main>
      {/* <Navbar /> */}
      <div className="top-row">
        <FaceExpression
          onClick={(expression) => {
            handleGetSong({ mood: expression });
            handleGetPlaylist({ mood: expression });
            handleCreateHistory(expression);
          }}
        />
        <Player />
      </div>
      <Playlist />
    </main>
  );
};

export default Home;
