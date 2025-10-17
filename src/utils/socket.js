import { io } from "socket.io-client";

let socket = null;

export function connectSocket(username, roomId, onMessage) {
  if (socket) {
    socket.disconnect();
  }

  socket = io("https://connect4-back-4.onrender.com");

  socket.on("connect", () => {
    socket.emit("joinRoom", { roomId, playerName: username });
  });

  socket.on("roomCreated", (data) => onMessage({ type: "roomCreated", payload: data }));
  socket.on("gameStart", (data) => onMessage({ type: "gameStart", payload: data }));
  socket.on("move_made", (data) => onMessage({ type: "move_made", payload: data }));
  socket.on("gameOver", (data) => onMessage({ type: "gameOver", payload: data }));
  socket.on("waitingTimeout", (data) => onMessage({ type: "waitingTimeout", payload: data }));
  socket.on("startWithBot", (data) => onMessage({ type: "startWithBot", payload: data }));
  socket.on("opponentDisconnected", (data) => onMessage({ type: "opponentDisconnected", payload: data }));
  socket.on("opponentDisconnectedWaiting", (data) => onMessage({ type: "opponentDisconnectedWaiting", payload: data }));
  socket.on("playerReconnected", (data) => onMessage({ type: "playerReconnected", payload: data }));
  socket.on("reconnected", (data) => onMessage({ type: "reconnected", payload: data }));
  socket.on("error", (data) => onMessage({ type: "error", message: data }));

  return socket;
}

export function sendMove(socket, colIndex) {
  if (socket && socket.connected) {
    socket.emit("drop", { col: colIndex });
  }
}

export function startWithBot(socket, roomId) {
  if (socket && socket.connected) {
    socket.emit("startWithBot", { roomId });
  }
}

export function disconnect() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}