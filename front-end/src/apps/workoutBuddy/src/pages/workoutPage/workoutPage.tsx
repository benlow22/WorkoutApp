import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	deleteWorkoutAPI,
	getWorkoutAndExercisesAPI,
	usersAndPublicExercisesAPI,
} from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../../components/workouts/EditWorkoutNameButton";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useRequest } from "../../../../../hooks/useRequest";
import { IWorkout, TUsersExerciseData } from "../../../../../api/types";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";
import { AddExercise } from "../../components/exercises/AddExercise";
import ExercisesCollapse from "../../components/exercises/ExerciseCollapse";

export const WorkoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { session } = useContext(AuthContext);
	// const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<TUsersExerciseData[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	const { workoutUrl } = useParams<string>();

	const [
		getWorkoutAndExercisesResponse,
		getWorkoutAndExercisesLoading,
		getWorkoutAndExercisesError,
		getWorkoutAndExercisesRequest,
	] = useRequest(getWorkoutAndExercisesAPI);
	const [messageApi, contextHolder] = message.useMessage();

	const deleteWorkoutSuccess = () => {
		messageApi.open({
			type: "success",
			content: "The workout was successfully deleted. redirecting...",
			onClose: () => navigate("/"),
		});
	};

	const [
		deleteWorkoutResponse,
		deleteWorkoutLoading,
		deleteWorkoutError,
		deleteWorkoutRequest,
	] = useRequest(deleteWorkoutAPI);

	const [
		usersAndPublicExercisesResponse,
		usersAndPublicExercisesLoading,
		usersAndPublicExercisesError,
		usersAndPublicExercisesRequest,
	] = useRequest(usersAndPublicExercisesAPI);

	useEffect(() => {
		if (workoutUrl) {
			getWorkoutAndExercisesRequest(workoutUrl, session!);
		}
	}, []);

	useEffect(() => {
		if (exercises) {
			// console.log("new exercises");
		}
	}, [exercises]);

	useEffect(() => {
		if (getWorkoutAndExercisesResponse) {
			setWorkout(getWorkoutAndExercisesResponse.workout);
			setExercises(getWorkoutAndExercisesResponse.exercises);
		}
	}, [getWorkoutAndExercisesResponse]);

	const redirectToWelcomepage = () => {
		navigate("/");
	};

	const deleteWorkout = () => {
		if (confirm(`Are you sure you want to delete ${workout.name}?`)) {
			deleteWorkoutRequest(workout.id, session!);
			if (deleteWorkoutError) {
				console.log("error deleting workout", deleteWorkoutError);
			} else {
				deleteWorkoutSuccess();
			}
		} else {
			console.log("workout not deleted");
		}
	};

	const addExerciseToWorkout = (newExercise: TUsersExerciseData) => {
		// console.log("addExerciseToWorkout called");
		if (exercises.some((exercise) => exercise.name !== newExercise.name)) {
			// console.log("exercise not already in workout.");
			const updatedExerciseList = new Array(...exercises, newExercise);
			setExercises(updatedExerciseList);
		}
	};

	if (!getWorkoutAndExercisesLoading) {
		if (getWorkoutAndExercisesError) {
			return (
				<div>
					<h2 className="page-heading">
						No workout with URL {workoutUrl}
					</h2>
					<Button type="primary" onClick={redirectToWelcomepage}>
						Return to Welcome Page
					</Button>
				</div>
			);
		}
		return (
			<div className="workout-page">
				{workout && (
					<section className="new-workout-name white-font">
						<EditWorkoutNameButton workout={workout} />
					</section>
				)}
				<div className="workout-controls white-font">
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
				{exercises && <ExercisesCollapse exercises={exercises} />}
				{/* <Exercises exercises={exercises} /> */}
				<br></br>
				{getWorkoutAndExercisesResponse?.workout && (
					<AddExercise
						workout={getWorkoutAndExercisesResponse.workout}
						addExerciseToWorkout={addExerciseToWorkout}
					/>
				)}
				<br></br>
				{contextHolder}
				<Button
					type="primary"
					onClick={deleteWorkout}
					className="capitalize delete-button"
					danger
				>
					Delete Workout
				</Button>
			</div>
		);
	} else {
		return <SpiningLoadingIcon />;
	}
};
