import { getNumberRangeByGrade, generateNumberInRange, getMultDivRangeByGrade } from "../gradeRanges";

// 1º ANO: Números de 1 a 9 RIGOROSAMENTE
export const createGrade1Problem = (operationType: string): { num1: number, num2: number } => {
  let range = getNumberRangeByGrade();
  if (operationType === "multiplicacao" || operationType === "divisao") {
    range = getMultDivRangeByGrade();
  }
  let num1 = generateNumberInRange(range.min, range.max);
  let num2 = generateNumberInRange(range.min, range.max);

  if (operationType === "subtracao") {
    if (num1 < num2) [num1, num2] = [num2, num1];
  } else if (operationType === "divisao") {
    // Para divisão, garantir que num1 seja múltiplo de num2 e ambos dentro do range
    const divisors: number[] = [];
    for (let i = range.min; i <= range.max; i++) {
      if (i !== 0) divisors.push(i);
    }
    num2 = divisors[Math.floor(Math.random() * divisors.length)];
    const maxMultiplier = Math.floor(range.max / num2);
    const minMultiplier = Math.ceil(range.min / num2);
    const multiplier = generateNumberInRange(Math.max(1, minMultiplier), Math.max(1, maxMultiplier));
    num1 = num2 * multiplier;
    if (num1 > range.max) num1 = num2 * Math.floor(range.max / num2);
  } else if (operationType === "multiplicacao") {
    // Para multiplicação, garantir que ambos estejam no range
    num1 = generateNumberInRange(range.min, range.max);
    num2 = generateNumberInRange(range.min, range.max);
  }

  num1 = Math.max(range.min, Math.min(range.max, num1));
  num2 = Math.max(range.min, Math.min(range.max, num2));

  return { num1, num2 };
};
