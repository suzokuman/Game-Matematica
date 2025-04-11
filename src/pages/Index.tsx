
import { useEffect } from "react";
import ArithmeticGame from "../components/ArithmeticGame";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  useEffect(() => {
    // Atualizar o título da página
    document.title = "Jogo de Aritmética";
  }, []);

  return (
    <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen">
      <ArithmeticGame />
    </div>
  );
};

export default Index;
