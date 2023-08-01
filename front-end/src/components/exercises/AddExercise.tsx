import { Button, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { SearchExercises } from "../SearchExercises";
import { CreateNewExerciseForm } from "./CreateNewExercise";
import { AddExerciseData } from "./AddExerciseData";
import { TestFetchExercise } from "../TestFetchExercises";
import {
	IExercise,
	INewExerciseInput,
	IWorkout,
	TUsersExerciseData,
} from "../../api/types";
import { useRequest } from "../../hooks/useRequest";
import {
	addExerciseToWorkoutAPI,
	upsertUsersExerciseDateAPI,
} from "../../api/api";
import { AuthContext } from "../../contexts/AuthProvider";

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
	defaultSets: number[][];
	defaultWeightUnits?: string;
	defaultTime?: string;
	defaultTimeUnits?: string;
	useTime: boolean;
	id: string;
};

type TAddExercise = {
	name: string;
	defaultSets: number[][];
	defaultWeightUnits: string | null;
	defaultTime: string | null;
	defaultTimeUnits: string | null;
	useTime: boolean;
};
type TProps = {
	workout: IWorkout;
	addExerciseToWorkout: (exercise: TUsersExerciseData) => void;
};
export const AddExercise = ({ workout, addExerciseToWorkout }: TProps) => {
	const [isShowAddExerciseButton, setIsShowAddExerciseButton] =
		useState<boolean>(true);
	const [isShowSearchExerciseBar, setIsShowSearchExerciseBar] =
		useState<boolean>(false);
	isShowSearchExerciseBar;
	const [exerciseName, setExerciseName] = useState<string>("");
	const [isNewExercise, setIsNewExercise] = useState<boolean>(true);
	const [exercise, setExercise] = useState<INewExerciseInput>(); // change type
	const [isShowExerciseConfirmation, setIsShowExerciseConfirmation] =
		useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();

	const [exerciseDefaultValues, setExerciseDefaultValues] =
		useState<TExerciseTemplate>(); // after new exerc ise is created or the default sets for an existing exercise.
	const { session } = useContext(AuthContext);

	const [
		addExerciseToWorkoutAPIResponse,
		addExerciseToWorkoutAPILoading,
		addExerciseToWorkoutAPIError,
		addExerciseToWorkoutAPIRequest,
	] = useRequest(addExerciseToWorkoutAPI);

	const [
		upsertUsersExerciseDateAPIResponse,
		upsertUsersExerciseDateAPILoading,
		upsertUsersExerciseDateAPIError,
		upsertUsersExerciseDateAPIRequest,
	] = useRequest(upsertUsersExerciseDateAPI);

	useEffect(() => {
		//GET personal set DATA
		if (upsertUsersExerciseDateAPIResponse) {
			console.log(
				"user's updated info has been upserted",
				upsertUsersExerciseDateAPIResponse
			);
			addExerciseToWorkoutAPIRequest(
				workout.id,
				upsertUsersExerciseDateAPIResponse.exerciseId,
				upsertUsersExerciseDateAPIResponse.usersExerciseId,
				session!
			);
		}
	}, [upsertUsersExerciseDateAPILoading]);
	//
	useEffect(() => {
		if (exerciseName) {
			setIsShowSearchExerciseBar(false);
			setIsShowAddExerciseButton(false);
		}
	}, [exerciseName]);

	useEffect(() => {
		if (exerciseDefaultValues) {
			console.log("MADE IT TO THE TOP", exerciseDefaultValues);
			setExerciseName(exerciseDefaultValues.name);
			setIsNewExercise(false);
		}
	}, [exerciseDefaultValues]);

	const handleCreateNewExercise = (newExerciseDefault: TExerciseTemplate) => {
		console.log(
			"Sent back data from new exercise POST:",
			newExerciseDefault
		);
		createNewExerciseSuccessMessage(newExerciseDefault);
		setExerciseDefaultValues(newExerciseDefault);
		setIsShowExerciseConfirmation(true);
	};

	const handleAddExercise = (newExercise: TUsersExerciseData) => {
		upsertUsersExerciseDateAPIRequest(
			session!,
			newExercise,
			newExercise.exerciseId
		);
		// once exercise is submitted and customized
		console.log("AddExercise: HandleAddExercise");
		addExerciseToWorkout(newExercise);
		addExerciseToWorkoutSuccessMessage(newExercise.name);
		setIsShowAddExerciseButton(true);
		setIsNewExercise(true);
		setExerciseName("");
		setIsShowExerciseConfirmation(false);
	};

	const createNewExerciseSuccessMessage = (
		newExerciseDefault: TExerciseTemplate
	) => {
		messageApi.open({
			type: "success",
			content: `New exercise "${newExerciseDefault.name}" created`,
			duration: 3,
		});
	};

	const addExerciseToWorkoutSuccessMessage = (exerciseName: string) => {
		messageApi.open({
			type: "success",
			content: `"${exerciseName}" had been added to your workout`,
			duration: 3,
		});
	};
	return (
		<div className="add-exercise-container">
			{contextHolder}
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
					setExercise={setExerciseDefaultValues}
				/>
			)}
			{isNewExercise && exerciseName && (
				<CreateNewExerciseForm
					exerciseName={exerciseName}
					setExerciseName={setExerciseName}
					setExercise={setExerciseDefaultValues}
					handleCreateNewExercise={handleCreateNewExercise}
				/>
			)}
			{isShowExerciseConfirmation && exerciseDefaultValues && (
				<AddExerciseData
					exercise={exerciseDefaultValues}
					workout={workout}
					handleAddExercise={handleAddExercise}
				/>
			)}
		</div>
	);
};
