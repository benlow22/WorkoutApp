const express = require("express");

const cors = require("cors");

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

// app.use("/workouts", workoutsRouter);

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`App listening at http://localhost:${port}`);
});
