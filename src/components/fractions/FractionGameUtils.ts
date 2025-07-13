
import { getFractionRangeByGrade, generateNumberInRange } from "@/utils/gradeRanges";

export interface FractionCategories {
  easy: string[];
  medium: string[];
  hard: string[];
}

// Generate fractions based on grade difficulty - using EXACT grade ranges
const generateFractionsByDifficulty = () => {
  const range = getFractionRangeByGrade();
  const fractions: string[] = [];
  const generatedSet = new Set<string>();
  
  console.log(`Generating fractions for grade range: ${range.min}-${range.max}`);
  
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
  const range = getFractionRangeByGrade();
  return generateNumberInRange(range.min, range.max);
};

// Lista completa de frações disponíveis por complexidade (mantida para compatibilidade)
export const allFractions: FractionCategories = {
  easy: ["1/2", "1/3", "1/4", "3/4", "2/3", "3/5"],
  medium: ["4/5", "1/5", "1/6", "5/6", "2/6", "2/4", "3/6"],
  hard: ["1/8", "3/8", "5/8", "7/8", "1/10", "3/10", "9/10"]
};
