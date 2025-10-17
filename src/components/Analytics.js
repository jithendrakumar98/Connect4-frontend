import React, { useEffect, useState } from "react";
import "./Analytics.css";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"}/api/analytics`)
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <div className="disc disc-1"></div>
          <div className="disc disc-2"></div>
          <div className="disc disc-3"></div>
          <div className="disc disc-4"></div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (!analytics) return <div className="analytics-container"><p>No analytics available</p></div>;

  return (
    <div className="analytics-container">
      <h2>Game Analytics</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Games</h3>
          <p className="analytics-value">{analytics.totalGames}</p>
        </div>

        <div className="analytics-card">
          <h3>Avg Game Duration</h3>
          <p className="analytics-value">{analytics.averageGameDuration}s</p>
        </div>

        <div className="analytics-card">
          <h3>Games Last Hour</h3>
          <p className="analytics-value">{analytics.gamesLastHour}</p>
        </div>

        <div className="analytics-card">
          <h3>Games Today</h3>
          <p className="analytics-value">{analytics.gamesToday}</p>
        </div>
      </div>

      <div className="top-winners">
        <h3>Top Winners</h3>
        <table className="winners-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topWinners && analytics.topWinners.map((winner, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{winner.player}</td>
                <td>{winner.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}