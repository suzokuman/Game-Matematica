
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";
import { useEffect } from "react";
import { LeaderboardEntry } from "./LeaderboardTable";

interface EndScreenProps {
  score: number;
  onRestart: () => void;
  onViewLeaderboard: () => void;
  gameType: string;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart, onViewLeaderboard, gameType }) => {
  useEffect(() => {
    // Save score to localStorage
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    
    if (playerInfo.name && playerInfo.grade) {
      const leaderboardEntries: LeaderboardEntry[] = JSON.parse(
        localStorage.getItem("leaderboard") || "[]"
      );
      
      const newEntry: LeaderboardEntry = {
        name: playerInfo.name,
        grade: playerInfo.grade,
        score,
        gameType: gameType === "frações" ? "Frações" : `Aritmética (${gameType})`,
        date: new Date().toLocaleDateString("pt-BR")
      };
      
      leaderboardEntries.push(newEntry);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboardEntries));
    }
  }, [score, gameType]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Confetti />
      
      <h1 className="text-3xl md:text-5xl font-bold text-game-primary mb-6 text-center">
        Parabéns!
      </h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mb-8 w-full text-center">
        <p className="text-xl mb-4">
          Você completou todos os 20 níveis do Jogo de {gameType === "frações" ? "Frações" : "Aritmética"}.
        </p>
        <p className="text-2xl font-bold mb-6">
          Sua pontuação final foi: 
          <span className={`block text-3xl mt-3 ${score > 10 ? "text-game-correct" : "text-game-wrong"}`}>
            {score} pontos
          </span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            className="game-button"
            onClick={onRestart}
          >
            Jogar Novamente
          </Button>
          
          <Button 
            className="bg-game-secondary hover:bg-game-secondary/80" 
            onClick={onViewLeaderboard}
          >
            Ver Histórico
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EndScreen;
