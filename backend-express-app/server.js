import { createClient } from "@supabase/supabase-js";

import express from "express";
import env from "dotenv";
import cors from "cors";

env.config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

const app = express();
const port = process.env.PORT || 8000;
// const workoutsModule = require("./routes/workouts");
// const workoutsRouter = workoutsModule.router;
app.use(cors());

app.get("/cats", (req, res) => {
	res.send({ name: "catchy" });
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
	const response = { name: "catchy" };
	console.log(exercises);
	res.send(exercises);
});

// app.use("/workouts", workoutsRouter);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`App listening at http://localhost:${port}`);
});
