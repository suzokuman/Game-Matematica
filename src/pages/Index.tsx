
import { useEffect, useState } from "react";
import ArithmeticGame from "../components/ArithmeticGame";
import FractionsGame from "../components/FractionsGame";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LeaderboardTable, { LeaderboardEntry } from "@/components/LeaderboardTable";

const playerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  grade: z.string().min(1, "Série é obrigatória"),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

const Index = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showArithmeticMenu, setShowArithmeticMenu] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [operationType, setOperationType] = useState("soma");
  const [playerInfo, setPlayerInfo] = useState<{ name: string; grade: string } | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  
  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: "",
      grade: "",
    },
  });

  useEffect(() => {
    document.title = "Jogo Educativo de Matemática";
    
    // Try to load player info from localStorage
    const savedPlayerInfo = localStorage.getItem("playerInfo");
    if (savedPlayerInfo) {
      try {
        const parsedInfo = JSON.parse(savedPlayerInfo);
        setPlayerInfo(parsedInfo);
      } catch (e) {
        console.error("Error loading player info:", e);
      }
    }
    
    // Load leaderboard entries
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
  }, []);

  const toggleArithmeticMenu = () => {
    setShowArithmeticMenu(prev => !prev);
  };

  const startFractions = () => {
    setSelectedGame("fractions");
    setShowStartScreen(false);
  };

  const startArithmetic = (tipo: string) => {
    setOperationType(tipo);
    setSelectedGame("arithmetic");
    setShowStartScreen(false);
  };
  
  const returnToHome = () => {
    setSelectedGame(null);
    setShowStartScreen(true);
    setShowLeaderboard(false);
  };

  const onSubmitPlayerInfo = (data: PlayerFormValues) => {
    const newPlayerInfo = {
      name: data.name,
      grade: data.grade,
    };
    
    setPlayerInfo(newPlayerInfo);
    localStorage.setItem("playerInfo", JSON.stringify(newPlayerInfo));
  };
  
  const viewLeaderboard = () => {
    // Refresh leaderboard data
    const entries = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboardEntries(entries);
    setShowLeaderboard(true);
  };
  
  const clearLeaderboard = () => {
    if (window.confirm("Isso irá apagar todo o histórico de pontuações. Confirmar?")) {
      localStorage.removeItem("leaderboard");
      setLeaderboardEntries([]);
    }
  };

  if (selectedGame === "arithmetic") {
    return (
      <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen">
        <ArithmeticGame initialOperationType={operationType} onReturnHome={returnToHome} />
      </div>
    );
  }

  if (selectedGame === "fractions") {
    return (
      <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen">
        <FractionsGame onReturnHome={returnToHome} />
      </div>
    );
  }
  
  if (showLeaderboard) {
    return (
      <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-game-primary">Histórico de Pontuações</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={clearLeaderboard}
                >
                  Limpar Histórico
                </Button>
                <Button onClick={returnToHome}>
                  Voltar
                </Button>
              </div>
            </div>
            
            <LeaderboardTable entries={leaderboardEntries} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-game-light to-game-background min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <motion.div
        className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-game-primary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Bem-vindo ao Jogo de Matemática!
        </motion.h1>
        
        {!playerInfo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitPlayerInfo)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Série</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite sua série" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="game-button w-full md:w-auto">
                  Continuar
                </Button>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xl mb-2">
              Olá, <span className="font-bold">{playerInfo.name}</span> da <span className="font-bold">{playerInfo.grade}</span>!
            </p>
            <p className="text-lg mb-4">Escolha um jogo para começar:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button 
                className="game-button py-6 text-xl"
                onClick={startFractions}
              >
                Frações
              </Button>
              
              <Button 
                className="game-button py-6 text-xl"
                onClick={toggleArithmeticMenu}
              >
                Aritmética Básica
              </Button>
            </div>
            
            {showArithmeticMenu && (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {["soma", "subtracao", "multiplicacao", "divisao"].map((tipo) => (
                  <Button 
                    key={tipo}
                    className="bg-game-secondary hover:bg-game-primary text-white py-4"
                    onClick={() => startArithmetic(tipo)}
                  >
                    {tipo === "soma" && "Soma"}
                    {tipo === "subtracao" && "Subtração"}
                    {tipo === "multiplicacao" && "Multiplicação"}
                    {tipo === "divisao" && "Divisão"}
                  </Button>
                ))}
              </motion.div>
            )}
            
            {leaderboardEntries.length > 0 && (
              <Button 
                variant="outline"
                onClick={viewLeaderboard}
                className="mt-4"
              >
                Ver Histórico de Pontuações
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
