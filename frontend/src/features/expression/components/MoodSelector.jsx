import React from "react";
import "../styles/moodSelector.css";

const MOODS = [
  { id: "happy", emoji: "😊", label: "Happy", color: "#22C55E" },
  { id: "sad", emoji: "😢", label: "Sad", color: "#3B82F6" },
  { id: "surprise", emoji: "😲", label: "Surprise", color: "#F59E0B" },
  { id: "neutral", emoji: "😐", label: "Neutral", color: "#8B5CF6" },
];

const MoodSelector = ({ currentMood }) => {
  return (
    <div className="mood-selector-card">
      <div className="mood-selector__header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8C1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        <h3>Current Vibe</h3>
      </div>

      <div className="mood-grid">
        {MOODS.map((mood) => {
          const isActive = currentMood === mood.id;
          return (
            <button
              key={mood.id}
              className={`mood-btn ${isActive ? "active" : ""}`}
              style={{
                "--mood-color": mood.color,
                "--bg-hover": `${mood.color}1A`, /* 10% opacity hex */
              }}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
              {isActive && <div className="active-indicator"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;