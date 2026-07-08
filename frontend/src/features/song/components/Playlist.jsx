import React from "react";
import { useSong } from "../hooks/useSong";
import Song from "./Song"; // Adjust path if needed
import { ListMusic, Loader2 } from "lucide-react";
import "../styles/playlist.css";

const Playlist = () => {
  const { playlist, loading, song: currentSong } = useSong();

  if (loading) {
    return (
      <div className="playlist-card state-card">
        <Loader2 className="spinner-icon" size={32} />
        <p>Reading the room...</p>
      </div>
    );
  }

  const songs = playlist || [];

  if (!songs.length) {
    return (
      <div className="playlist-card state-card">
        <div className="empty-state-content">
          <p className="empty-title">No tracks yet</p>
          <p className="empty-sub">
            Show us a face and we'll line up something to match it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlist-card">
      <header className="playlist__header">
        <div className="header__title-group">
          <ListMusic size={18} className="icon-muted" />
          <h3>
            Playlist{" "}
            <span className="mood-highlight">
              ({playlist?.mood ? playlist.mood : "Mixed"})
            </span>
          </h3>
        </div>
      </header>

      {/* This is the only area that will scroll */}
      <div className="playlist__scroll-area">
        <div className="playlist__list">
          {songs.map((track, index) => (
            <Song
              key={track._id || track.url || index}
              song={track}
              index={index}
              isActive={currentSong?.url === track.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;