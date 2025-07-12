
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
