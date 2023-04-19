import { useHistory, useParams } from "react-router-dom";
import { workoutRoutine, IWorkout, IWorkoutNameUrl } from "../data";
import { getWorkoutDay } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../components/EditWorkoutNameButton";
import { AuthContext } from "../contexts/AuthProvider";

export const EditWorkoutPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	setIsLoading(true);

	const [workout, setWorkout] = useState<IWorkout | undefined | null >(null);
	const history = useHistory();
	let { workoutName } = useParams();
	console.log("workout Name from params: ", workoutName); // data consist of name and id

	let oldWorkout: IWorkoutNameUrl = { name: "", url: "" };

	// gets workout day from url, return name and id, to use to get exercises
	useEffect(() => {
		async function getWorkout() {
			const data = await getWorkoutDay(workoutName);
			if (data) {
				setWorkout(data);
				setIsLoading(false);
			}
		}
		getWorkout();
	}, []);

	useEffect(() => {
		console.log("data update 1");
		setIsLoading(false);
	}, [workout]);

	if (workout) {
		oldWorkout = {
			name: workout.name,
			url: workout.url,
		};
	}
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
				{oldWorkout && (
					<section className="new-workout-name">
						<EditWorkoutNameButton oldWorkout={oldWorkout} />
					</section>
				)}

				{/* ) : (
					<h2>{submittedWorkoutName}</h2>

			)} */}
				{workout.exercises?.map((exercise, index) => (
					<h3 key={index}>Exercise: {exercise.name}</h3>
				))}
			</div>
		);
	} else if (workout===undefined && !isLoading) {
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
				<h2></h2>
			</div>
		);
	}
};
