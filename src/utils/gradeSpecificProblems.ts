
// Funções específicas para cada série escolar

// 1º ANO: Números de 1 a 9
export const createGrade1Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 1º ANO ===");
  
  let num1 = Math.floor(Math.random() * 9) + 1; // 1 a 9
  let num2 = Math.floor(Math.random() * 9) + 1; // 1 a 9
  
  if (operationType === "subtracao") {
    // Garantir resultado positivo
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    // Divisão simples para 1º ano
    const divisors = [1, 2, 3];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 3 + 1); // resultado máximo 9
    if (num1 > 9) num1 = num2 * 2;
  }
  
  console.log(`1º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 2º ANO: Números de 1 a 20
export const createGrade2Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 2º ANO ===");
  
  let num1 = Math.floor(Math.random() * 20) + 1; // 1 a 20
  let num2 = Math.floor(Math.random() * 20) + 1; // 1 a 20
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 4 + 1);
    if (num1 > 20) num1 = num2 * 3;
  }
  
  console.log(`2º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 3º ANO: Números de 1 a 50
export const createGrade3Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 3º ANO ===");
  
  let num1 = Math.floor(Math.random() * 50) + 1; // 1 a 50
  let num2 = Math.floor(Math.random() * 50) + 1; // 1 a 50
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 5 + 1);
    if (num1 > 50) num1 = num2 * 4;
  }
  
  console.log(`3º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 4º ANO: Números de 1 a 50
export const createGrade4Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 4º ANO ===");
  
  let num1 = Math.floor(Math.random() * 50) + 1; // 1 a 50
  let num2 = Math.floor(Math.random() * 50) + 1; // 1 a 50
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 5 + 1);
    if (num1 > 50) num1 = num2 * 4;
  }
  
  console.log(`4º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 5º ANO: Números de 1 a 99
export const createGrade5Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 5º ANO ===");
  
  let num1 = Math.floor(Math.random() * 99) + 1; // 1 a 99
  let num2 = Math.floor(Math.random() * 99) + 1; // 1 a 99
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 8 + 1);
    if (num1 > 99) num1 = num2 * 6;
  }
  
  console.log(`5º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 6º ANO: Números de 1 a 99
export const createGrade6Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 6º ANO ===");
  
  let num1 = Math.floor(Math.random() * 99) + 1; // 1 a 99
  let num2 = Math.floor(Math.random() * 99) + 1; // 1 a 99
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 8 + 1);
    if (num1 > 99) num1 = num2 * 6;
  }
  
  console.log(`6º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 7º ANO: Números de 1 a 150
export const createGrade7Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 7º ANO ===");
  
  let num1 = Math.floor(Math.random() * 150) + 1; // 1 a 150
  let num2 = Math.floor(Math.random() * 150) + 1; // 1 a 150
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 10 + 1);
    if (num1 > 150) num1 = num2 * 8;
  }
  
  console.log(`7º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 8º ANO: Números de 100 a 999
export const createGrade8Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 8º ANO ===");
  
  let num1 = Math.floor(Math.random() * 900) + 100; // 100 a 999
  let num2 = Math.floor(Math.random() * 900) + 100; // 100 a 999
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 40 + 4); // resultado entre 4*num2 e 43*num2
    if (num1 > 999) num1 = num2 * 30;
  }
  
  console.log(`8º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// 9º ANO: Números de 100 a 9999
export const createGrade9Problem = (operationType: string): { num1: number, num2: number } => {
  console.log("=== CRIANDO PROBLEMA PARA 9º ANO ===");
  
  let num1 = Math.floor(Math.random() * 9900) + 100; // 100 a 9999
  let num2 = Math.floor(Math.random() * 9900) + 100; // 100 a 9999
  
  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 50, 100];
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    num1 = num2 * Math.floor(Math.random() * 99 + 1);
    if (num1 > 9999) num1 = num2 * 50;
  }
  
  console.log(`9º ANO: ${num1} ${operationType} ${num2}`);
  return { num1, num2 };
};

// Função principal que escolhe a função correta baseada na série
export const createGradeSpecificProblem = (operationType: string): { num1: number, num2: number } => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  console.log(`SELECIONANDO FUNÇÃO PARA ${grade}º ANO`);
  
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
