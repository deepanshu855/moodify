import { useEffect, useRef, useState } from "react";
import "../styles/face.css";
import { detect, init } from "../utils/utils";
import { ScanFace } from "lucide-react";

const moodEmoji = {
  happy: "😊",
  sad: "😢",
  surprise: "😲",
  neutral: "😐",
};

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ videoRef, landmarkerRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = () => {
    const expression = detect({ videoRef, landmarkerRef, setExpression });
    const allowedMoods = ["happy", "sad", "surprise", "neutral"];
    if (allowedMoods.includes(expression)) {
      onClick(expression);
    }
  };

  // Helper to determine if a valid mood is detected for text coloring
  const isMoodDetected = ["happy", "sad", "surprise", "neutral"].includes(
    expression.toLowerCase(),
  );

  return (
    <div className="face-card">
      {/* Card Header */}
      <div className="face-card__header">
        <div className="header__title">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B8C1D1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <h3>Face Expression</h3>
        </div>
        <div className="header__live">
          <span className="live-dot"></span>
          Live
        </div>
      </div>

      {/* Video Area */}
      <div className="face-card__video-wrapper">
        <video ref={videoRef} className="video" playsInline autoPlay muted />

        {/* Decorative detection borders matching the reference UI */}
        <div className="target-bracket top-left"></div>
        <div className="target-bracket top-right"></div>
        <div className="target-bracket bottom-left"></div>
        <div className="target-bracket bottom-right"></div>
      </div>

      {/* Status Bar */}
      <div className="face-card__status">
        <div className="status__icon">
          {moodEmoji[expression.toLowerCase()] || <ScanFace />}
        </div>

        <div className="status__info">
          <span className="info__label">Detected Mood</span>
          <span
            className={`info__value ${isMoodDetected ? "text-success" : ""}`}
          >
            {expression}
          </span>
        </div>

        {/* Decorative audio wave graphic */}
        <div className="status__wave">
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
        </div>
      </div>

      {/* Action Button */}
      <button className="face-card__btn" onClick={handleClick}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"></path>
        </svg>
        Detect Mood
      </button>
    </div>
  );
}
