import { useContext, useEffect, useState } from "react";
import { Set } from "./sets/set";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IWorkout, TUsersExerciseData } from "../../api/types";
import { TExerciseTemplate } from "./AddExercise";
import { useRequest } from "../../hooks/useRequest";
import {
	addExerciseToWorkoutAPI,
	upsertUsersExerciseDateAPI,
} from "../../api/api";
import { AuthContext } from "../../contexts/AuthProvider";
import { uuid } from "@supabase/supabase-js/src/lib/helpers";

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
};

type TProps = {
	exercise: TExerciseTemplate;
	workout: IWorkout;
	handleAddExercise: (newExercise: TUsersExerciseData) => void;
};

export const AddExerciseData = ({
	exercise,
	workout,
	handleAddExercise,
}: TProps) => {
	const [weightAndRepsArr, setWeightAndRepsArr] = useState<number[][]>(
		exercise.defaultSets
	);
	const [timeUnits, setTimeUnits] = useState<string | undefined>(
		exercise.defaultTimeUnits
	);
	const [weightUnits, setWeightUnits] = useState<string | undefined>(
		exercise.defaultWeightUnits
	);
	const [useTime, setUseTime] = useState<boolean>(exercise.useTime);

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
		if (addExerciseToWorkoutAPIResponse) {
			console.log("weightAndRepsArr", weightAndRepsArr);
		}
	}, [addExerciseToWorkoutAPIResponse]);
	// get exercise data

	useEffect(() => {
		//GET personal set DATA
		if (
			upsertUsersExerciseDateAPIResponse &&
			!upsertUsersExerciseDateAPIError
		) {
			console.log(
				"user's updated info has been upserted",
				upsertUsersExerciseDateAPIResponse
			);
			addExerciseToWorkoutAPIRequest(
				workout.id,
				upsertUsersExerciseDateAPIResponse.id,
				upsertUsersExerciseDateAPIResponse.usersExerciseId,
				session!
			);
		}
	}, [upsertUsersExerciseDateAPIResponse]);
	//
	const handleAddSet = () => {
		const newSet = weightAndRepsArr[weightAndRepsArr.length - 1];
		const newWeightAndRepsArr = new Array(...weightAndRepsArr);
		newWeightAndRepsArr.push(newSet);
		setWeightAndRepsArr(newWeightAndRepsArr);
	};

	const handleDeleteSet = (i: number) => {
		const newSets = weightAndRepsArr.filter((set, index) => index !== i);
		const newWeightAndRepsArr = Array(...newSets);
		if (newSets.length >= 1) {
			setWeightAndRepsArr(newSets);
		} else {
			alert(
				"cannot have 0 sets, if you want to delete the exercise, click the remove exercise Button"
			);
		}
	};

	const handleModifySet = (newSet: number[], i: number) => {
		if (!newSet.some((element) => element < 0)) {
			const newExerciseSetData = new Array(...weightAndRepsArr);
			newExerciseSetData[i] = newSet;
			setWeightAndRepsArr(newExerciseSetData);
		}
	};

	const handleConfirm = () => {
		// takes sets and posts to users_exercise
		// sets: req.body.sets,
		// links: req.body.links,
		// notes: req.body.notes,
		const usersExerciseId = uuid();
		//
		const usersUpdatedExerciseData: TUsersExerciseData = {
			sets: weightAndRepsArr,
			weightUnits,
			timeUnits,
			useTime,
			id: exercise.id,
			name: exercise.name,
			usersExerciseId,
		};

		console.log("updated Exercise", usersUpdatedExerciseData);
		handleAddExercise(usersUpdatedExerciseData);

		// also posts exercise to workouts_exercises
		// CREATE API
		// console.log(workout, "workout");
		// const usersExerciseId = uuid();
		// addExerciseToWorkoutAPIRequest(
		// 	workout.id,
		// 	exercise.id,
		// 	{ usersExerciseId: usersExerciseId },
		// 	session!
		// );
		// FIRST upsert
		upsertUsersExerciseDateAPIRequest(
			session!,
			usersUpdatedExerciseData,
			usersUpdatedExerciseData.id
		);
	};
	return (
		<div className="add-exercise-data-box">
			<h3 className="add-exercise-data-exercise-name">{exercise.name}</h3>
			{weightAndRepsArr &&
				weightAndRepsArr.map((set: number[], index: number) => (
					<Set
						key={index}
						set={set}
						index={index}
						weightUnits={exercise.defaultWeightUnits}
						modifySets={handleModifySet}
						deleteSets={handleDeleteSet}
					/>
				))}
			<div className="confirmation-buttons">
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAddSet}
					className="add-set-button"
				>
					Add Set
				</Button>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleConfirm}
					className="confirm-exercise-button"
					style={{ backgroundColor: "Green" }}
				>
					Confirm Exercise
				</Button>
			</div>
		</div>
	);
};
