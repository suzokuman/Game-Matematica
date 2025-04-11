
import { useState } from "react";

interface DraggableOptionProps {
  value: number;
  onDragStart: (value: number) => void;
}

const DraggableOption: React.FC<DraggableOptionProps> = ({ value, onDragStart }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", value.toString());
    onDragStart(value);
    setIsDragging(true);
  };

  return (
    <div
      className={`game-option text-2xl md:text-3xl ${isDragging ? "opacity-50" : "opacity-100"} 
        animate-fade-in hover:scale-110`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      {value}
    </div>
  );
};

export default DraggableOption;
