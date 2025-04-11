
import { motion } from "framer-motion";

interface ArithmeticProblemProps {
  num1: number;
  num2: number;
  operationType: string;
}

const ArithmeticProblem: React.FC<ArithmeticProblemProps> = ({ num1, num2, operationType }) => {
  const getSymbol = (type: string) => {
    switch (type) {
      case "soma": return "+";
      case "subtracao": return "-";
      case "multiplicacao": return "×";
      case "divisao": return "÷";
      default: return "+";
    }
  };

  const symbol = getSymbol(operationType);

  return (
    <motion.div
      className="text-4xl md:text-5xl font-bold my-8 p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="mr-4">{num1}</span>
      <span className="mx-4 text-game-primary">{symbol}</span>
      <span className="ml-4">{num2}</span>
    </motion.div>
  );
};

export default ArithmeticProblem;
