
import { useState } from "react";
import { PlayerFormValues } from "@/components/PlayerForm";

export const usePlayerInfo = () => {
  const [playerInfo, setPlayerInfo] = useState<{ name: string; grade: string } | null>(null);

<<<<<<< HEAD
  useEffect(() => {
    // Limpa o playerInfo ao abrir o app para sempre pedir nome e série
    localStorage.removeItem("playerInfo");
    const savedPlayerInfo = localStorage.getItem("playerInfo");
    if (savedPlayerInfo) {
      try {
        const parsedInfo = JSON.parse(savedPlayerInfo);
        setPlayerInfo(parsedInfo);
      } catch (e) {
        console.error("Error loading player info:", e);
      }
    }
  }, []);

=======
>>>>>>> 857bcf51573e2f39a506d40a20f8452ddbcf9283
  const savePlayerInfo = (data: PlayerFormValues) => {
    const newPlayerInfo = {
      name: data.name,
      grade: data.grade,
    };
    
    setPlayerInfo(newPlayerInfo);
    // Removido o localStorage.setItem para não persistir os dados
  };

  return {
    playerInfo,
    savePlayerInfo
  };
};
