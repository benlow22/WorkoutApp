import { supabase } from "./supabaseClient";

export const userInfo = async () => {
	const { data, error } = await supabase.auth.refreshSession();
	const { session, user } = data;
	const { data: username } = await supabase
		.from("profiles")
		.select("username")
		.eq("id", user.id);
        console.log('usernameee:', username);
	return { username: username };
};
