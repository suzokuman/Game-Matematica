
// Centraliza a lógica de intervalos numéricos por série
export interface NumberRange {
  min: number;
  max: number;
}

// Função centralizada que define EXATAMENTE os intervalos por série
export const getNumberRangeByGrade = (): NumberRange => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  console.log(`Getting number range for grade: ${grade}`);
  
  switch (grade) {
    case 1: 
      console.log("Grade 1: Range 1-9 (1 algarismo)");
      return { min: 1, max: 9 }; // 1º ano: 1 a 9 (1 algarismo)
    case 2: 
      console.log("Grade 2: Range 1-20 (1 a 2 algarismos)");
      return { min: 1, max: 20 }; // 2º ano: 1 a 20 (1 a 2 algarismos)
    case 3: 
    case 4: 
      console.log("Grade 3-4: Range 1-50 (1 a 2 algarismos)");
      return { min: 1, max: 50 }; // 3º e 4º anos: 1 a 50 (1 a 2 algarismos)
    case 5: 
    case 6: 
      console.log("Grade 5-6: Range 1-99 (1 a 2 algarismos)");
      return { min: 1, max: 99 }; // 5º e 6º anos: 1 a 99 (1 a 2 algarismos)
    case 7: 
      console.log("Grade 7: Range 1-150 (1 a 3 algarismos)");
      return { min: 1, max: 150 }; // 7º ano: 1 a 150 (1 a 3 algarismos)
    case 8: 
      console.log("Grade 8: Range 100-999 (3 algarismos)");
      return { min: 100, max: 999 }; // 8º ano: 100 a 999 (3 algarismos)
    case 9: 
      console.log("Grade 9: Range 100-9999 (3 a 4 algarismos)");
      return { min: 100, max: 9999 }; // 9º ano: 100 a 9999 (3 a 4 algarismos)
    default: 
      console.log("Default: Range 1-9");
      return { min: 1, max: 9 };
  }
};

// Gera um número dentro do intervalo EXATO da série
export const generateNumberInRange = (min: number, max: number): number => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Generated number: ${result} (range: ${min}-${max})`);
  return result;
};

// Gera um número para a série atual - SEMPRE respeitando o intervalo
export const generateNumberForGrade = (): number => {
  const range = getNumberRangeByGrade();
  return generateNumberInRange(range.min, range.max);
};

// Verifica se um número está dentro do intervalo da série
export const isNumberInGradeRange = (num: number): boolean => {
  const range = getNumberRangeByGrade();
  return num >= range.min && num <= range.max;
};

// Gera um problema válido onde AMBOS os operandos estão no intervalo da série
export const generateValidProblem = (operationType: string): { num1: number, num2: number } => {
  const range = getNumberRangeByGrade();
  let num1: number, num2: number;
  let attempts = 0;
  const maxAttempts = 50;
  
  console.log(`Generating problem for operation: ${operationType}, range: ${range.min}-${range.max}`);
  
  do {
    // SEMPRE gerar números dentro do intervalo da série
    num1 = generateNumberInRange(range.min, range.max);
    num2 = generateNumberInRange(range.min, range.max);
    
    console.log(`Attempt ${attempts + 1}: Generated operands: ${num1}, ${num2}`);
    
    // Para subtração, garantir que num1 >= num2 para evitar resultados negativos
    if (operationType === "subtracao" && num1 < num2) {
      [num1, num2] = [num2, num1];
      console.log(`Subtraction: swapped to ${num1} - ${num2}`);
    }
    
    // Para divisão, garantir que num2 não seja zero e que a divisão seja exata
    if (operationType === "divisao") {
      if (num2 === 0) {
        num2 = 1;
      }
      // Para ter divisão exata, vamos ajustar num1 para ser múltiplo de num2
      const quotient = Math.floor(Math.random() * Math.min(10, range.max)) + 1;
      num1 = num2 * quotient;
      
      // Se num1 ultrapassar o limite, reduzir o quociente
      if (num1 > range.max) {
        num1 = num2 * Math.floor(range.max / num2);
      }
      
      console.log(`Division: adjusted to ${num1} ÷ ${num2} = ${Math.floor(num1/num2)}`);
    }
    
    attempts++;
    
    // Verificar se ambos os operandos estão no intervalo correto
    const bothInRange = num1 >= range.min && num1 <= range.max && 
                       num2 >= range.min && num2 <= range.max;
    
    if (bothInRange) {
      console.log(`✓ Valid problem found: ${num1} ${operationType} ${num2}`);
      break;
    }
    
    console.log(`✗ Invalid operands (out of range ${range.min}-${range.max}): ${num1}, ${num2}`);
    
  } while (attempts < maxAttempts);
  
  // Se não conseguiu gerar, usar números seguros dentro do intervalo
  if (attempts >= maxAttempts) {
    console.log("Max attempts reached, using safe fallback");
    num1 = range.min + Math.floor(Math.random() * Math.min(5, range.max - range.min));
    num2 = range.min + Math.floor(Math.random() * Math.min(5, range.max - range.min));
    
    if (operationType === "subtracao" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    if (operationType === "divisao" && num2 === 0) {
      num2 = 1;
    }
  }
  
  console.log(`Final problem: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// Gera opções incluindo a resposta correta (as opções podem sair do intervalo, mas não muito)
export const generateOptionsWithCorrect = (correctAnswer: number): number[] => {
  const options = new Set([correctAnswer]);
  const range = getNumberRangeByGrade();
  
  console.log(`Generating options for correct answer: ${correctAnswer}, grade range: ${range.min}-${range.max}`);
  
  // Para gerar opções variadas mas não absurdas
  const maxOptionValue = Math.max(correctAnswer * 2, range.max * 2, 100);
  const minOptionValue = Math.max(1, Math.min(range.min, correctAnswer - 20));
  
  while (options.size < 6) {
    let option: number;
    
    const strategy = Math.floor(Math.random() * 4);
    
    switch (strategy) {
      case 0: // Números próximos à resposta correta
        const offset = Math.floor(Math.random() * 10) + 1;
        option = correctAnswer + (Math.random() < 0.5 ? offset : -offset);
        break;
      case 1: // Números do intervalo da série
        option = generateNumberInRange(range.min, range.max);
        break;
      case 2: // Números um pouco maiores que o intervalo
        option = generateNumberInRange(range.min, Math.min(maxOptionValue, range.max * 1.5));
        break;
      default: // Variações da resposta correta
        const factor = Math.random() < 0.5 ? 0.5 : 1.5;
        option = Math.floor(correctAnswer * factor);
        break;
    }
    
    // Garantir que a opção seja positiva e diferente da resposta correta
    if (option > 0 && option !== correctAnswer && option >= minOptionValue && option <= maxOptionValue) {
      options.add(option);
      console.log(`Generated option: ${option}`);
    }
  }
  
  const finalOptions = Array.from(options).sort(() => Math.random() - 0.5);
  console.log(`Final options: ${finalOptions.join(', ')}`);
  return finalOptions;
};
