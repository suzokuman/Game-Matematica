
// 1º ANO: Números de 1 a 9 RIGOROSAMENTE
export const createGrade1Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 1º ANO (1-9) ===");
  
  // FORÇA números entre 1-9 SEMPRE
  let num1 = Math.floor(Math.random() * 9) + 1; // 1 a 9
  let num2 = Math.floor(Math.random() * 9) + 1; // 1 a 9
  
  console.log(`ANTES dos ajustes: num1=${num1}, num2=${num2}`);
  
  if (operationType === "subtracao") {
    // Para subtração, garantir que num1 >= num2 (resultado positivo)
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    // Para divisão, usar apenas divisores que resultem em números 1-9
    const validPairs = [
      [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1],
      [4, 2], [6, 2], [8, 2],
      [6, 3], [9, 3],
      [8, 4]
    ];
    const pair = validPairs[Math.floor(Math.random() * validPairs.length)];
    [num1, num2] = pair;
  } else if (operationType === "multiplicacao") {
    // Para multiplicação, limitar para que o resultado não exceda números pequenos
    const validPairs = [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
      [2, 1], [2, 2], [2, 3], [2, 4],
      [3, 1], [3, 2], [3, 3]
    ];
    const pair = validPairs[Math.floor(Math.random() * validPairs.length)];
    [num1, num2] = pair;
  }
  
  // VERIFICAÇÃO FINAL RIGOROSA - NUNCA deve sair do range 1-9
  num1 = Math.max(1, Math.min(9, num1));
  num2 = Math.max(1, Math.min(9, num2));
  
  console.log(`1º ANO FINAL: ${num1} ${operationType} ${num2}`);
  console.log(`VERIFICAÇÃO RIGOROSA: num1=${num1} (1-9?), num2=${num2} (1-9?)`);
  
  return { num1, num2 };
};
