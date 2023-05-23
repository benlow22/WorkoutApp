import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button, theme, ConfigProvider } from "antd";
import { Link, NavLink, Outlet, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";
import { AutoComplete } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { addExerciseToWorkout } from "../api/api";

const { Search } = Input;

type TProps = {
	workout: {
		name: string;
		id: string;
		url: string;
		exercises?: [{ name: string }];
	};
	addExerciseToAll: (name: string) => void;
};

export const SearchExercises = ({ workout, addExerciseToAll }: TProps) => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [allExercises, setAllExercises] = useState<
		{ value: string; id: string }[]
	>([]); //change to appropriate type
	const [searchExercise, setSearchExercise] = useState<string>(""); // the live-current input in searchbar
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
	const navigate = useNavigate();
	const [dropdownExercises, setDropdownExercises] = useState<
		{ value: string; id: string }[]
	>([]);

	

	useEffect(() => {
		// upon loading, fetch all exercise data to populate dropdown
		console.log("exercises fetch", allExercises);
		async function fetchExercises() {
			const { data, error } = await supabase
				.from("exercises")
				.select("value: name, id"); // change name column to "value" to match options()
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
			console.log("all exercises updated", allExercises)
		}
	}, [allExercises]);

	useEffect(() => {
		if (allExercises.filter((e) => e.value === searchExercise).length > 0) {
			setIsNewExercise(false);
		} else {
			setIsNewExercise(true);
		}
	}, [searchExercise]);

	const handleSearch = () => {
		console.log("Searchy", searchExercise);
		console.log("Searchy", workout);

		if (searchExercise.length > 0) {
			if (isNewExercise) {
				console.log("Add New Exercise Component > new ExercisePage");
			} else {
				let exercise = allExercises.find(
					// grab exercise from list of ALLexercise
					(e) => e.value === searchExercise
				);
				if (exercise) {
					console.log(
						"Add New Exercise to exercises list in state and inserting into workouts_exercises table",
						exercise
					);
					addExerciseToWorkout(workout.id, exercise, userId);
					addExerciseToAll(exercise.value);
					setSearchExercise("");
					// let newAllExercises = workout.exercises;
					// let newExercise = { name: exercise.value };
					// newAllExercises.push(newExercise);
					// updateExercise(newAllExercises);
					console.log(
						"Add New Exercise Component > new ExercisePage",
						workout.id
					);
					// if (workout.exercises) {
					// 	workout.exercises.push({ name: searchExercise });
					// }
				}
			}
		}
	};

	const getExercise = () => {
		let exercise = allExercises.find((e) => e.value === searchExercise);
		if (exercise) {
			console.log("asdfasdf", exercise.id);
			navigate(`${searchExercise}/id=${exercise.id}`);
		}
	};

	return (
		<div className="search-container">
			<AutoComplete
				style={{
					width: 260,
				}}
				// notFoundContent={`new exercise: ${searchExercise}`}
				defaultActiveFirstOption
				onChange={(value) => setSearchExercise(value)}
				options={allExercises}
				children={
					<Search
						placeholder="Exercise Search"
						onSearch={handleSearch} // conditional for add or seach
						enterButton={<PlusOutlined />}
						className="search-bar"
					/>
				}
				filterOption={(inputValue, option) =>
					option!.value
						.toUpperCase()
						.indexOf(inputValue.toUpperCase()) !== -1
				}
			/>
			{/* <div className="searched">Searched: {searchExercise}</div> */}
		</div>
	);
};
