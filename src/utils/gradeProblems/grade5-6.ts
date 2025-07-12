
// 5º e 6º ANO: Números de 1 a 99
const createGradeProblem = (grade: number, operationType: string): { num1: number, num2: number } => {
  console.log(`=== CRIANDO PROBLEMA PARA ${grade}º ANO (1-99) ===`);
  
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
  
  console.log(`${grade}º ANO FINAL: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

export const createGrade5Problem = (operationType: string): { num1: number, num2: number } => {
  return createGradeProblem(5, operationType);
};

export const createGrade6Problem = (operationType: string): { num1: number, num2: number } => {
  return createGradeProblem(6, operationType);
};
