
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fraction from "./Fraction";
import FractionDropZone from "./FractionDropZone";
import PizzaFraction from "./PizzaFraction";
<<<<<<< HEAD
import { saveLeaderboardEntry } from "@/lib/supabase";
=======
import { Button } from "@/components/ui/button";
import { getNumberRangeByGrade, generateNumberInRange } from "@/utils/gradeRanges";
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283

interface GamePlayScreenProps {
  currentLevel: number;
  maxLevels: number;
  score: number;
  fractionSequence: string[];
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  playCorrect: () => void;
  playWrong: () => void;
<<<<<<< HEAD
  onReturnHome: () => void;
=======
  onReturnHome?: () => void;
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
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

  const generateOptions = (correct: string) => {
    const options = new Set([correct]);
    const range = getNumberRangeByGrade();
    
    console.log(`Generating fraction options for range: ${range.min}-${range.max}`);
    
    while (options.size < 6) {
      const n = generateNumberInRange(range.min, range.max);
      const d = generateNumberInRange(range.min, range.max);
      
      // Ensure proper fraction (numerator < denominator)
      if (n < d) {
        const fraction = `${n}/${d}`;
        options.add(fraction);
        console.log(`Generated fraction option: ${fraction}`);
      }
    }
    
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (fractionSequence.length > 0) {
      const fraction = fractionSequence[currentLevel];
      console.log(`Current fraction: ${fraction}`);
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

  const saveProgress = async () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    if (playerInfo.name && playerInfo.grade) {
      await saveLeaderboardEntry({
        name: playerInfo.name,
        grade: playerInfo.grade,
        score,
        game_type: "frações"
      });
    }
  };

  // Salvar ao finalizar o jogo
  useEffect(() => {
    if (currentLevel + 1 === maxLevels) {
      saveProgress();
    }
    // eslint-disable-next-line
  }, [currentLevel]);

  // Modificar o botão Voltar para Início para salvar antes de voltar
  const handleReturnHome = async () => {
    await saveProgress();
    onReturnHome();
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
      {/* Botão Voltar para Início */}
      <button
        className="mt-8 px-6 py-3 bg-game-secondary text-white font-bold rounded-full shadow hover:bg-game-primary transition"
        onClick={handleReturnHome}
      >
        Voltar para Início
      </button>
    </motion.div>
  );
};

export default GamePlayScreen;
