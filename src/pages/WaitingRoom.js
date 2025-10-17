import React, { useEffect, useState } from "react";
import { connectSocket, startWithBot } from "../utils/socket";
import "./WaitingRoom.css";

export default function WaitingRoom({ 
  username, 
  roomId, 
  setPage, 
  setPlayers, 
  setBoard, 
  setTurn,
  setRoomId,
  setSocket
}) {
  const [message, setMessage] = useState("Connecting to server...");
  const [showBotOption, setShowBotOption] = useState(false);
  const [localSocket, setLocalSocket] = useState(null);
  const displayRoomId = roomId;

  useEffect(() => {
    const sock = connectSocket(username, roomId, (data) => {
      console.log("WaitingRoom received:", data.type, data);
      
      switch(data.type) {
        case "roomCreated":
          setRoomId(data.payload.roomId);
          setMessage("Waiting for another player to join...");
          break;

        case "gameStart":
          console.log("Game starting with players:", data.payload);
          setPlayers([data.payload.player1, data.payload.player2]);
          setBoard(Array(7).fill().map(() => Array(6).fill(null)));
          setTurn(data.payload.player1);
          setSocket(sock);
          setPage("game");
          break;
          
        case "waitingTimeout":
          setShowBotOption(true);
          setMessage("No player joined yet. Play with bot or wait longer?");
          break;
          
        case "error":
          setMessage(`Error: ${data.message}`);
          break;
      }
    });

    setLocalSocket(sock);
    
    return () => {
      console.log("WaitingRoom unmounting");
    };
  }, [username, roomId]);

  const handlePlayWithBot = () => {
    if (localSocket) {
      startWithBot(localSocket, roomId);
    }
  };

  return (
    <div className="waiting-room">
      <h2>Waiting Room</h2>
      <p className="room-code">Room Code: {displayRoomId}</p>
      <p>{message}</p>
      <p>Share this code with your friend to join!</p>
      
      {showBotOption && (
        <button onClick={handlePlayWithBot} className="bot-button">
          Play with Bot Now
        </button>
      )}
    </div>
  );
}