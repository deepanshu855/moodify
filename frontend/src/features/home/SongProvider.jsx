import React, { createContext, useContext, useState } from "react";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/Deepanshu855/cohort-2/moodify/songs/High_On_Me__RiskyjaTT.CoM__5qJcvyRaW",
    posterUrl:
      "https://ik.imagekit.io/Deepanshu855/cohort-2/moodify/poster/High_On_Me__RiskyjaTT.CoM__67GhkZi7j",
    title: "High On Me (RiskyjaTT.CoM)",
  });
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  return (
    <SongContext.Provider
      value={{ song, setSong, loading, setLoading, playlist, setPlaylist }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
