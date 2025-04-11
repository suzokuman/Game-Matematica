
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import { useSoundEffects } from "./SoundEffects";
import { Button } from "@/components/ui/button";

const FractionsGame = () => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end">("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const { playCorrect, playWrong } = useSoundEffects();

  // Lista de frações por nível
  const levels = [
    "1/2", "1/3", "1/4", "3/4", "2/3", "3/5", "4/5", "1/5", "1/6", "5/6",
    "1/8", "3/8", "5/8", "7/8", "2/6", "2/4", "3/6", "1/10", "3/10", "9/10"
  ];

  const startGame = () => {
    setGameState("playing");
    setCurrentLevel(0);
    setScore(0);
  };

  const endGame = () => {
    setGameState("end");
  };

  const restartGame = () => {
    setGameState("start");
  };

  // Gera visual da pizza com base na fração correta
  const generatePizzaGradient = (fraction: string) => {
    const [num, den] = fraction.split("/").map(Number);
    const percent = (num / den) * 100;
    return `conic-gradient(#ff9999 0% ${percent}%, #ffffff ${percent}% 100%)`;
  };

  // Gera 5 opções de resposta, incluindo a correta
  const generateOptions = (correct: string) => {
    const options = new Set([correct]);
    while (options.size < 5) {
      const n = Math.floor(Math.random() * 9) + 1;
      const d = Math.floor(Math.random() * 9) + 1;
      if (n < d) options.add(`${n}/${d}`);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleDrop = (value: string) => {
    const correctValue = levels[currentLevel];

    if (value === correctValue) {
      setDropStatus("correct");
      setDropMessage(`Correto! A fração é ${value}.`);
      playCorrect();
      setScore(prevScore => prevScore + 1);
      
      setTimeout(() => {
        if (currentLevel + 1 >= levels.length) {
          endGame();
        } else {
          setCurrentLevel(prevLevel => prevLevel + 1);
          setDropStatus("idle");
          setDropMessage("Solte aqui a fração correta");
        }
      }, 1200);
    } else {
      setDropStatus("wrong");
      setDropMessage("Incorreto. Tente novamente.");
      playWrong();
      setScore(prevScore => prevScore - 1);
    }
  };

  const [dropStatus, setDropStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [dropMessage, setDropMessage] = useState("Solte aqui a fração correta");
  const [options, setOptions] = useState<string[]>([]);

  // Load level whenever currentLevel changes
  useEffect(() => {
    if (gameState === "playing") {
      const fraction = levels[currentLevel];
      setOptions(generateOptions(fraction));
    }
  }, [currentLevel, gameState]);

  // Fraction Component
  const Fraction = ({ value, onDragStart }: { value: string, onDragStart: () => void }) => {
    const [num, den] = value.split("/");
    return (
      <div 
        className="fraction px-6 py-3 bg-gradient-to-br from-game-secondary to-game-primary text-white font-bold rounded-xl cursor-grab 
                  transform transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 select-none"
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

  // Drop Zone Component
  const FractionDropZone = () => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const value = e.dataTransfer.getData("text/plain");
      handleDrop(value);
    };

    return (
      <div
        className={`drop-zone transition-colors ${
          dropStatus === "correct" ? "correct" : dropStatus === "wrong" ? "wrong" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        {dropMessage}
      </div>
    );
  };

  // Main Game Screen
  if (gameState === "start") {
    return (
      <StartScreen onStart={startGame} operationType="frações" />
    );
  }

  if (gameState === "end") {
    return (
      <EndScreen score={score} onRestart={restartGame} />
    );
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
          <span className="text-game-primary">Nível {currentLevel + 1}</span> / {levels.length}
        </div>
        <div className="text-lg font-semibold">
          Pontos: <span className={score >= 0 ? "text-game-correct" : "text-game-wrong"}>{score}</span>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Jogo das Frações
      </h2>

      <div 
        className="w-[200px] h-[200px] rounded-full mx-auto mb-8 border-4 border-red-600"
        style={{ 
          background: generatePizzaGradient(levels[currentLevel]) 
        }}
      ></div>

      <div className="w-full max-w-lg mb-6 mx-auto">
        <FractionDropZone />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option, index) => (
          <Fraction key={index} value={option} onDragStart={() => {}} />
        ))}
      </div>
    </motion.div>
  );
};

export default FractionsGame;
