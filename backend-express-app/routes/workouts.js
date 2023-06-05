const express = require("express");
// import { v4 as uuidv4 } from ("uuid");
const router = express.Router();

router.get("/", async (req, res) => {
	const response = await fetch(
		"https://pogoapi.net/api/v1/raid_exclusive_pokemon.json"
	);
	const body = await response.text();
	res.send(body);
});

router.get("/:workoutUrl", async (req, res) => {
	const response = await fetch(
		"https://pogoapi.net/api/v1/pokemon_names.json"
	);
	const json = response.text();
	console.log("jaas", json);
	res.send(response);
	// const workoutUrl = req.params;
	// const { data: workoutData, error } = await supabase // return should be of imported type
	// 	.from("workouts")
	// 	.select("name, url, id, last_performed, exercises(name, id)")
	// 	.eq("url", workoutUrl)
	// 	.single(); // get single row as object instead of arr
	// console.log("API CALL = get workout data: ", workoutData);
	// if (workoutData) {
	// 	const { exercises, id, name, url, last_performed } = workoutData; // extract
	// 	return { exercises, workout: { id, name, url, last_performed } };
	// } else {
	// 	console.error(`No workout found with url ${workoutUrl}`, error);
	// }
});

// export const getFullWorkoutAPI = async (
// 	workoutUrl: string
// ): Promise<
// 	| {
// 			exercises: IExercise[];
// 			workout: IWorkout;
// 	  }
// 	| undefined
// > => {
// 	// const response = await fetch(`${API_ENDPOINT}/`);
// 	// console.log("restaurants from connected API", response);
// 	const { data: workoutData, error }: IGetFullWorkoutResponse = await supabase // return should be of imported type
// 		.from("workouts")
// 		.select("name, url, id, last_performed, exercises(name, id)")
// 		.eq("url", workoutUrl)
// 		.single(); // get single row as object instead of arr
// 	console.log("API CALL = get workout data: ", workoutData);
// 	if (workoutData) {
// 		const { exercises, id, name, url, last_performed } = workoutData; // extract
// 		return { exercises, workout: { id, name, url, last_performed } };
// 	} else {
// 		console.error(`No workout found with url ${workoutUrl}`, error);
// 	}
// };

module.exports = router;
