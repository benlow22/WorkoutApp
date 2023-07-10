// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
var router = require("express").Router();

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
); // individual products routes
const setAuthorizedSessionMiddleware = async (req, res, next) => {
	/* use req.cookies['cookie-name'] for COOKIES, but not vercel
		const accessToken = req.cookies["my_access_token"];
		const refreshToken = req.cookies["my_refresh_token"];
		const user_id = req.cookies["my_user_is"]; */

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

router.use(setAuthorizedSessionMiddleware);

router.get("/workouts", async (req, res) => {
	console.log("Get All Workouts API");
	// const userId = req.headers["user-id"];

	const { data, error } = await supabase.from("workouts").select("*");
	if (data) {
		console.log(data);
		// if there is data, send it back = 200 status
		res.send(data);
	} else {
		// if there is no data, send a 404 status with the err
		res.status(404).send(error);
	}
});

module.exports = router;
