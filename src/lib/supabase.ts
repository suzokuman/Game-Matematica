
import { createClient } from '@supabase/supabase-js';

// Check for environment variables or use placeholders for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Please check your environment variables.');
  console.log('You need to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Supabase project settings.');
}

// Create a Supabase client only if both URL and key are available
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export type LeaderboardEntryDB = {
  id?: number;
  name: string;
  grade: string;
  score: number;
  game_type: string;
  created_at?: string;
};

export async function getLeaderboardEntries(): Promise<LeaderboardEntryDB[]> {
  // Check if supabase client is available
  if (!supabase) {
    console.error('Supabase client not initialized. Using localStorage fallback.');
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('leaderboard');
      return localData ? JSON.parse(localData) : [];
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return [];
    }
  }
  
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching leaderboard entries:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Error in getLeaderboardEntries:', err);
    return [];
  }
}

export async function saveLeaderboardEntry(entry: Omit<LeaderboardEntryDB, 'id' | 'created_at'>): Promise<boolean> {
  // Check if supabase client is available
  if (!supabase) {
    console.error('Supabase client not initialized. Using localStorage fallback.');
    // Fallback to localStorage
    try {
      const localData = localStorage.getItem('leaderboard') || '[]';
      const entries = JSON.parse(localData);
      entries.push({...entry, created_at: new Date().toISOString()});
      localStorage.setItem('leaderboard', JSON.stringify(entries));
      return true;
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      return false;
    }
  }
  
  try {
    const { error } = await supabase
      .from('leaderboard')
      .insert([entry]);
    
    if (error) {
      console.error('Error saving leaderboard entry:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in saveLeaderboardEntry:', err);
    return false;
  }
}
