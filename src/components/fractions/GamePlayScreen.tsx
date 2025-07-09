
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

  // Get difficulty-appropriate fractions based on grade
  const getFractionsByGrade = () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    const grade = parseInt(playerInfo.grade || "1");
    
    let maxNumerator = 1;
    let maxDenominator = 2;
    
    switch (grade) {
      case 1: 
        maxNumerator = 1;
        maxDenominator = 4;
        break;
      case 2:
        maxNumerator = 3;
        maxDenominator = 6;
        break;
      case 3:
      case 4:
        maxNumerator = 7;
        maxDenominator = 8;
        break;
      case 5:
      case 6:
        maxNumerator = 9;
        maxDenominator = 12;
        break;
      case 7:
        maxNumerator = 15;
        maxDenominator = 20;
        break;
      case 8:
        maxNumerator = 99;
        maxDenominator = 100;
        break;
      case 9:
        maxNumerator = 999;
        maxDenominator = 1000;
        break;
      default:
        maxNumerator = 3;
        maxDenominator = 6;
    }
    
    return { maxNumerator, maxDenominator };
  };

  const generateOptions = (correct: string) => {
    const { maxNumerator, maxDenominator } = getFractionsByGrade();
    const options = new Set([correct]);
    
    while (options.size < 6) {
      const n = Math.floor(Math.random() * maxNumerator) + 1;
      const d = Math.floor(Math.random() * maxDenominator) + 2;
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
