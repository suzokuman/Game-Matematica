
export interface FractionCategories {
  easy: string[];
  medium: string[];
  hard: string[];
}

// Get difficulty-appropriate fractions based on grade
const getFractionsByGrade = () => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  let maxNumerator = 1;
  let maxDenominator = 2;
  
  switch (grade) {
    case 1: 
      maxNumerator = 1;
      maxDenominator = 4;
      break;
    case 2:
      maxNumerator = 3;
      maxDenominator = 6;
      break;
    case 3:
    case 4:
      maxNumerator = 7;
      maxDenominator = 8;
      break;
    case 5:
    case 6:
      maxNumerator = 9;
      maxDenominator = 12;
      break;
    case 7:
      maxNumerator = 15;
      maxDenominator = 20;
      break;
    case 8:
      maxNumerator = 99;
      maxDenominator = 100;
      break;
    case 9:
      maxNumerator = 999;
      maxDenominator = 1000;
      break;
    default:
      maxNumerator = 3;
      maxDenominator = 6;
  }
  
  return { maxNumerator, maxDenominator };
};

// Generate fractions based on difficulty
const generateFractionsByDifficulty = () => {
  const { maxNumerator, maxDenominator } = getFractionsByGrade();
  const fractions: string[] = [];
  const generatedSet = new Set<string>();
  
  // Generate 20 unique fractions within the difficulty range
  while (fractions.length < 20) {
    const numerator = Math.floor(Math.random() * maxNumerator) + 1;
    const denominator = Math.floor(Math.random() * (maxDenominator - 1)) + 2; // Start from 2
    
    if (numerator < denominator) {
      const fraction = `${numerator}/${denominator}`;
      if (!generatedSet.has(fraction)) {
        generatedSet.add(fraction);
        fractions.push(fraction);
      }
    }
  }
  
  return fractions;
};

// Generate a random sequence of fractions based on difficulty
export const generateRandomFractionSequence = (allFractions: FractionCategories): string[] => {
  // Generate fractions based on the player's grade
  return generateFractionsByDifficulty().sort(() => Math.random() - 0.5);
};

// Lista completa de frações disponíveis por complexidade (mantida para compatibilidade)
export const allFractions: FractionCategories = {
  easy: ["1/2", "1/3", "1/4", "3/4", "2/3", "3/5"],
  medium: ["4/5", "1/5", "1/6", "5/6", "2/6", "2/4", "3/6"],
  hard: ["1/8", "3/8", "5/8", "7/8", "1/10", "3/10", "9/10"]
};
