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
import { IExercise, INewExerciseInput, TExerciseTemplate } from "../api/types";
import { useRequest } from "../hooks/useRequest";

const { Search } = Input;

// type TProps = {
// 	workout: {
// 		name: string;
// 		id: string;
// 		url: string;
// 		exercises?: [{ name: string }];
// 	};
// 	allExercises: IExercise[];
// 	// addExerciseToAll: (name: string) => void;
// };

type TProps = {
	setExerciseName: React.Dispatch<React.SetStateAction<string>>;
	setIsNewExercise: React.Dispatch<React.SetStateAction<boolean>>;
	isNewExercise: boolean;
	setExercise: React.Dispatch<
		React.SetStateAction<TExerciseTemplate | undefined>
	>;
	handleAddExistingExercise: (exercise: IExercise) => void;
};
/* SearchExercises component should:
	- GET all public and users exercises
	- drop down with autocomplete 
	- return selected exercise
	- if no previous exercise exists, redirect to create exercises page 
*/
export const SearchExercises = ({
	setExerciseName,
	setIsNewExercise,
	isNewExercise,
	setExercise,
	handleAddExistingExercise,
}: TProps) =>
	// addExerciseToAll
	{
		const { workouts, setWorkouts, userId, session } =
			useContext(AuthContext);
		const [searchExercise, setSearchExercise] = useState<string>(""); // the live-current input in searchbar
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
		] = useRequest(usersAndPublicExercisesAPI);

		const [
			usersExerciseResponse,
			usersExerciseLoading,
			usersExerciseError,
			usersExerciseRequest,
		] = useRequest(getUsersExerciseDataAPI);

		useEffect(() => {
			usersAndPublicExercisesRequest(session!);
		}, []);

		useEffect(() => {
			if (usersExerciseResponse?.usersExercise) {
				if (usersExerciseResponse.usersExercise?.length > 0) {
					console.log("user's exercise response received");
					const data = usersExerciseResponse.usersExercise[0];
					const defaultExerciseReformat = {
						name: usersExerciseResponse.name,
						useTime: data.useTime,
						defaultSets: data.sets,
						defaultWeightUnits: data.weightUnits,
						defaultTime: data.time?.toString(),
						defaultTimeUnits: data.timeUnits,
						id: usersExerciseResponse.id,
					};
					setExercise(defaultExerciseReformat);
				} else {
					setExercise(usersExerciseResponse);
				}
			}
		}, [usersExerciseResponse]);

		useEffect(() => {
			if (usersAndPublicExercisesResponse) {
				const listOfExerciseNamesAsValues =
					usersAndPublicExercisesResponse.map((exercise) => ({
						value: exercise.name,
					}));
				setAllExercisesNames(listOfExerciseNamesAsValues);
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
				setExerciseName(searchExercise);
				if (isNewExercise) {
					setIsNewExercise(true);
					// add old exercise
				} else {
					let exercise = usersAndPublicExercisesResponse!.find(
						(exercise) => exercise.name === searchExercise
					);
					console.log(
						"Add Existing exercise to exercises list in state and inserting into workouts_exercises table"
					);
					if (exercise) {
						handleAddExistingExercise(exercise);
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
				{/* <h2>
					{isNewExercise ? "new" : "old"} Exercise: {searchExercise}
				</h2> */}
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
						enterButton={
							isNewExercise ? (
								<PlusOutlined />
							) : (
								<SearchOutlined />
							)
						}
						onSearch={handleSearch}
					/>
				</AutoComplete>
			</div>
		);
	};
