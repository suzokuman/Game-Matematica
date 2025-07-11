import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArithmeticProblem from "./ArithmeticProblem";
import DraggableOption from "./DraggableOption";
import DropZone from "./DropZone";
import { useSoundEffects } from "./SoundEffects";
import { Button } from "@/components/ui/button";
import { getNumberRangeByGrade, generateNumberInRange, generateNumberForGrade } from "@/utils/gradeRanges";

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
    
    console.log(`Generating options for correct answer: ${correct}, range: ${range.min}-${range.max}`);
    
    // Generate wrong answers within the EXACT grade range
    while (optionsSet.size < 6) {
      let wrongAnswer: number;
      
      // Try different strategies to generate wrong answers within range
      const strategy = Math.floor(Math.random() * 4);
      
      switch (strategy) {
        case 0: // Add/subtract small amount but stay in range
          const offset = Math.floor(Math.random() * Math.min(5, Math.floor((range.max - range.min) / 4))) + 1;
          wrongAnswer = correct + (Math.random() < 0.5 ? offset : -offset);
          break;
        case 1: // Random number from range
          wrongAnswer = generateNumberInRange(range.min, range.max);
          break;
        case 2: // Multiply/divide by small factor but keep in range
          const factor = Math.floor(Math.random() * 2) + 2;
          const candidate = Math.random() < 0.5 ? Math.floor(correct * factor) : Math.floor(correct / factor);
          wrongAnswer = Math.max(range.min, Math.min(range.max, candidate));
          break;
        case 3: // Generate numbers around the correct answer
          const variation = Math.floor(Math.random() * Math.min(10, Math.floor((range.max - range.min) / 3))) + 1;
          wrongAnswer = Math.random() < 0.5 ? correct + variation : correct - variation;
          break;
        default:
          wrongAnswer = generateNumberInRange(range.min, range.max);
      }
      
      // Ensure wrong answer is within EXACT grade range and not zero or negative
      if (wrongAnswer >= range.min && wrongAnswer <= range.max && wrongAnswer > 0 && wrongAnswer !== correct) {
        optionsSet.add(wrongAnswer);
        console.log(`Generated wrong option: ${wrongAnswer}`);
      }
    }
    
    const finalOptions = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    console.log(`Final options: ${finalOptions.join(', ')}`);
    return finalOptions;
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
    
    console.log(`Loading problem for operation: ${operationType}, range: ${range.min}-${range.max}`);
    
    do {
      a = generateNumberForGrade();
      b = generateNumberForGrade();
      
      console.log(`Generated numbers: a=${a}, b=${b}`);
      
      // Special handling for division
      if (operationType === "divisao") {
        // Ensure b is not zero and result is reasonable
        if (b === 0) b = 1;
        
        // For division, make sure we get a reasonable result within range
        // Generate a result first, then calculate the dividend
        const maxResult = Math.min(range.max, 50); // Keep division results reasonable
        const result = generateNumberInRange(1, maxResult);
        const divisor = generateNumberInRange(2, Math.min(range.max, 20)); // Keep divisors reasonable
        
        a = result * divisor; // This ensures a clean division
        b = divisor;
        
        // Make sure 'a' is still within our range
        if (a > range.max) {
          a = generateNumberForGrade();
          b = Math.max(2, generateNumberInRange(2, Math.min(a, range.max)));
        }
        
        console.log(`Division adjusted: a=${a}, b=${b}, result=${Math.floor(a/b)}`);
      }
      
      // For subtraction, ensure a >= b to avoid negative results
      if (operationType === "subtracao" && a < b) {
        [a, b] = [b, a];
        console.log(`Subtraction adjusted: a=${a}, b=${b}`);
      }
      
      // Verify the result is reasonable for the grade level
      const result = calculate(a, b, operationType);
      console.log(`Operation result: ${a} ${operationType} ${b} = ${result}`);
      
      // Check if result is reasonable for the grade level
      const isValidResult = result > 0 && 
        (operationType === "soma" ? result <= range.max * 2 : 
         operationType === "subtracao" ? result >= 0 && result <= range.max : 
         operationType === "multiplicacao" ? result <= range.max * Math.min(range.max, 20) :
         operationType === "divisao" ? result <= range.max && result === Math.floor(result) : true);
      
      if (!isValidResult) {
        console.log(`Invalid result: ${result}, trying again...`);
        attempts++;
        continue;
      }
      
      problemKey = `${a}-${b}-${operationType}`;
      attempts++;
      
      if (attempts >= maxAttempts || usedProblemSets.length === 0) {
        break;
      }
    } while (usedProblemSets.includes(problemKey));
    
    console.log(`Final problem: ${a} ${operationType} ${b} = ${calculate(a, b, operationType)}`);
    
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
