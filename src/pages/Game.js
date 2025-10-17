import React, { useEffect } from "react";
import Board from "../components/Board";
import { sendMove } from "../utils/socket";

export default function Game({ 
  username, 
  roomId, 
  players, 
  board, 
  setBoard, 
  turn, 
  setTurn,
  gameStatus,
  setGameStatus,
  socket
}) {

  const handleMove = (colIndex) => {
    console.log("=== handleMove called ===");
    console.log("Socket:", socket);
    console.log("Socket connected:", socket?.connected);
    console.log("Turn:", turn);
    console.log("Username:", username);
    console.log("Game Status:", gameStatus);
    console.log("Column Index:", colIndex);
    
    if (!socket) {
      console.error("❌ No socket");
      return;
    }
    if (!socket.connected) {
      console.error("❌ Socket not connected");
      return;
    }
    if (turn !== username) {
      console.error("❌ Not your turn. Turn:", turn, "Username:", username);
      return;
    }
    if (gameStatus) {
      console.error("❌ Game is over");
      return;
    }
    
    console.log("✅ Sending move to server...");
    sendMove(socket, colIndex);
  };

  useEffect(() => {
    if (!socket) return;
    
    console.log("=== Game Component Mounted ===");
    console.log("Username:", username);
    console.log("Room ID:", roomId);
    console.log("Players:", players);
    console.log("Turn:", turn);

    const handleSocketEvent = (eventName) => (data) => {
      console.log(`=== Socket Event: ${eventName} ===`, data);
      
      if (eventName === "move_made") {
        console.log("Move made - updating board");
        setBoard(data.board);
        setTurn(data.turn);
      } else if (eventName === "gameOver") {
        console.log("Game over");
        setBoard(data.board);
        setGameStatus(data.winner);
        setTurn("");
      } else if (eventName === "opponentDisconnected") {
        setGameStatus(username);
        setTurn("");
        alert(data.message);
      } else if (eventName === "opponentDisconnectedWaiting") {
        alert(data.message);
      } else if (eventName === "playerReconnected") {
        alert(`${data.player} has reconnected!`);
      } else if (eventName === "reconnected") {
        setBoard(data.board);
        setTurn(data.turn);
        alert("You have been reconnected!");
      }
    };

    socket.on("move_made", handleSocketEvent("move_made"));
    socket.on("gameOver", handleSocketEvent("gameOver"));
    socket.on("opponentDisconnected", handleSocketEvent("opponentDisconnected"));

    return () => {
      socket.off("move_made");
      socket.off("gameOver");
      socket.off("opponentDisconnected");
    };
  }, [socket, username, roomId]);

  return (
    <div className="game-container">
      <h2>Connect 4</h2>
      <div className="game-info">
        <p>Players: {players && players.length > 0 ? players.join(" vs ") : "Loading..."}</p>
        <p>Your name: {username}</p>
        <p>Current turn: {turn}</p>
        {gameStatus ? (
          <p className="game-status">
            {gameStatus === "draw" ? "It's a Draw!" : `Winner: ${gameStatus}`}
          </p>
        ) : (
          <p className="turn-status">
            {turn === username ? "Your Turn ✅" : `${turn}'s Turn ⏳`}
          </p>
        )}
      </div>
      <Board board={board} handleMove={handleMove} />
    </div>
  );
}