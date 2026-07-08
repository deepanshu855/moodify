import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../../song/components/Player";
import { useSong } from "../../song/hooks/useSong";
import Playlist from "../../song/components/Playlist";
import Navbar from "../components/Navbar";
import { useHistory } from "../../history/hooks/useHistory";
import MoodSelector from "../../expression/components/MoodSelector";
import "../styles/home.css";

const Home = () => {
  const { handleGetSong, handleGetPlaylist } = useSong();
  const { handleCreateHistory } = useHistory();

  // New state to track the mood for our UI card
  const [activeMood, setActiveMood] = useState("");

  // Helper function to handle mood changes (from webcam OR manual click)
  const triggerMoodChange = (expression) => {
    setActiveMood(expression);
    handleGetSong({ mood: expression });
    handleGetPlaylist({ mood: expression });
    handleCreateHistory(expression);
  };

  return (
    <div className="home-layout">
      <Navbar />

      <main className="dashboard-container">
        <div className="dashboard-top-row">
          {/* Left Column */}
          <FaceExpression onClick={triggerMoodChange} />

          {/* Right Column Wrapper (matches your sketch!) */}
          <div className="dashboard-right-col">
            <Player />
            <MoodSelector
              currentMood={activeMood}
            />
          </div>
        </div>

        <Playlist />
      </main>
    </div>
  );
};

export default Home;
