import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import Leaderboard from "./components/Leaderboard";
import Analytics from "./components/Analytics";

export default function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [page, setPage] = useState("home");
  const [players, setPlayers] = useState([]);
  const [board, setBoard] = useState(Array(7).fill().map(() => Array(6).fill(null)));
  const [turn, setTurn] = useState("");
  const [gameStatus, setGameStatus] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (page === "game" || page === "waiting") {
        e.preventDefault();
        e.returnValue = ""; 
        return ""; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [page]);

  return (
    <div className="app-container">
      {page === "home" && (
        <>
          <Home
            setUsername={setUsername}
            setRoomId={setRoomId}
            setPage={setPage}
          />
          <Leaderboard />      
          <Analytics />        
        </>
      )}

      {page === "waiting" && (
        <WaitingRoom
          username={username}
          roomId={roomId}
          setPage={setPage}
          setPlayers={setPlayers}
          setBoard={setBoard}
          setTurn={setTurn}
          setRoomId={setRoomId}
          setSocket={setSocket}
        />
      )}

      {page === "game" && (
        <Game
          username={username}
          roomId={roomId}
          players={players}
          board={board}
          setBoard={setBoard}
          turn={turn}
          setTurn={setTurn}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          socket={socket}
        />
      )}

      {page === "leaderboard" && <Leaderboard />}
    </div>
  );
}
