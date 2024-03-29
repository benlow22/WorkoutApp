import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../../components/workouts/WorkoutButton";
import { Button, message } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
// import { supabase } from "../../../../supabaseClient";
import { getAllUsersWorkoutsAPI } from "../../api/api";
import { useRequest } from "../../../../../hooks/useRequest";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";
import { IWorkout } from "../../../../../api/types";

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId, auth, session, supabase } =
		useContext(AuthContext);
	const [
		getAllUsersWorkoutsResponse,
		getAllUsersWorkoutsLoading,
		getAllUsersWorkoutsError,
		getAllUsersWorkoutsRequest,
	] = useRequest(getAllUsersWorkoutsAPI);
	const [messageApi, contextHolder] = message.useMessage();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const warning = () => {
		messageApi.open({
			type: "warning",
			content:
				"Please log in to view workout, or checkout the Logged In preview video below",
		});
	};

	const getAllPublicWorkouts = async () => {
		let { data: workouts, error } = await supabase
			.from("workouts")
			.select("id, name, last_performed, url");
		console.log("dataaa", workouts);
		if (workouts) {
			setWorkouts(workouts);
		}
		if (error) {
			console.error(error);
			return error;
		}
	};
	useEffect(() => {
		// once logged in, make API call //session wil always be true here, if sstatement to bypass error
		// if (session && auth) {
		// 	getAllUsersWorkoutsRequest(session);
		// } else {
		getAllPublicWorkouts();
		// }
	}, [auth]);

	const warningPopUp = (event: any) => {
		warning();
		event.preventDefault();
	};

	useEffect(() => {
		// set workouts from response
		if (getAllUsersWorkoutsResponse) {
			setWorkouts(getAllUsersWorkoutsResponse);
		}
	}, [getAllUsersWorkoutsResponse]);

	// if (!getAllUsersWorkoutsLoading) {
	// 	return (
	// 		<div className="workouts-page">
	// 			{contextHolder}

	// 			<h2 className="page-heading">Your Workouts</h2>
	// 			{getAllUsersWorkoutsResponse?.map((workout, index) => (
	// 				<Link to={`${workout.url}`} key={index} state={workout}>
	// 					<WorkoutButton workout={workout} />
	// 				</Link>
	// 			))}
	// 			{getAllUsersWorkoutsError && (
	// 				<div className="error-render">
	// 					<h5>Error: {getAllUsersWorkoutsError.message}</h5>
	// 				</div>
	// 			)}
	// 			<Link to={`/workoutBuddy/newWorkout`}>
	// 				<Button
	// 					type="primary"
	// 					block
	// 					className="add-new-workout-button workout-button capitalize"
	// 				>
	// 					Add New Workout [+]
	// 				</Button>
	// 			</Link>
	// 		</div>
	// 	);
	// } else if (!isLoading) {
	return (
		<div className="workouts-page">
			{contextHolder}

			<h2 className="page-heading">Your Workouts</h2>
			{workouts.map((workout, index) => (
				<Link
					to={`${workout.url}`}
					key={index}
					state={workout}
					onClick={(event) => !auth && warningPopUp(event)}
				>
					<WorkoutButton workout={workout} />
				</Link>
			))}
			{getAllUsersWorkoutsError && (
				<div className="error-render">
					<h5>Error: {getAllUsersWorkoutsError.message}</h5>
				</div>
			)}
			<Link to={`/workoutBuddy/newWorkout`} aria-disabled={!auth}>
				<Button
					type="primary"
					block
					className="add-new-workout-button workout-button capitalize"
				>
					Add New Workout [+]
				</Button>
			</Link>
			<div className="vid-container">
				<video controls>
					<source src="/workoutBuddyDemo.mov" type="video/mp4" />
					<p>
						Your browser doesn't support HTML video. Here is a
						<a href="/workoutBuddyDemo.mov">link to the video</a>{" "}
						instead.
					</p>
				</video>
			</div>
		</div>
	);
	// } else {
	// 	return <SpiningLoadingIcon />;
	// }
};
