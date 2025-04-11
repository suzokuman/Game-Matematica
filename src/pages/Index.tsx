
import { useEffect, useState } from "react";
import ArithmeticGame from "../components/ArithmeticGame";
import FractionsGame from "../components/FractionsGame";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showArithmeticMenu, setShowArithmeticMenu] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [operationType, setOperationType] = useState("soma");
  
  useEffect(() => {
    document.title = "Jogo Educativo de Matemática";
  }, []);

  const toggleArithmeticMenu = () => {
    setShowArithmeticMenu(prev => !prev);
  };

  const startFractions = () => {
    setSelectedGame("fractions");
    setShowStartScreen(false);
  };

  const startArithmetic = (tipo: string) => {
    setOperationType(tipo);
    setSelectedGame("arithmetic");
    setShowStartScreen(false);
  };

  if (selectedGame === "arithmetic") {
    return (
      <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen">
        <ArithmeticGame initialOperationType={operationType} />
      </div>
    );
  }

  if (selectedGame === "fractions") {
    return (
      <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen">
        <FractionsGame />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <motion.div
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-game-primary mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Bem-vindo ao Jogo de Matemática!
        </motion.h1>
        
        <motion.div 
          className="flex flex-col gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button 
              className="game-button py-6 text-xl"
              onClick={startFractions}
            >
              Frações
            </Button>
            
            <Button 
              className="game-button py-6 text-xl"
              onClick={toggleArithmeticMenu}
            >
              Aritmética Básica
            </Button>
          </div>
          
          {showArithmeticMenu && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              {["soma", "subtracao", "multiplicacao", "divisao"].map((tipo) => (
                <Button 
                  key={tipo}
                  className="bg-game-secondary hover:bg-game-primary text-white py-4"
                  onClick={() => startArithmetic(tipo)}
                >
                  {tipo === "soma" && "Soma"}
                  {tipo === "subtracao" && "Subtração"}
                  {tipo === "multiplicacao" && "Multiplicação"}
                  {tipo === "divisao" && "Divisão"}
                </Button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
