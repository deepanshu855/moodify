import React from "react";
import { useSong } from "../hooks/useSong";
import "../styles/song.css"

const Song = ({ song, index, isActive }) => {
  const { setSong } = useSong();

  const handlePlay = () => {
    setSong(song);
  };

  return (
    <button
      className={`song ${isActive ? "song--active" : ""}`}
      onClick={handlePlay}
      type="button"
    >
      <span className="song__index">
        {isActive ? (
          <span className="song__eq" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          String(index + 1).padStart(2, "0")
        )}
      </span>

      <img
        className="song__poster"
        src={song.posterUrl}
        alt={song.title}
        loading="lazy"
      />

      <span className="song__meta">
        <span className="song__title">{song.title}</span>
      </span>

      {song.mood && <span className="song__tag">{song.mood}</span>}

      {/* <span className="song__duration">{song.duration || "--:--"}</span> */}
    </button>
  );
};

export default Song;