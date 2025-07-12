
// Funções específicas para cada série escolar - VERSÃO OTIMIZADA

// 1º ANO: Números de 1 a 9 RIGOROSAMENTE
export const createGrade1Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 1º ANO (1-9) ===");
  
  let num1 = Math.floor(Math.random() * 9) + 1; // SEMPRE 1 a 9
  let num2 = Math.floor(Math.random() * 9) + 1; // SEMPRE 1 a 9
  
  console.log(`ANTES dos ajustes: num1=${num1}, num2=${num2}`);
  
  if (operationType === "subtracao") {
    // Para subtração, garantir que num1 >= num2 (resultado positivo)
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    // Para divisão, usar divisores pequenos e garantir divisão exata
    const divisors = [1, 2, 3];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const multipliers = [];
    for (let i = 1; i <= 9; i++) {
      if (num2 * i <= 9) multipliers.push(i);
    }
    if (multipliers.length > 0) {
      num1 = num2 * multipliers[Math.floor(Math.random() * multipliers.length)];
    }
  }
  
  // VERIFICAÇÃO FINAL RIGOROSA para 1º ano
  if (num1 < 1 || num1 > 9 || num2 < 1 || num2 > 9) {
    console.error(`ERRO: Números fora do range do 1º ano! num1=${num1}, num2=${num2}`);
    // Forçar correção
    num1 = Math.min(Math.max(num1, 1), 9);
    num2 = Math.min(Math.max(num2, 1), 9);
  }
  
  console.log(`1º ANO FINAL: ${num1} ${operationType} ${num2}`);
  console.log(`VERIFICAÇÃO: num1 (${num1}) está em 1-9? ${num1 >= 1 && num1 <= 9}`);
  console.log(`VERIFICAÇÃO: num2 (${num2}) está em 1-9? ${num2 >= 1 && num2 <= 9}`);
  
  return { num1, num2 };
};

// 2º ANO: Números de 1 a 20
export const createGrade2Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 2º ANO (1-20) ===");
  
  let num1 = Math.floor(Math.random() * 20) + 1;
  let num2 = Math.floor(Math.random() * 20) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(20 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  // Verificação final
  if (num1 < 1 || num1 > 20 || num2 < 1 || num2 > 20) {
    num1 = Math.min(Math.max(num1, 1), 20);
    num2 = Math.min(Math.max(num2, 1), 20);
  }
  
  console.log(`2º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 3º ANO: Números de 1 a 50
export const createGrade3Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 3º ANO (1-50) ===");
  
  let num1 = Math.floor(Math.random() * 50) + 1;
  let num2 = Math.floor(Math.random() * 50) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(50 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  if (num1 < 1 || num1 > 50 || num2 < 1 || num2 > 50) {
    num1 = Math.min(Math.max(num1, 1), 50);
    num2 = Math.min(Math.max(num2, 1), 50);
  }
  
  console.log(`3º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 4º ANO: Números de 1 a 50
export const createGrade4Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 4º ANO (1-50) ===");
  
  let num1 = Math.floor(Math.random() * 50) + 1;
  let num2 = Math.floor(Math.random() * 50) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(50 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  if (num1 < 1 || num1 > 50 || num2 < 1 || num2 > 50) {
    num1 = Math.min(Math.max(num1, 1), 50);
    num2 = Math.min(Math.max(num2, 1), 50);
  }
  
  console.log(`4º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 5º ANO: Números de 1 a 99
export const createGrade5Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 5º ANO (1-99) ===");
  
  let num1 = Math.floor(Math.random() * 99) + 1;
  let num2 = Math.floor(Math.random() * 99) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(99 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  if (num1 < 1 || num1 > 99 || num2 < 1 || num2 > 99) {
    num1 = Math.min(Math.max(num1, 1), 99);
    num2 = Math.min(Math.max(num2, 1), 99);
  }
  
  console.log(`5º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 6º ANO: Números de 1 a 99
export const createGrade6Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 6º ANO (1-99) ===");
  
  let num1 = Math.floor(Math.random() * 99) + 1;
  let num2 = Math.floor(Math.random() * 99) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(99 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  if (num1 < 1 || num1 > 99 || num2 < 1 || num2 > 99) {
    num1 = Math.min(Math.max(num1, 1), 99);
    num2 = Math.min(Math.max(num2, 1), 99);
  }
  
  console.log(`6º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 7º ANO: Números de 1 a 150
export const createGrade7Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 7º ANO (1-150) ===");
  
  let num1 = Math.floor(Math.random() * 150) + 1;
  let num2 = Math.floor(Math.random() * 150) + 1;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(150 / num2);
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }
  
  if (num1 < 1 || num1 > 150 || num2 < 1 || num2 > 150) {
    num1 = Math.min(Math.max(num1, 1), 150);
    num2 = Math.min(Math.max(num2, 1), 150);
  }
  
  console.log(`7º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 8º ANO: Números de 100 a 999
export const createGrade8Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 8º ANO (100-999) ===");
  
  let num1 = Math.floor(Math.random() * 900) + 100;
  let num2 = Math.floor(Math.random() * 900) + 100;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const minMultiplier = Math.ceil(100 / num2);
    const maxMultiplier = Math.floor(999 / num2);
    num1 = num2 * (Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier);
  }
  
  if (num1 < 100 || num1 > 999 || num2 < 100 || num2 > 999) {
    num1 = Math.min(Math.max(num1, 100), 999);
    num2 = Math.min(Math.max(num2, 100), 999);
  }
  
  console.log(`8º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 9º ANO: Números de 100 a 9999
export const createGrade9Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 9º ANO (100-9999) ===");
  
  let num1 = Math.floor(Math.random() * 9900) + 100;
  let num2 = Math.floor(Math.random() * 9900) + 100;
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 50, 100];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const minMultiplier = Math.ceil(100 / num2);
    const maxMultiplier = Math.floor(9999 / num2);
    num1 = num2 * (Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) + minMultiplier);
  }
  
  if (num1 < 100 || num1 > 9999 || num2 < 100 || num2 > 9999) {
    num1 = Math.min(Math.max(num1, 100), 9999);
    num2 = Math.min(Math.max(num2, 100), 9999);
  }
  
  console.log(`9º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// Função principal que escolhe a função correta baseada na série
export const createGradeSpecificProblem = (operationType: string): { num1: number, num2: number } => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  console.log(`SELECIONANDO FUNÇÃO ESPECÍFICA PARA ${grade}º ANO`);
  
  switch (grade) {
    case 1: return createGrade1Problem(operationType);
    case 2: return createGrade2Problem(operationType);
    case 3: return createGrade3Problem(operationType);
    case 4: return createGrade4Problem(operationType);
    case 5: return createGrade5Problem(operationType);
    case 6: return createGrade6Problem(operationType);
    case 7: return createGrade7Problem(operationType);
    case 8: return createGrade8Problem(operationType);
    case 9: return createGrade9Problem(operationType);
    default: return createGrade1Problem(operationType);
  }
};
