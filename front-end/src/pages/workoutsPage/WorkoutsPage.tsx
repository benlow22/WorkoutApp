import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../../components/WorkoutButton";
import { Button, message } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext, ISession } from "../../contexts/AuthProvider";
import { supabase } from "../../supabaseClient";
import { getAllUsersWorkoutsAPI } from "../../api/api";
import { useRequest } from "../../hooks/useRequest";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [
		getAllUsersWorkoutsResponse,
		getAllUsersWorkoutsLoading,
		getAllUsersWorkoutsError,
		getAllUsersWorkoutsRequest,
	] = useRequest(getAllUsersWorkoutsAPI);
	const [messageApi, contextHolder] = message.useMessage();
	const location = useLocation();
	useEffect(() => {
		// once logged in, make API call //session wil always be true here, if sstatement to bypass error
		if (session) {
			getAllUsersWorkoutsRequest(session);
		}
	}, []);

	useEffect(() => {
		// set workouts from response
		if (getAllUsersWorkoutsResponse) {
			setWorkouts(getAllUsersWorkoutsResponse);
		}
	}, [getAllUsersWorkoutsResponse]);

	if (!getAllUsersWorkoutsLoading) {
		return (
			<div className="workouts-page">
				{contextHolder}

				<h2 className="page-heading">Your Workouts</h2>
				{getAllUsersWorkoutsResponse?.map((workout, index) => (
					<Link to={`${workout.url}`} key={index} state={workout}>
						<WorkoutButton workout={workout} />
					</Link>
				))}
				{getAllUsersWorkoutsError && (
					<div className="error-render">
						<h5>Error: {getAllUsersWorkoutsError.message}</h5>
					</div>
				)}
				<Link to={`/newWorkout`}>
					<Button
						type="primary"
						block
						className="add-new-workout-button workout-button capitalize"
					>
						Add New Workout [+]
					</Button>
				</Link>
			</div>
		);
	} else {
		return <SpiningLoadingIcon />;
	}
};
