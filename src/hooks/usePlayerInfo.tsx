
import { useState, useEffect } from "react";
import { PlayerFormValues } from "@/components/PlayerForm";

export const usePlayerInfo = () => {
  const [playerInfo, setPlayerInfo] = useState<{ name: string; grade: string } | null>(null);

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

  const savePlayerInfo = (data: PlayerFormValues) => {
    const newPlayerInfo = {
      name: data.name,
      grade: data.grade,
    };
    
    setPlayerInfo(newPlayerInfo);
    localStorage.setItem("playerInfo", JSON.stringify(newPlayerInfo));
  };

  return {
    playerInfo,
    savePlayerInfo
  };
};
