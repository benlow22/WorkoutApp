const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/api`;
import { IWorkoutWithExercises } from "../data";
import { IExercise, IWorkout } from "../data";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { IGetFullWorkoutResponse } from "./types";

// const refreshToken = document.cookie
// 	.split("; ")
// 	.find((row) => row.startsWith("my-refresh-token"))
// 	?.split("=")[1];
// const accessToken = document.cookie
// 	.split("; ")
// 	.find((row) => row.startsWith("my-access-token"))
// 	?.split("=")[1];

export const getWorkouts = async () => {
	// get all of user's workouts
	// const { data, error } = await supabase.from("workouts").select("name,url");
	// if (error) {
	// 	console.error(error);
	// 	return;
	// }
	const response = await fetch(`${API_ENDPOINT}/workouts`);
	const data = await response.json();

	return data;
};

//test supabase auth
export const getFullWorkoutThroughSupabaseWithAuth = async (
	workoutUrl: string
) => {
	const response = await fetch(
		`${API_ENDPOINT}/authorized/workouts/${workoutUrl}`,
		{
			credentials: "include",
		}
	);
	const data = await response.json();
	console.log('did it make it to the api"', data);
	return data;
};

//pokemonAPI
export const getAllUsersWorkoutsAPI = async () => {
	// get all of user's workouts
	// const { data, error } = await supabase.from("workouts").select("name,url");
	// if (error) {
	// 	console.error(error);
	// 	return;
	// }
	const response = await fetch(`${API_ENDPOINT}/public/workouts`, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// body: JSON.stringify(data), // body data type must match "Content-Type" header

		credentials: "include",
	});
	const data = await response.json(); // returns an array of workouts
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

// add error handling
export const getAllExercisesAPI = async () => {
	console.log("start to get all exercises");
	const response = await fetch(`${API_ENDPOINT}/public/exercises`, {
		credentials: "include",
		// headers: {
		// 	"Access-Control-Allow-Origin":
		// 		"https://test-workout-app-vercel.vercel.app",
		// 	"Access-Control-Allow-Credentials": "true",
		// },
	});
	console.log("response from api = ", response);
	const json = await response.json();
	console.log("json", json);

	return json;
};

// takes workoutId and get workout information + exercises, returns just exercises for now
export const getFullWorkoutAPIEXPRESS = async (workoutUrl: string) => {
	// const response = await fetch(`${API_ENDPOINT}/workouts/${workoutUrl}`);
	// const json = await response.json(); // gets it out of a promise
	// console.log("json", json);
	// console.log("ressssss", response);
	// return response;
};

export const getFullWorkoutAPI = async (
	workoutUrl: string
): Promise<
	| {
			exercises: IExercise[];
			workout: IWorkout;
	  }
	| undefined
> => {
	// const response = await fetch(`${API_ENDPOINT}/`);
	// console.log("restaurants from connected API", response);
	const { data: workoutData, error }: IGetFullWorkoutResponse = await supabase // return should be of imported type
		.from("workouts")
		.select("name, url, id, last_performed, exercises(name, id)")
		.eq("url", workoutUrl)
		.single(); // get single row as object instead of arr
	console.log("API CALL = get workout data: ", workoutData);
	if (workoutData) {
		const { exercises, id, name, url, last_performed } = workoutData; // extract
		return { exercises, workout: { id, name, url, last_performed } };
	} else {
		console.error(`No workout found with url ${workoutUrl}`, error);
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
			`Sorry, name: "${workoutName}" is already in use or too similar to another workout you have: "${existingWorkoutUrl[0].name}". Please select a new name`
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
	// check if url is taken
	const { data: existingWorkoutUrl, error } = await supabase
		.from("workouts")
		.select("name, url")
		.eq("url", newWorkoutUrl);
	// if workout already exist, alert user
	if (error) {
		console.error(
			"there was an error with finding if workout exists",
			error
		);
		throw "error finding workout in DB, two may have been found";
	}
	console.log("empty[] if url is free to take:", existingWorkoutUrl);
	if (existingWorkoutUrl.length > 0) {
		alert(
			`Sorry, name: "${newWorkoutName}" is already in use or too similar to another workout you have: "${existingWorkoutUrl[0].name}". Please select a new name`
		);
		throw "Workout name already in DB";
	} else {
		console.log("workout was not found in DB, time to add it in");
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
		return data[0] as IWorkout; // return single ROW of updated Data
	}
};
