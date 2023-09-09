// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
const {
	setAuthorizedSessionMiddleware,
} = require("../middleWares.js/middleWares");

// create authorized router = /api/authorized/
var router = require("express").Router();

// add verifying middle ware
router.use(setAuthorizedSessionMiddleware);
router.use("/amiiboBuddy", require("./amiiboBuddy/amiiboBuddy")); // api/products/

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
		.select(
			"*, exercises: users_exercise(sets, time, weightUnits: weight_units, time_units, useTime, notes, personal_links, ...exercise!users_exercise_exercise_id_fkey(name, id, description, defaultLinks: links))"
		)
		// can add extra info later? to tooltip

		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	// .order('date_completed', { ascending: false }) NEED TO ADD !!!

	// if there is data, send it back = 200 status
	if (data) {
		res.send(data);
		// console.log("exerciseDATA", data);
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
	console.log("deleted workout: asdf", data); // show in terminal
	if (error) {
		// if there is data, send it back = 200 status
		res.status(404).send(error);
	} else {
		res.status(204);
	}
});

// EXERCISES
router.get("/exercises", async (req, res) => {
	const { data, error } = await req.supabase.from("exercise").select("*");
	// console.log("get exercises. ", data); // show in terminal
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
		.from("exercise")
		.select(
			"name, id, defaultSets: default_sets, defaultWeightUnits: default_weight_units, defaultTime: default_time, defaultTimeUnits: default_time_units,  usersExercise: users_exercise!users_exercise_exercise_id_fkey( createdAt: created_at, userId: user_id, sets, notes, weightUnits: weight_units, timeUnits: time_units, usersExerciseId: users_exercise_id)"
		)
		.eq("id", exerciseId)
		.single();
	console.log("GET authorized/:exerciseId : ", data); // show in terminal
	if (data) {
		res.status(200).send(data);
	} else {
		res.status(404).send(error);
	}
});

router.post("/exercises/:exerciseId", async (req, res) => {
	const exerciseId = req.params.exerciseId;
	const userId = req.headers["user-id"];
	const { data, error } = await req.supabase
		.from("exercise")
		.insert([
			{
				description: req.body.description,
				name: req.body.name,
				id: exerciseId,
				equipment: req.body.equipment,
				created_by: userId,
				default_sets: req.body.defaultSets,
				fitness_element: req.body.fitnessElement,
				links: req.body.links,
				muscle_group: req.body.muscleGroup,
				muscles: req.body.muscles,
				notes: req.body.notes,
				public: req.body.public,
				default_weight_units: req.body.defaultWeightUnits,
				default_time_units: req.body.defaultTimeUnits,
				default_time: req.body.defaultTime,
			},
		])
		.select(
			"name, id, 	defaultSets: default_sets, defaultWeightUnits: default_weight_units, 		defaultTime: default_time, defaultTimeUnits: default_time_units"
		)
		.single();
	if (error) {
		console.log("errrror", error);
	} else {
		res.send(data).status(204);
		// console.log("updated workout exercises", data);
	}
});

router.post("/:exerciseId", async (req, res) => {
	const exerciseId = req.params.exerciseId;
	const userId = req.headers["user-id"];
	const { data, error } = await req.supabase
		.from("users_exercise")
		.upsert([
			{
				user_id: userId,
				exercise_id: exerciseId,
				sets: req.body.sets,
				personal_links: req.body.links,
				notes: req.body.notes,
				weight_units: req.body.weightUnits,
				time_units: req.body.timeUnits,
				time: req.body.time,
				users_exercise_id: req.body.usersExerciseId,
			},
		])
		.select(
			"createdAt: created_at, exerciseId: exercise_id, userId: user_id, sets, notes, weightUnits: weight_units, timeUnits: time_units, usersExerciseId: users_exercise_id"
		)
		.single();
	if (error) {
		console.log("error UPSERTING USER SETS", error);
	} else {
		res.send(data).status(204);
		console.log("updated workout exercises", data);
	}
});

// POST /api/authorized/:workoutId/:exerciseId
router.post("/workout/:workoutId/:exerciseId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const exerciseId = req.params.exerciseId;
	const userId = req.headers["user-id"];
	console.log(
		"All THE GOODS",
		userId,
		workoutId,
		exerciseId,
		req.body.usersExerciseId
	);
	const { data, error } = await req.supabase
		.from("workouts_exercises")
		.insert([
			{
				workout_id: workoutId,
				exercise_id: exerciseId,
				user_id: userId,
				users_exercise_id: req.body.usersExerciseId,
			},
		])
		.select("*");
	if (error) {
		console.log("errrror", error);
	} else {
		res.send(data).status(204);
		console.log("updated workout exercises", data);
	}
});
module.exports = router;
