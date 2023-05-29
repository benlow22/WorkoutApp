const API_ENDPOINT = "http://localhost:3000";
import { IExercise } from "../data";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const getWorkouts = async () => {
	// get all of user's workouts
	const { data, error } = await supabase.from("workouts").select("name,url");
	if (error) {
		console.error(error);
		return;
	}
	return data;
};

export const addExerciseToWorkout = async (
	workoutId: any,
	exercise: any,
	userId: string
) => {
	const { data, error } = await supabase
		.from("workouts_exercises")
		.insert([
			{
				workout_id: workoutId,
				exercise_id: exercise.id,
				created_by: userId,
			},
		])
		.select("*");
	console.log("errrror", error);
	console.log("updated workout exercises", data);
};

// getWorkoutDay = takes params sent in and returns SINGLE matching workout
export const getWorkoutDay = async (workoutName: string = "") => {
	const { data, error } = await supabase
		.from("workouts")
		.select("name, url, id")
		.eq("url", workoutName);
	console.log("API CALL = get workout:", data);
	if (error) {
		console.error(error);
		return;
	} else {
		return data[0];
	}
};

// takes workoutID
export const getFullWorkout = async (workoutId: string) => {
	const { data, error } = await supabase
		.from("workouts")
		.select("name, url, id, last_performed, exercises(name, id)")
		.eq("id", workoutId);
	console.log("API CALL = get workout data: ", data);
	if (error) {
		console.error("API error fetching workout data", error);
		return;
	} else {
		if (data[0]) {
			const workout = data[0]; // get workout data from API call
			const exercises: IExercise[] = workout.exercises as IExercise[]; // reaffirm Typing
			console.log("exercises", exercises);
			const reformattedData = {
				id: workout.id,
				name: workout.name,
				url: workout.url,
				last_performed: workout.last_performed,
				exercises: exercises,
			};
			return reformattedData;
		}
	}
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
		.select("name, url")
		.eq("url", url);
	// if workout already exist, alert user
	if (error) {
		console.log("there was an error with finding if workout exists", error);
		throw "error finding workout in DB, two may have been found";
	}
	console.log("empty[] if url is free to take:", existingWorkoutUrl);
	if (existingWorkoutUrl.length > 0) {
		alert(
			`Sorry, name: "${workoutName}" is already in use or too similar to another workout you have: "${existingWorkoutUrl[0].name}" Please select a new name`
		);
		throw "Workout name already in DB";
	} else {
		console.log("workout was not found in DB, time to add it in");
		const newWorkoutObj = {
			// check if i need uuid or supabase will autofill
			id: uuidv4(),
			name: workoutName,
			url: url,
			user_id: user_id,
		};
		console.log("uuid", newWorkoutObj.id);
		// insert and return
		const { data, error } = await supabase
			.from("workouts")
			.insert([newWorkoutObj])
			.select();
		if (error) {
			console.log("error", error);
			throw error;
		} else {
			console.log("Successfully added to DB, go CHECK", data[0]);
			return data[0];
		}
	}
};

/* UpdateNewWorkout = find row with same url, update name and url   */

export const updateWorkoutName = async (
	oldWorkoutUrl: string,
	newWorkoutUrl: string,
	newWorkoutName: string
) => {
	// Update data row and return
	const { data, error } = await supabase
		.from("workouts")
		.update({ name: newWorkoutName, url: newWorkoutUrl })
		.eq("url", oldWorkoutUrl)
		.select();
	console.log("API CALL = update workout name, updated workout = ", data);
	if (error) {
		console.log("there was an error with updating workout name", error);
		throw "error updating workoutName";
	}
	return data[0]; // return single ROW of updated Data
};
