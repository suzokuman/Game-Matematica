
export interface FractionCategories {
  easy: string[];
  medium: string[];
  hard: string[];
}

// Get number range based on grade - STRICTLY following requirements
const getNumberRangeByGrade = () => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  switch (grade) {
    case 1: return { min: 1, max: 9 }; // 1º ano: 1 a 9 (1 algarismo)
    case 2: return { min: 1, max: 20 }; // 2º ano: 1 a 20 (1 a 2 algarismos)
    case 3: 
    case 4: return { min: 1, max: 50 }; // 3º e 4º anos: 1 a 50 (1 a 2 algarismos)
    case 5: 
    case 6: return { min: 1, max: 99 }; // 5º e 6º anos: 1 a 99 (1 a 2 algarismos)
    case 7: return { min: 1, max: 150 }; // 7º ano: 1 a 150 (1 a 3 algarismos)
    case 8: return { min: 100, max: 999 }; // 8º ano: 100 a 999 (3 algarismos)
    case 9: return { min: 100, max: 9999 }; // 9º ano: 100 a 9999 (3 a 4 algarismos)
    default: return { min: 1, max: 9 };
  }
};

// Generate number within EXACT range for the grade
const generateNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate fractions based on grade difficulty - numbers within grade range
const generateFractionsByDifficulty = () => {
  const range = getNumberRangeByGrade();
  const fractions: string[] = [];
  const generatedSet = new Set<string>();
  
  console.log(`Generating fractions for grade ${JSON.parse(localStorage.getItem("playerInfo") || "{}").grade}, range: ${range.min}-${range.max}`);
  
  // Generate 20 unique fractions within the EXACT range
  while (fractions.length < 20) {
    const numerator = generateNumberInRange(range.min, range.max);
    const denominator = generateNumberInRange(range.min, range.max);
    
    // Ensure numerator < denominator for proper fractions
    if (numerator < denominator) {
      const fraction = `${numerator}/${denominator}`;
      if (!generatedSet.has(fraction)) {
        generatedSet.add(fraction);
        fractions.push(fraction);
        console.log(`Generated fraction: ${fraction}`);
      }
    }
  }
  
  return fractions;
};

// Generate a random sequence of fractions based on grade difficulty
export const generateRandomFractionSequence = (allFractions: FractionCategories): string[] => {
  return generateFractionsByDifficulty().sort(() => Math.random() - 0.5);
};

// Export function to generate numbers for options - within grade range
export const generateNumberForOptions = (): number => {
  const range = getNumberRangeByGrade();
  return generateNumberInRange(range.min, range.max);
};

// Lista completa de frações disponíveis por complexidade (mantida para compatibilidade)
export const allFractions: FractionCategories = {
  easy: ["1/2", "1/3", "1/4", "3/4", "2/3", "3/5"],
  medium: ["4/5", "1/5", "1/6", "5/6", "2/6", "2/4", "3/6"],
  hard: ["1/8", "3/8", "5/8", "7/8", "1/10", "3/10", "9/10"]
};
