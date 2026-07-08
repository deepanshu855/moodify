import React from "react";
import "../styles/historyCard.css";

const moodEmoji = {
  happy: "😊",
  sad: "😢",
  surprise: "😲",
  neutral: "😐",
};

// Map colors to moods for a premium visual touch
const moodColors = {
  happy: "#22C55E",    // Success Green
  sad: "#3B82F6",      // Blue
  surprise: "#F59E0B", // Amber
  neutral: "#8B5CF6",  // Primary Purple
};

const HistoryCard = ({ mood, time }) => {
  const date = new Date(time);

  const formattedDate = date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const normalizedMood = mood.toLowerCase();
  const activeColor = moodColors[normalizedMood] || "#B8C1D1";

  return (
    <div 
      className="history-card"
      style={{ "--card-accent": activeColor }}
    >
      <div className="history-card__left">
        <div className="history-card__icon">
          {moodEmoji[normalizedMood] || "🎵"}
        </div>

        <div className="history-card__details">
          <h3>{mood.charAt(0).toUpperCase() + mood.slice(1)}</h3>
          <p>Mood detected</p>
        </div>
      </div>

      <div className="history-card__time">
        <p>{formattedDate}</p>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default HistoryCard;