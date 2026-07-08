import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Gauge,
  Heart,
  Music,
  Shuffle,
  Repeat,
} from "lucide-react";
import { useSong } from "../hooks/useSong";
import "../styles/player.css";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (secs) => {
  if (!secs || Number.isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Player = () => {
  const { song, loading } = useSong();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSpeedDial, setShowSpeedDial] = useState(false);
  const [volume, setVolume] = useState(1);

  // reset when the song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;
    setCurrentTime(0);
    audio.load(); // force the element to pick up the new src
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Playback blocked:", err);
        setIsPlaying(false);
      });
  }, [song?.url]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
  }, [speed, song?.url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(
      Math.max(audio.currentTime + delta, 0),
      duration || audio.duration || 0,
    );
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const onSeek = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const onVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const volumePct = volume * 100;

  return (
    <div className="player-wrap">
      <audio
        ref={audioRef}
        src={song?.url}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="now-playing-card">
        {/* Header Row */}
        <div className="player-header">
          <div className="header-left">
            <Music size={16} className="icon-muted" />
            <span>Now Playing</span>
          </div>
          <button className="icon-btn-ghost">
            <Heart size={20} className="icon-purple" />
          </button>
        </div>

        {/* Track Info Row */}
        <div className="track-info-row">
          <div className="album-art-container">
            {song?.posterUrl ? (
              <img
                src={song.posterUrl}
                alt={song?.title || "cover art"}
                className="album-art"
              />
            ) : (
              <div className="album-art-fallback">
                <Music size={40} className="icon-muted" />
              </div>
            )}
          </div>

          <div className="track-details">
            <h2 className="track-title">
              {loading ? "Loading..." : song?.title || "No track selected"}
            </h2>
            {/* Fallback artist name for UI completeness based on reference */}
            <p className="track-artist">{song?.artist || "Unknown Artist"}</p>

            {/* Mood Badge */}
            <div className="mood-badge">
              <span className="mood-icon">😊</span>
              {song?.mood || "Happy Playlist"}
            </div>
          </div>
        </div>

        {/* Scrubber Row */}
        <div className="scrubber-row">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div className="range-wrapper">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={onSeek}
              className="custom-range main-scrubber"
              style={{
                background: `linear-gradient(to right, #8B5CF6 ${progressPct}%, rgba(255,255,255,0.05) ${progressPct}%)`,
              }}
            />
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        {/* Main Transport Controls */}
        <div className="transport-row">
          <button className="icon-btn-ghost">
            <Shuffle size={20} className="icon-muted" />
          </button>

          <button
            className="icon-btn-primary"
            onClick={() => skip(-5)}
            title="Back 5s"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>

          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" style={{ marginLeft: 4 }} />
            )}
          </button>

          <button
            className="icon-btn-primary"
            onClick={() => skip(5)}
            title="Forward 5s"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>

          <button className="icon-btn-ghost">
            <Repeat size={20} className="icon-muted" />
          </button>
        </div>

        {/* Bottom Utility Row (Volume & Speed) */}
        <div className="utility-row">
          <div className="volume-control">
            <Volume2 size={18} className="icon-muted" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={onVolume}
              className="custom-range volume-scrubber"
              style={{
                background: `linear-gradient(to right, #8B5CF6 ${volumePct}%, rgba(255,255,255,0.05) ${volumePct}%)`,
              }}
            />
          </div>

          <div className="speed-control-wrapper">
            <button
              className="speed-toggle-btn"
              onClick={() => setShowSpeedDial((s) => !s)}
            >
              <Gauge size={18} className="icon-muted" />
              <span>{speed}x</span>
            </button>

            {showSpeedDial && (
              <div className="speed-dropdown">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSpeed(s);
                      setShowSpeedDial(false);
                    }}
                    className={`speed-option ${s === speed ? "active" : ""}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
