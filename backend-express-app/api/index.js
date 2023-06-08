const { createClient } = require("@supabase/supabase-js");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const env = require("dotenv");
const cors = require("cors");
const { v4 } = require("uuid");

env.config();

var corsOptions = {
	origin: true,
	optionsSuccessStatus: 200,
	credentials: true,
};

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

const app = express();
// app.use(cors({ origin: /test\-workout\-app\-vercel\.vercel\.app.*/ }));

const port = process.env.PORT || 8000;
//const workoutsRouter = require("./routes/workouts");

const authorizedRouter = express.Router();
const publicRouter = express.Router(); // create a router for all public routes

//MIDDLEWARES
const setTokens = async function (req, res, next) {
	const refreshToken = req.cookies.my_refresh_token; // do not just use req.cookies, turn into bearer tokens
	const accessToken = req.cookies.my_access_token;
	if (refreshToken && accessToken) {
		await supabase.auth.setSession({
			refresh_token: refreshToken,
			access_token: accessToken,
		});
		console.log("ref", refreshToken);
		console.log("acc", accessToken);
	} else {
		// make sure you handle this case!
		throw new Error("User is not authenticated.");
	}
	next();
};

const setResHeaders = (req, res, next) => {
	// this is set for local host, vercel.json should handle this when deployed
	res.header(
		"Access-Control-Allow-Origin",
		"https://test-workout-app-vercel.vercel.app"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
};

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
// app.use(cors());
app.use(cookieParser());
// app.use(setResHeaders);
app.use((req, res, next) => {
	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			"PUT, POST, PATCH, DELETE, GET"
		);
		res.header(
			"Access-Control-Allow-Origin",
			"https://test-workout-app-vercel.vercel.app"
		);
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		return res.status(200).json({});
	}
	next();
});
app.use(cors(corsOptions));

app.use("/api/authorized", authorizedRouter);
app.use("/api/public", publicRouter);

// app.use("/workouts", workoutsRouter);

// ROUTES

// publicRouter.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

publicRouter.get("/cats", (req, res) => {
	res.send(res.header);
});

publicRouter.get("/", (req, res) => {
	const path = `/api/item/${v4()}`;
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

publicRouter.get("/api/item/:slug", (req, res) => {
	const { slug } = req.params;
	res.end(`Item: ${slug}`);
});

publicRouter.get("/workouts", async (req, res) => {
	const refreshToken = req.cookies.my_refresh_token; // do not just use req.cookies, turn into bearer tokens
	const accessToken = req.cookies.my_access_token;
	if (refreshToken && accessToken) {
		await supabase.auth.setSession(accessToken);
		console.log("ref", refreshToken);
		console.log("acc", accessToken);
	} else {
		// make sure you handle this case!
		throw new Error("User is not authenticated.");
	}
	const { data, error } = await supabase
		.from("workouts")
		.select("name,url")
		.auth(accessToken);
	if (error) {
		console.error(error);
		return;
	}
	res.send(data);
});

authorizedRouter.get("/workouts/:workoutUrl", setTokens, async (req, res) => {
	const workoutUrl = req.params.workoutUrl;
	const { data, error } = await supabase
		.from("workouts")
		.select("name, url, id, last_performed, exercises(name, id)")
		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	console.log("dad", data); // show in terminal
	res.send(data);
});

// app.get("/workouts", async (req, res) => {
// 	const response = await fetch(
// 		"https://pogoapi.net/api/v1/raid_exclusive_pokemon.json"
// 	);
// 	const body = await response.text();
// 	res.send(body);
// });

// does not need to be authenticated.
publicRouter.get("/exercises", async (req, res) => {
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

module.exports = app;
