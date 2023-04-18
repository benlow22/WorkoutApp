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
	const { data, error } = await supabase.from("workouts").select("name,id").eq("url", workoutName);
	if (error) {
		console.error(error);
		return;
	}
	return data;
};
