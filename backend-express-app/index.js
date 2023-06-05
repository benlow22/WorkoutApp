import { createClient } from "@supabase/supabase-js";
import cookieParser from "cookie-parser";
import express from "express";
import env from "dotenv";
import cors from "cors";

env.config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	}
);

const app = express();
const port = process.env.PORT || 8000;
// const workoutsModule = require("./routes/workouts");
// const workoutsRouter = workoutsModule.router;
app.use(cors());
app.use(cookieParser());
// const setTokens = function (req, res, next) {
// 	req.requestTime = Date.now();
// 	next();
// };
// app.use();
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/cats", (req, res) => {
	res.send({ name: "catchy" });
});

app.get("/workouts/:workoutUrl", async (req, res) => {
	// const refreshToken = req.cookies.my_refresh_token;
	// const accessToken = req.cookies.my_access_token;
	// console.log("refresh_token", refreshToken);
	// console.log("access_token", accessToken);

	if (req.cookies.my_refresh_token && req.cookies.my_access_token) {
		await supabase.auth.setSession({
			refresh_token: req.cookies.my_refresh_token,
			access_token: req.cookies.my_access_token,
		});
	} else {
		// make sure you handle this case!
		throw new Error("User is not authenticated.");
	}
	// returns user information
	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser();
	// console.log("USSSer", user);
	const workoutUrl = req.params.workoutUrl;
	const { data, error } = await supabase
		.from("workouts")
		.select("name, url, id, last_performed, exercises(name, id)")
		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	console.log("dad", data); // show in terminal
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Credentials", true);
	// return new Response(JSON.stringify(data), {
	// 	headers: { ...corsHeaders, "Content-Type": "application/json" },
	// });
	res.send(data);
});

app.get("/workouts", async (req, res) => {
	const response = await fetch(
		"https://pogoapi.net/api/v1/raid_exclusive_pokemon.json"
	);
	const body = await response.text();
	res.send(body);
});

app.get("/exercises", async (req, res) => {
	let { data: exercises, error } = await supabase
		.from("exercises")
		.select("name");
	console.log(exercises);
	res.send(exercises);
});

// app.use("/workouts", workoutsRouter);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`App listening at http://localhost:${port}`);
});

/// AAAHH so to pass cookies to the server, you need to include {credentials= "include"} in the
