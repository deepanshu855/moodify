import React, { createContext, useContext, useState } from "react";

export const SongContext = createContext();

const SongProvider = ({ children }) => {
  const [song, setSong] = useState(null);
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
