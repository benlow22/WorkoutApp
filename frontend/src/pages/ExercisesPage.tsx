import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button, theme, ConfigProvider } from "antd";
import { Link, NavLink, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";
import { AutoComplete } from "antd";

const { Search } = Input;

export const ExercisesPage: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [allExercises, setAllExercises] = useState<any>([]); //change to appropriate type
	const { useToken } = theme;
	console.log("Exercises page");
    const options = [
        { value: "Burns Bay Road" },
        { value: "Downing Street" },
        { value: "Wall Street" },
    ];
    
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
			<div className="search-container">
				<ConfigProvider
					theme={{
						token: {
							colorTextBase: "rgba(0,0,0,0)",
						},
					}}
				>
					<AutoComplete
						defaultOpen={true}
						open={true}
						allowClear
						onDropdownVisibleChange={() => {}}
						style={{
							width: 200,
						}}
						popupClassName="thingys"
						options={options}
						placeholder="Search Exercises`"
						filterOption={(inputValue, option) =>
							option!.value
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
					/>

					<Button type="primary">Submit</Button>
					<Search
						placeholder="Exercise Search"
						onSearch={onSearch}
						enterButton
						className="exercise-search"
					/>
					<div className="suggestions"></div>
				</ConfigProvider>
			</div>

			{allExercises.map((exercise: any) => (
				<p>{exercise.name}</p>
			))}
		</div>
	);
};

