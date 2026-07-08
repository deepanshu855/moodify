import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../../song/components/Player";
import { useSong } from "../../song/hooks/useSong";
import Playlist from "../../song/components/Playlist";
import Navbar from "../components/Navbar";
import { useHistory } from "../../history/hooks/useHistory";
import "../styles/home.css";

const Home = () => {
  const { handleGetSong, handleGetPlaylist } = useSong();
  const { handleCreateHistory } = useHistory();

  return (
    <div className="home-layout">
      <Navbar />

      <main className="dashboard-container">
        <div className="dashboard-top-row">
          <FaceExpression
            onClick={(expression) => {
              handleGetSong({ mood: expression });
              handleGetPlaylist({ mood: expression });
              handleCreateHistory(expression);
            }}
          />
          <Player />
        </div>

        {/* The Playlist component is styled to take up the remaining vertical space */}
        <Playlist />
      </main>
    </div>
  );
};

export default Home;
