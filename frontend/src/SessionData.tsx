import { supabase } from "./supabaseClient";

export const userInfo = async () => {
	const { data, error } = await supabase.auth.refreshSession();
	const { session, user } = data;
	if (user) {
		const { data: username } = await supabase
			.from("profiles")
			.select("username")
			.eq("id", user.id);
		console.log("usernameee:", username);
		return { username: username };
	}
};
