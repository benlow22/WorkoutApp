import { useHistory, useParams } from "react-router-dom";
import { workoutRoutine, IWorkout } from "../data";
import { getWorkoutDay } from "../api/api";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "antd";

export const EditWorkoutPage = () => {
	let { workoutName } = useParams();
	console.log("workout Name from params: ", workoutName);
	const [workout, setWorkout] = useState<IWorkout | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const history = useHistory();
	// data consist of name and id

	// useEffect(() => {
	// 	// get's workoutDay from db and di
	// 	async function getWorkoutDay(workoutName: string = "") {
	// 		const { data, error } = await supabase
	// 			.from("workouts")
	// 			.select("name, url")
	// 			.eq("url", workoutName);
	// 		if (error) {
	// 			console.error(error);
	// 			return;
	// 		}
	// 		console.log("DATA id: ", data);
	// 		setData(data[0]);
	// 	}
	// 	getWorkoutDay(workoutName);
	// }, [workoutName]);

	// gets workout day from url, return name and id, to use to get exercises
	useEffect(() => {
		async function getWorkout() {
			const data = await getWorkoutDay(workoutName);
			if (data) {
				setWorkout(data);
			}
		}

		getWorkout();
	}, [workoutName]);

	useEffect(() => {
		console.log("data update 1");
		setIsLoading(false);
	}, [workout]);

	// if (!workout) {
	// 	// loading page, while waiting for data to be fetched
	// 	return <h2>Loading...</h2>;
	// }

	const redirectToHomepage = () => {
		history.push("/");
	};

	if (!isLoading && workout) {
		return (
			<div>
				<h1>{workout.name}</h1>
				{workout.exercises?.map((exercise, index) => (
					<h3 key={index}>Exercise: {exercise.name}</h3>
				))}
			</div>
		);
	} else if (workout === null && isLoading) {
		return (
			<div>
				<p>No workout with URL {workoutName}</p>
				<Button type="primary" onClick={redirectToHomepage}>
					Return to Homepage
				</Button>
			</div>
		);
	} else {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	// return (
	// 	<div>{workout && workout.name ?
	// 			 <h1>{workout.name}</h1>
	// 		{workout &&
	// 			workout.exercises?.map((exercise, index) => (
	// 				<h3 key={index}>Exercise: {exercise.name}</h3>
	// 			))}:
	// 			<p>dasdf</p>
	// 		 }
	// 	</div>
	// );
};
