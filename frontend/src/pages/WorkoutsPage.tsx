import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route } from "react-router-dom";
import { NewWorkoutPage } from "./NewWorkoutPage";
import { IWorkout } from "../data";
import { getWorkouts } from "../api/api";
import { AuthContext } from "../App";
import { supabase } from "../supabaseClient";

export const WorkoutsPage: React.FC<{}> = () => {
	const {workouts, setWorkouts}  = useContext(AuthContext)
	const [error, setError] = useState();
	
	// useEffect(() => {
	// 	async function fetchWorkouts() {
	// 		const res = await getWorkouts();
	// 		if (res.error) {
	// 			setError(res.error.name);
	// 		}
	// 		setWorkouts(res);
	// 	}
	// 	fetchWorkouts();
	// }, []);

	useEffect(() => {
		async function fetchWorkouts() {
			const { data, error } = await supabase
				.from("workouts")
				.select("name,url");
			if (error) {
				console.error(error);
				return;
			}
			setWorkouts(data)
			return data;
		}
		fetchWorkouts();			
	}, []);

	return (
		<>
			<h2>Your Workouts</h2>
			{workouts.map((workout, index) => (
				<Link to={`/workouts/${workout.url}`} key={index}>
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
		</>
	);
};
