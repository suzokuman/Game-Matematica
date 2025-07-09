
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fraction from "./Fraction";
import FractionDropZone from "./FractionDropZone";
import PizzaFraction from "./PizzaFraction";
import { Button } from "@/components/ui/button";

interface GamePlayScreenProps {
  currentLevel: number;
  maxLevels: number;
  score: number;
  fractionSequence: string[];
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  onReturnHome?: () => void;
}

const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  currentLevel,
  maxLevels,
  score,
  fractionSequence,
  onCorrectAnswer,
  onWrongAnswer,
  playCorrect,
  playWrong,
  onReturnHome
}) => {
  const [dropStatus, setDropStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [dropMessage, setDropMessage] = useState("Solte aqui a fração correta");
  const [options, setOptions] = useState<string[]>([]);

  // Generate number with specific digit count
  const generateNumberWithDigits = (minDigits: number, maxDigits: number): number => {
    const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;
    
    if (digits === 1) {
      return Math.floor(Math.random() * 9) + 1; // 1-9
    }
    
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Get digit range based on grade
  const getDigitRangeByGrade = () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    const grade = parseInt(playerInfo.grade || "1");
    
    switch (grade) {
      case 1: return { min: 1, max: 1 }; // somente 1 dígito
      case 2: return { min: 1, max: 2 }; // 1 a 2 dígitos
      case 3: 
      case 4: return { min: 2, max: 2 }; // somente 2 dígitos
      case 5: 
      case 6: return { min: 2, max: 3 }; // 2 a 3 dígitos
      case 7: return { min: 2, max: 4 }; // 2 a 4 dígitos
      case 8: return { min: 3, max: 4 }; // 3 a 4 dígitos
      case 9: return { min: 4, max: 5 }; // 4 a 5 dígitos
      default: return { min: 1, max: 2 };
    }
  };

  const generateOptions = (correct: string) => {
    const digitRange = getDigitRangeByGrade();
    const options = new Set([correct]);
    
    while (options.size < 6) {
      const n = generateNumberWithDigits(digitRange.min, digitRange.max);
      const d = generateNumberWithDigits(digitRange.min, digitRange.max);
      if (n < d) options.add(`${n}/${d}`);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (fractionSequence.length > 0) {
      const fraction = fractionSequence[currentLevel];
      setOptions(generateOptions(fraction));
    }
  }, [currentLevel, fractionSequence]);

  const handleDrop = (value: string) => {
    const correctValue = fractionSequence[currentLevel];

    if (value === correctValue) {
      setDropStatus("correct");
      setDropMessage(`Correto! A fração é ${value}.`);
      playCorrect();
      onCorrectAnswer();
      
      setTimeout(() => {
        if (currentLevel + 1 >= fractionSequence.length) {
          // End game handled by parent
        } else {
          setDropStatus("idle");
          setDropMessage("Solte aqui a fração correta");
        }
      }, 1200);
    } else {
      setDropStatus("wrong");
      setDropMessage("Incorreto. Tente novamente.");
      playWrong();
      onWrongAnswer();
    }
  };

  if (fractionSequence.length === 0 || currentLevel >= fractionSequence.length) {
    return <div>Carregando...</div>;
  }

  return (
    <motion.div 
      className="container mx-auto py-8 px-4 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 w-full max-w-md mx-auto flex justify-between items-center">
        <div className="text-lg font-medium">
          <span className="text-game-primary">Nível {currentLevel + 1}</span> / {maxLevels}
        </div>
        <div className="text-lg font-semibold">
          Pontos: <span className={score >= 0 ? "text-game-correct" : "text-game-wrong"}>{score}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Jogo das Frações
        </h2>
        
        {onReturnHome && (
          <Button 
            variant="outline"
            onClick={onReturnHome}
            className="border-game-primary text-game-primary hover:bg-game-primary hover:text-white"
            size="sm"
          >
            Voltar
          </Button>
        )}
      </div>

      <PizzaFraction fraction={fractionSequence[currentLevel]} />

      <div className="w-full max-w-lg mb-6 mx-auto flex justify-center">
        <FractionDropZone 
          message={dropMessage} 
          status={dropStatus} 
          onDrop={handleDrop} 
        />
      </div>

      <div className="flex flex-wrap justify-center gap-16 my-12">
        {options.map((option, index) => (
          <Fraction key={index} value={option} onDragStart={() => {}} />
        ))}
      </div>
    </motion.div>
  );
};

export default GamePlayScreen;
