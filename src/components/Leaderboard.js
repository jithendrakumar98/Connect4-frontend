import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
