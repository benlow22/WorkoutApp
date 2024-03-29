import React, { useContext, useEffect, useState } from "react";
// import WorkoutButton from "../components/WorkoutButton";
import { Button, theme, ConfigProvider } from "antd";
import { Link, NavLink, Outlet, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
// import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";
import { AutoComplete } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllExercisesAPI } from "../../api/api";
import { supabase } from "../../../../../supabase/supabaseClient";
import quaxly from "../../../../../images/quaxly.png";

const { Search } = Input;

interface IExercise {
	name: string;
}

export const ExercisesPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, auth, userId, session } =
		useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [allExercises, setAllExercises] = useState<any>([]); //change to appropriate type
	const [searchExercise, setSearchExercise] = useState<string>(""); // the live-current input in searchbar
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
	const navigate = useNavigate();

	const pubExercises = async () => {
		let { data: exercises, error } = await supabase
			.from("exercise")
			.select("name");
		if (error) {
			console.log(error);
		} else {
			// console.log("Ex", exercises);
			setAllExercises(exercises);
		}
	};
	useEffect(() => {
		console.log("hi");
		if (!auth) {
			pubExercises();
		}

		// const getAllExercises = async () => {
		// 	if (session) {
		// 		const data = await getAllExercisesAPI(session);
		// 		console.log("data made it to ExercisePage Component", data);
		// 		return data;
		// 	}
		// };

		// // upon loading, fetch all exercise data to populate dropdown
		// console.log("exercises fetch", allExercises);
		// async function fetchExercises() {
		// 	const { data, error } = await supabase
		// 		.from("exercises")
		// 		.select("value: name, id"); // change name column to "value" to match options()
		// 	if (error) {
		// 		console.error("error fetching exercises", error);
		// 		setIsLoading(false);
		// 		return;
		// 	}
		// 	if (data.length > 0) {
		// 		console.log("fetching exercises data: ", data);
		// 		setAllExercises(data);
		// 	}
		// 	setIsLoading(false);
		// 	return data;
		// }
		// fetchExercises();
		// console.log("exercises fetch2", allExercises);
		// const data = getAllExercises();
	}, []);

	const onSearch = (value: string) => console.log(value);

	// useEffect(() => {
	// 	if (allExercises) {
	// 		console.log("all exercises updated", allExercises);
	// 	}
	// }, [allExercises]);

	// useEffect(() => {
	// 	if (allExercises.filter((e) => e.value === searchExercise).length > 0) {
	// 		setIsNewExercise(false);
	// 	} else {
	// 		setIsNewExercise(true);
	// 	}
	// }, [searchExercise]);

	const handleSearch = () => {
		// if (searchExercise.length > 0) {
		// 	if (isNewExercise) {
		// 		navigate(`${searchExercise}/new`);
		// 	} else {
		// 		let exercise = allExercises.find(
		// 			// grab exercise from list of ALLexercise
		// 			(e) => e.value === searchExercise
		// 		);
		// 		if (exercise) {
		// 			console.log("asdfasdf", exercise.id);
		// 			navigate(`${exercise.id}`);
		// 		}
		// 	}
		// }
	};

	// const getExercise = () => {
	// 	let exercise = allExercises.find((e) => e.value === searchExercise);
	// 	if (exercise) {
	// 		console.log("asdfasdf", exercise.id);
	// 		navigate(`${searchExercise}/id=${exercise.id}`);
	// 	}
	// };

	return (
		<div className="exercise-page">
			<div className="page-heading">
				<h2>Workout Buddy Exercise</h2>
				<img src={quaxly} style={{ maxWidth: "400px" }} />
				<h5>Coming soon...</h5>
			</div>
			{/* )} */}
		</div>
	);
};

// ant-select-dropdown css-dev-only-do-not-override-yp8pcc ant-select-dropdown-placement-bottomLeft ant-select-dropdown-empty
// ant-select-dropdown css-dev-only-do-not-override-yp8pcc ant-select-dropdown-placement-bottomLeft"
// ant-select-item ant-select-item-option ant-select-item-option-active"
