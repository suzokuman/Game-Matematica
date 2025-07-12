
// Main coordinator file that imports all grade-specific functions
import { createGrade1Problem } from './grade1';
import { createGrade2Problem } from './grade2';
import { createGrade3Problem, createGrade4Problem } from './grade3-4';
import { createGrade5Problem, createGrade6Problem } from './grade5-6';
import { createGrade7Problem } from './grade7';
import { createGrade8Problem, createGrade9Problem } from './grade8-9';

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

// Re-export all individual functions for direct use if needed
export {
  createGrade1Problem,
  createGrade2Problem,
  createGrade3Problem,
  createGrade4Problem,
  createGrade5Problem,
  createGrade6Problem,
  createGrade7Problem,
  createGrade8Problem,
  createGrade9Problem
};
