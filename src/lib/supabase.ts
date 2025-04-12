
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = "https://ncuvweswnvoisjgaecnh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdXZ3ZXN3bnZvaXNqZ2FlY25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MjA4NTUsImV4cCI6MjA1OTk5Njg1NX0.brNUm4P63OjZfE_B2hBwvrazLmg3q-K7IxmKWRyjIJY";

// Criar o cliente Supabase
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type LeaderboardEntryDB = {
  id?: number;
  name: string;
  grade: string;
  score: number;
  game_type: string;
  created_at?: string;
};

export async function getLeaderboardEntries(): Promise<LeaderboardEntryDB[]> {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar pontuações:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Erro ao carregar pontuações:', err);
    return [];
  }
}

export async function saveLeaderboardEntry(entry: Omit<LeaderboardEntryDB, 'id' | 'created_at'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leaderboard')
      .insert([entry]);
    
    if (error) {
      console.error('Erro ao salvar pontuação:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Erro ao salvar pontuação:', err);
    return false;
  }
}
