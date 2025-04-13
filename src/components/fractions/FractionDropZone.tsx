
import React from "react";

interface FractionDropZoneProps {
  message: string;
  status: "idle" | "correct" | "wrong";
  onDrop: (value: string) => void;
}

const FractionDropZone: React.FC<FractionDropZoneProps> = ({ message, status, onDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const value = e.dataTransfer.getData("text/plain");
    onDrop(value);
  };

  return (
    <div
      className={`drop-zone transition-colors w-1/2 h-36 ${
        status === "correct" ? "correct" : status === "wrong" ? "wrong" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
    >
      {message}
    </div>
  );
};

export default FractionDropZone;
