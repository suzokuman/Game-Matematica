
import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import SoundEffects from "./SoundEffects";
import { motion } from "framer-motion";

interface ArithmeticGameProps {
  initialOperationType?: string;
}

const ArithmeticGame = ({ initialOperationType }: ArithmeticGameProps = {}) => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end">("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [operationType, setOperationType] = useState(initialOperationType || "soma");
  const maxLevels = 20;

  useEffect(() => {
    // Verificar se há um tipo de operação na URL
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo") || initialOperationType || "soma";
    setOperationType(tipo);
  }, [initialOperationType]);

  const startGame = () => {
    setGameState("playing");
    setCurrentLevel(0);
    setScore(0);
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 >= maxLevels) {
      setGameState("end");
    } else {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const restartGame = () => {
    setGameState("start");
  };

  return (
    <motion.div 
      className="container mx-auto py-8 px-4 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SoundEffects />
      
      {gameState === "start" && (
        <StartScreen onStart={startGame} operationType={operationType} />
      )}
      
      {gameState === "playing" && (
        <GameScreen 
          currentLevel={currentLevel}
          maxLevels={maxLevels}
          score={score}
          operationType={operationType}
          onNextLevel={goToNextLevel}
          onScoreChange={setScore}
        />
      )}
      
      {gameState === "end" && (
        <EndScreen score={score} onRestart={restartGame} />
      )}
    </motion.div>
  );
};

export default ArithmeticGame;
