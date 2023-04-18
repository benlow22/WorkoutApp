import { useParams } from "react-router-dom";
import { workoutRoutine, IWorkout } from "../data";
import { getWorkoutDay } from "../api/api";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const EditWorkoutPage = () => {
	let { workoutName } = useParams();
	console.log("workout Name from params: ", workoutName);
	const [data, setData] = useState<IWorkout | null>(null);
	// data consist of name and id

	useEffect(() => {
		// get's workoutDay from db and di
		async function getWorkoutDay(workoutName: string = "") {
			const { data, error } = await supabase
				.from("workouts")
				.select("name, url")
				.eq("url", workoutName);
			if (error) {
				console.error(error);
				return;
			}
			console.log("DATA id: ", data);
			setData(data[0]);
		}
		getWorkoutDay(workoutName);
	}, [workoutName]);

	useEffect(() => {
		console.log("data update 1");
	}, [data]);

	// useEffect(() => {
	// 	// get's workoutDay from db and di
	// 	async function getWorkout() {
	// 		const [name, id] = await getWorkoutDay(workoutName);
	// 		setData(name);
	// 		console.log("workout id: ", id);
	// 	}
	// 	getWorkout();
	// }, [workoutName]);

	if (!data) {
		// loading page, while waiting for data to be fetched
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			{data && <h1>{data.name}</h1>}
			{data &&
				data.exercises?.map((exercise, index) => (
					<h3 key={index}>Exercise: {exercise.name}</h3>
				))}
		</div>
	);
};
