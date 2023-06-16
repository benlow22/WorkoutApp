import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext, ISession } from "../../contexts/AuthProvider";
import { supabase } from "../../supabaseClient";
import { getAllUsersWorkoutsAPI } from "../../api/api";
import { useRequest } from "../../hooks/useRequest";
import { SpiningLoadingIcon } from "../../components/loading/LoadingIcon";

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [response, loading, error, request] = useRequest(
		getAllUsersWorkoutsAPI,
		session!
	);

	useEffect(() => {
		// once logged in, make API call //session wil always be true here, if sstatement to bypass error
		if (session) {
			request(session);
		}
	}, []);

	useEffect(() => {
		if (response) {
			console.log(response);
			setWorkouts(response);
		}
	}, [response]);

	if (!loading) {
		return (
			<div className="workouts-page">
				<h2 className="page-heading">Your Workouts</h2>
				{response?.map((workout, index) => (
					<Link
						to={`/workouts/${workout.url}`}
						key={index}
						state={workout}
					>
						<WorkoutButton workout={workout} />
					</Link>
				))}
				{error && (
					<div className="error-render">
						<h5>Error: {error.message}</h5>
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
