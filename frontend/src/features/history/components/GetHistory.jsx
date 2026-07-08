import React, { useEffect } from "react";
import { useHistory } from "../hooks/useHistory";
import HistoryCard from "../components/HistoryCard";
import Navbar from "../../shared/components/Navbar";
import { Activity, Clock, Calendar, Inbox, Loader2 } from "lucide-react";
import "../styles/history.css";

const GetHistory = () => {
  const { loading, history, handleGetHistory } = useHistory();

  useEffect(() => {
    handleGetHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-loading">
          <Loader2 className="spinner-icon" size={40} />
          <p>Loading your mood history...</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="history-page">
        <div className="history-empty-page">
          <div className="empty-state-card">
            <Inbox size={48} className="icon-muted" />
            <h2>No history found</h2>
            <p>Your detected moods will appear here over time.</p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();

  const todayHistory = history.filter((item) => {
    const date = new Date(item.createdAt);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const previousHistory = history.filter((item) => {
    const date = new Date(item.createdAt);
    return (
      date.getDate() !== today.getDate() ||
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  });

  return (
    <div className="history-page">
      <main className="history-container">
        <header className="history-header">
          <Activity size={28} className="icon-purple" />
          <h1>Mood History</h1>
        </header>

        {/* Stacked Layout Wrapper */}
        <div className="history-content-stacked">
          {/* Top Box: Today */}
          <section className="history-section">
            <div className="section-title">
              <Clock size={18} className="icon-green" />
              <h2>Today</h2>
            </div>

            <div className="history-scroll-area">
              {todayHistory.length === 0 ? (
                <div className="empty-section-card">
                  <p>Mood not detected today...</p>
                </div>
              ) : (
                <div className="history-list">
                  {todayHistory.map((item) => (
                    <HistoryCard
                      key={item._id}
                      mood={item.mood}
                      time={item.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Bottom Box: Past Days */}
          <section className="history-section">
            <div className="section-title">
              <Calendar size={18} className="icon-muted" />
              <h2>Past Days</h2>
            </div>

            <div className="history-scroll-area">
              {previousHistory.length === 0 ? (
                <div className="empty-section-card">
                  <p>Previous history not recorded...</p>
                </div>
              ) : (
                <div className="history-list">
                  {previousHistory.map((item) => (
                    <HistoryCard
                      key={item._id}
                      mood={item.mood}
                      time={item.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GetHistory;
