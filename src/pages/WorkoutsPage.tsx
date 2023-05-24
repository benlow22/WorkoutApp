import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	

	console.log("workouts page");
	useEffect(() => {

		async function fetchWorkouts() {
			const { data, error } = await supabase
				.from("workouts")
				.select("name,url,id");
			if (error) {
				console.error(error);
				setIsLoading(false);
				return;
			}
			setWorkouts(data);
			setIsLoading(false);
			return data;
		}
		fetchWorkouts();
	}, []);

	if (!isLoading) {
		return (
			<div className="workouts-page">
				<h2>Your Workouts</h2>
				{workouts.map((workout, index) => (
					<Link to={`/workouts/${workout.url}`} key={index} state={{ workoutId: workout.id }}>
						<WorkoutButton workout={workout} />
					</Link>
				))}
				<Link to={`/newWorkout`}>
					<Button
						type="primary"
						block
						className="add-new-workout-button workout-button"
					>
						Add New Workout [+]
					</Button>
				</Link>
			</div>
		);
	} else {
		return <p></p>;
	}
};