
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

// FUNÇÃO CORRIGIDA: Gera um problema válido onde AMBOS os operandos estão ESTRITAMENTE no intervalo da série
export const generateValidProblem = (operationType: string): { num1: number, num2: number } => {
  const range = getNumberRangeByGrade();
  
  console.log(`=== GENERATING PROBLEM ===`);
  console.log(`Operation: ${operationType}`);
  console.log(`Grade range: ${range.min} to ${range.max}`);
  
  // Gerar SEMPRE números dentro do intervalo exato da série
  let num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  let num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  
  console.log(`Initial operands: ${num1}, ${num2}`);
  
  // Ajustes específicos por operação
  if (operationType === "subtracao") {
    // Para subtração, garantir que num1 >= num2 para evitar resultados negativos
    if (num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    console.log(`Subtraction adjusted: ${num1} - ${num2}`);
  } else if (operationType === "divisao") {
    // Para divisão, garantir que num2 não seja zero e que a divisão seja exata
    if (num2 === 0) {
      num2 = 1;
    }
    
    // Garantir divisão exata: fazer num1 ser múltiplo de num2
    const maxQuotient = Math.floor(range.max / num2);
    const quotient = Math.floor(Math.random() * Math.min(maxQuotient, 10)) + 1;
    num1 = num2 * quotient;
    
    // Se num1 ultrapassar o limite, ajustar
    if (num1 > range.max) {
      // Escolher um divisor menor
      num2 = Math.floor(Math.random() * Math.min(range.max, 5)) + 1;
      const newQuotient = Math.floor(range.max / num2);
      num1 = num2 * newQuotient;
    }
    
    console.log(`Division adjusted: ${num1} ÷ ${num2} = ${Math.floor(num1/num2)}`);
  }
  
  // VERIFICAÇÃO FINAL: garantir que ambos estão no intervalo
  if (num1 < range.min || num1 > range.max || num2 < range.min || num2 > range.max) {
    console.log(`ERROR: Operands out of range! num1: ${num1}, num2: ${num2}, range: ${range.min}-${range.max}`);
    // Forçar números válidos
    num1 = Math.min(Math.max(num1, range.min), range.max);
    num2 = Math.min(Math.max(num2, range.min), range.max);
  }
  
  console.log(`Final problem: ${num1} ${operationType} ${num2}`);
  console.log(`Both operands in range ${range.min}-${range.max}? ${num1 >= range.min && num1 <= range.max && num2 >= range.min && num2 <= range.max}`);
  
  return { num1, num2 };
};

// Gera opções incluindo a resposta correta
export const generateOptionsWithCorrect = (correctAnswer: number): number[] => {
  const options = new Set([correctAnswer]);
  const range = getNumberRangeByGrade();
  
  console.log(`Generating options for correct answer: ${correctAnswer}`);
  
  // Gerar opções variadas mas razoáveis
  while (options.size < 6) {
    let option: number;
    
    const strategy = Math.floor(Math.random() * 3);
    
    switch (strategy) {
      case 0: // Números próximos à resposta correta
        const offset = Math.floor(Math.random() * 20) + 1;
        option = correctAnswer + (Math.random() < 0.5 ? offset : -offset);
        break;
      case 1: // Números aleatórios em uma faixa razoável
        const maxOption = Math.max(correctAnswer * 2, 100);
        option = Math.floor(Math.random() * maxOption) + 1;
        break;
      default: // Variações da resposta correta
        const factor = Math.random() < 0.5 ? 0.7 : 1.3;
        option = Math.floor(correctAnswer * factor);
        break;
    }
    
    // Garantir que a opção seja positiva e diferente da resposta correta
    if (option > 0 && option !== correctAnswer && option <= 1000) {
      options.add(option);
    }
  }
  
  const finalOptions = Array.from(options).sort(() => Math.random() - 0.5);
  console.log(`Final options: ${finalOptions.join(', ')}`);
  return finalOptions;
};
