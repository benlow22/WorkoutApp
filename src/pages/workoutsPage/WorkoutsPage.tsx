import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { supabase } from "../../supabaseClient";
import { IWorkout } from "../../data";
import { pokemonAPI } from "../../api/api";

export const WorkoutsPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		// get all of user's workouts to render list
		const getAllUsersWorkouts = async () => {
			const { data, error } = await supabase
				.from("workouts")
				.select("id, name, url, last_performed");
			///
			const pokemons = await pokemonAPI();
			console.log("pokemons", pokemons);
			if (error) {
				console.error(error);
				setIsLoading(false);
				return;
			}
			console.log("workouts", data);
			setWorkouts(data);
			setIsLoading(false);
			return data;
		};
		getAllUsersWorkouts();
	}, []);

	if (!isLoading) {
		return (
			<div className="workouts-page">
				<h2>Your Workouts</h2>
				{workouts.map((workout, index) => (
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
		return <p></p>;
	}
};
