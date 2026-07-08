import React from "react";
import { useSong } from "../hooks/useSong";
import Song from "../components/Song";
import "../styles/playlist.css";

const Playlist = () => {
  const { playlist, loading, song: currentSong } = useSong();

  if (loading) {
    return (
      <div className="playlist playlist--state">
        <div className="playlist__spinner" />
        <p>Reading the room...</p>
      </div>
    );
  }

  console.log("Playlist ", playlist);

  const songs = playlist || [];

  console.log("Songs ", songs);

  if (!songs.length) {
    return (
      <div className="playlist playlist--state">
        <p className="playlist__empty-title">No tracks yet</p>
        <p className="playlist__empty-sub">
          Show us a face and we'll line up something to match it.
        </p>
      </div>
    );
  }

  return (
    <div className="playlist">
      <header className="playlist__header">
        <div>
          <span className="playlist__eyebrow">
            {playlist?.mood ? `${playlist.mood} mood` : "Your mix"}
          </span>
          <h2 className="playlist__title">{playlist?.title || "Playlist"}</h2>
        </div>
        <span className="playlist__count">{songs.length} tracks</span>
      </header>

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
  );
};

export default Playlist;
