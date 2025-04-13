
import React from "react";

interface FractionProps {
  value: string;
  onDragStart: () => void;
}

const Fraction: React.FC<FractionProps> = ({ value, onDragStart }) => {
  const [num, den] = value.split("/");
  
  return (
    <div 
      className="fraction px-8 py-5 bg-gradient-to-br from-game-secondary to-game-primary text-white font-bold rounded-xl cursor-grab 
                transform transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 select-none
                scale-125"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", value);
        onDragStart();
      }}
    >
      <span className="block border-b border-white">{num}</span>
      <span className="block">{den}</span>
    </div>
  );
};

export default Fraction;
