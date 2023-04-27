import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button } from "antd";
import { Link, NavLink, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";

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

	return <></>;
};
