
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArithmeticProblem from "./ArithmeticProblem";
import DraggableOption from "./DraggableOption";
import DropZone from "./DropZone";
import { useSoundEffects } from "./SoundEffects";

interface GameScreenProps {
  currentLevel: number;
  maxLevels: number;
  score: number;
  operationType: string;
  onNextLevel: () => void;
  onScoreChange: (newScore: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  maxLevels,
  score,
  operationType,
  onNextLevel,
  onScoreChange
}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [dropStatus, setDropStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [dropMessage, setDropMessage] = useState("Solte aqui a resposta correta");
  const [usedProblemSets, setUsedProblemSets] = useState<string[]>([]);
  
  const { playCorrect, playWrong } = useSoundEffects();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Gera número com n dígitos
  const generateNumber = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Calcula a resposta correta
  const calculate = (a: number, b: number, tipo: string) => {
    switch (tipo) {
      case "soma": return a + b;
      case "subtracao": return a - b;
      case "multiplicacao": return a * b;
      case "divisao": return Math.floor(a / b);
      default: return a + b;
    }
  };

  // Gera 6 opções (1 correta + 5 erradas)
  const generateOptions = (correct: number) => {
    const optionsSet = new Set([correct]);
    while (optionsSet.size < 6) {
      const offset = Math.floor(Math.random() * 10) + 1;
      optionsSet.add(correct + (Math.random() < 0.5 ? offset : -offset));
    }
    return Array.from(optionsSet).sort(() => Math.random() - 0.5);
  };

  const handleDrop = (value: number) => {
    const correct = calculate(num1, num2, operationType);

    if (value === correct) {
      setDropStatus("correct");
      setDropMessage(`Correto! Resposta: ${value}`);
      playCorrect();
      onScoreChange(score + 1);
      
      // Adiciona o par atual à lista de problemas usados
      const problemKey = `${num1}-${num2}-${operationType}`;
      setUsedProblemSets(prev => [...prev, problemKey]);
      
      setTimeout(() => {
        onNextLevel();
        setDropStatus("idle");
        setDropMessage("Solte aqui a resposta correta");
      }, 1200);
    } else {
      setDropStatus("wrong");
      setDropMessage(`Incorreto. Tente novamente.`);
      playWrong();
      onScoreChange(score - 1);
    }
  };

  const loadProblem = () => {
    const digits = currentLevel < 5 ? 1 : currentLevel < 10 ? 2 : currentLevel < 15 ? 3 : 4;
    
    let a: number;
    let b: number;
    let problemKey: string;
    let attempts = 0;
    const maxAttempts = 10; // Limite para evitar loops infinitos
    
    // Tenta gerar um problema que ainda não foi usado
    do {
      // Para divisão, garantir que o resultado seja um número inteiro
      a = generateNumber(digits);
      b = generateNumber(digits);
      
      if (operationType === "divisao") {
        // Garantir que b não é zero
        b = b === 0 ? 1 : b;
        // Fazer com que a seja múltiplo de b para garantir divisão exata
        a = b * Math.floor((generateNumber(digits) / b) + 1);
      }
      
      // Para subtração, garantir que a > b para evitar números negativos
      if (operationType === "subtracao" && a < b) {
        [a, b] = [b, a];
      }
      
      problemKey = `${a}-${b}-${operationType}`;
      attempts++;
      
      // Se já tentamos muitas vezes ou não há problemas usados ainda, aceitamos o problema gerado
      if (attempts >= maxAttempts || usedProblemSets.length === 0) {
        break;
      }
    } while (usedProblemSets.includes(problemKey));
    
    setNum1(a);
    setNum2(b);
    
    const correct = calculate(a, b, operationType);
    setOptions(generateOptions(correct));
  };

  // Limpa os problemas usados quando mudamos de operação
  useEffect(() => {
    setUsedProblemSets([]);
  }, [operationType]);

  // Carrega um novo problema quando o nível avança
  useEffect(() => {
    loadProblem();
  }, [currentLevel, operationType]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 w-full max-w-md flex justify-between items-center">
        <div className="text-lg font-medium">
          <span className="text-game-primary">Nível {currentLevel + 1}</span> / {maxLevels}
        </div>
        <div className="text-lg font-semibold">
          Pontos: <span className={score >= 0 ? "text-game-correct" : "text-game-wrong"}>{score}</span>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Modo: {capitalize(operationType)}
      </h1>

      <ArithmeticProblem num1={num1} num2={num2} operationType={operationType} />
      
      <div className="w-full max-w-lg mb-6">
        <DropZone 
          onDrop={handleDrop} 
          message={dropMessage} 
          status={dropStatus}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option, index) => (
          <DraggableOption 
            key={index} 
            value={option} 
            onDragStart={() => {}}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GameScreen;
