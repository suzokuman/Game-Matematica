
import React from "react";

interface PizzaFractionProps {
  fraction: string;
}

const PizzaFraction: React.FC<PizzaFractionProps> = ({ fraction }) => {
  const generatePizzaGradient = (fraction: string) => {
    const [num, den] = fraction.split("/").map(Number);
    const percent = (num / den) * 100;
    return `conic-gradient(#ff9999 0% ${percent}%, #ffffff ${percent}% 100%)`;
  };

  return (
    <div 
      className="w-[200px] h-[200px] rounded-full mx-auto mb-8 border-4 border-red-600"
      style={{ 
        background: generatePizzaGradient(fraction) 
      }}
    />
  );
};

export default PizzaFraction;
