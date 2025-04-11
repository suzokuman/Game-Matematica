
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
  operationType: string;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, operationType }) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-game-primary mb-6 text-center">
        Bem-vindo ao Jogo de Aritmética!
      </h1>
      <p className="text-lg md:text-xl mb-4 max-w-xl text-center">
        Modo: <span className="font-bold">{capitalize(operationType)}</span>
      </p>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mb-8">
        <p className="text-lg mb-4">
          Você verá contas de matemática. Arraste a resposta correta para o quadro.
        </p>
        <p className="text-lg mb-4">
          São 20 níveis com dificuldade crescente.
        </p>
        <p className="font-semibold text-lg">
          Acertos valem <span className="text-game-correct">+1 ponto</span> e erros <span className="text-game-wrong">-1 ponto</span>.
        </p>
      </div>
      <Button 
        className="game-button animate-pulse-scale"
        onClick={onStart}
      >
        Começar o Jogo
      </Button>
    </motion.div>
  );
};

export default StartScreen;
