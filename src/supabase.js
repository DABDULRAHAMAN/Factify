import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://todsxhueevxnlbzuyxai.supabase.co'
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHN4aHVlZXZ4bmxienV5eGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTYzOTYsImV4cCI6MjA2MjczMjM5Nn0.l1yAsV3uBmXQzNiU7aQDKATeHErXerVnssrADw9_yK4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
