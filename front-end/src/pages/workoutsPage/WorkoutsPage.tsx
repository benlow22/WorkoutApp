import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext, ISession } from "../../contexts/AuthProvider";
import { supabase } from "../../supabaseClient";
import { IWorkout } from "../../data";
import { getAllUsersWorkoutsAPI } from "../../api/api";
import { useRequest } from "../../hooks/useRequest";

// const useAPIcall = async <T,>(
// 	api: (s: ISession) => Promise<{ data: T | null; error: Error | null }>,
// 	session?: ISession
// ): Promise<[data: T | null, isLoading: boolean, error: Error | null]> => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const { data, error } = await api(session!);

// 	if (data) {
// 		// setWorkouts(data);
// 		setIsLoading(false);
// 	}
// 	if (error) {
// 		console.error("", error.cause);
// 		setIsLoading(false);
// 	}

// 	return [data, isLoading, error];
// };

// async function useApiCall<T>(
// 	api: (s: ISession) => Promise<{ data: T; error: Error }>,
// 	session?: ISession
// ) {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const { data, error } = await api(session!);

// 	if (data) {
// 		// setWorkouts(data);
// 		setIsLoading(false);
// 	}
// 	if (error) {
// 		console.error("", error.cause);
// 		setIsLoading(false);
// 	}

// 	retur

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [response, loading, error, request] = useRequest(
		getAllUsersWorkoutsAPI,
		session!
	);
	// const getAllUsersWorkouts = async () => {
	// 	// if (session) {
	// 	const { data, error } = await getAllUsersWorkoutsAPI(session!);
	// 	if (data) {
	// 		setWorkouts(data);
	// 		setIsLoading(false);
	// 	}
	// 	if (error) {
	// 		console.error("", error.cause);
	// 		setIsLoading(false);
	// 	}
	// 	// }
	// };

	useEffect(() => {
		// get all of user's workouts to render list
		if (session) {
			request(session);
		}
	}, []);

	useEffect(() => {
		// get all of user's workouts to render list
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
		return <p>LOADING</p>;
	}
};
