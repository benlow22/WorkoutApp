import { Button } from "antd";
import { useEffect, useState } from "react";
import { SearchExercises } from "../SearchExercises";
import { CreateNewExerciseForm } from "./CreateNewExercise";
import { AddExerciseData } from "./AddExerciseData";
import { TestFetchExercise } from "../TestFetchExercises";
import { INewExerciseInput } from "../../api/types";

const testData = {
	name: "Preacher Curls",
	defaultSets: [
		["25", "10"],
		["30", "10"],
		["35", "10"],
	],
	defaultWeightUnits: "lbs",
	defaultTime: null,
	defaultTimeUnits: null,
	useTime: false,
};

export type TExerciseTemplate = {
	name: string;
	defaultSets: string[][];
	WeightUnits: string | null;
	defaultTime: string | null;
	defaultTimeUnits: string | null;
	useTime: boolean;
};

const convertStrArrToInt = (arrayOfSets: string[][]) => {};

type TAddExercise = {
	name: string;
	defaultSets: string[][];
	defaultWeightUnits: string | null;
	defaultTime: string | null;
	defaultTimeUnits: string | null;
	useTime: boolean;
};
export const AddExercise = () => {
	const [isShowAddExerciseButton, setIsShowAddExerciseButton] =
		useState<boolean>(true);
	const [isShowSearchExerciseBar, setIsShowSearchExerciseBar] =
		useState<boolean>(false);
	isShowSearchExerciseBar;
	const [exerciseName, setExerciseName] = useState<string>("");
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
	const [exercise, setExercise] = useState<INewExerciseInput>(); // change type
	const [exerciseTemplate, setExerciseTemplate] =
		useState<TExerciseTemplate>(); // after new exerc ise is created or the default sets for an existing exercise.
	useEffect(() => {
		if (exerciseName) {
			setIsShowSearchExerciseBar(false);
			setIsShowAddExerciseButton(false);
		}
	}, [exerciseName]);

	return (
		/* add exercise button 
            - if clicked searchbar shows up
        exercise searched 
            - if new 
                = new exercise component 
            - if old
                = old exercise component 
        */
		<div className="add-exercise-container">
			{isShowAddExerciseButton && (
				<Button
					type="primary"
					onClick={() => (
						setIsShowAddExerciseButton(false),
						setIsShowSearchExerciseBar(true)
					)}
					className="add-exercise-button"
				>
					Add Exercise
				</Button>
			)}
			{isShowSearchExerciseBar && (
				<SearchExercises
					setExerciseName={setExerciseName}
					setIsNewExercise={setIsNewExercise}
					isNewExercise={isNewExercise}
					setExercise={setExercise}
				/>
			)}
			{isNewExercise && exerciseName && (
				<CreateNewExerciseForm
					exerciseName={exerciseName}
					setExerciseName={setExerciseName}
					setExercise={setExerciseTemplate}
				/>
			)}
			{/* {!isNewExercise && exerciseName && ( */}

			<AddExerciseData exercise={exercise} />
			{/* )} */}
		</div>
	);
};
