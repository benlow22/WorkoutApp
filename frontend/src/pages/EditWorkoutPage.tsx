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
export const EditWorkoutPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExersise] = useState<any>({});
	const [workout, setWorkout] = useState<any>(null);
	let { workoutName } = useParams();
	let oldWorkout: IWorkoutNameUrl = { name: "", url: "" };
	const navigate = useNavigate();
	const redirectToHomepage = () => {
		navigate("/");
	};
	const {
		state: { workoutId },
	} = useLocation();

	const {userId} = useContext(AuthContext);
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

	useEffect(() => {
		if (workout?.id) {
			getExercisesFromWorkout();
		}
	}, [workoutName]);

	useEffect(() => {
		if (exercises) {
			console.log("hio");
			setIsLoading(false);
		}
	}, [exercises]);

	const getExercisesFromWorkout = async () => {
		let { data, error } = await supabase
			.from("workouts")
			.select(
				`name, id,
			Exercises(name, muscles)`
			)
			.eq("id", workout?.id);
		if (error) {
			console.log("err", error);
		}
		if (data) {
			setExersise(data[0]);
			console.log("fetched DATAAA", data[0]);
		}
	};

	// gets workout day from url, return name and id, sets workout, sets undefined if url not found
	useEffect(() => {
		setIsLoading(true);
		async function getWorkout() {
			const data = await getFullWorkout(workoutId, userId);
			setWorkout(data);
			setIsLoading(false);
		}
		getWorkout();
	}, []);

	// once workout is determined or undefined, isloading = done
	// useEffect(() => {
	// 	if (workout === undefined || workout) setIsLoading(false);
	// }, [workout]);

	if (workout) {
		oldWorkout = {
			name: workout.name,
			url: workout.url,
		};
	}

	const toggleButton = () => {
		addExercise ? setAddExercise(false) : setAddExercise(true);
	};

	if (!isLoading && workout) {
		return (
			<div>
				{oldWorkout && (
					<section className="new-workout-name">
						<EditWorkoutNameButton oldWorkout={oldWorkout} />
					</section>
				)}
				{/* DISPLAY EXERCISES HERE */}
				{workout.Exercises &&
					workout.Exercises.map((exercise, index) => (
						<h3 key={index}>Exercise ID: {exercise.name}</h3>
					))}
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
					<SearchExercises />
				)}
				<br></br>
				<Button type="primary" onClick={getExercisesFromWorkout}>
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
