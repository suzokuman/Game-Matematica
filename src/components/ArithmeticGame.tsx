
import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import SoundEffects from "./SoundEffects";
import { motion } from "framer-motion";
import LeaderboardTable, { LeaderboardEntry } from "./LeaderboardTable";

interface ArithmeticGameProps {
  initialOperationType?: string;
  onReturnHome: () => void;
}

const ArithmeticGame = ({ initialOperationType, onReturnHome }: ArithmeticGameProps) => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end" | "leaderboard">("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [operationType, setOperationType] = useState(initialOperationType || "soma");
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const maxLevels = 20;

  useEffect(() => {
    // Verificar se há um tipo de operação na URL
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo") || initialOperationType || "soma";
    setOperationType(tipo);
    
    // Load leaderboard
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
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
  
  const viewLeaderboard = () => {
    // Refresh leaderboard data
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
    setGameState("leaderboard");
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
        <EndScreen 
          score={score} 
          onRestart={restartGame} 
          onViewLeaderboard={viewLeaderboard}
          gameType={operationType}
        />
      )}
      
      {gameState === "leaderboard" && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-game-primary">Histórico de Pontuações</h2>
            <div className="flex gap-2">
              <Button 
                className="bg-game-secondary hover:bg-game-secondary/80"
                onClick={restartGame}
              >
                Voltar ao Jogo
              </Button>
              <Button
                onClick={onReturnHome}
              >
                Página Inicial
              </Button>
            </div>
          </div>
          <LeaderboardTable entries={leaderboardEntries} />
        </div>
      )}
    </motion.div>
  );
};

export default ArithmeticGame;
