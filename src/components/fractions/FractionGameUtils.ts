
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
      maxNumerator = 9; // 1 dígito
      maxDenominator = 9;
      break;
    case 2:
      maxNumerator = 99; // 1 a 2 dígitos
      maxDenominator = 99;
      break;
    case 3:
    case 4:
      maxNumerator = 99; // 2 dígitos
      maxDenominator = 99;
      break;
    case 5:
    case 6:
      maxNumerator = 999; // 2 a 3 dígitos
      maxDenominator = 999;
      break;
    case 7:
      maxNumerator = 9999; // 2 a 4 dígitos
      maxDenominator = 9999;
      break;
    case 8:
      maxNumerator = 9999; // 3 a 4 dígitos
      maxDenominator = 9999;
      break;
    case 9:
      maxNumerator = 99999; // 4 a 5 dígitos
      maxDenominator = 99999;
      break;
    default:
      maxNumerator = 99;
      maxDenominator = 99;
  }
  
  return { maxNumerator, maxDenominator };
};

// Generate number with specific digit count
const generateNumberWithDigits = (minDigits: number, maxDigits: number): number => {
  const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;
  
  if (digits === 1) {
    return Math.floor(Math.random() * 9) + 1; // 1-9
  }
  
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get digit range based on grade
const getDigitRangeByGrade = () => {
  const playerInfo = JSON.parse(localStorage.getItem("playerInfo") || "{}");
  const grade = parseInt(playerInfo.grade || "1");
  
  switch (grade) {
    case 1: return { min: 1, max: 1 }; // somente 1 dígito
    case 2: return { min: 1, max: 2 }; // 1 a 2 dígitos
    case 3: 
    case 4: return { min: 2, max: 2 }; // somente 2 dígitos
    case 5: 
    case 6: return { min: 2, max: 3 }; // 2 a 3 dígitos
    case 7: return { min: 2, max: 4 }; // 2 a 4 dígitos
    case 8: return { min: 3, max: 4 }; // 3 a 4 dígitos
    case 9: return { min: 4, max: 5 }; // 4 a 5 dígitos
    default: return { min: 1, max: 2 };
  }
};

// Generate fractions based on difficulty
const generateFractionsByDifficulty = () => {
  const digitRange = getDigitRangeByGrade();
  const fractions: string[] = [];
  const generatedSet = new Set<string>();
  
  // Generate 20 unique fractions within the difficulty range
  while (fractions.length < 20) {
    const numerator = generateNumberWithDigits(digitRange.min, digitRange.max);
    const denominator = generateNumberWithDigits(digitRange.min, digitRange.max);
    
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
