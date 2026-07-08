import React from "react";
import { useSong } from "../hooks/useSong";
import { Play, MoreVertical } from "lucide-react";
import "../styles/song.css";

const Song = ({ song, index, isActive }) => {
  const { setSong } = useSong();

  const handlePlay = () => {
    setSong(song);
  };

  return (
    <div
      className={`song-row ${isActive ? "active" : ""}`}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
    >
      {/* Column 1: Index / Play Icon / EQ */}
      <div className="song-col index-col">
        {isActive ? (
          <div className="playing-eq">
            <span className="eq-bar"></span>
            <span className="eq-bar"></span>
            <span className="eq-bar"></span>
          </div>
        ) : (
          <span className="index-number">{index + 1}</span>
        )}
        <div className="hover-play-icon">
          <Play size={14} fill="currentColor" />
        </div>
      </div>

      {/* Column 2: Album Art */}
      <div className="song-col art-col">
        {song.posterUrl ? (
          <img
            className="song-poster"
            src={song.posterUrl}
            alt={song.title}
            loading="lazy"
          />
        ) : (
          <div className="song-poster-fallback">🎵</div>
        )}
      </div>

      {/* Column 3: Title */}
      <div className="song-col title-col">
        <span className="song-title">{song.title}</span>
      </div>

      {/* Column 4: Artist (Fallback to unknown if missing) */}
      <div className="song-col artist-col">
        <span className="song-artist">{song.mood.charAt(0).toUpperCase()+song.mood.slice(1)}</span>
      </div>

      {/* Column 5: Duration */}
      <div className="song-col duration-col">
        <span className="song-duration">{song.duration || "3:24"}</span>
      </div>

      {/* Column 6: Actions (Active Wave & More Options) */}
      <div className="song-col actions-col">
        {isActive && (
          <div className="active-wave-icon">
            <span className="wave-line"></span>
            <span className="wave-line"></span>
            <span className="wave-line"></span>
            <span className="wave-line"></span>
          </div>
        )}
        <button
          className="more-options-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default Song;
