
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeaderboardEntryDB = {
  id?: number;
  name: string;
  grade: string;
  score: number;
  game_type: string;
  created_at?: string;
};

export async function getLeaderboardEntries(): Promise<LeaderboardEntryDB[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar pontuações:', error);
    return [];
  }
  
  return data || [];
}

export async function saveLeaderboardEntry(entry: Omit<LeaderboardEntryDB, 'id' | 'created_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('leaderboard')
    .insert([entry]);
  
  if (error) {
    console.error('Erro ao salvar pontuação:', error);
    return false;
  }
  
  return true;
}
