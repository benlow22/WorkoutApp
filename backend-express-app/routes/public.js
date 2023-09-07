// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
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

var router = require("express").Router();

// EXERCISES
router.get("/exercises", async (req, res) => {
	const { data, error } = await supabase.from("exercise").select("*");
	console.log("get exercises", data); // show in terminal
	if (data) {
		res.send(data);
	} else {
		res.status(404).send(error);
	}
});

router.get("/cats", (req, res) => {
	res.send(res.header);
});

router.get("/", (req, res) => {
	const path = `/api/item/${v4()}`;
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

router.get("/api/item/:slug", (req, res) => {
	const { slug } = req.params;
	res.end(`Item: ${slug}`);
});

router.get("/cards/:cardName", async (req, res) => {
	const cardName = req.params.cardName;

	const data = await fetch(`https://api.lorcana-api.com/strict/${cardName}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/html",
		},
	});
	if (data) {
		response = await data.json();
		const item = { cardName: cardName, ...response };
		res.send(item).status(204);
		console.log("updated workout exercises", data);
	}
});

// // /api/authorized/:exerciseId = get users exercise id including sets and reps
// router.get("/:exerciseId", async (req, res) => {
// 	const exerciseId = req.params.exerciseId;
// 	const { data, error } = await req.supabase
// 		.from("workouts")
// 		.delete()
// 		.eq("id");
// 	console.log("deleted workout: ", data); // show in terminal
// 	if (error) {
// 		// if there is data, send it back = 200 status
// 		res.status(404).send(error);
// 	} else {
// 		res.status(204);
// 	}
// });

// // POST /api/authorized/:workoutId/:exerciseId
// router.post("/:workoutId/:exerciseId", async (req, res) => {
// 	const workoutId = req.params.workoutId;
// 	const exerciseId = req.params.exerciseId;
// 	const userId = req.headers["user-id"];
// 	console.log(userId, workoutId, exerciseId);
// 	const { data, error } = await req.supabase
// 		.from("workouts_exercises")
// 		.insert([
// 			{
// 				workout_id: workoutId,
// 				exercise_id: exerciseId,
// 				created_by: userId,
// 			},
// 		])
// 		.select("*");
// 	console.log("errrror", error);
// 	console.log("updated workout exercises", data);
// });

module.exports = router;
