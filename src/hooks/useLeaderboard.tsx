
import { useState } from "react";
import { getLeaderboardEntries, LeaderboardEntryDB } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LeaderboardEntry } from "@/components/LeaderboardTable";
import { toast } from "sonner";

export const useLeaderboard = () => {
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLeaderboardData = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboardEntries();
      
      let formattedEntries: LeaderboardEntry[];

      if (data.length > 0 && 'created_at' in data[0]) {
        formattedEntries = data.map((entry: LeaderboardEntryDB) => ({
          id: entry.id,
          name: entry.name,
          grade: entry.grade,
          score: entry.score,
          gameType: entry.game_type,
          date: entry.created_at 
            ? format(new Date(entry.created_at), "dd/MM/yyyy", { locale: ptBR })
            : format(new Date(), "dd/MM/yyyy", { locale: ptBR })
        }));
      } else {
        formattedEntries = data as unknown as LeaderboardEntry[];
      }
      
      setLeaderboardEntries(formattedEntries);
    } catch (error) {
      console.error("Erro ao carregar pontuações:", error);
      const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      setLeaderboardEntries(entries);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLeaderboard = () => {
    if (window.confirm("Isso irá apagar todo o histórico de pontuações local. Confirmar?")) {
      localStorage.removeItem("leaderboard");
      setLeaderboardEntries([]);
      toast.success("Histórico local apagado com sucesso");
    }
  };

  return {
    leaderboardEntries,
    isLoading,
    loadLeaderboardData,
    clearLeaderboard
  };
};
