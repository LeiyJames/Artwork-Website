import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tlfegsiewdifzxpbufxz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZmVnc2lld2RpZnp4cGJ1Znh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMTU0MTYsImV4cCI6MjA2MjU5MTQxNn0.PPGjNH-ZXX3-gqrzCQcipK6Q-WM6TVGz43bHgNc16mM';

// Add a check for development mode to prevent errors during development
const isValidSupabaseConfig = supabaseUrl.includes('supabase.co') && supabaseAnonKey.length > 10;

// Initialize Supabase client with error handling
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  }
});

// Display a warning if Supabase is not configured properly
if (process.env.NODE_ENV !== 'production' && !isValidSupabaseConfig) {
  console.warn(
    '⚠️ Supabase is not properly configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.'
  );
}

export { supabase }; 