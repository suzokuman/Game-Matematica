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

  // Get number range based on player grade - STRICTLY following the requirements
  const getNumberRangeByGrade = () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    const grade = parseInt(playerInfo.grade || "1");
    
    switch (grade) {
      case 1: return { min: 1, max: 9 }; // 1º ano: 1 a 9 (1 algarismo)
      case 2: return { min: 1, max: 20 }; // 2º ano: 1 a 20 (1 a 2 algarismos)
      case 3: 
      case 4: return { min: 1, max: 50 }; // 3º e 4º anos: 1 a 50 (1 a 2 algarismos)
      case 5: 
      case 6: return { min: 1, max: 99 }; // 5º e 6º anos: 1 a 99 (1 a 2 algarismos)
      case 7: return { min: 1, max: 150 }; // 7º ano: 1 a 150 (1 a 3 algarismos)
      case 8: return { min: 100, max: 999 }; // 8º ano: 100 a 999 (3 algarismos)
      case 9: return { min: 100, max: 9999 }; // 9º ano: 100 a 9999 (3 a 4 algarismos)
      default: return { min: 1, max: 9 };
    }
  };

  // Generate number within the EXACT range for the grade
  const generateNumber = () => {
    const range = getNumberRangeByGrade();
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  };

  // Calculate correct answer
  const calculate = (a: number, b: number, tipo: string) => {
    switch (tipo) {
      case "soma": return a + b;
      case "subtracao": return a - b;
      case "multiplicacao": return a * b;
      case "divisao": return Math.floor(a / b);
      default: return a + b;
    }
  };

  // Generate 6 options (1 correct + 5 wrong) - ALL within grade range
  const generateOptions = (correct: number) => {
    const optionsSet = new Set([correct]);
    const range = getNumberRangeByGrade();
    
    // Generate wrong answers within a reasonable range but respecting grade limits
    while (optionsSet.size < 6) {
      let wrongAnswer: number;
      
      // Try different strategies to generate wrong answers within range
      const strategy = Math.floor(Math.random() * 3);
      
      switch (strategy) {
        case 0: // Add/subtract small amount
          const offset = Math.floor(Math.random() * Math.min(10, range.max - range.min)) + 1;
          wrongAnswer = correct + (Math.random() < 0.5 ? offset : -offset);
          break;
        case 1: // Random number from range
          wrongAnswer = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
          break;
        case 2: // Multiply/divide by small factor
          const factor = Math.floor(Math.random() * 3) + 2;
          wrongAnswer = Math.random() < 0.5 ? Math.floor(correct * factor) : Math.floor(correct / factor);
          break;
        default:
          wrongAnswer = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
      }
      
      // Ensure wrong answer is within grade range and not zero or negative
      if (wrongAnswer >= range.min && wrongAnswer <= range.max && wrongAnswer > 0) {
        optionsSet.add(wrongAnswer);
      }
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
    const range = getNumberRangeByGrade();
    let a: number;
    let b: number;
    let problemKey: string;
    let attempts = 0;
    const maxAttempts = 20;
    
    do {
      a = generateNumber();
      b = generateNumber();
      
      // Special handling for division
      if (operationType === "divisao") {
        // Ensure b is not zero
        if (b === 0) b = 1;
        
        // Make sure division result is within range and is a whole number
        const possibleResults = [];
        for (let result = range.min; result <= Math.min(range.max, 50); result++) {
          const dividend = result * b;
          if (dividend >= range.min && dividend <= range.max) {
            possibleResults.push({ dividend, divisor: b, result });
          }
        }
        
        if (possibleResults.length > 0) {
          const selected = possibleResults[Math.floor(Math.random() * possibleResults.length)];
          a = selected.dividend;
          b = selected.divisor;
        }
      }
      
      // For subtraction, ensure a >= b to avoid negative results
      if (operationType === "subtracao" && a < b) {
        [a, b] = [b, a];
      }
      
      // Ensure the result of the operation is within reasonable bounds
      const result = calculate(a, b, operationType);
      
      // Check if result is reasonable for the grade level
      const isValidResult = result > 0 && 
        (operationType === "soma" ? result <= range.max * 2 : 
         operationType === "subtracao" ? result >= 0 : 
         operationType === "multiplicacao" ? result <= range.max * Math.min(range.max, 10) :
         operationType === "divisao" ? result <= range.max : true);
      
      if (!isValidResult) {
        attempts++;
        continue;
      }
      
      problemKey = `${a}-${b}-${operationType}`;
      attempts++;
      
      if (attempts >= maxAttempts || usedProblemSets.length === 0) {
        break;
      }
    } while (usedProblemSets.includes(problemKey));
    
    console.log(`Generated problem: ${a} ${operationType} ${b} for grade ${JSON.parse(localStorage.getItem("playerInfo") || "{}").grade}, range: ${range.min}-${range.max}`);
    
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
