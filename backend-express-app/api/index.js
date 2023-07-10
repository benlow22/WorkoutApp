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
