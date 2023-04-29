import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button, theme, ConfigProvider } from "antd";
import { Link, NavLink, Outlet, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";
import { AutoComplete } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

export const ExercisesPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [allExercises, setAllExercises] = useState<{ value: string }[]>([]); //change to appropriate type
	const [searchExercise, setSearchExercise] = useState<string>(""); // the live-current input in searchbar
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
	const navigate = useNavigate();
	useEffect(() => {
		// upon loading, fetch all exercise data to populate dropdown
		console.log("exercises fetch", allExercises);
		async function fetchExercises() {
			const { data, error } = await supabase
				.from("Exercises")
				.select("value: name"); // change name column to "value" to match options()
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

	useEffect(() => {
		console.log("searched Exercise: ", searchExercise);
		console.log("All exercises:", allExercises);
		if (allExercises.filter((e) => e.value === searchExercise).length > 0) {
			setIsNewExercise(false);
		} else {
			setIsNewExercise(true);
		}
	}, [searchExercise]);

	const addExercise = () => {
		navigate(`${searchExercise}`);
	};

	const getExercise = () => {
		navigate("/workouts");
	};

	return (
		<div className="exercise-page">
			<h2>Exercises </h2>
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
							onSearch={isNewExercise ? addExercise : getExercise} // conditional for add or seach
							enterButton={
								isNewExercise ? (
									<PlusOutlined />
								) : (
									<SearchOutlined />
								)
							}
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
			<Outlet />
			{/* {allExercises.map((exercise: any, index) => (
				<p key={`${index}-${exercise.value}`}>{exercise.value}</p>
			))}

			<p> is it new? </p>
			{isNewExercise ? <p>true</p> : <p>false</p>} */}
		</div>
	);
};

// ant-select-dropdown css-dev-only-do-not-override-yp8pcc ant-select-dropdown-placement-bottomLeft ant-select-dropdown-empty
// ant-select-dropdown css-dev-only-do-not-override-yp8pcc ant-select-dropdown-placement-bottomLeft"
// ant-select-item ant-select-item-option ant-select-item-option-active"
