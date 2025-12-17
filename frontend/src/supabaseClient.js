import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rywpwgqylwsfvjcevkmh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3B3Z3F5bHdzZnZqY2V2a21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDQ4MzEsImV4cCI6MjA4MTQ4MDgzMX0.kXWitJvv80J-aTPq1ynkE-tcMlV_sTzxNFX6RVssJx8";



export const supabase = createClient(supabaseUrl, supabaseAnonKey);
