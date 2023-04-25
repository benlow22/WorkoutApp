import { useNavigate, useParams } from "react-router-dom";
import { workoutRoutine, IWorkout, IWorkoutNameUrl, workouts } from "../data";
import { getWorkoutDay } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../components/EditWorkoutNameButton";
import { AuthContext } from "../contexts/AuthProvider";

export const EditWorkoutPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [workout, setWorkout] = useState<IWorkout | undefined | null>(null);
	let { workoutName } = useParams();
	let oldWorkout: IWorkoutNameUrl = { name: "", url: "" };
	const navigate = useNavigate();
	const redirectToHomepage = () => {
		navigate("/");
	};

	// gets workout day from url, return name and id, sets workout, sets undefined if url not found
	useEffect(() => {
		if (workoutName) {
			setIsLoading(true);
		}
		async function getWorkout() {
			const data = await getWorkoutDay(workoutName);
			setWorkout(data);
		}
		getWorkout();
	}, [workoutName]);

	// once workout is determined or undefined, isloading = done
	useEffect(() => {
		if (workout === undefined || workout) setIsLoading(false);
	}, [workout]);

	if (workout) {
		oldWorkout = {
			name: workout.name,
			url: workout.url,
		};
	}

	if (!isLoading && workout) {
		return (
			<div>
				{oldWorkout && (
					<section className="new-workout-name">
						<EditWorkoutNameButton oldWorkout={oldWorkout} />
					</section>
				)}
				{/* DISPLAY EXERCISES HERE */}
				{workout.exercises?.map((exercise, index) => (
					<h3 key={index}>Exercise: {exercise.name}</h3>
				))}
			</div>
		);
	} else if (workout === undefined && !isLoading) {
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
