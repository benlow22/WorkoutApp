import { Button, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { SearchExercises } from "./SearchExercises";
import { CreateNewExerciseForm } from "./CreateNewExercise";
import { AddExerciseData } from "./AddExerciseData";
import {
	IExercise,
	INewExerciseInput,
	IWorkout,
	TExerciseTemplate,
	TUsersExerciseData,
} from "../../../../../api/types";
import { useRequest } from "../../../../../hooks/useRequest";
import {
	addExerciseToWorkoutAPI,
	getUsersExerciseDataAPI,
	upsertUsersExerciseDateAPI,
} from "../../api/api";
import { AuthContext } from "../../../../../contexts/AuthProvider";

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

	const [isShowExistingExerciseField, setIsShowExistingExerciseField] =
		useState<boolean>(false);
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

	const [
		usersExerciseResponse,
		usersExerciseLoading,
		usersExerciseError,
		usersExerciseRequest,
	] = useRequest(getUsersExerciseDataAPI);

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
			setIsShowExistingExerciseField(true);
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

	const handleAddExistingExercise = (exercise: IExercise) => {
		console.log("exerciseID", exercise.id);
		usersExerciseRequest(exercise.id, session!);
	};

	const handleRemoveExerciseData = () => {
		setIsShowAddExerciseButton(true);
		setExerciseName("");
		setIsShowExerciseConfirmation(false);
	};

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
				setExerciseDefaultValues(defaultExerciseReformat);
			} else {
				setExerciseDefaultValues(usersExerciseResponse);
			}
		}
	}, [usersExerciseResponse]);
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
					handleAddExistingExercise={handleAddExistingExercise}
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
			{
				// isShowExistingExerciseField ||
				// 	(isShowExerciseConfirmation &&
				// usersExerciseLoading &&z
				exerciseDefaultValues && (
					<AddExerciseData
						exercise={exerciseDefaultValues}
						workout={workout}
						handleAddExercise={handleAddExercise}
						handleRemoveExercise={handleRemoveExerciseData}
					/>
					// )
				)
			}
		</div>
	);
};
