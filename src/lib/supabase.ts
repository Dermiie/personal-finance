import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fploghhsrmsdmhvjqodd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbG9naGhzcm1zZG1odmpxb2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMjIwNTAsImV4cCI6MjA5MDY5ODA1MH0.uDEciLVLR9bCvOqJZ_KjG-eRqfP_r_w9qqlfmA2UKnU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
