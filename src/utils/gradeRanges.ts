
// Centraliza a lógica de intervalos numéricos por série
export interface NumberRange {
  min: number;
  max: number;
}

// Função centralizada que define EXATAMENTE os intervalos por série
export const getNumberRangeByGrade = (): NumberRange => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  console.log(`Getting number range for grade: ${grade}`);
  
  switch (grade) {
    case 1: 
      console.log("Grade 1: Range 1-9 (1 algarismo)");
      return { min: 1, max: 9 }; // 1º ano: 1 a 9 (1 algarismo)
    case 2: 
      console.log("Grade 2: Range 1-20 (1 a 2 algarismos)");
      return { min: 1, max: 20 }; // 2º ano: 1 a 20 (1 a 2 algarismos)
    case 3: 
    case 4: 
      console.log("Grade 3-4: Range 1-50 (1 a 2 algarismos)");
      return { min: 1, max: 50 }; // 3º e 4º anos: 1 a 50 (1 a 2 algarismos)
    case 5: 
    case 6: 
      console.log("Grade 5-6: Range 1-99 (1 a 2 algarismos)");
      return { min: 1, max: 99 }; // 5º e 6º anos: 1 a 99 (1 a 2 algarismos)
    case 7: 
      console.log("Grade 7: Range 1-150 (1 a 3 algarismos)");
      return { min: 1, max: 150 }; // 7º ano: 1 a 150 (1 a 3 algarismos)
    case 8: 
      console.log("Grade 8: Range 100-999 (3 algarismos)");
      return { min: 100, max: 999 }; // 8º ano: 100 a 999 (3 algarismos)
    case 9: 
      console.log("Grade 9: Range 100-9999 (3 a 4 algarismos)");
      return { min: 100, max: 9999 }; // 9º ano: 100 a 9999 (3 a 4 algarismos)
    default: 
      console.log("Default: Range 1-9");
      return { min: 1, max: 9 };
  }
};

// Gera um número dentro do intervalo EXATO da série
export const generateNumberInRange = (min: number, max: number): number => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Generated number: ${result} (range: ${min}-${max})`);
  return result;
};

// Gera um número para a série atual
export const generateNumberForGrade = (): number => {
  const range = getNumberRangeByGrade();
  return generateNumberInRange(range.min, range.max);
};
