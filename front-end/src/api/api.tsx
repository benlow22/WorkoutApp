const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/api`;
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";
import {
	IExercise,
	IGetFullWorkoutResponse,
	INewExerciseInput,
	IWorkout,
	TError,
	TUsersExerciseData,
} from "./types";
import { ISession } from "../contexts/AuthProvider";
import { TExerciseTemplate } from "../components/exercises/AddExercise";

// Get Cookies from Browser = redundant
// const cookieValue_AccessToken = document.cookie
// 	.split("; ")
// 	.find((row) => row.startsWith("my_access_token="))
// 	?.split("=")[1];
// const cookieValue_RefreshToken = document.cookie
// 	.split("; ")
// 	.find((row) => row.startsWith("my_refresh_token="))
// 	?.split("=")[1];
// const cookieValue_UserId = document.cookie
// 	.split("; ")
// 	.find((row) => row.startsWith("my_user_id="))
// 	?.split("=")[1];

/* Good FETCH API calls - to express BE on seperate App
	// Example POST met	hod implementation:
	async function postData(url = "", data = {}) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	postData("https://example.com/answer", { answer: 42 }).then((data) => {
	console.log(data); // JSON data parsed by `data.json()` call
	});
*/

// fetcher = sets headers, method, and credentials so they do not have to be set in every call.

const fetcher = async <TData,>(
	url: string,
	session: ISession,
	method: string | null = null,
	customHeaders: any | null = null,
	body: any | null = null
): Promise<[error: TError, response: Response]> => {
	const myMethod = method ? method : "GET";
	const myBody = body ? JSON.stringify(body) : null;
	const extraHeaders = customHeaders ? customHeaders : null;
	const myHeaders = {
		// headers for VERCEL deployment = use SESSION data, which is passed in, faster than extracting from cookies
		"Access-Token": `${session.access_token}`,
		"Refresh-Token": `${session.refresh_token}`,
		"User-Id": `${session.user.id}`,
		...extraHeaders,
	};
	const myOptions = {
		method: myMethod,
		headers: myHeaders,
		body: myBody,
	};
	const response = await fetch(`${API_ENDPOINT}${url}`, {
		...myOptions,
		credentials: "include",
	});
	let error: TError = null;
	if (!response.ok) {
		console.log("response with errrror, ", response);
		error = await response.json();
	}
	return [error, response];
};

// WORKOUTS
export const getAllUsersWorkoutsAPI = async (
	session: ISession
): Promise<{ data: IWorkout[] | null; error: TError }> => {
	let [error, response] = await fetcher(`/authorized/workouts`, session);
	// if success
	let data: IWorkout[] | null = null;
	if (response.ok) {
		data = await response.json();
	} else {
		error = new Error("Getting workouts from Supabase", {
			cause: error,
		});
	}
	return { data, error };
};

// GET (workoutURL) => workout data, all users custom sets and data for each exercise (TUsersExerciseData)
export const getWorkoutAndExercisesAPI = async (
	workoutUrl: string,
	session: ISession
): Promise<{
	data: { workout: IWorkout; exercises: TUsersExerciseData[] } | null;
	error: TError;
}> => {
	let [error, response] = await fetcher(
		`/authorized/workouts/${workoutUrl}`,
		session
	);
	let data: { workout: IWorkout; exercises: TUsersExerciseData[] } | null =
		null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		console.log("exercise DAAATE", respJSON);
		const { exercises, id, name, url, last_performed } = respJSON;
		data = {
			workout: { id, name, url, last_performed },
			exercises,
		};
	} else {
		error = new Error(`Getting ${workoutUrl}'s exercises from Supabase`, {
			cause: error,
		});
	}
	return { data, error };
};
// export const getWorkoutAndExercisesAPI = async (
// 	workoutUrl: string,
// 	session: ISession
// ): Promise<{
// 	data: { workout: IWorkout; exercises: IExercise[] } | null;
// 	error: TError;
// }> => {
// 	let [error, response] = await fetcher(
// 		`/authorized/workouts/${workoutUrl}`,
// 		session
// 	);
// 	let data: { workout: IWorkout; exercises: IExercise[] } | null = null;
// 	// if success
// 	if (response.ok) {
// 		let respJSON = await response.json();
// 		console.log("exercise DAAATE", respJSON);
// 		const { exercises, id, name, url, last_performed } = respJSON;
// 		data = { workout: { id, name, url, last_performed }, exercises };
// 	} else {
// 		error = new Error(`Getting ${workoutUrl}'s exercises from Supabase`, {
// 			cause: error,
// 		});
// 	}
// 	return { data, error };
// };

// API TEMPLATE
/*
export const _name_API = async (
	_args_
	session: ISession,
	_METHOD?_
): Promise<{
	data: EXPECTED_DATA_TYPE | null;
	error: TError;
}> => {
	let [error, response] = await fetcher(
		`/_authorized or public_/_URL}`,
		session
	);
	let data: EXPECTED_DATA_TYPE | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		const { exercises, id, name, url, last_performed } = respJSON;
		data = { workout: { id, name, url, last_performed }, exercises };
	} else {
		error = new Error(`Getting ${workoutUrl}'s exercises from Supabase`, {
			cause: error,
		});
	}
	return { data, error };
};





*/

// GET /api/authorized/exercises = get all users and public Exercises
export const usersAndPublicExercisesAPI = async (
	session: ISession
): Promise<{
	data: IExercise[] | null;
	error: TError;
}> => {
	let [error, response] = await fetcher(`/authorized/exercises`, session);
	let data: IExercise[] | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		data = respJSON;
	} else {
		error = new Error(`Getting all exercises from Supabase`, {
			cause: error,
		});
	}
	return { data, error };
};

// delete workout

export const deleteWorkoutAPI = async (
	workoutId: string,
	session: ISession
): Promise<{
	data: any;
	error: TError;
}> => {
	let [error, response] = await fetcher(
		`/authorized/workouts/${workoutId}`,
		session,
		"DELETE"
	);
	if (!response.ok) {
		error = new Error(`Did not delete workout`, {
			cause: error,
		});
	}
	return { data: null, error };
};

// OG delete api
// export const deleteWorkoutAPI = async (
// 	session: ISession,
// 	workout: IWorkout
// ) => {
// 	try {
// 		const response = await fetch(
// 			`${API_ENDPOINT}/authorized/workouts/${workout.id}`,
// 			{
// 				headers: {
// 					"Access-Token": `${session.access_token}`,
// 					"Refresh-Token": `${session.refresh_token}`,
// 					"User-Id": `${session.user.id}`,
// 				},
// 				credentials: "include",
// 			}
// 		);

// 		if (response.ok) {
// 			const jsonResponse = await response.json();
// 			console.log("tokens???", jsonResponse);
// 			return jsonResponse;
// 		}
// 		throw new Error("Request failed!");
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const addExerciseToWorkout = async (
// 	workoutId: any,
// 	exercise: any,
// 	userId: string
// ) => {
// 	const { data, error } = await supabase
// 		.from("workouts_exercises")
// 		.insert([
// 			{
// 				workout_id: workoutId,
// 				exercise_id: exercise.id,
// 				created_by: userId,
// 			},
// 		])
// 		.select("*");
// 	console.log("errrror", error);
// 	console.log("updated workout exercises", data);
// };

export const addExerciseToWorkoutAPI = async (
	workoutId: string,
	exerciseId: string,
	session: ISession
): Promise<{
	data: IExercise | null;
	error: TError;
}> => {
	let [error, response] = await fetcher(
		`/authorized/workout/${workoutId}/${exerciseId}`,
		session,
		"POST"
	);
	let data: IExercise | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		data = respJSON;
	} else {
		error = new Error(`Adding exercise to workout from Supabase`, {
			cause: error,
		});
	}
	return { data, error };
};

// GET users, sets and reps for single exercise
export const getUsersExerciseDataAPI = async (
	exerciseId: string,
	session: ISession
): Promise<{
	data: IExercise | null;
	error: TError;
}> => {
	let [error, response] = await fetcher(
		`/authorized/${exerciseId}}`,
		session
	);
	let data: IExercise | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		data = respJSON;
	} else {
		error = new Error(`Adding exercise to workout from Supabase`, {
			cause: error,
		});
	}
	return { data, error };
};

export const postNewExerciseAPI = async (
	session: ISession,
	newExerciseData: INewExerciseInput,
	exerciseId: string
): Promise<{ data: any; error: TError }> => {
	let [error, response] = await fetcher(
		`/authorized/exercises/${exerciseId}`,
		session,
		"POST",
		{ "Content-Type": "application/json" },
		newExerciseData
	);
	let data: TExerciseTemplate | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		data = respJSON;
	} else {
		error = new Error(`Adding exercise to DB`, {
			cause: error,
		});
	}
	return { data, error };
};
export const upsertUsersExerciseDateAPI = async (
	session: ISession,
	usersExerciseData: TUsersExerciseData,
	exerciseId: string
): Promise<{ data: any; error: TError }> => {
	let [error, response] = await fetcher(
		`/authorized/exercises/${exerciseId}`,
		session,
		"POST",
		{ "Content-Type": "application/json" },
		usersExerciseData
	);
	let data: TExerciseTemplate | null = null;
	// if success
	if (response.ok) {
		let respJSON = await response.json();
		// alter data if need be
		data = respJSON;
	} else {
		error = new Error(`Adding exercise to DB`, {
			cause: error,
		});
	}
	return { data, error };
};

// getWorkoutDay = takes params sent in and returns SINGLE matching workout
// export const getWorkoutDay = async (workoutName: string = "") => {
// 	const { data, error } = await supabase
// 		.from("workouts")
// 		.select("name, url, id")
// 		.eq("url", workoutName);
// 	console.log("API CALL = get workout:", data);
// 	if (error) {
// 		console.error(error);
// 		return;
// 	} else {
// 		return data[0];
// 	}
// };

// add error handling
export const getAllExercisesAPI = async (session: ISession) => {
	// including private (not-public approved)
	console.log("start to get all exercises");
	const response = await fetch(`${API_ENDPOINT}/public/exercises`, {
		credentials: "include",
		headers: {
			"Access-Token": `${session.access_token}`,
			"Refresh-Token": `${session.refresh_token}`,
			"User-Id": `${session.user.id}`,
		},
	});
	console.log("response from api = ", response);
	const json = await response.json();
	console.log("json", json);

	return json;
};

// takes workoutId and get workout information + exercises, returns just exercises for now
// export const getFullWorkoutAPIEXPRESS = async (workoutUrl: string) => {
// const response = await fetch(`${API_ENDPOINT}/workouts/${workoutUrl}`);
// const json = await response.json(); // gets it out of a promise
// console.log("json", json);
// console.log("ressssss", response);
// return response;
// };

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
			created_by: user_id,
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
