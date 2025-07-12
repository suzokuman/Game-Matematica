
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
