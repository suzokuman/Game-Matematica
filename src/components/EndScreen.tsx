
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Confetti } from "./Confetti";

interface EndScreenProps {
  score: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart }) => {
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
          Você completou todos os 20 níveis do Jogo de Aritmética.
        </p>
        <p className="text-2xl font-bold mb-6">
          Sua pontuação final foi: 
          <span className={`block text-3xl mt-3 ${score > 10 ? "text-game-correct" : "text-game-wrong"}`}>
            {score} pontos
          </span>
        </p>
        
        <Button 
          className="game-button mt-4"
          onClick={onRestart}
        >
          Jogar Novamente
        </Button>
      </div>
    </motion.div>
  );
};

export default EndScreen;
