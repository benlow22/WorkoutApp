import React, { useContext, useEffect, useState } from "react";
import WorkoutButton from "../components/WorkoutButton";
import { Button, theme, ConfigProvider } from "antd";
import { Link, NavLink, Outlet, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import { Input, Space } from "antd";
import { AutoComplete } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
	getUsersExerciseDataAPI,
	usersAndPublicExercisesAPI,
} from "../api/api";
import { IExercise } from "../api/types";
import { useRequest } from "../hooks/useRequest";
import NewExerciseForm from "../pages/NewExercisePage";

const { Search } = Input;

type TProps = {
	workout: {
		name: string;
		id: string;
		url: string;
		exercises?: [{ name: string }];
	};
	allExercises: IExercise[];
	// addExerciseToAll: (name: string) => void;
};

/* SearchExercises component should:
	- GET all public and users exercises
	- drop down with autocomplete 
	- return selected exercise
	- if no previous exercise exists, redirect to create exercises page 
*/
export const SearchExercises = () =>
	// addExerciseToAll
	{
		const { workouts, setWorkouts, userId, session } =
			useContext(AuthContext);
		const [searchExercise, setSearchExercise] = useState<string>(""); // the live-current input in searchbar
		const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
		const [addNewExerciseBox, setAddNewExerciseBox] =
			useState<boolean>(false);
		const [addExistingExerciseBox, setAddExistingExerciseBox] =
			useState<boolean>(false);
		const navigate = useNavigate();
		const [dropdownExercises, setDropdownExercises] = useState<
			{ value: string; id: string }[]
		>([]);

		const [selectedExercise, setSelectedExercise] = useState<IExercise>();
		// all exercises (NEVER NULL)
		const [allExercisesNames, setAllExercisesNames] = useState<
			{ value: string }[]
		>([]);

		const [
			usersAndPublicExercisesResponse,
			usersAndPublicExercisesLoading,
			usersAndPublicExercisesError,
			usersAndPublicExercisesRequest,
		] = useRequest(usersAndPublicExercisesAPI, session!);

		const [
			usersExerciseResponse,
			usersExerciseLoading,
			usersExerciseError,
			usersExerciseRequest,
		] = useRequest(getUsersExerciseDataAPI, session!);

		// useEffect(() => {
		// 	// upon loading, fetch all exercise data to populate dropdown
		// 	console.log("exercises fetch", allExercises);
		// 	async function fetchExercises() {
		// 		const { data, error } = await supabase
		// 			.from("exercises")
		// 			.select("value: name, id"); // change name column to "value" to match options()
		// 		if (error) {
		// 			console.error("error fetching exercises", error);
		// 			setIsLoading(false);
		// 			return;
		// 		}
		// 		if (data.length > 0) {
		// 			console.log("fetching exercises data: ", data);
		// 			setAllExercises(data);
		// 		}
		// 		setIsLoading(false);
		// 		return data;
		// 	}
		// 	fetchExercises();
		// 	console.log("exercises fetch2", allExercises);
		// }, []);

		const onSearch = (value: string) => console.log(value);

		useEffect(() => {
			usersAndPublicExercisesRequest(session!);
		}, []);
		useEffect(() => {
			if (usersAndPublicExercisesResponse) {
				const listOfExerciseNamesAsValues =
					usersAndPublicExercisesResponse.map((exercise) => ({
						value: exercise.name,
					}));
				setAllExercisesNames(listOfExerciseNamesAsValues);
				console.log("List o names", listOfExerciseNamesAsValues);
			}
		}, [usersAndPublicExercisesResponse]);

		useEffect(() => {
			if (
				allExercisesNames.some(
					(exercise) =>
						exercise.value.toUpperCase() ===
						searchExercise.toUpperCase()
				)
			) {
				setIsNewExercise(false);
			} else {
				setIsNewExercise(true);
			}
		}, [searchExercise]);

		const handleSearch = () => {
			/*  if exercise is New (isNewExercise = true), OPEN
			// 1. close search bar, 
			// 2. OPEN add exercise form 

			// if exercise exists, 
			// 1. add exercise ABOVE to workout 

			1. close search bar
			2. add createExercise Box form 
			3. IF new, leave empty, prefill with typed search, IF EXISTING, fill with user or default info.
*/
			// if there is a search, and it's new
			if (searchExercise) {
				if (isNewExercise) {
					console.log("Add New Exercise:", searchExercise);
					setAddNewExerciseBox(true);
					// add old exercise
				} else {
					let exercise = usersAndPublicExercisesResponse!.find(
						(exercise) => exercise.name === searchExercise
					);
					console.log(
						"Add Existing exercise to exercises list in state and inserting into workouts_exercises table"
					);
					if (exercise) {
						usersExerciseRequest(exercise.id, session!);
					}
					setAddExistingExerciseBox(true);
					// addExerciseToWorkout(workout.id, exercise, userId);
					// // addExerciseToAll(exercise.value);
					// setSearchExercise("");
					// // let newAllExercises = workout.exercises;
					// // let newExercise = { name: exercise.value };
					// // newAllExercises.push(newExercise);
					// // updateExercise(newAllExercises);
					// console.log(
					// 	"Add New Exercise Component > new ExercisePage",
					// 	workout.id
					// );
					// // if (workout.exercises) {
					// // 	workout.exercises.push({ name: searchExercise });
					// // }
				}
			} else {
			}
		};

		return (
			<div className="search-container">
				{/* {addNewExerciseBox && isNewExercise ? (
				<NewExerciseForm exerciseName={searchExercise} />
			) : (
				<AddExercise exercise={usersExerciseResponse} />
			)} */}
				<h2>
					{isNewExercise ? "new" : "old"} Exercise: {searchExercise}
				</h2>
				<AutoComplete
					style={{
						width: 260,
					}}
					onChange={(value) => setSearchExercise(value)}
					options={allExercisesNames}
					filterOption={(inputValue, option) =>
						option!.value
							.toUpperCase()
							.indexOf(inputValue.toUpperCase()) !== -1
					}
				>
					<Input.Search
						size="large"
						placeholder="input here"
						enterButton
						onSearch={handleSearch}
					/>
				</AutoComplete>
			</div>
		);
	};
