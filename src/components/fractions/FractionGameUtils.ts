
export interface FractionCategories {
  easy: string[];
  medium: string[];
  hard: string[];
}

// Generate a random sequence of fractions based on difficulty
export const generateRandomFractionSequence = (allFractions: FractionCategories): string[] => {
  // Combine all fractions available
  const allAvailableFractions = [
    ...allFractions.easy,
    ...allFractions.medium,
    ...allFractions.hard
  ];
  
  // Shuffle the array of fractions
  return [...allAvailableFractions].sort(() => Math.random() - 0.5);
};

// Lista completa de frações disponíveis por complexidade
export const allFractions: FractionCategories = {
  easy: ["1/2", "1/3", "1/4", "3/4", "2/3", "3/5"],
  medium: ["4/5", "1/5", "1/6", "5/6", "2/6", "2/4", "3/6"],
  hard: ["1/8", "3/8", "5/8", "7/8", "1/10", "3/10", "9/10"]
};
