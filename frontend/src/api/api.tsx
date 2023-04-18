const API_ENDPOINT = "http://localhost:3000";
import { supabase } from "../supabaseClient";
import { workouts } from "../data";

export const getWorkouts = async () => {
	// get all of user's workouts
	const { data, error } = await supabase.from("workouts").select("name,url");
	if (error) {
		console.error(error);
		return;
	}
	return data;
};

// getWorkoutDay = gets a workoutName, returns all exercises in Name.

export const getWorkoutDay = async (workoutName: string = "") => {
	const { data, error } = await supabase
		.from("workouts")
		.select("name,id")
		.eq("url", workoutName);
	if (error) {
		console.error(error);
		return;
	}
	return data;
};

/* postNewWorkout = checks if workout already exists by url ( since that is what will be searched and entered  backAndBi === back and bi), then adds to Workout table (including:  
	- making an uuid id 
	- name
	- url
	- userId)
*/
export const postNewWorkout = async (
	url: string = "",
	workoutName: string = "",
	user_id: string = ""
) => {
	// Check if workout already exists
	console.log("workout URL: ", url, "workout Name", workoutName);
	const { data: existingWorkoutUrl, error } = await supabase
		.from("workouts")
		.select("url")
		.eq("url", url);
	// if workout already exist, alert user
	console.log("empty[] if url is free to take:", existingWorkoutUrl);
	if (error) {
		console.log("there was an error with finding if workout exists", error);
		throw "error finding workout in DB, two may have been found"
	}
	if (existingWorkoutUrl.length > 0) {
		alert(
			"Sorry Workout Name is already in use or too similar to another Workout you have. Please select a new name"
		);
		throw "Workout name already in DB"
	} else {
		console.log("workout was not found in DB, time to add it in");
		const newWorkoutObj = {
			// check if i need uuid or supabase will autofill
			name: workoutName,
			url: url,
			user_id: user_id
		};
		// insert and return
		const { data, error } = await supabase
			.from("workouts")
			.insert([newWorkoutObj]).select();
		if (error) {
			console.log("error", error);
			throw error;
		} else {
			console.log('Successfully added to DB, go CHECK', data[0].url)
			return data[0].url;
		}
	}
};
