import { createClient } from '@supabase/supabase-js';

// Ambil URL dan Key dari file .env.local tadi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Bikin 'jembatan' penghubung dan export biar bisa dipake di file lain
export const supabase = createClient(supabaseUrl, supabaseKey);