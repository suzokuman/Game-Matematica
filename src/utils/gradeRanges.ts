
// Este arquivo agora serve apenas para compatibilidade
// A lógica principal foi movida para gradeSpecificProblems.ts

export interface NumberRange {
  min: number;
  max: number;
}

// Função mantida apenas para compatibilidade com código existente
export const getNumberRangeByGrade = (): NumberRange => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  console.log(`Getting number range for grade: ${grade}`);
  
  switch (grade) {
    case 1: return { min: 1, max: 9 };
    case 2: return { min: 1, max: 20 };
    case 3: 
    case 4: return { min: 1, max: 50 };
    case 5: 
    case 6: return { min: 1, max: 99 };
    case 7: return { min: 1, max: 150 };
    case 8: return { min: 100, max: 999 };
    case 9: return { min: 100, max: 9999 };
    default: return { min: 1, max: 9 };
  }
};

// Adding the missing generateNumberInRange function for compatibility
export const generateNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
