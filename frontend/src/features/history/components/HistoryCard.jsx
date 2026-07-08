import React from "react";
import "../styles/historyCard.css";

const moodEmoji = {
  happy: "😊",
  sad: "😢",
  surprise: "😲",
  neutral: "😐",
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

  return (
    <div className="history-card">
      <div className="history-card__left">
        <div className="history-card__emoji">{moodEmoji[mood] || "🎵"}</div>

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
