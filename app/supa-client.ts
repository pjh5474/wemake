import { createClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or key");
}

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
