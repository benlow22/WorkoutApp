import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";

const { Search } = Input;

export const ExercisesPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	console.log("Exercises page");
	// useEffect(() => {
	// 	console.log("workouts fetch");

	// 	async function fetchWorkouts() {
	// 		const { data, error } = await supabase
	// 			.from("workouts")
	// 			.select("name,url,id");
	// 		if (error) {
	// 			console.error(error);
	// 			setIsLoading(false);
	// 			return;
	// 		}
	// 		setWorkouts(data);
	// 		setIsLoading(false);
	// 		return data;
	// 	}
	// 	fetchWorkouts();
	// }, []);

	const onSearch = (value: string) => console.log(value);

	return (
		<div className="exercise-page">
			<h2>Exercises</h2>
			<Search
				placeholder="Exercise Search"
				onSearch={onSearch}
				enterButton
				className="exercise-search"
			/>
            
		</div>
	);
};
