
// 1º ANO: Números de 1 a 9 RIGOROSAMENTE
export const createGrade1Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 1º ANO (1-9) ===");
  
  let num1: number;
  let num2: number;
  
  if (operationType === "subtracao") {
    // Para subtração, garantir que num1 >= num2 (resultado positivo)
    num1 = Math.floor(Math.random() * 9) + 1; // 1 a 9
    num2 = Math.floor(Math.random() * num1) + 1; // 1 até num1
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
  } else {
    // Para soma, números simples de 1 a 9
    num1 = Math.floor(Math.random() * 9) + 1; // 1 a 9
    num2 = Math.floor(Math.random() * 9) + 1; // 1 a 9
  }
  
  console.log(`1º ANO FINAL: ${num1} ${operationType} ${num2}`);
  console.log(`VERIFICAÇÃO RIGOROSA: num1=${num1} (1-9?), num2=${num2} (1-9?)`);
  
  // VERIFICAÇÃO FINAL ABSOLUTA
  if (num1 < 1 || num1 > 9 || num2 < 1 || num2 > 9) {
    console.error("ERRO: Números fora do range 1-9 detectados!");
    // Força números corretos se algo deu errado
    num1 = Math.max(1, Math.min(9, num1));
    num2 = Math.max(1, Math.min(9, num2));
  }
  
  return { num1, num2 };
};
