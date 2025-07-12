<<<<<<< HEAD

import React, { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
import { motion } from "framer-motion";
import ArithmeticProblem from "./ArithmeticProblem";
import DraggableOption from "./DraggableOption";
import DropZone from "./DropZone";
import { useSoundEffects } from "./SoundEffects";
<<<<<<< HEAD
import { saveLeaderboardEntry } from "@/lib/supabase";
=======
import { Button } from "@/components/ui/button";
import { createGradeSpecificProblem } from "@/utils/gradeProblems";
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283

interface GameScreenProps {
  currentLevel: number;
  maxLevels: number;
  score: number;
  operationType: string;
  onNextLevel: () => void;
  onScoreChange: (newScore: number) => void;
<<<<<<< HEAD
  onReturnHome: () => void;
  playerGrade?: string;
=======
  onReturnHome?: () => void;
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentLevel,
  maxLevels,
  score,
  operationType,
  onNextLevel,
  onScoreChange,
<<<<<<< HEAD
  onReturnHome,
  playerGrade
=======
  onReturnHome
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [dropStatus, setDropStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [dropMessage, setDropMessage] = useState("Solte aqui a resposta correta");
  
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

  // Gerar opções adequadas por série
  const generateOptionsWithCorrect = (correctAnswer: number): number[] => {
    const options = new Set([correctAnswer]);
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    const grade = parseInt(playerInfo.grade || "1");
    
    console.log(`Gerando opções para ${grade}º ano, resposta correta: ${correctAnswer}`);
    
    // Definir range de opções baseado na série
    let minOption = 1;
    let maxOption = 20;
    
    switch (grade) {
      case 1:
        minOption = 1;
        maxOption = 18; // Para 1º ano, respostas até 9+9=18
        break;
      case 2:
        minOption = 1;
        maxOption = 40;
        break;
      case 3:
      case 4:
        minOption = 1;
        maxOption = 100;
        break;
      case 5:
      case 6:
        minOption = 1;
        maxOption = 200;
        break;
      default:
        minOption = 1;
        maxOption = Math.max(correctAnswer * 2, 100);
    }
    
    // Gerar opções variadas mas dentro do range apropriado
    while (options.size < 6) {
      let option: number;
      
      const strategy = Math.floor(Math.random() * 3);
      
      switch (strategy) {
        case 0: // Números próximos à resposta correta
          const offset = Math.floor(Math.random() * Math.min(10, maxOption / 4)) + 1;
          option = correctAnswer + (Math.random() < 0.5 ? offset : -offset);
          break;
        case 1: // Números aleatórios no range
          option = Math.floor(Math.random() * (maxOption - minOption + 1)) + minOption;
          break;
        default: // Variações da resposta correta
          const factor = Math.random() < 0.5 ? 0.7 : 1.3;
          option = Math.floor(correctAnswer * factor);
          break;
      }
      
      // Garantir que a opção esteja no range correto e seja diferente da resposta
      if (option >= minOption && option <= maxOption && option !== correctAnswer && option > 0) {
        options.add(option);
      }
    }
    
    const finalOptions = Array.from(options).sort(() => Math.random() - 0.5);
    console.log(`Opções finais para ${grade}º ano: ${finalOptions.join(', ')}`);
    return finalOptions;
  };

  const handleDrop = (value: number) => {
    const correct = calculate(num1, num2, operationType);

    if (value === correct) {
      setDropStatus("correct");
      setDropMessage(`Correto! Resposta: ${value}`);
      playCorrect();
      onScoreChange(score + 1);
      
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

  const getRangeByGrade = (grade: string | undefined) => {
    switch (grade) {
      case "1º ano":
        return { min: 1, max: 9 };
      case "2º ano":
        return { min: 1, max: 20 };
      case "3º ano":
      case "4º ano":
        return { min: 1, max: 50 };
      case "5º ano":
      case "6º ano":
        return { min: 1, max: 99 };
      case "7º ano":
        return { min: 1, max: 150 };
      case "8º ano":
        return { min: 100, max: 999 };
      case "9º ano":
        return { min: 100, max: 9999 };
      default:
        return { min: 1, max: 9 };
    }
  };

  const generateNumberByGrade = (grade: string | undefined) => {
    const { min, max } = getRangeByGrade(grade);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const loadProblem = () => {
<<<<<<< HEAD
    let a: number;
    let b: number;
    let problemKey: string;
    let attempts = 0;
    const maxAttempts = 10; // Limite para evitar loops infinitos
    // Tenta gerar um problema que ainda não foi usado
    do {
      a = generateNumberByGrade(playerGrade);
      b = generateNumberByGrade(playerGrade);
      if (operationType === "divisao") {
        b = b === 0 ? 1 : b;
        a = b * Math.floor((generateNumberByGrade(playerGrade) / b) + 1);
      }
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
=======
    console.log(`CARREGANDO PROBLEMA PARA OPERAÇÃO: ${operationType}`);
    
    // Usar EXCLUSIVAMENTE a função específica por série
    const problem = createGradeSpecificProblem(operationType);
    
    console.log(`PROBLEMA RECEBIDO:`, problem);
    
    setNum1(problem.num1);
    setNum2(problem.num2);
    
    const correct = calculate(problem.num1, problem.num2, operationType);
    console.log(`PROBLEMA FINAL CARREGADO: ${problem.num1} ${operationType} ${problem.num2} = ${correct}`);
    
    // Gerar opções apropriadas para a série
    setOptions(generateOptionsWithCorrect(correct));
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
  };

  // Carrega um novo problema quando o nível avança
  useEffect(() => {
    loadProblem();
  }, [currentLevel, operationType]);

  const saveProgress = async () => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
    if (playerInfo.name && playerGrade) {
      await saveLeaderboardEntry({
        name: playerInfo.name,
        grade: playerGrade,
        score,
        game_type: operationType
      });
    }
  };

  // Salvar ao finalizar o jogo
  useEffect(() => {
    if (currentLevel + 1 === maxLevels) {
      saveProgress();
    }
    // eslint-disable-next-line
  }, [currentLevel]);

  // Modificar o botão Voltar para Início para salvar antes de voltar
  const handleReturnHome = async () => {
    await saveProgress();
    onReturnHome();
  };

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
      {/* Botão Voltar para Início */}
      <button
        className="mt-8 px-6 py-3 bg-game-secondary text-white font-bold rounded-full shadow hover:bg-game-primary transition"
        onClick={handleReturnHome}
      >
        Voltar para Início
      </button>
    </motion.div>
  );
};

export default GameScreen;
