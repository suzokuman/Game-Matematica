
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
