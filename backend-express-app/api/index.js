const { createClient } = require("@supabase/supabase-js");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const env = require("dotenv");
const cors = require("cors");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
// const authorizedRouter = require("../routes/authorized");

//git pull origin a-exp -r 		pull updated branch, to rebase onto

env.config();

var corsOptions = {
	origin: true,
	optionsSuccessStatus: 200,
	credentials: true,
};

// const supabase = createClient(
// 	process.env.SUPABASE_URL,
// 	process.env.SUPABASE_ANON_KEY,
// 	{
// 		auth: {
// 			autoRefreshToken: true,
// 			persistSession: false,
// 			detectSessionInUrl: true,
// 		},
// 	}
// );

const app = express();
// app.use(cors({ origin: /test\-workout\-app\-vercel\.vercel\.app.*/ }));

const port = process.env.PORT || 8000;
//const workoutsRouter = require("./routes/workouts");

const authorizedRouter = express.Router();
const publicRouter = express.Router(); // create a router for all public routes

// THIRD-PARTY middlewares = add functionality
// app.use(logger("dev"));
app.use(express.json()); // turns into object
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions));

// Pre-Flight Request
// IMPORTANT = allow origin, headers, credentials, for headers or cookies
app.use((req, res, next) => {
	if (req.method === "OPTIONS") {
		res.header(
			"Access-Control-Allow-Methods",
			"PUT, POST, PATCH, DELETE, GET"
		);
		res.header("Access-Control-Allow-Origin", proccess.env.ORIGIN);
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token. Refresh-Token, User-Id"
		);
		return res.status(200).json({});
	}
	next();
});

// app.use(authMiddleware);

//Routes
app.use("/api", require("../routes/index"));

// app.use("/api/authorized", authorizedRouter);
app.use("/api/public", publicRouter);

// ROUTE Middleware = specific routes, like authorization

// EVENTUALLY SEPERATE TO OWN FILE and import in
// public Routes

//TEST ROUTES (can delete)
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

// AUTHORIZED ROUTE
// //authorized route, will always take tokens and create/get a session

// const setAuthorizedSessionMiddleware = async (req, res, next) => {
// 	/* use req.cookies['cookie-name'] for COOKIES, but not vercel
// 		const accessToken = req.cookies["my_access_token"];
// 		const refreshToken = req.cookies["my_refresh_token"];
// 		const user_id = req.cookies["my_user_is"]; */

// 	const refreshToken = req.headers["refresh-token"]; // do not just use req.cookies, turn into bearer tokens
// 	const accessToken = req.headers["access-token"];

// 	if (refreshToken && accessToken) {
// 		const { data, error } = await supabase.auth.setSession({
// 			refresh_token: refreshToken,
// 			access_token: accessToken,
// 		});
// 		if (error) {
// 			console.error("error fetching session from supabase: ", error);
// 		}
// 		if (data) {
// 			console.log("session Set");
// 		}
// 	} else {
// 		// make sure you handle this case!
// 		console.error("User is not authenticated.");
// 		const error = new Error(
// 			"User is not authenticated! Access and/or refresh token needed"
// 		);
// 		console.log(error);
// 		return res.status(401).send(error.message);
// 	}
// 	next();
// };

// authorizedRouter.use(setAuthorizedSessionMiddleware);

// // 	/api/authorized/workouts = All user's workouts
// authorizedRouter.get("/workouts", async (req, res) => {
// 	console.log("Get All Workouts API");
// 	// const userId = req.headers["user-id"];

// 	const { data, error } = await supabase.from("workouts").select("*");
// 	if (data) {
// 		console.log(data);
// 		// if there is data, send it back = 200 status
// 		res.send(data);
// 	} else {
// 		// if there is no data, send a 404 status with the err
// 		res.status(404).send(error);
// 	}
// });

authorizedRouter.get("/workouts/:workoutUrl", async (req, res) => {
	const workoutUrl = req.params.workoutUrl;
	const { data, error } = await supabase
		.from("workouts")
		.select("*, exercises(*)")
		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	console.log(":workoutUrl DATA", data); // show in terminal
	if (data) {
		// if there is data, send it back = 200 status
		console.log(data);
		res.send(data);
	} else {
		res.status(404).send(error);
	}
});

// delete workout using id
authorizedRouter.delete("/workouts/:workoutId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const { data, error } = await supabase
		.from("workouts")
		.delete()
		.eq("id", workoutId);
	console.log("deleted workout: ", data); // show in terminal
	if (error) {
		// if there is data, send it back = 200 status
		res.status(404).send(error);
	} else {
		res.status(204);
	}
});

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
