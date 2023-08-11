import { useContext, useState } from "react";
import { Button } from "antd";
import { MinusSquareOutlined, PlusOutlined } from "@ant-design/icons";
import {
	IWorkout,
	TExerciseTemplate,
	TUsersExerciseData,
} from "../../api/types";
import { AuthContext } from "../../contexts/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { Set } from "./sets/Set";

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
	handleRemoveExercise: () => void;
};

export const AddExerciseData = ({
	exercise,
	workout,
	handleAddExercise,
	handleRemoveExercise,
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
	const [useTime, setUseTime] = useState<boolean | undefined>(
		exercise.useTime
	);

	const { session } = useContext(AuthContext);

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
			setWeightAndRepsArr(newWeightAndRepsArr);
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
		const usersExerciseId = uuidv4();
		//
		console.log("UserSEXID", usersExerciseId);
		const usersUpdatedExerciseData: TUsersExerciseData = {
			sets: weightAndRepsArr,
			weightUnits,
			timeUnits,
			useTime,
			exerciseId: exercise.id,
			name: exercise.name,
			usersExerciseId: usersExerciseId,
		};

		console.log("updated Exercise", usersUpdatedExerciseData);
		handleAddExercise(usersUpdatedExerciseData);

		// addExerciseToWorkoutAPIRequest(
		// 	workout.id,
		// 	usersUpdatedExerciseData.id,
		// 	usersExerciseId,
		// 	session!
		// );
	};
	return (
		<div className="add-exercise-data-box">
			<h3 className="add-exercise-data-exercise-name">{exercise.name}</h3>
			<Button
				type="primary"
				danger
				size="small"
				className="delete-exercise-button-in-add-exercise-data"
				onClick={handleRemoveExercise}
			>
				<MinusSquareOutlined />
			</Button>
			{weightAndRepsArr &&
				weightAndRepsArr.map((set: number[], index: number) => (
					<Set
						key={index}
						set={set}
						index={index}
						weightUnits={exercise.defaultWeightUnits}
						modifySets={handleModifySet}
						deleteSets={handleDeleteSet}
						isDisabled={false}
						isGhost={false}
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
