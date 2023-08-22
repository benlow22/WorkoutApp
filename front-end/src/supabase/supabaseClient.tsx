import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// export const { data: { user } } = await supabase.auth.getUser();
// export const {data: {username}} = await supabase.from('profiles').select('username').match({id: user.id })
// console.log('USERNAMe:', user.id);
