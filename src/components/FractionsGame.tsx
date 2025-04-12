
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import { useSoundEffects } from "./SoundEffects";
import { Button } from "@/components/ui/button";
import LeaderboardTable, { LeaderboardEntry } from "./LeaderboardTable";

interface FractionsGameProps {
  onReturnHome: () => void;
}

const FractionsGame = ({ onReturnHome }: FractionsGameProps) => {
  const [gameState, setGameState] = useState<"start" | "playing" | "end" | "leaderboard">("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const { playCorrect, playWrong } = useSoundEffects();

  const levels = [
    "1/2", "1/3", "1/4", "3/4", "2/3", "3/5", "4/5", "1/5", "1/6", "5/6",
    "1/8", "3/8", "5/8", "7/8", "2/6", "2/4", "3/6", "1/10", "3/10", "9/10"
  ];
  
  useEffect(() => {
    // Load leaderboard
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
  }, []);

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
  
  const viewLeaderboard = () => {
    // Refresh leaderboard data
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
    setGameState("leaderboard");
  };

  const generatePizzaGradient = (fraction: string) => {
    const [num, den] = fraction.split("/").map(Number);
    const percent = (num / den) * 100;
    return `conic-gradient(#ff9999 0% ${percent}%, #ffffff ${percent}% 100%)`;
  };

  const generateOptions = (correct: string) => {
    const options = new Set([correct]);
    while (options.size < 6) {
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
  const [dropMessage, setDropMessage] = useState("Arraste a resposta correta aqui!");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (gameState === "playing") {
      const fraction = levels[currentLevel];
      setOptions(generateOptions(fraction));
    }
  }, [currentLevel, gameState]);

  const Fraction = ({ value, onDragStart }: { value: string, onDragStart: () => void }) => {
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
        className={`drop-zone transition-colors w-1/2 h-36 ${
          dropStatus === "correct" ? "correct" : dropStatus === "wrong" ? "wrong" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        {dropMessage}
      </div>
    );
  };

  if (gameState === "start") {
    return (
      <StartScreen onStart={startGame} operationType="frações" />
    );
  }

  if (gameState === "end") {
    return (
      <EndScreen 
        score={score} 
        onRestart={restartGame} 
        onViewLeaderboard={viewLeaderboard}
        gameType="frações"
      />
    );
  }
  
  if (gameState === "leaderboard") {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
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
      </div>
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

      <div className="w-full max-w-lg mb-6 mx-auto flex justify-center">
        <FractionDropZone />
      </div>

      <div className="flex flex-wrap justify-center gap-16 my-12">
        {options.map((option, index) => (
          <Fraction key={index} value={option} onDragStart={() => {}} />
        ))}
      </div>
    </motion.div>
  );
};

export default FractionsGame;
