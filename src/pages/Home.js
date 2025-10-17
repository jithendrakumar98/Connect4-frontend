import React, { useState } from "react";
import "./Home.css";

function generateRoomId(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Home({ setUsername, setRoomId, setPage }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    setUsername(name);

    if (mode === "create") {
      const newRoomId = generateRoomId();
      setRoomId(newRoomId); 
      setPage("waiting");
    } else if (mode === "join") {
      setRoomId(room); 
      setPage("waiting");
    }
  };

  return (
    <div className="home-container">
      <h1>Connect 4</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="mode-buttons">
          <button
            className={mode === "create" ? "active" : ""}
            onClick={() => setMode("create")}
          >
            Create Room
          </button>
          <button
            className={mode === "join" ? "active" : ""}
            onClick={() => setMode("join")}
          >
            Join Room
          </button>
        </div>
        {mode === "join" && (
          <input
            type="text"
            placeholder="Enter Room Code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        )}

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!name || (mode === "join" && !room) || !mode}
        >
          {mode === "create" ? "Create Game" : "Join Game"}
        </button>
      </div>
    </div>
  );
}
