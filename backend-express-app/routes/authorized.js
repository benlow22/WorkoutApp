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
		console.log(data);
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

module.exports = router;
