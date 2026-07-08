import React from "react";
import { Link } from "react-router-dom";
import Galaxy from "../../../background/Galaxy";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <Galaxy
        starSpeed={0.5}
        density={1}
        hueShift={140}
        speed={1}
        glowIntensity={0.3}
        saturation={0}
        mouseRepulsion
        repulsionStrength={2}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        transparent
      />

      <div className="landing-content">
        <section className="hero">
          <span className="hero-badge">🎵 AI-Powered Music Experience</span>

          <h1>Moodify</h1>

          <p className="hero-subtitle">Feel the music. Powered by AI.</p>

          <p className="hero-description">
            Welcome to Moodify! Detect your emotions in real time using AI and
            instantly discover playlists that match how you feel.
          </p>

          <div className="cta-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
