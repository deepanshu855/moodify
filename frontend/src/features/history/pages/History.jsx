import React, { useEffect } from "react";
import { useHistory } from "../hooks/useHistory";
import HistoryCard from "../components/HistoryCard";

const History = () => {
  const { loading, history, handleGetHistory } = useHistory();

  const fetchHistory = async () => {
    await handleGetHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <h1>Getting history...</h1>;
  }

  if (history.length === 0) {
    return <h2>No history found</h2>;
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

  console.log(todayHistory);

  const previousHistory = history.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getDate() !== today.getDate() ||
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  });

  console.log(previousHistory);

  return (
    <div className="history-container">
      <h1>Mood History</h1>

      <div className="today-history">
        <h2>Today</h2>
        {todayHistory.length === 0 ? (
          <h3>Mood not detected today...</h3>
        ) : (
          todayHistory.map((item) => (
            <HistoryCard
              key={item._id}
              mood={item.mood}
              time={item.createdAt}
            />
          ))
        )}
      </div>

      <div className="previous-history">
        <h2>Past Days</h2>
        {previousHistory.length === 0 ? (
          <h3>Prvious history not recorded...</h3>
        ) : (
          previousHistory.map((item) => (
            <HistoryCard
              key={item._id}
              mood={item.mood}
              time={item.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default History;
