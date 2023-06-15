import {
	Navigate,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import {
	IExercise,
	IWorkout,
	IWorkoutNameUrl,
	IWorkoutWithExercises,
	workouts,
} from "../../data";
import {
	getFullWorkoutAPI,
	getFullWorkoutAPIEXPRESS,
	getFullWorkoutThroughSupabaseWithAuth,
	getWorkoutDay,
} from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "antd";
import { ClockCircleOutlined, EditTwoTone } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../../components/EditWorkoutNameButton";
import { AuthContext } from "../../contexts/AuthProvider";
import Exercise from "../../components/Exercise";
import { ExercisesPage } from ".././ExercisesPage";
import { SearchExercises } from "../../components/SearchExercises";
import { Exercises } from "../../components/Exercises";
import { TestFetchExercise } from "../../components/TestFetchExercises";

// type IExercise = {
// 	name: any;
// 	id?: any;
// };

export const WorkoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { session } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	const { workoutUrl } = useParams<string>();
	//need to check if workout URL is valid and grab workout from it, if not from buttons

	// upon mount, take workoutId passed in
	// get data for workout IWorkout
	useEffect(() => {
		setIsLoading(true);
		async function getWorkout() {
			if (workoutUrl && session) {
				//console.log('coookies"', document.cookie);
				// should always be true, if not it would be a different route (error claims type undefined)
				const test = await getFullWorkoutThroughSupabaseWithAuth(
					workoutUrl,
					session
				);
				if (test) {
					console.log(
						"test data made it to Comp from supabase: ",
						test
					);
				}
				// const lols = await getFullWorkoutAPIEXPRESS(workoutUrl);
				// console.log("THIS MADE IT", lols);
				const data = await getFullWorkoutAPI(workoutUrl);
				if (data) {
					// setWorkout(data); // setState workoutData
					setExercises(data.exercises);
					setWorkout(data.workout);
				}
			}
		}
		getWorkout(); // if url is valid, then call GETworkout
	}, []);

	useEffect(() => {
		if (exercises) {
			setIsLoading(false);
		}
	}, [exercises]);

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
				if (error) {
					console.error(error);
					return;
				}
				console.log("workout deleted");
				navigate("/workouts");
			}
		} else {
			console.log("workout not deleted");
		}
	};

	const toggleButton = () => {
		addExercise ? setAddExercise(false) : setAddExercise(true);
	};

	const addExerciseToAll = (name: string) => {
		console.log("addExerciseToAll called");
		let newExercise = { name: name };
		if (!exercises.find((exercise) => exercise.name === name)) {
			console.log("ahahsda");
			// setExercises([...exercises, newExercise]);
			setAddExercise(false);
		}
	};

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	console.log("new Exercises", exercises);
	// 	setIsLoading(false);
	// }, [addExercise]);

	return (
		<div>
			{isLoading && <h1>LOADING</h1>}
			{workout && (
				<section className="new-workout-name">
					<EditWorkoutNameButton workout={workout} />
				</section>
			)}
			<div className="workout-controls">
				<button className="side-workout-button expand-all-button">
					Expand All
				</button>
				<div className="start-button-container">
					<button className="start-button">
						Start
						<ClockCircleOutlined className="clock-icon" />
					</button>
					<div className="start-button-backing"></div>
				</div>

				<div className="button-crecsent-spacer-right"></div>
				<button className="side-workout-button edit-button">
					Edit
				</button>
			</div>
			{/* DISPLAY EXERCISES HERE */}
			{exercises.map((exercise) => (
				<TestFetchExercise exerciseId={exercise.id} key={exercise.id} />
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
				className="capitalize delete-button"
			>
				Delete Workout
			</Button>
		</div>
	);
	// 	} else if (!location.state && !isLoading) {
	// 		return (
	// 			<div>
	// 				<p>No workout with URL {workoutUrl}</p>
	// 				<Button type="primary" onClick={redirectToWelcomepage}>
	// 					Return to Welcome Page
	// 				</Button>
	// 			</div>
	// 		);
	// 	} else {
	// 		return (
	// 			<div>
	// 				<h2></h2>
	// 			</div>
	// 		);
	// 	}
};
