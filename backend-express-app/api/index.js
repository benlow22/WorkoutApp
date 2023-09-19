const { createClient } = require("@supabase/supabase-js");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const env = require("dotenv");
const cors = require("cors");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

env.config();

var corsOptions = {
	origin: true,
	// "https://www.buddy-system.me",
	optionsSuccessStatus: 200,
	credentials: true,
};
const app = express();

const port = process.env.PORT || 8000;

// THIRD-PARTY middlewares = add functionality
// app.use(logger("dev"));
app.use(express.json()); // turns into object
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
// app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(bodyParser.json());

// Pre-Flight Request
// should work
// IMPORTANT = allow origin, headers, credentials, for headers or cookies
app.use((req, res, next) => {
	if (req.method === "OPTIONS") {
		res.setHeader(
			"Access-Control-Allow-Methods",
			"PUT, POST, PATCH, DELETE, GET"
		);
		res.setHeader(
			"Access-Control-Allow-Origin",
			"https://www.buddy-system.me"
		);
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token, Refresh-Token, User-Id"
		);
		// res.status(200).end();
		// return;

	}
	next();
});

// app.use(authMiddleware);

//Routes
app.use("/api", require("../routes/index"));

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`App listening at http://localhost:${port}`);
});

/// AAAHH so to pass cookies to the server, you need to include {credentials= "include"} in the

module.exports = app;
