import { useParams } from "react-router-dom";
import { workoutRoutine, IWorkout } from "../data";
import { getWorkoutDay } from "../api/api";
import { useEffect, useState } from "react";

export const EditWorkoutPage = () => {
	let { workoutName } = useParams();
	const [data, setData] = useState<IWorkout | null>(null);

	useEffect(() => {
		async function getWorkout() {
			const workoutDay = await getWorkoutDay(workoutName);
			setData(workoutDay);
		}
		getWorkout();
	}, [workoutName]);

	if (!data) {
		// loading page, while waiting for data to be fetched
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			{data && <h1>{data.name}</h1>}
			{data &&
				data.exercises?.map((exercise) => (
					<h3>Exercise: {exercise.name}</h3>
				))}
		</div>
	);
};
