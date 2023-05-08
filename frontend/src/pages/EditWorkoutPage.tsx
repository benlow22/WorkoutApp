import {
	Navigate,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { IWorkout, IWorkoutNameUrl, workouts } from "../data";
import { getFullWorkout, getWorkoutDay } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../components/EditWorkoutNameButton";
import { AuthContext } from "../contexts/AuthProvider";
import Exercise from "../components/Exercise";
import { ExercisesPage } from "./ExercisesPage";
import { SearchExercises } from "../components/SearchExercises";
import { Exercises } from "../components/Exercises";
import { TestFetchExercise } from "../components/TestFetchExercises";
export const EditWorkoutPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<any>({});
	const [workout, setWorkout] = useState<any>(null);
	let { workoutName } = useParams();
	let oldWorkout: IWorkout = { name: "", url: "", id: "" };
	const navigate = useNavigate();
	const redirectToHomepage = () => {
		navigate("/");
	};

	const {
		state: { workoutId },
	} = useLocation();

	const { userId } = useContext(AuthContext);
	const deleteWorkout = async () => {
		if (workout) {
			if (confirm(`Are you sure you want to delete ${workout.name}?`)) {
				const { error } = await supabase
					.from("workouts")
					.delete()
					.eq("id", workout.id);
				console.log("workout deleted");
				navigate("/workouts");
			}
		} else {
			console.log("workout not deleted");
		}
	};

	// upon mount, take workoutId passed in
	// get data for workout IWorkout
	useEffect(() => {
		setIsLoading(true);
		async function getWorkout() {
			const data = await getFullWorkout(workoutId, userId);
			setWorkout(data); // setState workoutData
			if (data) {
				console.log("workoutExercises from API = ", data.exercises);
			}
			setExercises(data?.exercises);
			setIsLoading(false);
		}
		if (workoutId !== "noIdYet") {
			getWorkout();
		}
	}, []);

	// useEffect(() => {
	// 	if (exercises) {
	// 		setIsLoading(true);
	// 		async function getWorkout() {
	// 			const data = await getFullWorkout(workoutId, userId);
	// 			setWorkout(data); // setState workoutData
	// 			if (data) {
	// 				console.log("workoutExercises from API = ", data.exercises);
	// 			}
	// 			setExercises(data?.exercises);
	// 			setIsLoading(false);
	// 		}
	// 		getWorkout();
	// 	}
	// }, [exercises]);

	// useEffect(() => {
	// 	if (exercises) {
	// 		console.log("hio");
	// 		setIsLoading(false);
	// 	}
	// }, [exercises]);

	// const getExercisesFromWorkout = async () => {
	// 	let { data, error } = await supabase
	// 		.from("workouts")
	// 		.select(
	// 			`name, id,
	// 		Exercises(name, muscles)`
	// 		)
	// 		.eq("id", workout?.id);
	// 	if (error) {
	// 		console.log("err", error);
	// 	}
	// 	if (data) {
	// 		setWorkout(data[0]);
	// 		console.log("fetched DATAAA", data[0]);
	// 	}
	// 	console.log("workoutIDDDDDDD", workoutId);
	// };

	// gets workout day from url, return name and id, sets workout, sets undefined if url not found

	// once workout is determined or undefined, isloading = done
	// useEffect(() => {
	// 	if (workout === undefined || workout) setIsLoading(false);
	// }, [workout]);

	if (workout) {
		oldWorkout = {
			name: workout.name,
			url: workout.url,
			id: workout.id,
		};
	}

	const toggleButton = () => {
		addExercise ? setAddExercise(false) : setAddExercise(true);
	};

	const addExerciseToAll = (name: string) => {
		console.log("addExerciseToAll called");
		let newExercise = { name: name };
		if (!exercises.find((exercise: any) => exercise.name === name)) {
			console.log("ahahsda", exercises.name);
			setExercises([...exercises, newExercise]);
			setAddExercise(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		console.log("new Exercises", exercises);
		setIsLoading(false);
	}, [addExercise]);

	if (!isLoading && workout) {
		return (
			<div>
				{oldWorkout && (
					<section className="new-workout-name">
						<EditWorkoutNameButton oldWorkout={oldWorkout} />
					</section>
				)}
				{/* DISPLAY EXERCISES HERE */}
				{exercises.map((exercise) => (
					<TestFetchExercise exerciseId={exercise.id} />
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
						addExerciseToAll={addExerciseToAll}
					/>
				)}
				<br></br>
				<Button type="primary" onClick={deleteWorkout}>
					Delete Workout
				</Button>
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
