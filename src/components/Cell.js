import React from "react";

export default function Cell({ value, onClick }) {
  return (
    <div
      className={`cell ${value === "R" ? "red" : value === "Y" ? "yellow" : ""}`}
      onClick={onClick}
    />
  );
}
