import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	deleteWorkoutAPI,
	getWorkoutAndExercisesAPI,
	usersAndPublicExercisesAPI,
} from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { Button, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { EditWorkoutNameButton } from "../../components/EditWorkoutNameButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { SearchExercises } from "../../components/SearchExercises";
import { Exercises } from "../../components/Exercises";
import { TestFetchExercise } from "../../components/TestFetchExercises";
import { useRequest } from "../../hooks/useRequest";
import { IExercise, IWorkout } from "../../api/types";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";
import { AddExercise } from "../../components/exercises/AddExercise";

// type IExercise = {
// 	name: any;
// 	id?: any;
// };

export const WorkoutPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [allExercises, setAllExercises] = useState<IExercise[]>([]);
	const { session } = useContext(AuthContext);
	const [addExercise, setAddExercise] = useState<boolean>(false);
	const [exercises, setExercises] = useState<IExercise[]>([]);
	const [workout, setWorkout] = useState<IWorkout>(location.state); // if routing from NewWorkoutPage, state is passed, no need for API call
	const { workoutUrl } = useParams<string>();

	const [workoutResponse, workoutLoading, workoutError, workoutRequest] =
		useRequest(getWorkoutAndExercisesAPI);
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
		usersAndPublicExercisesRequest(session!);
		if (workoutUrl) {
			workoutRequest(workoutUrl, session!);
		}
	}, []);

	useEffect(() => {
		if (!usersAndPublicExercisesLoading) {
			if (usersAndPublicExercisesResponse)
				setAllExercises(usersAndPublicExercisesResponse);
		}
	}, [usersAndPublicExercisesLoading]);

	useEffect(() => {
		if (workoutResponse) {
			setWorkout(workoutResponse.workout);
			setExercises(workoutResponse.exercises);
			console.log("EXERCISES", workoutResponse.exercises);
		}
	}, [workoutResponse]);

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
				{exercises &&
					exercises.map((exercise, index) => (
						<p key={index}>
							{index + 1}. {exercise.name}
						</p>
					))}
				{/* <Exercises exercises={exercises} /> */}
				<br></br>
				<AddExercise />
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
