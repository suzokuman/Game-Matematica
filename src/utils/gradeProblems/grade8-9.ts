
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
