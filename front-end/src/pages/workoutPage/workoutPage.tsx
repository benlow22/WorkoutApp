import {
	Navigate,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { deleteWorkoutAPI, getWorkoutAndExercisesAPI } from "../../api/api";
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
import { useRequest } from "../../hooks/useRequest";
import { IExercise, IWorkout } from "../../api/types";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";

// type IExercise = {
// 	name: any;
// 	id?: any;
// };

export const WorkoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { session } = useContext(AuthContext);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	const { workoutUrl } = useParams<string>();
	const [workoutResponse, workoutLoading, workoutError, workoutRequest] =
		useRequest(getWorkoutAndExercisesAPI, session!);

	const [
		deleteWorkoutResponse,
		deleteWorkoutLoading,
		deleteWorkoutError,
		deleteWorkoutRequest,
	] = useRequest(deleteWorkoutAPI, session!);

	useEffect(() => {
		if (workoutUrl) {
			workoutRequest(workoutUrl, session!);
		}
	}, []);

	useEffect(() => {
		if (workoutResponse) {
			setWorkout(workoutResponse.workout);
			setExercises(workoutResponse.exercises);
		}
	}, [workoutResponse]);

	const redirectToWelcomepage = () => {
		navigate("/");
	};

	// need to remove
	const deleteWorkout = () => {
		deleteWorkoutRequest(workout.id, session!);
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

	if (!workoutLoading) {
		if (workoutError) {
			return (
				<div>
					<p>No workout with URL {workoutUrl}</p>
					<Button type="primary" onClick={redirectToWelcomepage}>
						Return to Welcome Page
					</Button>
				</div>
			);
		}
		return (
			<div>
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
					className="capitalize delete-button"
				>
					Delete Workout
				</Button>
			</div>
		);
	} else {
		return <SpiningLoadingIcon />;
	}
};
