
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArithmeticProblem from "./ArithmeticProblem";
import DraggableOption from "./DraggableOption";
import DropZone from "./DropZone";
import { useSoundEffects } from "./SoundEffects";
import { Button } from "@/components/ui/button";

interface GameScreenProps {
  currentLevel: number;
  maxLevels: number;
  score: number;
  operationType: string;
  onNextLevel: () => void;
  onScoreChange: (newScore: number) => void;
  onReturnHome?: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  maxLevels,
  score,
  operationType,
  onNextLevel,
  onScoreChange,
  onReturnHome
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

  // Get difficulty based on player grade
  const getDifficultyByGrade = () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    const grade = parseInt(playerInfo.grade || "1");
    
    switch (grade) {
      case 1: return { min: 1, max: 1 }; // 1 dígito
      case 2: return { min: 1, max: 2 }; // 1 a 2 dígitos
      case 3: 
      case 4: return { min: 2, max: 2 }; // 2 dígitos
      case 5: 
      case 6: return { min: 2, max: 3 }; // 2 a 3 dígitos
      case 7: return { min: 2, max: 4 }; // 2 a 4 dígitos
      case 8: return { min: 3, max: 4 }; // 3 a 4 dígitos
      case 9: return { min: 4, max: 5 }; // 4 a 5 dígitos
      default: return { min: 1, max: 2 };
    }
  };

  // Gera número com n dígitos
  const generateNumber = (digits: number) => {
    if (digits === 1) {
      return Math.floor(Math.random() * 9) + 1; // 1-9
    }
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
    const difficulty = getDifficultyByGrade();
    
    // Progressive difficulty within the grade range
    const levelProgress = currentLevel / maxLevels;
    const digitRange = difficulty.max - difficulty.min;
    const currentMinDigits = difficulty.min + Math.floor(levelProgress * digitRange);
    const currentMaxDigits = Math.min(difficulty.max, currentMinDigits + 1);
    
    let a: number;
    let b: number;
    let problemKey: string;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
      // Generate numbers based on difficulty
      const digitsA = Math.floor(Math.random() * (currentMaxDigits - currentMinDigits + 1)) + currentMinDigits;
      const digitsB = Math.floor(Math.random() * (currentMaxDigits - currentMinDigits + 1)) + currentMinDigits;
      
      a = generateNumber(digitsA);
      b = generateNumber(digitsB);
      
      if (operationType === "divisao") {
        // Garantir que b não é zero
        b = b === 0 ? 1 : b;
        // Fazer com que a seja múltiplo de b para garantir divisão exata
        a = b * Math.floor((generateNumber(digitsA) / b) + 1);
      }
      
      // Para subtração, garantir que a > b para evitar números negativos
      if (operationType === "subtracao" && a < b) {
        [a, b] = [b, a];
      }
      
      problemKey = `${a}-${b}-${operationType}`;
      attempts++;
      
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

      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Modo: {capitalize(operationType)}
        </h1>
        
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
