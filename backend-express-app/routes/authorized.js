// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
const {
	setAuthorizedSessionMiddleware,
} = require("../middleWares.js/middleWares");

// create authorized router = /api/authorized/
var router = require("express").Router();

// add verifying middle ware
router.use(setAuthorizedSessionMiddleware);

//ROUTES
// GET workouts = get all users workouts
router.get("/workouts", async (req, res) => {
	console.log("Get All Workouts API");
	// const userId = req.headers["user-id"];
	const { data, error } = await req.supabase.from("workouts").select("*");
	if (data) {
		// if there is data, send it back = 200 status
		res.send(data);
	} else {
		// if there is no data, send a 404 status with the err
		res.status(404).send(error);
	}
});

// GET /workouts/:workoutUrl = get user's workout data from url
router.get("/workouts/:workoutUrl", async (req, res) => {
	const workoutUrl = req.params.workoutUrl;
	const { data, error } = await req.supabase
		.from("workouts")
		.select("*, exercises(*)")
		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	// if there is data, send it back = 200 status
	if (data) {
		res.send(data);
	} else {
		res.status(404).send(error);
	}
});

// delete workout using id
router.delete("/workouts/:workoutId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const { data, error } = await req.supabase
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

// EXERCISES
router.get("/exercises", async (req, res) => {
	const { data, error } = await req.supabase.from("exercises").select("*");
	console.log("get exercises. ", data); // show in terminal
	if (data) {
		res.send(data);
	} else {
		res.status(404).send(error);
	}
});

// /api/authorized/:exerciseId = get users exercise id including sets and reps
router.get("/:exerciseId", async (req, res) => {
	const exerciseId = req.params.exerciseId;
	const { data, error } = await req.supabase
		.from("workouts")
		.delete()
		.eq("id");
	console.log("deleted workout: ", data); // show in terminal
	if (error) {
		// if there is data, send it back = 200 status
		res.status(404).send(error);
	} else {
		res.status(204);
	}
});

// POST /api/authorized/:workoutId/:exerciseId
router.post("/:workoutId/:exerciseId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const exerciseId = req.params.exerciseId;
	const userId = req.headers["user-id"];
	console.log(userId, workoutId, exerciseId);
	const { data, error } = await supabase
		.from("workouts_exercises")
		.insert([
			{
				workout_id: workoutId,
				exercise_id: exerciseId,
				created_by: userId,
			},
		])
		.select("*");
	console.log("errrror", error);
	console.log("updated workout exercises", data);
});
module.exports = router;

router.post("/:exerciseId", async (req, res) => {
	const exerciseId = req.params.exerciseId;
	const userId = req.headers["user-id"];
	console.log("asdf", res.json({ requestBody: req.body })); // <==== req.body will be a parsed JSON object
	// const { data, error } = await supabase
	// 	.from("exercise")
	// 	.insert([

	// 			{description: },
	// 			name: string;
	// 			equipment: number[];
	// 			id: string;
	// 			created_by: string;
	// 			default_sets: string[][];
	// 			fitnessElement: string[];
	// 			links: string[];
	// 			muscleGroup: string[];
	// 			muscles: string[];
	// 			notes: string;
	// 			public: boolean;
	// 			time: boolean;
	// 			defaultWeightUnits: string;
	// 			defaultTimeUnits: string;
	// 	])
	// 	.select("*");
	console.log("errrror", error);
	console.log("updated workout exercises", data);
});
