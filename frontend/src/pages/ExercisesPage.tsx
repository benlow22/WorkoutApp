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
	const [allExercises, setAllExercises] = useState<any>([]); //change to appropriate type

	console.log("Exercises page");

	useEffect(() => {
		console.log("exercises fetch", allExercises);

		async function fetchExercises() {
			const { data, error } = await supabase
				.from("Exercises")
				.select("name");
			if (error) {
				console.error("error fetching exercises", error);
				setIsLoading(false);
				return;
			}
			if (data.length > 0) {
				console.log("fetching exercises data: ", data);
				setAllExercises(data);
			}
			setIsLoading(false);
			return data;
		}
		fetchExercises();
		console.log("exercises fetch2", allExercises);
	}, []);

	const onSearch = (value: string) => console.log(value);
	useEffect(() => {
		if (allExercises) {
			console.log("all exercises updated", allExercises);
		}
	}, [allExercises]);
	return (
		<div className="exercise-page">
			<h2>Exercises </h2>
			<Search
				placeholder="Exercise Search"
				onSearch={onSearch}
				enterButton
				className="exercise-search"
			/>
			{allExercises.map((exercise: any) => (
				<p>{exercise.name}</p>
			))}
		</div>
	);
};
