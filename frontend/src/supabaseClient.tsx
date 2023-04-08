
import { createClient } from "@supabase/supabase-js";
import { Database } from "../schema";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string);

export const user = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};
// export const {data: {username}} = await supabase.from('profiles').select('username').match({id: user.id })
// console.log('USERNAMe:', user.id);
