import React, { useContext, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, Gauge, Volume2 } from "lucide-react";
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

  return (
    <div className="player-wrap">
      <audio
        ref={audioRef}
        src={song?.url}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player-card">
        <div className="player-poster-row">
          <div className="player-poster-frame">
            {song?.posterUrl ? (
              <img
                src={song.posterUrl}
                alt={song?.title || "cover art"}
                className="player-poster"
              />
            ) : (
              <div className="player-poster-fallback" />
            )}
            <div className="player-poster-sheen" />
          </div>

          <div className="player-meta">
            <span className="player-eyebrow">
              {loading ? "loading track" : "now playing"}
            </span>
            <h2 className="player-title">
              {song?.title || "No track selected"}
            </h2>
          </div>
        </div>

        {/* Scrubber */}
        <div className="player-scrubber-row">
          <span className="player-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={onSeek}
            className="player-range"
            style={{
              background: `linear-gradient(to right, #E8A75C ${progressPct}%, rgba(255,255,255,0.14) ${progressPct}%)`,
            }}
          />
          <span className="player-time">{formatTime(duration)}</span>
        </div>

        {/* Transport controls */}
        <div className="player-transport-row">
          <button
            className="player-icon-btn"
            onClick={() => skip(-5)}
            aria-label="Back 5 seconds"
            title="Back 5s"
          >
            <RotateCcw size={20} />
            <span className="player-skip-label">5</span>
          </button>

          <button
            className="player-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={26} fill="#1B1330" />
            ) : (
              <Play size={26} fill="#1B1330" style={{ marginLeft: 3 }} />
            )}
          </button>

          <button
            className="player-icon-btn"
            onClick={() => skip(5)}
            aria-label="Forward 5 seconds"
            title="Forward 5s"
          >
            <RotateCw size={20} />
            <span className="player-skip-label">5</span>
          </button>
        </div>

        {/* Bottom row: speed dial + volume */}
        <div className="player-bottom-row">
          <div className="player-speed-wrap">
            <button
              className="player-speed-btn"
              onClick={() => setShowSpeedDial((s) => !s)}
              aria-label="Playback speed"
            >
              <Gauge size={16} />
              <span>{speed}x</span>
            </button>

            {showSpeedDial && (
              <div className="player-speed-dial">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSpeed(s);
                      setShowSpeedDial(false);
                    }}
                    className={`player-speed-option ${
                      s === speed ? "active" : ""
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="player-volume-wrap">
            <Volume2 size={16} color="#B9AECF" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={onVolume}
              className="player-volume-range"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
