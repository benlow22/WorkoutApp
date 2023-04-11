const API_ENDPOINT = "http://localhost:3000";

export const getWorkouts = async () => {
	try {
		const response = await fetch(`${API_ENDPOINT}/`);
		const workouts = response.json();
		return workouts;
	} catch (error) {
		console.log("errrrror", error);
		return { error };
	}
};

export const getWorkoutDay = async (workoutName: string = "") => {
	const requestUrl = `${API_ENDPOINT}/workouts/${workoutName}`;
	const response = await fetch(requestUrl, {
		method: "GET",
	});
	const json = await response.json();
	return json;
};
