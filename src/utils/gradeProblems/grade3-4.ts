
// 3º e 4º ANO: Números de 1 a 50
const createGradeProblem = (grade: number, operationType: string): { num1: number, num2: number } => {
  console.log(`=== CRIANDO PROBLEMA PARA ${grade}º ANO (1-50) ===`);
  
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
  
  console.log(`${grade}º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

export const createGrade3Problem = (operationType: string): { num1: number, num2: number } => {
  return createGradeProblem(3, operationType);
};

export const createGrade4Problem = (operationType: string): { num1: number, num2: number } => {
  return createGradeProblem(4, operationType);
};
