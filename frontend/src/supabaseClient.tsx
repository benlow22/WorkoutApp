import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



export const { data: { user } } = await supabase.auth.getUser();
// export const {data: {username}} = await supabase.from('profiles').select('username').match({id: user.id })
// console.log('USERNAMe:', user.id);