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
import { getFullWorkout, getWorkoutDay } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
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

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	let { workoutUrl } = useParams();
	let oldWorkout: IWorkout = {
		name: "",
		url: "",
		id: "",
		last_performed: null,
	};

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

	// upon mount, take workoutId passed in
	// get data for workout IWorkout
	useEffect(() => {
		console.log("workout passed via state", workout);
		setIsLoading(true);
		async function getWorkout() {
			const data = await getFullWorkout(workout.id);
			setWorkout(data); // setState workoutData
			if (data) {
				setWorkout(data); // setState workoutData
				setExercises(data.exercises);
			}
			setIsLoading(false);
		}
		getWorkout();
	}, []);

	useEffect(() => {
		if (workout) {
			console.log("what is workout NOW", workout);

			setIsLoading(false);
		}
	}, [workout]);
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
		if (!exercises.find((exercise) => exercise.name === name)) {
			console.log("ahahsda");
			setExercises([...exercises, newExercise]);
			setAddExercise(false);
		}
	};

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	console.log("new Exercises", exercises);
	// 	setIsLoading(false);
	// }, [addExercise]);

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
