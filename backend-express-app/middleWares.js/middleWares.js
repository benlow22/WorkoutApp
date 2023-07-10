// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
// create client in authorized route
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: true,
			persistSession: false,
			detectSessionInUrl: true,
		},
	}
);

const setAuthorizedSessionMiddleware = async (req, res, next) => {
	/* use req.cookies['cookie-name'] for COOKIES, but not vercel
		const accessToken = req.cookies["my_access_token"];
		const refreshToken = req.cookies["my_refresh_token"];
		const user_id = req.cookies["my_user_is"]; */
	//attach client to req.
	req.supabase = supabase;
	const refreshToken = req.headers["refresh-token"]; // do not just use req.cookies, turn into bearer tokens
	const accessToken = req.headers["access-token"];

	if (refreshToken && accessToken) {
		const { data, error } = await supabase.auth.setSession({
			refresh_token: refreshToken,
			access_token: accessToken,
		});
		if (error) {
			console.error("error fetching session from supabase: ", error);
		}
		if (data) {
			console.log("session Set");
		}
	} else {
		// make sure you handle this case!
		console.error("User is not authenticated.");
		const error = new Error(
			"User is not authenticated! Access and/or refresh token needed"
		);
		console.log(error);
		return res.status(401).send(error.message);
	}
	next();
};

module.exports = { setAuthorizedSessionMiddleware };
