import React from "react";
import "./Board.css";

export default function Board({ board, handleMove }) {
  console.log("Board state:", board);
  console.log("Board length:", board?.length);
  
  return (
    <div className="board">
      {board && board.map((column, colIndex) => (
        <div 
          key={colIndex} 
          className="column" 
          onClick={() => {
            console.log("Column clicked:", colIndex);
            handleMove(colIndex);
          }}
        >
          {column.map((cell, rowIndex) => {
            console.log(`Cell [${colIndex}][${rowIndex}]:`, cell);
            return (
              <div 
                key={`${colIndex}-${rowIndex}`} 
                className={`cell ${cell || ''}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}