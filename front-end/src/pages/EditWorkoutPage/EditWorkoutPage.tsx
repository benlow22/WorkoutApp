import {
	Navigate,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { getWorkoutAndExercisesAPI } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../../components/EditWorkoutNameButton";
import { AuthContext } from "../../contexts/AuthProvider";
import Exercise from "../../components/Exercise";
import { ExercisesPage } from "../ExercisesPage";
import { SearchExercises } from "../../components/SearchExercises";
import { Exercises } from "../../components/Exercises";
import { TestFetchExercise } from "../../components/TestFetchExercises";
import { IExercise, IWorkout } from "../../api/types";

// type IExercise = {
// 	name: any;
// 	id?: any;
// };

export const EditWorkoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	let { workoutUrl } = useParams();

	const redirectToWelcomepage = () => {
		navigate("/");
	};

	const deleteWorkout = async () => {
		if (workout) {
			if (confirm(`Are you sure you want to delete ${workout.name}?`)) {
				const { error } = await supabase
					.from("workouts")
					.delete()
					.eq("id", workout.id);
				console.log("workout deleted");
				navigate("/workouts");
				if (error) {
					console.error(error);
					return;
				}
			}
		} else {
			console.log("workout not deleted");
		}
	};

	// upon mount, take workoutId passed in
	// get data for workout IWorkout
	useEffect(() => {
		// setIsLoading(true);
		// async function getWorkout() {
		// 	const data = await getFullWorkoutAPI(workout.id);
		// 	if (data) {
		// 		// setWorkout(data); // setState workoutData
		// 		setExercises(data.exercises);
		// 		console.log("should be exercises", data);
		// 		console.log("Workouts?", data.workout);
		// 		console.log("Workouts?", workout);
		// 	}
		// }
		// getWorkout();
	}, []);

	useEffect(() => {
		if (workout.name) {
			setIsLoading(false);
		}
	}, [exercises]);

	const toggleButton = () => {
		addExercise ? setAddExercise(false) : setAddExercise(true);
	};

	const addExerciseToAll = (exercise: IExercise) => {
		console.log("addExerciseToAll called");
		// let newExercise = { name: name };
		// if (!exercises.find((exercise) => exercise.name === name)) {
		// 	console.log("ahahsda");
		// 	setExercises([...exercises, newExercise]);
		// 	setAddExercise(false);
		// }
		return;
	};

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	console.log("new Exercises", exercises);
	// 	setIsLoading(false);
	// }, [addExercise]);

	if (!isLoading && workout) {
		return (
			<div>
				{workout && (
					<section className="new-workout-name">
						<EditWorkoutNameButton workout={workout} />
					</section>
				)}
				{/* DISPLAY EXERCISES HERE */}
				{exercises.map((exercise) => (
					<TestFetchExercise
						exerciseId={exercise.id}
						key={exercise.id}
					/>
				))}

				<Exercises exercises={exercises} />
				<br></br>
				{!addExercise ? (
					<Button
						type="primary"
						onClick={toggleButton}
						className="add-exercise-button"
					>
						Add Exercise
					</Button>
				) : (
					<SearchExercises
						workout={workout}
						// addExerciseToAll={addExerciseToAll}
					/>
				)}
				<br></br>
				<Button
					type="primary"
					onClick={deleteWorkout}
					className="delete-button capitalize"
				>
					Delete Workout
				</Button>
			</div>
		);
	} else if (workout === undefined && !isLoading) {
		return (
			<div>
				<p>No workout with URL {workoutUrl}</p>
				<Button type="primary" onClick={redirectToWelcomepage}>
					Return to Welcome Page
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
